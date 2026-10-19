// Gambar halaman detail fitur bersifat STATIS (bukan dari CMS).
// Gambar disimpan di SeaweedFS (bukan di repo). Untuk mengganti gambar sebuah
// fitur: unggah file ke bucket (tambahkan di scripts/media-manifest.json lalu
// `pnpm media:upload`), kemudian daftarkan PATH RELATIF-nya di `featureImages`
// dengan slug fitur sebagai kunci. Fitur tanpa entri menampilkan placeholder.
//
// Contoh:
//   const featureImages = {
//     kasir: {
//       hero: mediaUrl("detail-fitur/kasir-hero.png"),
//       screenshot: mediaUrl("detail-fitur/kasir-screenshot.png"),
//     },
//   }

export interface FeatureImages {
  /** Gambar utama di hero (514x311) */
  hero?: string
  /** Screenshot di bawah isi konten (594x377) */
  screenshot?: string
}

const featureImages: Record<string, FeatureImages> = {}

export function getFeatureImages(slug?: string): FeatureImages {
  return (slug && featureImages[slug]) || {}
}
