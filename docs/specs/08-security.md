# SPEC-08 — Безопасность и управление секретами

> Источник требований: кейс «MTC ENGINEER HACK», раздел «Требования к безопасности».

## 0. Мета

| | |
|---|---|
| Статус | ✅ Реализовано (после чистки репозитория) |

## 1. Требования

| ID | Требование | Статус |
|----|-----------|--------|
| FR-SEC-1 | В репозитории нет реальных паролей, API-токенов, приватных SSH-ключей, персональных данных | ✅ |
| FR-SEC-2 | Секреты передаются через переменные окружения / Secret / шаблон конфигурации | ✅ |

## 2. Реализация

| Контур | Механизм передачи секретов |
|---|---|
| Docker Compose | переменные окружения из `.env` (см. [`.env.example`](../../.env.example)); в репозитории — только примеры |
| Kubernetes | Secret `app-secrets` (`helm/templates/secrets.yaml`, `stringData`), значения — из CI-секретов `--set-string secrets.*`; в `values.yaml` — пустые |
| CI/CD | GitHub Actions secrets (`APP_KEY`, `DB_PASSWORD`, `SMTP_*`, …) — никогда не в файлах |
| Laravel | `APP_KEY` генерируется при установке (`php artisan key:generate`), в `.env.example` — пустой |

### Инциденты и их устранение (2026-10-02)

| Что было | Где | Устранение |
|---|---|---|
| SMTP-пароль и SSH-пароль сервера | `It_project/env.local` (трекался) | файл удалён, **история переписана** (filter-branch) |
| Реальный `APP_KEY` Laravel | `CMS/.env.example` (трекался) | заменён на пустой |
| Vim swap-файл | `CMS/config/.cors.php.swp` (трекался) | удалён, история переписана |
| Хардкод кредов БД в Compose | `docker-compose.yml` | вынесены в переменные окружения |
| Хардкод IP стенда | CI, CORS, Compose | параметризован (см. SPEC-09) |

## 3. Верификация

```bash
# в рабочем дереве и во всей истории нет утёкших значений
# (значения утёкших SMTP/SSH-секретов замените на свои паттерны)
grep -rIlE 'REDACTED_SMTP_PASS|REDACTED_SSH_PASS' . --exclude-dir=.git || echo OK
git log --all --oneline -S 'REDACTED_SMTP_PASS'        # пусто
git log --all --oneline -S 'REDACTED_SSH_PASS'        # пусто
```

## 4. Роадмап

1. Сканирование секретов в CI: **gitleaks** / **trufflehog** (шаг в workflow, блокирует push/PR).
2. Управление секретами в кластере: **sealed-secrets** или **external-secrets** вместо
   передачи через CI-переменные.
3. NetworkPolicy: разрешить трафик только `nginx → backend → mysql`, `waf → nginx`.
4. TLS для всех внешних эндпоинтов (cert-manager).
