# full_proj — Laravel CMS + Next.js + WAF (ModSecurity)

Веб-приложение на стеке **Laravel 10 + Filament CMS + Next.js + MariaDB**, защищённое
WAF **ModSecurity + OWASP CRS**, с двумя способами развёртывания:

- **локально / на ВМ** — Docker Compose (одна команда: `./setup.sh`);
- **в Kubernetes** — raw-манифесты (`k8s/`) или Helm-чарт (`helm/`) + CI/CD (GitHub Actions).

Документация оформлена в подходе **spec-driven development** (требования → критерии приёмки →
реализация → верификация) на основе технического задания конкурса. Полный комплект
спецификаций — в [`docs/`](docs/README.md).

---

## Состав решения и версии

| Компонент | Реализация / версия |
|---|---|
| Kubernetes | **k3s v1.28 (Kubernetes v1.28)** — см. [SPEC-01](docs/specs/01-kubernetes.md); ⚠️ зафиксируйте точную версию стенда при переносе |
| Способ создания кластера | k3s (`curl -sfL https://get.k3s.io | sh -`) на Ubuntu 24.04; допускается kubeadm |
| ОС | **Ubuntu 24.04 LTS** (тестовый стенд; Docker-путь — любая ОС с Docker) |
| Доступ к приложению | Traefik **Ingress** + NodePort (`nginx` :30080, `frontend` :30560); **Gateway API — в роадмапе** ([SPEC-03](docs/specs/03-gateway-api.md)) |
| Веб-приложение | Laravel 10 (PHP 8.1+), Filament 3, MoonShine, MariaDB 10.11, Next.js 16 / React 19 |
| Образы | собираются из репозитория (`CMS/Dockerfile`, `It_project/dockerfile`) либо из GHCR |
| WAF | ModSecurity 3.0.16 + ModSecurity-nginx 1.0.4 + OWASP CRS 3.3.10 (образ `owasp/modsecurity-crs:nginx-alpine`) — [SPEC-06](docs/specs/06-waf.md), [waf/SPEC.md](waf/SPEC.md) |
| Мониторинг | Prometheus — **в роадмапе** ([SPEC-04](docs/specs/04-monitoring.md)) |
| Сбор логов | access/error-логи nginx → stdout; Fluentd/Filebeat — **в роадмапе** ([SPEC-05](docs/specs/05-logging.md)) |
| Автоматизация | `setup.sh` / `setup.ps1` (Compose), Helm-чарт, CI/CD GitHub Actions ([SPEC-07](docs/specs/07-automation.md)) |

> ⚠️ Честный статус: обязательные компоненты кейса (Gateway API, Prometheus, Fluentd/Filebeat)
> в текущей версии репозитория **не реализованы** — их статус и план внедрения описаны
> в соответствующих спецификациях. Всё, что заявлено как работающее, можно проверить командами ниже.

---

## Быстрый старт (Docker Compose)

```bash
git clone <URL_РЕПОЗИТОРИЯ>
cd full_proj
chmod +x setup.sh && ./setup.sh
```

| Сервис | URL | Описание |
|---|---|---|
| Фронтенд | `http://localhost:3000` | Next.js |
| Бэкенд (через WAF) | `http://localhost:8080` | nginx → Laravel, **весь трафик проходит WAF** |
| Админ-панель | `http://localhost:8080/admin` | Filament CMS |
| API | `http://localhost:8080/api` | JSON-эндпоинты |

## Быстрый старт (Kubernetes)

```bash
# Кластер: k3s на Ubuntu 24.04 (см. docs/specs/01-kubernetes.md)
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/

# либо Helm:
helm upgrade --install full-proj ./helm --namespace full-proj --create-namespace \
  --set-string secrets.APP_KEY="..." --set-string secrets.DB_PASSWORD="..."
```

Полное описание — в [docs/specs/01-kubernetes.md](docs/specs/01-kubernetes.md) и
[docs/specs/07-automation.md](docs/specs/07-automation.md).

---

## Проверка работоспособности

```bash
# 1. Приложение (обязательный ответ, access-логи в логах контейнера)
curl http://localhost:8080/api/news            # 200 + JSON
docker compose logs -f webserver               # access-логи nginx

# 2. WAF: легитимный трафик проходит, атаки блокируются
./waf/tests/run-tests.sh                       # 18/18 (CRS + сканеры по UA)
python3 waf/tests/ddos_static.py               # L7-DDoS → HTTP 429
docker logs -f modsecurity-waf                 # audit-лог (JSON) с ID правил

# 3. Kubernetes
kubectl get pods -n full-proj
curl http://<node-ip>:30080/api/news           # бэкенд через NodePort/Ingress
```

---

## Документация

- [`docs/README.md`](docs/README.md) — индекс спецификаций и паспорт решения;
- [`docs/passport.md`](docs/passport.md) — паспорт решения по структуре задания;
- [`docs/specs/`](docs/specs/) — спецификации разделов задания (01–09);
- [`waf/SPEC.md`](waf/SPEC.md) — детальная спецификация WAF;
- [`MIGRATION.md`](MIGRATION.md) — перенос репозитория на новый GitHub.

## Безопасность

В репозитории **нет** реальных паролей, токенов или ключей. Секреты передаются через
переменные окружения (`.env`, см. [`.env.example`](.env.example)), Kubernetes Secrets
(Helm `stringData` из CI-секретов) и GitHub Actions secrets. Подробнее —
[docs/specs/08-security.md](docs/specs/08-security.md).
