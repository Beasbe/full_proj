# SPEC-05 — Логирование (Fluent Bit → Loki)

> Источник требований: кейс «MTC ENGINEER HACK», раздел 5 «Логирование».

## 0. Мета

| | |
|---|---|
| Статус | ✅ **Реализовано и проверено** |
| Стек | Fluent Bit v5.1.3 (DaemonSet) → Loki v3.6.12 (single-binary, filesystem) |

## 1. Требования (из кейса)

| ID | Требование | Статус |
|----|-----------|--------|
| FR-LOG-1 | Сбор access/error-логов приложения | ✅ nginx/WAF → stdout → Fluent Bit |
| FR-LOG-2 | Передача логов в хранилище | ✅ Loki (namespace `logging`) |
| FR-LOG-3 | После обращения к приложению запись появляется в логах | ✅ проверено (ниже) |
| FR-LOG-4 | README: какие логи, куда, как проверить | ✅ ниже |

## 2. Реализация

- **Источники**: access/error-логи nginx (поды `backend`, `waf`), audit-лог WAF
  (JSON с ID сработавших правил ModSecurity), логи Laravel/Next.js — всё в stdout/stderr.
- **Fluent Bit** (`infra/logging/fluentbit-values.yaml`): DaemonSet, input `tail`
  на `/var/log/containers/*.log` с CRI-парсером, filter `kubernetes` (обогащение
  метками namespace/pod/container), output `loki` → `loki.logging.svc:3100`.
- **Loki** (`infra/logging/loki-values.yaml`): single-binary, `filesystem` TSDB,
  PVC 2Gi (local-path), без gateway/ruler/caches (минимальный профиль).

## 3. Верификация (фактические результаты)

```bash
# 1. Обратиться к приложению
curl -s http://localhost:30080/api/news?logtest=1 > /dev/null

# 2. Запись появляется в Loki
kubectl port-forward -n logging svc/loki 3100:3100
curl -G 'http://localhost:3100/loki/api/v1/query_range' \
  --data-urlencode 'query={namespace="full-proj"}' \
  --data-urlencode 'limit=5' | jq '.data.result[] | .stream.pod'
# backend-... | waf-... — access-логи с запросом /api/news?logtest=1

# 3. Фильтр по контейнеру WAF (audit-лог с ID правил)
curl -G 'http://localhost:3100/loki/api/v1/query_range' \
  --data-urlencode 'query={namespace="full-proj", container="modsecurity-waf"}'
```

## 4. Роадмап

- Grafana (Explore) как UI для Loki;
- retention/compaction для долгого хранения; перенос storage в S3-совместимое
  хранилище для масштабирования;
- логи Laravel (`storage/logs`) в stdout (`LOG_CHANNEL=stderr`) для сбора вне пода.
