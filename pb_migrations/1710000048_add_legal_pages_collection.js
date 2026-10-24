/// <reference path="../pb_data/types.d.ts" />
// Halaman legal: Kebijakan Privasi (/kebijakan-privasi) dan Syarat & Ketentuan
// (/syarat-ketentuan). Satu baris per item sidebar; `doc_group` menentukan item
// itu milik halaman yang mana. `content` berisi HTML hasil editor Tiptap (/dashboard, tab Legal).
//
// PENTING: isi di bawah hanya DRAF AWAL, bukan nasihat hukum. Semua bagian
// bertanda <mark>[ISI: ...]</mark> wajib dilengkapi, dan seluruh teks harus
// ditinjau oleh pihak yang memahami hukum sebelum dipublikasikan.
//
// Catatan format: .rich-content memakai `white-space: break-spaces`, jadi HTML
// di bawah sengaja dirangkai TANPA spasi/baris baru di antara tag.
migrate(
  (app) => {
    const dao = new Dao(app)

    const legalPagesColDef = new Collection({
      id: "lgpgsnz274lgl01",
      name: "legal_pages",
      type: "base",
      system: false,
      schema: [
        // Label di sidebar
        { id: "lgname01", name: "name", type: "text", required: true },
        // Bagian URL: /<halaman>/<slug> (item pertama di grup dibuka lewat alamat dasar)
        { id: "lgslug01", name: "slug", type: "text", required: true },
        // Judul grup di sidebar: "Kebijakan Privasi" / "Syarat & Ketentuan"
        { id: "lggroup1", name: "doc_group", type: "text", required: true },
        { id: "lgsort01", name: "sort_order", type: "number" },
        { id: "lgactive", name: "active", type: "bool" },
        // Judul di atas isi (teks biasa)
        { id: "lgtitle1", name: "title", type: "text" },
        {
          id: "lgcontnt",
          name: "content",
          type: "text",
          options: { max: 500000 },
        },
        // Teks biasa, mis. "16 Oktober 2026"
        { id: "lgeffdat", name: "effective_date", type: "text" },
      ],
      indexes: [
        "CREATE UNIQUE INDEX idx_legal_pages_slug ON legal_pages (slug)",
      ],
      // Read-only untuk publik, edit lewat /dashboard (token admin)
      listRule: "",
      viewRule: "",
      createRule: null,
      updateRule: null,
      deleteRule: null,
    })
    dao.saveCollection(legalPagesColDef)

    // ---------------------------------------------------------- helper HTML
    const p = function (t) {
      return "<p>" + t + "</p>"
    }
    const h3 = function (t) {
      return "<h3>" + t + "</h3>"
    }
    const list = function (tag, items) {
      return (
        "<" +
        tag +
        ">" +
        items
          .map(function (i) {
            return "<li>" + i + "</li>"
          })
          .join("") +
        "</" +
        tag +
        ">"
      )
    }
    const ul = function (items) {
      return list("ul", items)
    }
    const ol = function (items) {
      return list("ol", items)
    }
    // Penanda bagian yang wajib dilengkapi (tampil ter-highlight di halaman)
    const isi = function (t) {
      return "<mark>[ISI: " + t + "]</mark>"
    }
    const ENTITY = isi("nama badan hukum, mis. PT/CV")
    const ADDRESS = isi("alamat resmi perusahaan")
    const PRIVACY_EMAIL = isi("email resmi untuk urusan privasi/DPO")
    const CONTACT_EMAIL = isi("email resmi perusahaan")

    const PRIV = "Kebijakan Privasi"
    const TERMS = "Syarat & Ketentuan"

    // [slug, group, name, html]
    const pages = [
      // ====================================================== KEBIJAKAN PRIVASI
      [
        "kebijakan-privasi",
        PRIV,
        "Pendahuluan & Ruang Lingkup",
        p(
          "Kebijakan Privasi ini menjelaskan bagaimana " +
            ENTITY +
            " (“Spontan Jualan”, “kami”) mengumpulkan, menggunakan, menyimpan, mengungkapkan, dan melindungi data pribadi Anda ketika Anda mengunjungi situs kami atau menggunakan layanan Spontan Jualan, termasuk aplikasi kasir (point of sale) beserta fitur pendukungnya (“Layanan”).",
        ) +
          h3("Kepada siapa kebijakan ini berlaku") +
          ul([
            "Pengunjung situs Spontan Jualan.",
            "Calon pengguna yang mendaftar, mencoba, atau menghubungi kami.",
            "Merchant, yaitu pemilik usaha yang berlangganan Layanan.",
            "Pengguna yang diundang oleh merchant, misalnya kasir dan staf.",
          ]) +
          h3("Pengendali data pribadi") +
          p(
            "Untuk data pribadi merchant dan pengunjung situs, pengendali data pribadi adalah " +
              ENTITY +
              ", beralamat di " +
              ADDRESS +
              ". Untuk data pelanggan milik merchant yang diproses melalui Layanan, merchant bertindak sebagai pengendali dan kami sebagai pemroses data (lihat bagian Syarat & Ketentuan tentang Data Merchant).",
          ) +
          h3("Persetujuan") +
          p(
            "Dengan mengakses situs atau menggunakan Layanan, Anda menyatakan telah membaca dan memahami kebijakan ini. Bila suatu pemrosesan data memerlukan persetujuan, kami akan memintanya sesuai peraturan yang berlaku, dan Anda dapat menarik persetujuan tersebut kapan saja (lihat bagian Hak Anda sebagai Subjek Data).",
          ) +
          p(
            "Kebijakan ini disusun dengan mengacu pada Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi dan peraturan terkait lainnya di Indonesia.",
          ),
      ],
      [
        "data-yang-dikumpulkan",
        PRIV,
        "Data Pribadi yang Kami Kumpulkan",
        p(
          "Jenis data yang kami kumpulkan bergantung pada cara Anda berinteraksi dengan kami.",
        ) +
          h3("1. Data akun dan identitas") +
          ul([
            "Nama, alamat email, dan nomor telepon atau WhatsApp.",
            "Kata sandi (disimpan dalam bentuk yang tidak dapat dibaca langsung).",
            "Peran Anda di dalam usaha, misalnya pemilik, kasir, atau staf.",
          ]) +
          h3("2. Data usaha") +
          ul([
            "Nama usaha, jenis usaha, alamat, dan logo.",
            "Dokumen atau nomor identitas usaha apabila diminta untuk verifikasi: " +
              isi("konfirmasi apakah NPWP/NIB diminta"),
          ]) +
          h3("3. Data transaksi dan operasional") +
          ul([
            "Daftar produk atau menu, harga, stok, dan resep yang Anda masukkan.",
            "Pesanan, riwayat transaksi, laporan penjualan, dan data shift kasir.",
          ]) +
          h3("4. Data pelanggan milik merchant") +
          p(
            "Apabila merchant menggunakan fitur yang merekam data pelanggan (misalnya nama, nomor telepon, poin loyalitas, atau pesanan), data tersebut dimasukkan oleh merchant atau pelanggannya dan diproses atas instruksi merchant.",
          ) +
          h3("5. Data pembayaran") +
          p(
            "Apabila pembayaran paket langganan diproses melalui penyedia jasa pembayaran pihak ketiga, kami menerima informasi status dan referensi pembayaran, bukan data kartu atau rekening lengkap. " +
              isi("konfirmasi mekanisme dan penyedia pembayaran"),
          ) +
          h3("6. Data teknis dan penggunaan") +
          ul([
            "Alamat IP, jenis perangkat, sistem operasi, dan jenis peramban.",
            "Halaman yang dikunjungi, situs perujuk, serta waktu dan durasi kunjungan.",
            "Pengenal pengunjung dan sesi yang kami gunakan untuk statistik kunjungan.",
            "Perkiraan lokasi (negara atau kota) yang diturunkan dari alamat IP.",
          ]) +
          h3("7. Komunikasi dengan kami") +
          p(
            "Pesan, saran, atau pertanyaan yang Anda kirim melalui formulir di situs atau saluran kontak lainnya, termasuk data yang Anda cantumkan di dalamnya.",
          ),
      ],
      [
        "cara-pengumpulan-data",
        PRIV,
        "Cara Kami Mengumpulkan Data",
        p("Kami memperoleh data pribadi melalui cara berikut:") +
          ol([
            "<strong>Diberikan langsung oleh Anda</strong>, misalnya saat mendaftar, melengkapi profil usaha, memasukkan produk dan transaksi, atau mengirim saran.",
            "<strong>Dikumpulkan otomatis</strong> melalui cookie, penyimpanan lokal peramban, dan catatan server ketika Anda menggunakan situs atau Layanan.",
            "<strong>Diberikan oleh merchant</strong>, misalnya ketika merchant mendaftarkan kasir atau staf sebagai pengguna, atau merekam data pelanggannya.",
            "<strong>Diterima dari pihak ketiga</strong> seperti penyedia pembayaran atau penyedia analitik, sebatas yang diperlukan untuk menjalankan Layanan. " +
              isi("konfirmasi pihak ketiga yang digunakan"),
          ]) +
          p(
            "Apabila data yang diperlukan tidak Anda berikan atau tidak lengkap, sebagian fitur Layanan mungkin tidak dapat kami sediakan.",
          ),
      ],
      [
        "tujuan-penggunaan-data",
        PRIV,
        "Tujuan Penggunaan Data",
        p("Kami memproses data pribadi Anda untuk tujuan berikut:") +
          ul([
            "Menyediakan, mengoperasikan, dan memelihara Layanan.",
            "Membuat, memverifikasi, dan mengelola akun Anda.",
            "Memproses langganan, pembayaran, dan penagihan.",
            "Memberikan dukungan, menjawab pertanyaan, dan menindaklanjuti saran.",
            "Menjaga keamanan, mendeteksi dan mencegah penyalahgunaan atau penipuan.",
            "Menganalisis penggunaan untuk memperbaiki dan mengembangkan produk.",
            "Mengirim informasi layanan seperti pemberitahuan perubahan, pembaruan, dan tagihan.",
            "Mengirim informasi promosi, dengan opsi untuk berhenti berlangganan kapan saja.",
            "Memenuhi kewajiban hukum dan permintaan resmi dari otoritas yang berwenang.",
          ]) +
          h3("Dasar pemrosesan") +
          p(
            "Pemrosesan dilakukan berdasarkan salah satu dasar yang diatur peraturan perundang-undangan, yaitu persetujuan Anda, pelaksanaan perjanjian dengan Anda, pemenuhan kewajiban hukum, atau kepentingan yang sah. " +
              isi("tinjau dasar pemrosesan untuk tiap tujuan bersama konsultan hukum"),
          ),
      ],
      [
        "pengungkapan-data",
        PRIV,
        "Pengungkapan & Berbagi Data",
        p(
          "Kami tidak menjual data pribadi Anda. Kami dapat membagikan data hanya dalam situasi berikut:",
        ) +
          ul([
            "<strong>Penyedia layanan</strong> yang membantu operasional kami, seperti penyedia hosting dan penyimpanan, analitik, serta komunikasi, yang terikat kewajiban kerahasiaan dan hanya boleh memakai data sesuai instruksi kami.",
            "<strong>Penyedia jasa pembayaran</strong> untuk memproses pembayaran langganan.",
            "<strong>Merchant</strong>, terbatas pada data pengguna yang berada di bawah akun usahanya.",
            "<strong>Otoritas yang berwenang</strong> apabila diwajibkan oleh hukum, putusan pengadilan, atau permintaan resmi lembaga penegak hukum.",
            "<strong>Pihak yang terlibat dalam aksi korporasi</strong> seperti penggabungan, akuisisi, atau penjualan aset, dengan pelindungan data yang setara.",
          ]) +
          h3("Transfer data ke luar wilayah Indonesia") +
          p(
            "Apabila data Anda disimpan atau diproses di server yang berada di luar Indonesia, kami akan memastikan tingkat pelindungan data yang setara atau lebih tinggi sebagaimana disyaratkan peraturan yang berlaku. " +
              isi("lokasi server dan penyedia infrastruktur"),
          ),
      ],
      [
        "penyimpanan-data",
        PRIV,
        "Penyimpanan & Retensi Data",
        p(
          "Kami menyimpan data pribadi Anda selama akun Anda aktif dan selama diperlukan untuk mencapai tujuan yang dijelaskan dalam kebijakan ini.",
        ) +
          ul([
            "Setelah akun ditutup, data akun dihapus atau dianonimkan dalam waktu " +
              isi("periode, mis. 30/90 hari") +
              ", kecuali ada kewajiban hukum untuk menyimpannya.",
            "Data transaksi yang wajib disimpan berdasarkan ketentuan perpajakan, akuntansi, atau peraturan lain disimpan selama " +
              isi("jangka waktu sesuai ketentuan") +
              ".",
            "Salinan cadangan (backup) dapat bertahan lebih lama untuk waktu terbatas sebelum tertimpa atau dihapus secara berkala.",
          ]) +
          p(
            "Data yang telah dianonimkan sehingga tidak lagi dapat mengidentifikasi Anda dapat kami gunakan untuk analisis dan statistik.",
          ),
      ],
      [
        "keamanan-data",
        PRIV,
        "Keamanan Data",
        p(
          "Kami menerapkan langkah teknis dan organisasi yang wajar untuk melindungi data pribadi dari akses, pengungkapan, perubahan, atau penghancuran yang tidak sah, antara lain:",
        ) +
          ul([
            "Pengiriman data melalui koneksi terenkripsi (HTTPS).",
            "Penyimpanan kata sandi dalam bentuk yang tidak dapat dibaca langsung.",
            "Pembatasan akses berdasarkan peran, baik untuk pengguna maupun untuk tim internal kami.",
            "Pencadangan data secara berkala.",
          ]) +
          p(
            isi(
              "daftar langkah keamanan di atas harus dikonfirmasi tim teknis sebelum dipublikasikan",
            ),
          ) +
          p(
            "Tidak ada sistem yang sepenuhnya bebas risiko. Anda turut bertanggung jawab menjaga kerahasiaan kata sandi dan perangkat yang Anda gunakan. Apabila terjadi kegagalan pelindungan data pribadi, kami akan memberitahukan pihak yang terdampak dan lembaga yang berwenang dalam jangka waktu dan dengan cara sebagaimana diatur peraturan yang berlaku.",
          ),
      ],
      [
        "cookie",
        PRIV,
        "Cookie & Teknologi Pelacakan",
        p(
          "Cookie adalah berkas kecil yang disimpan di perangkat Anda. Kami juga dapat menggunakan penyimpanan lokal peramban dan teknologi serupa.",
        ) +
          h3("Jenis yang kami gunakan") +
          ul([
            "<strong>Esensial</strong>: diperlukan agar situs dan Layanan berfungsi, misalnya menjaga Anda tetap masuk.",
            "<strong>Pengukuran</strong>: pengenal pengunjung dan sesi untuk menghitung jumlah kunjungan dan memahami halaman yang paling sering dibuka.",
            "<strong>Pihak ketiga</strong>: konten tersemat seperti video YouTube dapat menempatkan cookie milik penyedianya.",
          ]) +
          h3("Mengelola cookie") +
          p(
            "Anda dapat menghapus atau menolak cookie melalui pengaturan peramban. Menonaktifkan cookie esensial dapat membuat sebagian fitur tidak berfungsi dengan baik.",
          ),
      ],
      [
        "hak-subjek-data",
        PRIV,
        "Hak Anda sebagai Subjek Data",
        p(
          "Sesuai peraturan pelindungan data pribadi yang berlaku, Anda berhak untuk:",
        ) +
          ul([
            "Memperoleh informasi tentang identitas pengendali, dasar hukum, tujuan, dan penggunaan data pribadi Anda.",
            "Melengkapi, memperbarui, dan/atau memperbaiki data pribadi Anda.",
            "Mengakses dan memperoleh salinan data pribadi Anda.",
            "Mengakhiri pemrosesan, menghapus, dan/atau memusnahkan data pribadi Anda.",
            "Menarik kembali persetujuan pemrosesan yang pernah Anda berikan.",
            "Mengajukan keberatan atas keputusan yang diambil semata-mata berdasarkan pemrosesan otomatis.",
            "Menunda atau membatasi pemrosesan data pribadi sesuai tujuannya.",
            "Menggugat dan menerima ganti rugi atas pelanggaran pemrosesan data pribadi Anda.",
            "Memperoleh dan/atau menggunakan data pribadi Anda dalam format yang lazim digunakan dan dapat dibaca sistem elektronik, serta mengirimkannya ke pengendali lain.",
          ]) +
          h3("Cara mengajukan permintaan") +
          p(
            "Kirim permintaan Anda ke " +
              PRIVACY_EMAIL +
              " dengan mencantumkan nama, alamat email akun, dan hak yang ingin Anda gunakan. Kami dapat meminta informasi tambahan untuk memastikan identitas Anda. Kami akan menanggapi dalam jangka waktu yang ditentukan peraturan yang berlaku. " +
              isi("tetapkan SLA tanggapan sesuai UU PDP"),
          ) +
          p(
            "Hak-hak tersebut dapat dikecualikan dalam hal-hal yang diizinkan hukum, misalnya untuk kepentingan penegakan hukum atau kewajiban penyimpanan data berdasarkan peraturan.",
          ),
      ],
      [
        "data-anak",
        PRIV,
        "Data Anak",
        p(
          "Layanan Spontan Jualan ditujukan bagi pelaku usaha dan tidak ditujukan bagi anak-anak. Kami tidak dengan sengaja mengumpulkan data pribadi anak.",
        ) +
          p(
            "Apabila Anda mengetahui bahwa seorang anak telah memberikan data pribadinya kepada kami tanpa persetujuan orang tua atau wali yang sah, hubungi kami di " +
              PRIVACY_EMAIL +
              " agar data tersebut dapat kami tinjau dan hapus.",
          ),
      ],
      [
        "tautan-pihak-ketiga",
        PRIV,
        "Tautan Pihak Ketiga",
        p(
          "Situs dan Layanan kami dapat memuat tautan atau konten dari pihak ketiga, misalnya media sosial dan video tersemat. Pihak ketiga tersebut memiliki kebijakan privasi sendiri yang tidak berada di bawah kendali kami. Kami menyarankan Anda membaca kebijakan privasi mereka sebelum memberikan data pribadi.",
        ),
      ],
      [
        "perubahan-kebijakan",
        PRIV,
        "Perubahan Kebijakan",
        p(
          "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu, misalnya karena perubahan Layanan atau peraturan. Tanggal berlaku versi terbaru selalu ditampilkan di bagian atas halaman ini.",
        ) +
          p(
            "Untuk perubahan yang penting, kami akan memberi tahu Anda melalui situs, aplikasi, atau email sebelum perubahan berlaku. Dengan tetap menggunakan Layanan setelah tanggal berlaku, Anda dianggap menerima kebijakan yang telah diperbarui.",
          ),
      ],
      [
        "hubungi-kami-privasi",
        PRIV,
        "Hubungi Kami",
        p(
          "Pertanyaan, permintaan, atau pengaduan terkait data pribadi dapat disampaikan kepada:",
        ) +
          ul([
            "Nama: " + ENTITY,
            "Alamat: " + ADDRESS,
            "Email privasi/DPO: " + PRIVACY_EMAIL,
          ]) +
          p(
            "Apabila Anda merasa pengaduan Anda belum ditangani dengan baik, Anda berhak menyampaikannya kepada lembaga yang berwenang menyelenggarakan pelindungan data pribadi di Indonesia. " +
              isi("konfirmasi nama lembaga dan saluran pengaduan terkini"),
          ),
      ],

      // ===================================================== SYARAT & KETENTUAN
      [
        "syarat-ketentuan",
        TERMS,
        "Ketentuan Umum & Definisi",
        p(
          "Syarat & Ketentuan ini (“Ketentuan”) mengatur penggunaan situs dan layanan Spontan Jualan yang disediakan oleh " +
            ENTITY +
            ". Mohon baca dengan saksama sebelum mendaftar atau menggunakan Layanan.",
        ) +
          h3("Definisi") +
          ul([
            "<strong>Spontan Jualan / kami</strong>: " + ENTITY + ".",
            "<strong>Layanan</strong>: seluruh situs, aplikasi kasir (POS), dan fitur yang kami sediakan, termasuk POS F&amp;B, POS Retail, dan POS Laundry.",
            "<strong>Merchant / Anda</strong>: orang atau badan usaha yang mendaftar dan berlangganan Layanan.",
            "<strong>Pengguna</strong>: merchant dan setiap kasir atau staf yang diberi akses oleh merchant.",
            "<strong>Akun</strong>: akses pribadi ke Layanan yang dilindungi kredensial.",
            "<strong>Paket</strong>: pilihan langganan beserta fitur, durasi, dan harganya.",
            "<strong>Data Merchant</strong>: seluruh data yang dimasukkan atau dihasilkan merchant melalui Layanan, termasuk data produk, transaksi, dan pelanggan merchant.",
          ]),
      ],
      [
        "penerimaan-akun",
        TERMS,
        "Penerimaan & Akun",
        p(
          "Dengan mendaftar atau menggunakan Layanan, Anda menyatakan menyetujui Ketentuan ini dan Kebijakan Privasi kami. Jika Anda tidak setuju, mohon tidak menggunakan Layanan.",
        ) +
          ul([
            "Anda harus cakap menurut hukum untuk membuat perjanjian. Bila mendaftar atas nama badan usaha, Anda menyatakan berwenang mewakili badan usaha tersebut.",
            "Informasi yang Anda berikan saat pendaftaran harus benar, lengkap, dan selalu diperbarui.",
            "Anda bertanggung jawab menjaga kerahasiaan kata sandi dan seluruh aktivitas yang terjadi melalui Akun Anda, termasuk aktivitas kasir dan staf yang Anda beri akses.",
            "Segera beri tahu kami bila Anda mengetahui adanya penggunaan Akun tanpa izin.",
          ]),
      ],
      [
        "layanan-paket",
        TERMS,
        "Layanan & Paket Langganan",
        p(
          "Spontan Jualan menyediakan sistem pengelolaan usaha seperti pencatatan transaksi, pengelolaan produk dan stok, pesanan, serta laporan usaha. Fitur dan batasan setiap Paket ditampilkan pada halaman harga di situs kami.",
        ) +
          ul([
            "Kami terus mengembangkan Layanan. Fitur dapat ditambah, diubah, atau dihentikan, dan kami berusaha memberi tahu sebelumnya untuk perubahan yang berdampak besar.",
            "Fitur dengan label “unlimited” tunduk pada penggunaan yang wajar (fair use) dan tidak boleh disalahgunakan untuk membebani sistem secara tidak wajar. " +
              isi("tetapkan batas penggunaan wajar"),
            "Layanan memerlukan koneksi internet dan perangkat yang kompatibel, yang merupakan tanggung jawab Anda.",
          ]),
      ],
      [
        "pembayaran-masa-gratis",
        TERMS,
        "Pembayaran, Masa Gratis & Early Partner",
        h3("Pembayaran") +
          ul([
            "Paket harus dibayar lunas di awal periode langganan.",
            "Harga bulanan yang ditampilkan di situs adalah harga Paket dibagi durasi Paket, hanya untuk memudahkan perbandingan.",
            "Harga dalam Rupiah dan " +
              isi("sudah/belum termasuk PPN dan biaya lain") +
              ".",
            "Metode pembayaran yang tersedia: " + isi("daftar metode pembayaran") + ".",
            "Perpanjangan langganan: " +
              isi("otomatis atau manual, serta pemberitahuan sebelum perpanjangan") +
              ".",
          ]) +
          h3("Masa gratis dan program Early Partner") +
          p(
            "Kami dapat menawarkan masa gratis atau program khusus bagi mitra awal (Early Partner). Syarat program, termasuk durasi, kuota, dan apa yang terjadi saat program berakhir, mengikuti ketentuan yang diumumkan di situs atau disepakati secara tertulis. " +
              isi("rincian durasi, kuota, dan mekanisme setelah masa gratis berakhir"),
          ) +
          h3("Pengembalian dana") +
          p(isi("kebijakan refund dan pembatalan, termasuk pro-rata bila ada")),
      ],
      [
        "kewajiban-larangan",
        TERMS,
        "Kewajiban & Larangan Pengguna",
        p("Anda setuju menggunakan Layanan hanya untuk tujuan yang sah. Anda dilarang untuk:") +
          ul([
            "Melanggar hukum atau hak pihak lain, termasuk menjual barang atau jasa yang dilarang.",
            "Mengakses akun, sistem, atau data yang bukan milik Anda tanpa izin.",
            "Mencoba menembus, menguji kerentanan, atau mengganggu keamanan dan kinerja Layanan.",
            "Melakukan rekayasa balik (reverse engineering), menyalin, atau menjual kembali Layanan tanpa izin tertulis.",
            "Menggunakan bot, scraping, atau cara otomatis lain untuk mengambil data dari Layanan.",
            "Membagikan akun melebihi jumlah pengguna yang diizinkan pada Paket Anda.",
            "Memasukkan konten yang melanggar hukum, menyesatkan, atau mengandung perangkat lunak berbahaya.",
            "Menggunakan Layanan untuk pencucian uang, penipuan, atau pendanaan kegiatan ilegal.",
          ]) +
          p(
            "Pelanggaran dapat mengakibatkan penangguhan atau penghentian akses sebagaimana diatur pada bagian Penangguhan & Pengakhiran.",
          ),
      ],
      [
        "data-merchant",
        TERMS,
        "Data Merchant & Pelanggan Merchant",
        ul([
          "Data Merchant tetap menjadi milik merchant. Merchant memberi kami hak terbatas untuk menyimpan dan memproses data tersebut semata-mata untuk menyediakan Layanan.",
          "Terhadap data pribadi pelanggan atau karyawan yang dimasukkan merchant, merchant bertindak sebagai pengendali data pribadi, dan kami sebagai pemroses yang bertindak atas instruksi merchant.",
          "Merchant bertanggung jawab memastikan memiliki dasar hukum yang sah, termasuk persetujuan bila diperlukan, serta memberi tahu pelanggannya tentang pemrosesan data.",
          "Kami memproses data pribadi sesuai Kebijakan Privasi dan tidak menggunakan Data Merchant untuk tujuan lain tanpa dasar yang sah.",
          "Setelah langganan berakhir, merchant dapat meminta ekspor data dalam jangka waktu " +
            isi("periode ekspor/penyimpanan data") +
            " sebelum data dihapus.",
        ]),
      ],
      [
        "kekayaan-intelektual",
        TERMS,
        "Hak Kekayaan Intelektual",
        ul([
          "Layanan, termasuk perangkat lunak, desain, merek, logo, dan konten buatan kami, dilindungi hak kekayaan intelektual dan tetap menjadi milik kami atau pemberi lisensi kami.",
          "Selama langganan aktif, kami memberi Anda lisensi terbatas, non-eksklusif, tidak dapat dialihkan, dan dapat dicabut untuk menggunakan Layanan sesuai Ketentuan ini.",
          "Konten dan data yang Anda masukkan tetap menjadi milik Anda. Anda memberi kami lisensi terbatas untuk menyimpan dan menampilkannya agar Layanan dapat berjalan.",
          "Masukan atau saran yang Anda berikan dapat kami gunakan untuk memperbaiki Layanan tanpa kewajiban kompensasi kepada Anda.",
        ]),
      ],
      [
        "batasan-tanggung-jawab",
        TERMS,
        "Ketersediaan Layanan & Batasan Tanggung Jawab",
        ul([
          "Kami berupaya menjaga Layanan tetap tersedia, namun tidak menjamin Layanan bebas dari gangguan, kesalahan, atau pemeliharaan. Pemeliharaan terjadwal akan diinformasikan bila memungkinkan.",
          "Layanan disediakan sebagaimana adanya, sebatas yang diizinkan hukum.",
          "Kami tidak bertanggung jawab atas kerugian tidak langsung, kehilangan keuntungan, atau kehilangan data yang timbul dari faktor di luar kendali wajar kami, misalnya gangguan internet, listrik, penyedia pihak ketiga, atau keadaan memaksa (force majeure).",
          "Dalam batas yang diizinkan hukum, total tanggung jawab kami kepada Anda dibatasi sebesar " +
            isi("batas tanggung jawab, mis. biaya langganan 12 bulan terakhir") +
            ".",
          "Ketentuan ini tidak mengecualikan tanggung jawab yang menurut hukum tidak dapat dikecualikan, termasuk hak konsumen berdasarkan peraturan perlindungan konsumen.",
          "Anda bertanggung jawab melakukan pencadangan data penting dan memeriksa keakuratan laporan sebelum digunakan untuk keputusan usaha atau keperluan pajak.",
        ]),
      ],
      [
        "penangguhan-pengakhiran",
        TERMS,
        "Penangguhan & Pengakhiran",
        ul([
          "Anda dapat berhenti menggunakan Layanan kapan saja. Pengembalian dana mengikuti kebijakan pada bagian Pembayaran.",
          "Kami dapat menangguhkan atau mengakhiri akses Anda, dengan pemberitahuan bila memungkinkan, apabila Anda melanggar Ketentuan, menggunakan Layanan secara melawan hukum, tidak membayar tagihan, atau diwajibkan oleh hukum.",
          "Setelah akses berakhir, Anda tidak dapat lagi menggunakan Layanan dan data diperlakukan sesuai bagian Data Merchant serta Kebijakan Privasi.",
          "Ketentuan yang secara sifatnya tetap berlaku setelah pengakhiran, seperti kekayaan intelektual, batasan tanggung jawab, dan penyelesaian sengketa, tetap mengikat.",
        ]),
      ],
      [
        "perubahan-syarat",
        TERMS,
        "Perubahan Syarat",
        p(
          "Kami dapat mengubah Ketentuan ini dari waktu ke waktu. Tanggal berlaku versi terbaru ditampilkan di bagian atas halaman ini. Untuk perubahan penting, kami akan memberi tahu Anda melalui situs, aplikasi, atau email sebelum perubahan berlaku.",
        ) +
          p(
            "Dengan tetap menggunakan Layanan setelah perubahan berlaku, Anda dianggap menerima Ketentuan yang diperbarui. Jika Anda tidak setuju, Anda dapat berhenti menggunakan Layanan.",
          ),
      ],
      [
        "hukum-sengketa",
        TERMS,
        "Hukum yang Berlaku & Penyelesaian Sengketa",
        p("Ketentuan ini tunduk pada hukum Republik Indonesia.") +
          p(
            "Setiap perselisihan akan diupayakan diselesaikan terlebih dahulu secara musyawarah untuk mufakat. Apabila tidak tercapai kesepakatan, perselisihan diselesaikan melalui " +
              isi(
                "forum penyelesaian sengketa, mis. Pengadilan Negeri di kota domisili perusahaan atau BANI",
              ) +
              ".",
          ),
      ],
      [
        "hubungi-kami-syarat",
        TERMS,
        "Hubungi Kami",
        p("Pertanyaan tentang Ketentuan ini dapat disampaikan kepada:") +
          ul([
            "Nama: " + ENTITY,
            "Alamat: " + ADDRESS,
            "Email: " + CONTACT_EMAIL,
          ]),
      ],
    ]

    try {
      const col = dao.findCollectionByNameOrId("legal_pages")
      pages.forEach(function (pg, i) {
        const record = new Record(col)
        record.set("slug", pg[0])
        record.set("doc_group", pg[1])
        record.set("name", pg[2])
        record.set("title", pg[2])
        record.set("content", pg[3])
        record.set("sort_order", i + 1)
        record.set("active", true)
        record.set("effective_date", "[ISI: tanggal efektif]")
        dao.saveRecord(record)
      })
    } catch (e) {
      console.log("Note: Could not seed legal_pages:", e)
    }
  },
  (app) => {
    const dao = new Dao(app)
    const col = dao.findCollectionByNameOrId("legal_pages")
    dao.deleteCollection(col)
  },
)
