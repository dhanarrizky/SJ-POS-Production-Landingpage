/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const dao = new Dao(app)

    // 1. Create FAQs Collection
    const faqsColDef = new Collection({
      id: "faqscolldef0001",
      name: "faqs",
      type: "base",
      system: false,
      schema: [
        { id: "faqq0001", name: "question", type: "text", required: true },
        { id: "faqa0001", name: "answer", type: "text", required: true },
        { id: "faqs0001", name: "sort_order", type: "number" },
        { id: "faqb0001", name: "active", type: "bool" },
      ],
      listRule: "",
      viewRule: "",
      createRule: null,
      updateRule: null,
      deleteRule: null,
    })
    dao.saveCollection(faqsColDef)

    // 2. Create Team Members Collection
    const teamMembersColDef = new Collection({
      id: "teammembcol0001",
      name: "team_members",
      type: "base",
      system: false,
      schema: [
        { id: "tmn00001", name: "name", type: "text", required: true },
        { id: "tmr00001", name: "role", type: "text", required: true },
        { id: "tmi00001", name: "initial", type: "text" },
        { id: "tmc00001", name: "color", type: "text" },
        { id: "tms00001", name: "sort_order", type: "number" },
      ],
      listRule: "",
      viewRule: "",
      createRule: null,
      updateRule: null,
      deleteRule: null,
    })
    dao.saveCollection(teamMembersColDef)

    // Helper to populate record
    const populateRecord = (rec, data) => {
      Object.keys(data).forEach((key) => {
        rec.set(key, data[key])
      })
    }

    // 3. Seed FAQs
    const faqsCol = dao.findCollectionByNameOrId("faqs")

    const faqData = [
      {
        question: "Apakah Spontan Jualan benar-benar gratis?",
        answer:
          "Ya. Setiap mitra baru mendapatkan akses gratis selama 6 bulan pertama. Tidak perlu kartu kredit untuk memulai.\n\nSetelah periode gratis berakhir, akan berlaku ketentuan paket atau harga langganan yang tersedia pada saat itu. Anda dapat mengevaluasi penggunaan sebelum melanjutkan.",
        sort_order: 1,
        active: true,
      },
      {
        question: "Apakah data usaha saya aman?",
        answer:
          "Kami memahami bahwa data transaksi dan informasi usaha merupakan bagian penting dari bisnis Anda.\n\nSpontan Jualan dirancang dengan memperhatikan keamanan dan pengelolaan data secara bertanggung jawab. Kami terus melakukan pengembangan dan peningkatan sistem untuk menjaga keamanan serta keandalan platform.",
        sort_order: 2,
        active: true,
      },
      {
        question: "Bagaimana cara menggunakan Spontan Jualan?",
        answer:
          "Anda dapat mengakses Spontan Jualan melalui web atau menggunakan aplikasi mobile.\n\nCukup daftar, pilih produk yang sesuai dengan jenis usaha Anda, lakukan setup awal, dan mulai gunakan.",
        sort_order: 3,
        active: true,
      },
      {
        question: "Apa yang terjadi setelah 6 bulan gratis?",
        answer:
          "Setelah periode gratis berakhir, penggunaan akan mengikuti paket dan ketentuan langganan yang berlaku pada saat itu.\n\nKami akan memberikan informasi yang jelas mengenai ketentuan tersebut sehingga Anda dapat menentukan apakah ingin melanjutkan penggunaan.",
        sort_order: 4,
        active: true,
      },
      {
        question: "Bagaimana cara mendapatkan benefit 100 Mitra Pertama?",
        answer:
          "Program Early Partner tersedia khusus untuk 100 mitra pertama yang bergabung dan memenuhi ketentuan program.\n\nMitra yang masuk dalam kuota tersebut akan mendapatkan status Business Partner Pengembang dan akses ke fitur premium tertentu secara lifetime free, sesuai ketentuan program.\n\nJangan tunggu sampai kuotanya penuh.",
        sort_order: 5,
        active: true,
      },
    ]

    faqData.forEach((data) => {
      const rec = new Record(faqsCol)
      populateRecord(rec, data)
      dao.saveRecord(rec)
    })

    // 4. Seed Team Members
    const teamCol = dao.findCollectionByNameOrId("team_members")

    const teamData = [
      {
        name: "Dhanar",
        role: "Lead Developer",
        initial: "D",
        color: "#0cad31",
        sort_order: 1,
      },
      {
        name: "Riyan",
        role: "Backend Developer",
        initial: "R",
        color: "#0891b2",
        sort_order: 2,
      },
      {
        name: "Ricardo",
        role: "Frontend Developer",
        initial: "R",
        color: "#7c3aed",
        sort_order: 3,
      },
    ]

    teamData.forEach((data) => {
      const rec = new Record(teamCol)
      populateRecord(rec, data)
      dao.saveRecord(rec)
    })
  },
  (app) => {
    const dao = new Dao(app)

    try {
      const faqsCol = dao.findCollectionByNameOrId("faqs")
      dao.deleteCollection(faqsCol)
    } catch (e) {}

    try {
      const teamCol = dao.findCollectionByNameOrId("team_members")
      dao.deleteCollection(teamCol)
    } catch (e) {}
  },
)
