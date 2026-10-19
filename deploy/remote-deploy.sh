#!/usr/bin/env bash
# Dijalankan di VPS oleh CI (appleboy/ssh-action). Argumen: $1 = tag image baru.
# Env dari CI: STACK_PATH, REGISTRY_USER, REGISTRY_PAT. Opsional: HEALTH_TIMEOUT (detik, default 180).
set -euo pipefail
cd "$STACK_PATH"
NEW_TAG="$1"
HEALTH_TIMEOUT=${HEALTH_TIMEOUT:-180}
SERVICE=landing
CONTAINER=pos_landing
TAGVAR=LANDING_TAG

docker network inspect pos_network >/dev/null 2>&1 || docker network create pos_network
printf '%s' "$REGISTRY_PAT" | docker login -u "$REGISTRY_USER" --password-stdin
export REGISTRY_USER

OLD_TAG=$(grep -E "^${TAGVAR}=" .env 2>/dev/null | tail -1 | cut -d= -f2- || true)
OLD_TAG=${OLD_TAG:-latest}

# .env baru dari secret GitHub menggantikan yang lama setelah tag lama dibaca.
if [ -f .env.new ]; then
  [ -f .env ] && cp -f .env .env.prev
  mv -f .env.new .env
fi

set_tag() {
  if grep -qE "^${TAGVAR}=" .env; then sed -i "s|^${TAGVAR}=.*|${TAGVAR}=$1|" .env
  else echo "${TAGVAR}=$1" >> .env; fi
}

rollback() {
  echo "Deploy gagal, rollback ke ${TAGVAR}=$OLD_TAG"
  set_tag "$OLD_TAG"
  docker compose up -d --remove-orphans || true
  exit 1
}

wait_healthy() {
  for _ in $(seq 1 $((HEALTH_TIMEOUT / 5))); do
    [ "$(docker inspect -f '{{.State.Health.Status}}' "$CONTAINER" 2>/dev/null || echo none)" = healthy ] && return 0
    sleep 5
  done
  return 1
}

set_tag "$NEW_TAG"
# Pull dicoba ulang: jaringan/registry kadang lambat atau putus sesaat.
for attempt in 1 2 3; do
  docker compose pull "$SERVICE" && break
  [ "$attempt" = 3 ] && rollback
  echo "pull gagal (percobaan $attempt), coba lagi..."; sleep 10
done
docker compose up -d --remove-orphans || rollback
wait_healthy || { echo "Tidak healthy dalam ${HEALTH_TIMEOUT}s"; docker compose logs --tail=50 "$SERVICE" || true; rollback; }
docker compose exec -T landing-web nginx -t || rollback
docker image prune -f
echo "Deploy OK: ${TAGVAR}=$NEW_TAG"
