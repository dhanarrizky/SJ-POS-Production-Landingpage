#!/bin/sh
# Reload Nginx otomatis setiap kali certbot menerbitkan / memperpanjang
# sertifikat (dicek tiap 60 detik), tanpa perlu akses docker socket.

CERT="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"

(
  last=$(md5sum "${CERT}" 2>/dev/null | cut -d' ' -f1)
  while :; do
    sleep 60
    current=$(md5sum "${CERT}" 2>/dev/null | cut -d' ' -f1)
    if [ -n "${current}" ] && [ -n "${last}" ] && [ "${current}" != "${last}" ]; then
      echo "[cert-watch] Sertifikat berubah, reload nginx..."
      nginx -s reload
    fi
    [ -n "${current}" ] && last="${current}"
  done
) &
