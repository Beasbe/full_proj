# SPEC-03 — Gateway API

> Источник требований: кейс «MTC ENGINEER HACK», раздел 3 «Gateway API».

## 0. Мета

| | |
|---|---|
| Статус | ✅ **Реализовано и проверено** |
| Реализация Gateway API | **Traefik v3.7.13** (провайдер `kubernetesGateway`) |
| Версия Gateway API | v1.5.1 (стандартный канал CRD) |
| Используемые ресурсы | `GatewayClass` (`traefik`), `Gateway` (`full-proj-gateway`), `HTTPRoute` (`full-proj-route`) |
| Внешний доступ | NodePort `30080` (http://&lt;node-ip&gt;:30080) |

## 1. Требования (из кейса)

| ID | Требование | Статус |
|----|-----------|--------|
| FR-GW-1 | Выбрана open-source реализация Gateway API | ✅ Traefik v3 (helm-чарт) |
| FR-GW-2 | GatewayClass | ✅ `traefik` (создаётся Traefik-чартом) |
| FR-GW-3 | Gateway | ✅ `full-proj-gateway`, listener HTTP :80, PROGRAMMED=True |
| FR-GW-4 | HTTPRoute → Service приложения | ✅ `full-proj-route` → Service `waf` :8080 |
| FR-GW-5 | Приложение доступно через Gateway API | ✅ curl → 200 + JSON (см. верификацию) |
| FR-GW-6 | README: название/версия реализации, используемые ресурсы | ✅ эта спецификация + [README](../../readme.md) |
| FR-GW-7 | Команда проверки доступности (curl) | ✅ ниже |

## 2. Реализация

Топология: `Клиент → :30080 (NodePort) → Traefik (Gateway API) → HTTPRoute → Service waf → WAF → Service nginx → php-fpm`.

- **GatewayClass** `traefik` (controllerName `traefik.io/gateway-controller`) — создаётся
  Traefik-чартом при `providers.kubernetesGateway.enabled: true` (`infra/traefik/values.yaml`).
- **Gateway** `full-proj-gateway` (`helm/templates/gateway.yaml`): listener `http` :80;
  Traefik сопоставляет listener с entrypoint `web` по порту (`ports.web.port: 80`).
- **HTTPRoute** `full-proj-route`: `PathPrefix /` → backendRef `waf:8080` — WAF остаётся
  обязательной точкой входа, порт `nginx` в кластере не публикуется.
- Traefik-сервис — NodePort `30080` (для k3s без MetalLB; на kubeadm — можно LoadBalancer).

## 3. Верификация (фактические результаты)

```bash
kubectl get gatewayclass,gateway,httproute -n full-proj
# GatewayClass traefik; Gateway full-proj-gateway: PROGRAMMED=True, Address: 10.4.17.209

curl -s http://localhost:30080/api/news | head -c 200
# {"success":true,"data":[{"id":1,"slug":"zapusk-novogo-sajta",...}]}

curl -s -o /dev/null -w '%{http_code}\n' http://localhost:30080/        # 200
```

## 4. Дополнительные возможности (роадмап)

- несколько бэкендов/маршрутизация по path (напр. `/` → frontend, `/api` → backend);
- маршрутизация по hostname;
- TLS через cert-manager (listener HTTPS, `certificateRefs`).
