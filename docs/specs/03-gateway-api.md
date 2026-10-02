# SPEC-03 — Gateway API

> Источник требований: кейс «MTC ENGINEER HACK», раздел 3 «Gateway API».

## 0. Мета

| | |
|---|---|
| Статус | ❌ **Не реализовано** — GAP. Сейчас доступ через Traefik **Ingress** + NodePort |
| Текущая реализация доступа | `helm/templates/ingress.yaml` (аннотация `traefik.ingress.kubernetes.io/router.entrypoints: web`), Services `nginx` :30080 / `frontend` :30560 |

## 1. Требования (из кейса)

| ID | Требование | Статус |
|----|-----------|--------|
| FR-GW-1 | Выбрана open-source реализация Gateway API | ❌ |
| FR-GW-2 | GatewayClass | ❌ |
| FR-GW-3 | Gateway | ❌ |
| FR-GW-4 | HTTPRoute → Service приложения | ❌ |
| FR-GW-5 | Приложение доступно через Gateway API | ❌ |
| FR-GW-6 | README: название и версия реализации, используемые ресурсы | ⚠️ зафиксирован статус GAP |
| FR-GW-7 | Команда проверки доступности (curl) | ⚠️ есть для текущего Ingress |

## 2. Обоснование текущего состояния (ADR)

На этапе сборки решения доступ был организован штатным **Traefik Ingress** — это
минимальный путь «из коробки» для k3s (Traefik предустановлен в k3s). Переход на
Gateway API был отложен; в спецификации он зафиксирован как обязательный шаг роадмапа.

## 3. Роадмап внедрения Gateway API

1. Установить в k3s контроллер Gateway API (Traefik v3 поддерживает Gateway API
   через provider `kubernetesGateway`): `helm install traefik traefik/traefik --values ...`.
2. Создать ресурсы:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: GatewayClass
metadata: { name: traefik }
spec: { controllerName: traefik.io/gateway-controller }
---
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata: { name: full-proj-gw, namespace: full-proj }
spec:
  gatewayClassName: traefik
  listeners:
    - name: web
      port: 80
      protocol: HTTP
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata: { name: full-proj-route, namespace: full-proj }
spec:
  parentRefs: [{ name: full-proj-gw }]
  rules:
    - matches: [{ path: { type: PathPrefix, value: / } }]
      backendRefs: [{ name: nginx, port: 80 }]
```

3. Проверка:

```bash
kubectl get gatewayclass,gateway,httproute -n full-proj
curl -s http://<gateway-ip>/api/news   # ожидаемый JSON-ответ приложения
```

4. Обновить README: реализация (Traefik Gateway Provider), версия, используемые ресурсы.

## 4. Верификация текущего состояния (Ingress/NodePort)

```bash
curl -s http://<node-ip>:30080/api/news     # 200 + JSON (NodePort)
curl -s -H 'Host: <host>' http://<node-ip>/api/news   # при наличии Ingress-хоста
```

## 5. Ограничения

- Без Gateway API раздел кейса №3 не может считаться выполненным — это главный
  известный GAP решения, зафиксирован честно и с планом внедрения выше.
