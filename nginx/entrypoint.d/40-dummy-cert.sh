#!/bin/sh
# Nginx menolak start bila file sertifikat di config tidak ada. Pada deploy
# pertama Let's Encrypt belum menerbitkan sertifikat, jadi buat self-signed
# sementara. Container certbot akan menggantinya dengan sertifikat asli.
set -e

LIVE_DIR="/etc/letsencrypt/live/${DOMAIN}"

if [ ! -f "${LIVE_DIR}/fullchain.pem" ] || [ ! -f "${LIVE_DIR}/privkey.pem" ]; then
  echo "[dummy-cert] Sertifikat untuk ${DOMAIN} belum ada, membuat self-signed sementara..."
  mkdir -p "${LIVE_DIR}"
  openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
    -keyout "${LIVE_DIR}/privkey.pem" \
    -out "${LIVE_DIR}/fullchain.pem" \
    -subj "/CN=${DOMAIN}" >/dev/null 2>&1
fi
