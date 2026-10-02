# SPEC-07 — Автоматизация развёртывания

> Источник требований: кейс «MTC ENGINEER HACK», разделы 6 «Поддержка ОС» и 7 «Автоматизация развёртывания».

## 0. Мета

| | |
|---|---|
| Статус | ✅ Реализовано |
| ОС | Ubuntu 24.04 LTS (K8s-стенд и self-hosted runner); Docker-путь — любая ОС с Docker |
| Инструменты | shell-скрипты (`setup.sh`, `setup.ps1`), Docker Compose, Helm, GitHub Actions |

## 1. Требования

| ID | Требование | Статус |
|----|-----------|--------|
| FR-AUT-1 | Развёртывание воспроизводимо по инструкции, без ручного создания ресурсов | ✅ |
| FR-AUT-2 | Повторный запуск идемпотентен | ✅ |
| FR-AUT-3 | Минимум понятных команд | ✅ `./setup.sh` / `helm upgrade --install` |
| FR-AUT-4 | Поддержка Ubuntu 24.04 | ✅ (стенд + runner на Ubuntu 24.04) |
| FR-AUT-5 | CI/CD (доп. улучшение): сборка → push → деплой | ✅ GitHub Actions |

## 2. Реализация

### 2.1. Docker Compose-путь

`./setup.sh` (Linux/macOS) / `setup.ps1` (Windows):
проверка зависимостей → создание `.env` из примеров → `docker compose up -d --build` →
`composer install` → `php artisan key:generate` → `migrate` → интерактивное создание
администратора Filament. Повторный запуск безопасен (идемпотентные шаги, проверки
`if [ ! -f ... ]`).

### 2.2. Kubernetes-путь

- raw-манифесты: `kubectl apply -f k8s/namespace.yaml && kubectl apply -f k8s/`;
- Helm: `helm upgrade --install full-proj ./helm --namespace full-proj --create-namespace --set-string secrets.*=...`
  (`upgrade --install` — идемпотентно).

### 2.3. CI/CD (GitHub Actions)

`.github/workflows/deploy.yml` (self-hosted runner):
1. сборка образов backend/frontend из `CMS/` и `It_project/`;
2. push в GHCR (`ghcr.io/<owner>/<repo>/*`);
3. `helm upgrade --install` с секретами из GitHub Actions secrets;
4. ожидание rollouts (mysql/backend/frontend);
5. debug-вывод при падении (поды, события, логи).

## 3. Верификация

```bash
# идемпотентность Compose
./setup.sh && ./setup.sh          # второй запуск не ломает состояние
docker compose ps                 # все сервисы Up

# идемпотентность Helm
helm upgrade --install full-proj ./helm -n full-proj --set-string secrets.APP_KEY=x \
  --set-string secrets.DB_PASSWORD=y --set-string secrets.DB_ROOT_PASSWORD=z \
  --set-string secrets.SMTP_HOST=h --set-string secrets.SMTP_PORT=587 \
  --set-string secrets.SMTP_USER=u --set-string secrets.SMTP_PASS=p \
  --set-string secrets.SMTP_FROM=f --set-string secrets.TO_EMAIL=t \
  --set-string secrets.APP_URL=http://localhost
# повторный запуск — no changes
```

## 4. Ограничения / роадмап

1. Helm-деплой не включает smoke-тест (curl после развёртывания) — добавить шаг в CI.
2. Проверка конфигураций в CI (helm lint, kubeconform, `docker compose config`) — роадмап.
3. Интерактивное создание админа в `setup.sh` мешает полной автоматизации —
   предусмотреть неинтерактивный режим через переменные окружения.
4. `k8s/` и `helm/` дублируют друг друга — оставить один способ (Helm).
