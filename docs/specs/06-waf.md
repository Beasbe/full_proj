# SPEC-06 — WAF (ModSecurity + OWASP CRS)

> Дополнительное улучшение решения (безопасность). Полная спецификация: [`waf/SPEC.md`](../../waf/SPEC.md).

## 0. Мета

| | |
|---|---|
| Статус | ✅ Реализовано и проверено (контур Docker Compose) |
| Компоненты | ModSecurity 3.0.16, ModSecurity-nginx 1.0.4, OWASP CRS 3.3.10, nginx (`owasp/modsecurity-crs:nginx-alpine`) |

## 1. Что реализовано

| ID | Функция | Механизм |
|----|---------|----------|
| FR-WAF-1 | Весь трафик к бэкенду проходит WAF | сервис `waf` — единственная точка входа `:8080`, хост-порт `webserver` убран |
| FR-WAF-2 | Базовый набор правил OWASP CRS (paranoia 1, блокирующий режим) | env-параметры контейнера в `docker-compose.yml` |
| FR-WAF-3 | Блокировка сканеров/ботнетов по `User-Agent` | правило `1000001` + `waf/rules/scanners-botnets.data` |
| FR-WAF-4 | Защита от L7-DDoS на статику | nginx `limit_req` (зона `static_per_ip`, 30 r/s + burst 60 → HTTP 429) |
| FR-WAF-5 | Audit-лог с ID сработавших правил | `MODSEC_AUDIT_LOG=/dev/stdout` (JSON) |

## 2. Верификация

```bash
./waf/tests/run-tests.sh        # 18/18: легитимный трафик 200; сканеры/CRS-атаки 403
python3 waf/tests/ddos_static.py  # L7-DDoS: массовые 429
docker logs -f modsecurity-waf  # audit-лог JSON: id правил (1000001, 942100, 949110, ...)
```

## 3. Ограничения / роадмап

1. WAF развёрнут **только в Compose-контуре**. В Kubernetes-контуре (`k8s/`, `helm/`)
   WAF не установлен — роадмап: отдельный Deployment `waf` перед `nginx` (по аналогии
   с Compose) либо sidecar/Ingress-интеграция ModSecurity.
2. Frontend на `:3000` не защищён WAF (его API-трафик на `:8080` — защищён).
3. TLS не настроен (самоподписанный сертификат образа) — для продакшена нужен cert-manager.
