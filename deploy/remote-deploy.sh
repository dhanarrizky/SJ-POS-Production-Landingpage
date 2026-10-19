#!/usr/bin/env bash
# Dijalankan di VPS oleh CI (appleboy/ssh-action). Argumen: $1 = tag image baru.
# Env dari CI: STACK_PATH. Opsional: HEALTH_TIMEOUT (detik, default 180).
set -euo pipefail
cd "$STACK_PATH"
NEW_TAG="$1"
HEALTH_TIMEOUT=${HEALTH_TIMEOUT:-180}
SERVICE=landing
CONTAINER=pos_landing
IMAGE=landing-app
TAGVAR=LANDING_TAG

docker network inspect pos_network >/dev/null 2>&1 || docker network create pos_network

OLD_TAG=$(grep -E "^${TAGVAR}=" .env 2>/dev/null | tail -1 | cut -d= -f2- || true)

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
  if [ -z "$OLD_TAG" ]; then
    echo "Deploy gagal dan belum ada versi sebelumnya; menghentikan service."
    docker compose stop "$SERVICE" || true
  else
    echo "Deploy gagal, rollback ke ${TAGVAR}=$OLD_TAG"
    set_tag "$OLD_TAG"
    docker compose up -d --remove-orphans || true
  fi
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
# Image dikirim CI sebagai image.tar.gz (tanpa registry) lalu di-load ke Docker server.
[ -f image.tar.gz ] || { echo "image.tar.gz tidak ditemukan"; exit 1; }
gunzip -c image.tar.gz | docker load
rm -f image.tar.gz
docker image inspect "$IMAGE:$NEW_TAG" >/dev/null

docker compose up -d --remove-orphans || rollback
wait_healthy || { echo "Tidak healthy dalam ${HEALTH_TIMEOUT}s"; docker compose logs --tail=50 "$SERVICE" || true; rollback; }
docker compose exec -T landing-web nginx -t || rollback
docker image prune -f

# Simpan 3 tag terbaru untuk rollback, hapus yang lebih lama (yang sedang dipakai tidak bisa terhapus).
docker images "$IMAGE" --format '{{.Repository}}:{{.Tag}}' | tail -n +4 | xargs -r docker rmi >/dev/null 2>&1 || true
echo "Deploy OK: ${TAGVAR}=$NEW_TAG"
