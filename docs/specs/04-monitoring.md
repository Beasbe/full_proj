# SPEC-04 — Мониторинг (Prometheus)

> Источник требований: кейс «MTC ENGINEER HACK», раздел 4 «Мониторинг».

## 0. Мета

| | |
|---|---|
| Статус | ❌ **Не реализовано** — GAP (роадмап ниже) |

## 1. Требования (из кейса)

| ID | Требование | Статус |
|----|-----------|--------|
| FR-MON-1 | Prometheus развёрнут, собирает метрики минимум одного компонента | ❌ |
| FR-MON-2 | Target доступен Prometheus | ❌ |
| FR-MON-3 | Продемонстрировано получение метрик Prometheus query | ❌ |
| FR-MON-4 | README: какие метрики собираются и как их проверить | ⚠️ статус GAP зафиксирован |

## 2. Роадмап внедрения

1. Развернуть стек мониторинга (Helm, без коммерческих сервисов):

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm install kube-prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring --create-namespace
```

2. Метрики, которые планируется собирать:
   - **инфраструктура**: `node-exporter` (CPU/RAM/диски), kube-state-metrics (поды/деплойменты);
   - **приложение**: nginx — через `nginx-prometheus-exporter` (stub_status) либо
     `nginx-vts`; в перспективе — HTTP-метрики Laravel (пакет `spatie/laravel-prometheus`):
     количество запросов, HTTP-коды, latency.

3. Проверка экспертом:

```bash
kubectl port-forward -n monitoring svc/kube-prometheus-prometheus 9090:9090
curl 'http://localhost:9090/api/v1/query?query=up' | jq '.data.result[] | {job: .metric.job, value: .value[1]}'
# PromQL для проверки:
#   up{job="nginx"}                  — доступность экспортёра nginx
#   rate(http_requests_total[5m])    — интенсивность запросов
#   process_cpu_seconds_total        — CPU
```

4. Обновить README: список метрик и команды проверки (заполнить по факту внедрения).

## 3. Текущее состояние

Сбор метрик отсутствует. Косвенно доступны: audit-лог WAF (JSON, `docker logs modsecurity-waf`)
и логи nginx — они не являются метриками Prometheus, но могут использоваться для отладки.

## 4. Ограничения

- Раздел кейса №4 не выполнен; внедрение Prometheus — обязательный шаг роадмапа.
- Для финальной сдачи метрики должны быть реально собираемыми и проверяемыми
  (критерий «наличие реально собираемых метрик»).
