# SPEC-05 — Логирование (Fluentd / Filebeat)

> Источник требований: кейс «MTC ENGINEER HACK», раздел 5 «Логирование».

## 0. Мета

| | |
|---|---|
| Статус | ⚠️ **Частично**: access/error-логи формируются, централизованный сбор Fluentd/Filebeat — ❌ роадмап |

## 1. Требования (из кейса)

| ID | Требование | Статус |
|----|-----------|--------|
| FR-LOG-1 | Сбор access/error-логов приложения | ⚠️ логи пишутся в stdout, агент не настроен |
| FR-LOG-2 | Передача логов в хранилище/точку назначения | ❌ |
| FR-LOG-3 | После обращения к приложению запись появляется в собранных логах | ❌ |
| FR-LOG-4 | README: какие логи, куда, как проверить | ⚠️ статус зафиксирован |

## 2. Текущее состояние

- nginx (`webserver`, `waf`) и Next.js (`frontend`) пишут access/error-логи в stdout/stderr
  контейнеров — это требование FR-APP-3 выполнено на уровне приложения.
- Логи Laravel — `CMS/storage/logs` (в K8s — внутрь пода, см. ограничения).
- Проверка сейчас:

```bash
docker compose logs -f webserver        # access-логи nginx
docker compose logs -f modsecurity-waf  # audit-лог WAF (JSON)
kubectl logs -n full-proj deploy/nginx --tail=20
```

## 3. Роадмап внедрения (Filebeat → Elasticsearch или Fluent Bit → Loki)

Предлагаемый вариант (без коммерческих сервисов, поддерживает Ubuntu 24.04):

```bash
# fluent-bit DaemonSet читает логи контейнеров (containerd /var/log/containers)
helm repo add fluent https://fluent.github.io/helm-charts
helm install fluent-bit fluent/fluent-bit \
  --namespace logging --create-namespace \
  --set output.loki.enabled=true \
  --set output.loki.host=http://loki.logging.svc:3100
```

Проверка экспертом после внедрения:

```bash
# 1. Обратиться к приложению
curl -s http://<node-ip>:30080/api/news > /dev/null
# 2. Запись появляется в собранных логах
kubectl logs -n logging ds/fluent-bit --tail=20 | grep '/api/news'
# (при Loki: запрос через Grafana Explore)
```

## 4. Ограничения

- Логи приложения Laravel в K8s-контуре не перенаправлены в stdout контейнера `backend`
  (пишутся в `storage/logs` внутрь пода) — для сбора нужно добавить вывод в stdout
  (`LOG_CHANNEL=stderr` или tail-сайдкар); в Compose они доступны через том `./CMS`.
- Раздел кейса №5 считается выполненным только после появления «записи в собранных
  логах после обращения к приложению».
