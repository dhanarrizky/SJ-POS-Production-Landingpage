// Unggah gambar statis ke SeaweedFS (S3 API) sesuai scripts/media-manifest.json.
// Key manifest = path relatif di bucket (sama persis dengan yang dipakai mediaUrl()).
//
// Pakai:  pnpm media:upload            (baca kredensial dari .env)
//         pnpm media:upload -- --dry   (hanya tampilkan yang akan diunggah)
import { readFile } from "node:fs/promises"
import { existsSync } from "node:fs"
import { extname, resolve } from "node:path"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

const REQUIRED = [
  "S3_ENDPOINT",
  "S3_BUCKET",
  "S3_ACCESS_KEY",
  "S3_SECRET_KEY",
]
const missing = REQUIRED.filter((k) => !process.env[k])
if (missing.length) {
  console.error(`Env belum diisi: ${missing.join(", ")} (lihat .env.example)`)
  process.exit(1)
}

const dry = process.argv.includes("--dry")
const prefix = (process.env.S3_PREFIX || "").replace(/^\/+|\/+$/g, "")

const CONTENT_TYPES = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".gif": "image/gif",
}

const client = new S3Client({
  endpoint: process.env.S3_ENDPOINT,
  region: process.env.S3_REGION || "us-east-1",
  forcePathStyle: true, // SeaweedFS memakai path-style
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
})

const manifest = JSON.parse(
  await readFile(new URL("./media-manifest.json", import.meta.url), "utf8"),
)

let failed = 0
for (const [relPath, localFile] of Object.entries(manifest)) {
  const file = resolve(localFile)
  const key = prefix ? `${prefix}/${relPath}` : relPath
  if (!existsSync(file)) {
    console.error(`✗ ${relPath}: file lokal tidak ada (${localFile})`)
    failed++
    continue
  }
  if (dry) {
    console.log(`• ${localFile} → s3://${process.env.S3_BUCKET}/${key}`)
    continue
  }
  try {
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: await readFile(file),
        ContentType:
          CONTENT_TYPES[extname(file).toLowerCase()] ||
          "application/octet-stream",
        CacheControl: "public, max-age=31536000, immutable",
      }),
    )
    console.log(`✓ ${key}`)
  } catch (err) {
    console.error(`✗ ${key}: ${err.message}`)
    failed++
  }
}
process.exit(failed ? 1 : 0)
