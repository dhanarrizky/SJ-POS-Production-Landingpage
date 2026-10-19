# Deployment — landing page

Dua container di `DEPLOY_PATH/landing` (`deploy/docker-compose.yml`), tanpa port host:
- `landing` — PocketBase + React statis (:8080), image `ghcr.io/<owner>/landing-page` hasil CI.
- `landing-web` — nginx milik landing (:8081), config dari `deploy/nginx/templates`. Menangani `/media/`
  (-> SeaweedFS), realtime SSE, dan upload. nginx INFRA mem-proxy `spontanjualan.id` dan `www` ke sini.

TLS/certbot tidak dipakai di sini (TLS ada di nginx INFRA). `docker-compose.yml` dan `nginx/` di root
repo adalah setup lama dan tidak dipakai produksi.

## GitHub (environment `production`)
- Secrets: `SSH_HOST`, `SSH_PORT`, `SSH_USER`, `SSH_PRIVATE_KEY`, `SSH_KNOWN_HOSTS`, **`ENV_FILE`**
  (isi `.env` server: `GHCR_OWNER`, `STORAGE_BUCKET`; template `deploy/.env.example`, nilai di
  `secret/LANDINGPAGE/.env`. Ditulis workflow ke `DEPLOY_PATH/landing/.env`; `LANDING_TAG` diatur CI.)
- Variables: `DEPLOY_PATH`, `DOMAIN`, `VITE_POCKETBASE_URL` (kosong = origin sendiri),
  `VITE_MEDIA_BASE_URL` (`https://storage.spontanjualan.id/pos-bucket`)

## Rollback manual
```bash
cd $DEPLOY_PATH/landing
sed -i 's|^LANDING_TAG=.*|LANDING_TAG=sha-xxxxxxx|' .env
docker compose up -d
```
Data PocketBase ada di volume `landing_pb_data` — jangan `down -v`.

## Log
`cd $DEPLOY_PATH/landing && docker compose logs -f landing landing-web`

## Storage bersama (BE, FE, landing)
Bucket SeaweedFS yang sama, `pos-bucket`, URL publik `https://storage.spontanjualan.id/pos-bucket`
(= `STORAGE_PUBLIC_URL` di BE; FE menerima URL itu dari API).
- Set `VITE_MEDIA_BASE_URL` ke URL itu agar gambar dimuat langsung; `/media/` di `landing-web` tetap ada
  sebagai alternatif dan menunjuk bucket yang sama.
- `npm run media:upload` dan S3 PocketBase harus memakai endpoint `http://storage:8333` (dari dalam
  Docker), bucket `pos-bucket`, dan access key yang sama dengan BE. Jaga agar prefix key tidak bertabrakan.

`deploy/` dan `DEPLOYMENT.md` dikecualikan dari `sync-config.sh`.
