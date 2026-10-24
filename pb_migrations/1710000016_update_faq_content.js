/// <reference path="../pb_data/types.d.ts" />
// Replaces the old FAQ set with the 7 questions shown in the new wireframe.
// Answers are a first draft matching the app's existing tone/facts (F&B
// focus, 3-step onboarding, etc.) - editable anytime via the PocketBase
// Admin UI once the real copy is confirmed.
migrate(
  (app) => {
    const dao = new Dao(app)
    const faqsCol = dao.findCollectionByNameOrId("faqs")

    dao.findRecordsByFilter("faqs", "1=1", "", 100, 0).forEach((r) => {
      dao.deleteRecord(r)
    })

    const newFaqs = [
      {
        question: "Apa saja yang bisa dilakukan dengan Spontan Jualan?",
        answer:
          "Spontan Jualan membantu Anda mengelola kasir, transaksi, pesanan, hingga operasional usaha sehari-hari dalam satu sistem.\n\nMulai dari pencatatan penjualan, pengelolaan stok, hingga pemantauan laporan usaha, semuanya dirancang agar lebih sederhana dan tidak merepotkan.",
      },
      {
        question: "Bagaimana cara mulai menggunakan Spontan Jualan?",
        answer:
          "Anda cukup mendaftar akun, melengkapi data dasar usaha, lalu melakukan verifikasi agar akun siap digunakan.\n\nSetelah proses ini selesai, Anda bisa langsung mengelola produk, transaksi, dan kebutuhan usaha lainnya melalui Spontan Jualan.",
      },
      {
        question:
          "Produk atau jenis usaha apa saja yang dapat menggunakan Spontan Jualan?",
        answer:
          "Saat ini Spontan Jualan berfokus pada POS F&B untuk usaha kuliner seperti restoran, warung makan, dan coffee shop.\n\nProduk untuk jenis usaha lain seperti POS Retail dan POS Laundry juga tersedia, dan akan terus dikembangkan lebih lanjut.",
      },
      {
        question:
          "Bagaimana cara mengelola produk, menu, harga, dan stok di Spontan Jualan?",
        answer:
          "Anda dapat menambah dan mengatur menu atau produk, mengubah harga, serta memantau stok langsung dari sistem.\n\nSetiap perubahan stok akibat transaksi akan tercatat secara otomatis sehingga data usaha Anda tetap akurat.",
      },
      {
        question: "Apakah transaksi dan riwayat penjualan dapat tercatat di sistem?",
        answer:
          "Ya. Setiap transaksi yang terjadi akan otomatis tercatat lengkap dengan waktu, detail pesanan, dan nominal pembayaran.\n\nAnda bisa melihat riwayat transaksi kapan saja untuk membantu memantau performa usaha.",
      },
      {
        question:
          "Apakah Spontan Jualan dapat digunakan oleh lebih dari satu pengguna atau karyawan?",
        answer:
          "Bisa. Spontan Jualan mendukung penggunaan oleh lebih dari satu pengguna, sehingga pemilik usaha dan karyawan dapat mengakses sistem sesuai kebutuhan operasional.\n\nPengaturan akses untuk masing-masing pengguna akan terus disempurnakan mengikuti perkembangan produk.",
      },
      {
        question: "Apakah data usaha dan transaksi saya aman di Spontan Jualan?",
        answer:
          "Kami memahami bahwa data usaha dan transaksi Anda adalah hal yang penting.\n\nSpontan Jualan dirancang dengan memperhatikan keamanan data, dan kami terus melakukan pengembangan untuk menjaga keandalan serta keamanan sistem.",
      },
    ]

    newFaqs.forEach((faq, i) => {
      const record = new Record(faqsCol)
      record.set("question", faq.question)
      record.set("answer", faq.answer)
      record.set("sort_order", i + 1)
      record.set("active", true)
      dao.saveRecord(record)
    })
  },
  (app) => {
    const dao = new Dao(app)
    const faqsCol = dao.findCollectionByNameOrId("faqs")

    dao.findRecordsByFilter("faqs", "1=1", "", 100, 0).forEach((r) => {
      dao.deleteRecord(r)
    })

    const oldFaqs = [
      {
        question: "Apakah Spontan Jualan benar-benar gratis?",
        answer:
          "Ya. Setiap mitra baru mendapatkan akses gratis selama 6 bulan pertama. Tidak perlu kartu kredit untuk memulai.\n\nSetelah periode gratis berakhir, akan berlaku ketentuan paket atau harga langganan yang tersedia pada saat itu. Anda dapat mengevaluasi penggunaan sebelum melanjutkan.",
        sort_order: 1,
      },
      {
        question: "Apakah data usaha saya aman?",
        answer:
          "Kami memahami bahwa data transaksi dan informasi usaha merupakan bagian penting dari bisnis Anda.\n\nSpontan Jualan dirancang dengan memperhatikan keamanan dan pengelolaan data secara bertanggung jawab. Kami terus melakukan pengembangan dan peningkatan sistem untuk menjaga keamanan serta keandalan platform.",
        sort_order: 2,
      },
      {
        question: "Bagaimana cara menggunakan Spontan Jualan?",
        answer:
          "Anda dapat mengakses Spontan Jualan melalui web atau menggunakan aplikasi mobile.\n\nCukup daftar, pilih produk yang sesuai dengan jenis usaha Anda, lakukan setup awal, dan mulai gunakan.",
        sort_order: 3,
      },
      {
        question: "Apa yang terjadi setelah 6 bulan gratis?",
        answer:
          "Setelah periode gratis berakhir, penggunaan akan mengikuti paket dan ketentuan langganan yang berlaku pada saat itu.\n\nKami akan memberikan informasi yang jelas mengenai ketentuan tersebut sehingga Anda dapat menentukan apakah ingin melanjutkan penggunaan.",
        sort_order: 4,
      },
      {
        question: "Bagaimana cara mendapatkan benefit 100 Mitra Pertama?",
        answer:
          "Program Early Partner tersedia khusus untuk 100 mitra pertama yang bergabung dan memenuhi ketentuan program.\n\nMitra yang masuk dalam kuota tersebut akan mendapatkan status Business Partner Pengembang dan akses ke fitur premium tertentu secara lifetime free, sesuai ketentuan program.\n\nJangan tunggu sampai kuotanya penuh.",
        sort_order: 5,
      },
    ]

    oldFaqs.forEach((faq) => {
      const record = new Record(faqsCol)
      record.set("question", faq.question)
      record.set("answer", faq.answer)
      record.set("sort_order", faq.sort_order)
      record.set("active", true)
      dao.saveRecord(record)
    })
  },
)
