# SPEC-04 — Мониторинг (Prometheus)

> Источник требований: кейс «MTC ENGINEER HACK», раздел 4 «Мониторинг».

## 0. Мета

| | |
|---|---|
| Статус | ✅ **Реализовано и проверено** |
| Стек | Prometheus v3.15.0 (чарт prometheus-community/prometheus 29.35.0), node-exporter, kube-state-metrics |

## 1. Требования (из кейса)

| ID | Требование | Статус |
|----|-----------|--------|
| FR-MON-1 | Prometheus развёрнут, собирает метрики минимум одного компонента | ✅ |
| FR-MON-2 | Target доступен Prometheus | ✅ (см. матрицу ниже) |
| FR-MON-3 | Продемонстрировано получение метрик Prometheus query | ✅ ниже |
| FR-MON-4 | README: какие метрики собираются и как проверить | ✅ ниже |

## 2. Реализация

- Prometheus развёрнут Helm-чартом в namespace `monitoring`
  (`infra/prometheus/values.yaml`, retentiion 3d, без PV — emptyDir);
- встроенные subcharts чарта: **node-exporter** (DaemonSet, hostNetwork) и
  **kube-state-metrics**; pushgateway/alertmanager отключены;
- дефолтные scrape-джобы чарта собирают: kubelet (`kubernetes-nodes`),
  **cadvisor** (`kubernetes-nodes-cadvisor`), apiserver, kube-state-metrics;
- **метрики приложения**: sidecar `nginx-prometheus-exporter:1.4.0` в поде
  `backend` (читает `stub_status` nginx), подхватывается джобой `kubernetes-pods`
  по аннотациям `prometheus.io/scrape: "true"`, порт 9113.

| Job | Компонент | Метрики |
|---|---|---|
| `node-exporter` | узел | CPU/RAM/диск/сеть |
| `kubernetes-nodes-cadvisor` | kubelet | метрики контейнеров (CPU/RAM) |
| `kubernetes-pods` | nginx приложения | `nginx_http_requests_total` (кол-во запросов), соединения |
| `kubernetes-service-endpoints` | kube-state-metrics | состояние подов/деплойментов |
| `kubernetes-nodes` / `kubernetes-api-servers` | k8s | состояние кластера |

## 3. Верификация (фактические результаты)

```bash
kubectl port-forward -n monitoring svc/prometheus-server 9090:80

# все цели живы
curl 'http://localhost:9090/api/v1/query?query=up' | jq '.data.result[] | {job: .metric.job, instance: .metric.instance, value: .value[1]}'
# node-exporter ... -> 1; kubernetes-pods instance=10.42.0.10:9113 -> 1; и т.д.

# метрики приложения: после обращений к приложению счётчик растёт
curl 'http://localhost:9090/api/v1/query?query=nginx_http_requests_total'
# {host="", status=""} -> N запросов (растёт после каждого curl к :30080)

# инфраструктурные метрики
curl 'http://localhost:9090/api/v1/query?query=node_memory_MemAvailable_bytes/1024/1024'
curl 'http://localhost:9090/api/v1/query?query=rate(container_cpu_usage_seconds_total[5m])'
```

## 4. Роадмап

- Grafana + дашборды (Node Exporter Full, nginx);
- HTTP-метрики Laravel (пакет `spatie/laravel-prometheus`): коды ответов, latency;
- алерты (Alertmanager), ServiceMonitor/operator при переносе на kube-prometheus-stack.
