/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)

    const updateProductDetails = (slug, newSpecs, newMarkdownDesc) => {
      try {
        const record = dao.findFirstRecordByFilter(
          "products",
          `slug = "${slug}"`,
        )
        if (record) {
          record.set("specs", newSpecs)
          record.set("detail_desc", newMarkdownDesc)
          dao.saveRecord(record)
          console.log(
            `Successfully updated PocketBase product details for: ${slug}`,
          )
        }
      } catch (e) {
        console.log(`Failed to update product details for ${slug}:`, e)
      }
    }

    // 1. Retail
    const retailSpecs = {
      subtitle: "Kasir pintar untuk toko yang terus bergerak.",
      benefit:
        "Tidak perlu lagi menebak stok atau mencari catatan transaksi lama. Semua aktivitas penjualan tercatat lebih rapi.",
      paket: "Basic (Keseluruhan)",
      produk_limit: "Tanpa Batas (Unlimited)",
      transaksi_limit: "Tanpa Batas (Unlimited)",
      kasir_limit: "Tanpa Batas (Unlimited)",
      super_admin:
        "Khusus Internal Spontan Jualan (Tidak Dijual / Internal Only)",
      paket_lain: "Direncanakan untuk masa depan",
    }
    const retailDesc = `# POS Retail

Kasir pintar untuk toko yang terus bergerak.

Cocok untuk toko kelontong, minimarket, butik, toko retail, dan berbagai usaha penjualan barang.

### Fitur Utama
- **Kasir dan pencatatan transaksi**: Layani pelanggan dengan cepat dan efisien.
- **Manajemen produk**: Atur varian, harga, dan kategori produk.
- **Stok Real-time**: Monitoring stok masuk dan keluar secara otomatis.
- **Nota Digital**: Kirim struk pembelian langsung ke WhatsApp pelanggan.

### Spesifikasi Paket & Lisensi
- **Tipe Paket**: Saat ini semua merchant menggunakan paket **Basic** secara keseluruhan.
- **Batas Kapasitas**: Semua kapasitas (produk, transaksi, kasir aktif) diset **Unlimited (Tanpa Batas)** untuk sekarang.
- **Akses Super Admin**: Layar Super Admin terpusat didelegasikan khusus untuk tim internal Spontan Jualan guna mengelola ekosistem platform, memantau kesehatan server, dan pemecahan masalah tenant. Akses Super Admin **tidak diperjualbelikan** untuk tenant mandiri.
- **Paket Masa Depan**: Skema paket Pro atau Enterprise dengan limitasi spesifik direncanakan menyusul untuk pengembangan berikutnya.`

    updateProductDetails("pos-retail", retailSpecs, retailDesc)

    // 2. F&B
    const fnbSpecs = {
      subtitle: "Pesanan lebih rapi, pelayanan lebih cepat.",
      benefit:
        "Kurangi risiko pesanan tertukar dan buat alur pelayanan dari pelanggan hingga pembayaran menjadi lebih terorganisir.",
      paket: "Basic (Keseluruhan)",
      produk_limit: "Tanpa Batas (Unlimited)",
      transaksi_limit: "Tanpa Batas (Unlimited)",
      kasir_limit: "Tanpa Batas (Unlimited)",
      super_admin:
        "Khusus Internal Spontan Jualan (Tidak Dijual / Internal Only)",
      paket_lain: "Direncanakan untuk masa depan",
    }
    const fnbDesc = `# POS F&B

Pesanan lebih rapi, pelayanan lebih cepat.

Dibuat untuk restoran, warung makan, coffee shop, kedai, dan bisnis F&B lainnya.

### Fitur Utama
- **Manajemen Menu**: Atur menu makanan, minuman, dan tambahan varian.
- **Pencatatan Pesanan**: Catat pesanan per meja langsung dari tablet/HP pramusa ji.
- **Manajemen Meja**: Lacak status meja kosong, isi, atau sedang menunggu makanan.
- **Alur Kerja Dapur**: Teruskan pesanan langsung ke layar dapur secara real-time.

### Spesifikasi Paket & Lisensi
- **Tipe Paket**: Saat ini semua merchant menggunakan paket **Basic** secara keseluruhan.
- **Batas Kapasitas**: Semua kapasitas (produk, transaksi, kasir aktif) diset **Unlimited (Tanpa Batas)** untuk sekarang.
- **Akses Super Admin**: Layar Super Admin terpusat didelegasikan khusus untuk tim internal Spontan Jualan guna mengelola ekosistem platform, memantau kesehatan server, dan pemecahan masalah tenant. Akses Super Admin **tidak diperjualbelikan** untuk tenant mandiri.
- **Paket Masa Depan**: Skema paket Pro atau Enterprise dengan limitasi spesifik direncanakan menyusul untuk pengembangan berikutnya.`

    updateProductDetails("pos-fnb", fnbSpecs, fnbDesc)

    // 3. Laundry
    const laundrySpecs = {
      subtitle: "Tahu cucian ada di mana, tahu kapan harus selesai.",
      benefit:
        "Tidak perlu lagi membuka catatan satu per satu untuk mengetahui status cucian pelanggan.",
      paket: "Basic (Keseluruhan)",
      produk_limit: "Tanpa Batas (Unlimited)",
      transaksi_limit: "Tanpa Batas (Unlimited)",
      kasir_limit: "Tanpa Batas (Unlimited)",
      super_admin:
        "Khusus Internal Spontan Jualan (Tidak Dijual / Internal Only)",
      paket_lain: "Direncanakan untuk masa depan",
    }
    const laundryDesc = `# POS Laundry

Tahu cucian ada di mana, tahu kapan harus selesai.

Dirancang untuk usaha laundry kiloan maupun satuan.

### Fitur Utama
- **Order Laundry**: Catat berat cucian (kiloan) atau jumlah pakaian (satuan).
- **Status Cucian**: Lacak cucian mulai dari antrean, cuci, kering, setrika, packing, hingga siap ambil.
- **Riwayat Pelanggan**: Simpan data pelanggan setia untuk mempercepat pembuatan order baru.
- **WhatsApp Notifikasi**: Kirim pesan otomatis saat laundry siap diambil.

### Spesifikasi Paket & Lisensi
- **Tipe Paket**: Saat ini semua merchant menggunakan paket **Basic** secara keseluruhan.
- **Batas Kapasitas**: Semua kapasitas (produk, transaksi, kasir aktif) diset **Unlimited (Tanpa Batas)** untuk sekarang.
- **Akses Super Admin**: Layar Super Admin terpusat didelegasikan khusus untuk tim internal Spontan Jualan guna mengelola ekosistem platform, memantau kesehatan server, dan pemecahan masalah tenant. Akses Super Admin **tidak diperjualbelikan** untuk tenant mandiri.
- **Paket Masa Depan**: Skema paket Pro atau Enterprise dengan limitasi spesifik direncanakan menyusul untuk pengembangan berikutnya.`

    updateProductDetails("pos-laundry", laundrySpecs, laundryDesc)
  },
  (app) => {
    // Optional down migration
  },
)
