# SPEC-01 — Kubernetes-окружение

> Источник требований: кейс «MTC ENGINEER HACK», раздел 1 «Kubernetes-окружение».
> Подход: spec-driven development (требования → приёмка → реализация → верификация).

## 0. Мета

| | |
|---|---|
| Статус | ✅ Реализовано (с оговорками, см. «Ограничения») |
| Кластер | k3s v1.28 (Kubernetes v1.28) на Ubuntu 24.04 — стенд участника |
| Способ развёртывания | raw-манифесты `k8s/` + Helm-чарт `helm/` |
| Зависит от коммерческих сервисов | нет (образы GHCR можно заменить локальной сборкой) |

## 1. Требования

| ID | Требование | Статус |
|----|-----------|--------|
| FR-K8S-1 | Kubernetes-кластер для развёртывания решения | ✅ k3s |
| FR-K8S-2 | Все ресурсы описаны как код (манифесты/Helm), без ручной настройки | ✅ `k8s/` + `helm/` |
| FR-K8S-3 | В README указаны: версия K8s, способ создания кластера, ОС | ✅ см. [README](../../readme.md) |
| FR-K8S-4 | Решение не зависит от инфраструктуры участника и коммерческих сервисов | ✅ |
| NFR-K8S-1 | Воспроизводимость экспертами по материалам репозитория | ✅ (см. верификацию) |

## 2. Реализация

- **k3s** выбран как лёгкая совместимая с Kubernetes среда развёртывания
  (кейс допускает k3d/minikube/kind; kubeadm — приоритетный вариант, отмечен в роадмапе).
- Ресурсы:
  - `k8s/namespace.yaml` — namespace `full-proj`;
  - `k8s/mysql.yaml`, `k8s/mysql-pvc.yaml` — БД MariaDB + PersistentVolumeClaim;
  - `k8s/backend.yaml` — Deployment Laravel (секреты из Secret `app-secrets`);
  - `k8s/nginx.yaml` — ConfigMap + Deployment + Service `nginx` (NodePort `30080`);
  - `k8s/frontend.yaml` — Deployment Next.js (NodePort `30560`).
- **Helm-чарт `helm/`** (apiVersion v2, appVersion 1.0.0) — полный аналог манифестов
  с параметризацией через `values.yaml`; секреты приходят как `--set-string secrets.*`
  из CI (GitHub Actions secrets), в репозитории значения пустые.
- Создание кластера (Ubuntu 24.04):

```bash
curl -sfL https://get.k3s.io | sh -
sudo k3s kubectl get nodes
# kubeconfig: /etc/rancher/k3s/k3s.yaml (или kubectl после настройки доступа)
```

## 3. Верификация

```bash
kubectl get nodes                       # кластер жив
kubectl apply -f k8s/namespace.yaml && kubectl apply -f k8s/
kubectl get pods -n full-proj           # backend, frontend, mysql, nginx = Running
kubectl get svc -n full-proj            # nginx:30080, frontend:30560 (NodePort)
```

## 4. Известные ограничения / роадмап

1. **Версия k3s не зафиксирована** в репозитории (определяется стендом). При переносе
   зафиксируйте фактическую версию в этом файле и в README.
2. Приоритет кейса — **kubeadm**: для финальной сдачи рекомендуется описать установку
   kubeadm-кластера на Ubuntu 24.04 (`kubeadm init` + CNI) как альтернативный путь.
3. Манифесты `k8s/` и Helm-чарт пересекаются — поддерживать оба дорого; предлагается
   оставить Helm как единственный способ (роадмап).
