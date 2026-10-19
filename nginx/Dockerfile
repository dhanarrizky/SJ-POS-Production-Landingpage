FROM nginx:1.27-alpine

# openssl dipakai untuk membuat sertifikat sementara (self-signed) saat
# sertifikat Let's Encrypt belum ada, supaya Nginx tetap bisa start.
RUN apk add --no-cache openssl

COPY templates/ /etc/nginx/templates/
COPY entrypoint.d/ /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/*.sh
