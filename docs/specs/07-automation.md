# SPEC-07 — Автоматизация развёртывания

> Источник требований: кейс «MTC ENGINEER HACK», разделы 6 «Поддержка ОС» и 7 «Автоматизация развёртывания».

## 0. Мета

| | |
|---|---|
| Статус | ✅ Реализовано (Compose + Kubernetes), идемпотентность проверена |
| ОС | Ubuntu 24.04.5 LTS (стенд); Docker-путь — любая ОС с Docker |
| Инструменты | shell (`scripts/build-images.sh`, `scripts/deploy.sh`), Docker Compose, Helm, GitHub Actions (подготовлен CI) |

## 1. Требования

| ID | Требование | Статус |
|----|-----------|--------|
| FR-AUT-1 | Развёртывание воспроизводимо по инструкции, без ручного создания ресурсов | ✅ |
| FR-AUT-2 | Повторный запуск идемпотентен | ✅ проверено (повторный `deploy.sh` → «has been upgraded», состояние не ломается) |
| FR-AUT-3 | Минимум понятных команд | ✅ `./scripts/build-images.sh` + `./scripts/deploy.sh` |
| FR-AUT-4 | Поддержка Ubuntu 24.04 | ✅ развёрнуто и проверено на Ubuntu 24.04.5 |
| FR-AUT-5 | CI/CD (доп. улучшение) | ⚠️ workflow подготовлен (`.github/workflows/deploy.yml`), финальная проверка CI — на завершающем этапе |

## 2. Реализация

### 2.1. Локальная разработка (Docker Compose)

`./setup.sh` / `setup.ps1`: проверка зависимостей → `.env` из примеров →
`docker compose up -d --build` → composer → `key:generate` → миграции → админ.

### 2.2. Kubernetes (основной контур)

```bash
./scripts/build-images.sh     # backend/frontend/waf -> локальный registry localhost:5000
./scripts/deploy.sh           # весь стек (см. ниже)
```

`deploy.sh` выполняет 5 идемпотентных шагов:
1. Gateway API CRD v1.5.1 + workaround CoreDNS для k3s v1.36.x;
2. Traefik v3 (Gateway API, NodePort 30080);
3. приложение: Helm-чарт `helm/` (backend+nginx+exporter, mysql, frontend, WAF,
   Gateway + HTTPRoute), секреты из `local-secrets.yaml` (не коммитится);
4. Prometheus (+node-exporter, +kube-state-metrics из чарта);
5. Loki + Fluent Bit.

Все чарты тянутся как OCI-артефакты из ghcr.io (без `helm repo add`).

### 2.3. CI/CD (подготовлено)

`.github/workflows/deploy.yml`: сборка образов → push в GHCR (`ghcr.io/${{ github.repository }}`)
→ `helm upgrade --install` с секретами из GitHub Actions secrets → ожидание rollouts →
debug-вывод. Финальное включение — на завершающем этапе (runner не трогаем).

## 3. Верификация

```bash
./scripts/deploy.sh      # повторный запуск: "has been upgraded", exit 0
kubectl get pods -A      # все Running
curl -s http://localhost:30080/api/news | head -c 120   # 200 + JSON
```

## 4. Ограничения / роадмап

1. Smoke-тест (curl после деплоя) добавить в CI.
2. `helm lint` / `kubeconform` в CI для проверки конфигураций.
3. Интерактивное создание админа в `setup.sh` → неинтерактивный режим через env.
4. kubeadm-вариант установки кластера (приоритет кейса) — опциональный путь.
