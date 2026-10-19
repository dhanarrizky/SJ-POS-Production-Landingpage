#!/bin/sh
# Container certbot: terbitkan sertifikat Let's Encrypt saat pertama kali,
# lalu cek perpanjangan setiap 12 jam. Nginx me-reload sendiri saat
# sertifikat berubah (lihat entrypoint.d/50-reload-on-cert-change.sh).

trap exit TERM

WEBROOT=/var/www/certbot

domain_args="-d ${DOMAIN}"
for d in ${EXTRA_DOMAINS}; do
  domain_args="${domain_args} -d ${d}"
done

if [ -n "${CERTBOT_EMAIL}" ]; then
  email_args="--email ${CERTBOT_EMAIL}"
else
  email_args="--register-unsafely-without-email"
fi

staging_args=""
if [ "${CERTBOT_STAGING}" = "1" ]; then
  staging_args="--staging"
fi

# Beri waktu nginx start dan siap melayani ACME challenge di port 80
sleep 15

while :; do
  if [ ! -f "/etc/letsencrypt/renewal/${DOMAIN}.conf" ]; then
    echo "[certbot] Menerbitkan sertifikat untuk: ${DOMAIN} ${EXTRA_DOMAINS}"
    # Hapus sertifikat self-signed sementara buatan nginx agar certbot bisa
    # menulis ke folder live/ yang sama. Nginx tetap jalan karena sertifikat
    # lama sudah termuat di memori.
    rm -rf "/etc/letsencrypt/live/${DOMAIN}"

    # shellcheck disable=SC2086
    if certbot certonly --webroot -w "${WEBROOT}" \
        --cert-name "${DOMAIN}" ${domain_args} \
        ${email_args} ${staging_args} \
        --agree-tos --no-eff-email --non-interactive; then
      echo "[certbot] Sertifikat berhasil diterbitkan."
    else
      echo "[certbot] GAGAL. Pastikan DNS sudah mengarah ke server ini dan port 80 terbuka. Coba lagi dalam 1 jam."
      sleep 1h & wait $!
      continue
    fi
  else
    certbot renew --webroot -w "${WEBROOT}" --quiet
  fi

  sleep 12h & wait $!
done
