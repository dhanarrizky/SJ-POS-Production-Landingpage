# Deployment — landing page

Image (PocketBase + React statis) dibangun CI, di-push ke `ghcr.io/<owner>/landing-page`, lalu dijalankan
sebagai service `landing` pada `deploy/docker-compose.yml` repo ini (di `DEPLOY_PATH/landing`). nginx di repo INFRA mem-proxy
`spontanjualan.id` dan `www` ke container ini. `docker-compose.yml` dan `nginx/` di repo ini hanya untuk
pemakaian lama/lokal; produksi tidak memakainya (TLS dari Cloudflare Origin Certificate).

## GitHub (environment `production`)
- Server: `DEPLOY_PATH/landing/.env` dibuat manual dari `deploy/.env.example`.
- Secrets: `SSH_HOST`, `SSH_PORT`, `SSH_USER`, `SSH_PRIVATE_KEY`, `SSH_KNOWN_HOSTS`
- Variables: `DEPLOY_PATH`, `DOMAIN`, `VITE_POCKETBASE_URL` (kosong = origin sendiri),
  `VITE_MEDIA_BASE_URL` (`/media`)

## Rollback manual
```bash
cd $DEPLOY_PATH/landing
sed -i 's|^LANDING_TAG=.*|LANDING_TAG=sha-xxxxxxx|' .env
docker compose up -d landing
```
Data PocketBase ada di volume `landing_pb_data` — jangan `down -v`.

## Log
`docker compose logs -f landing`
