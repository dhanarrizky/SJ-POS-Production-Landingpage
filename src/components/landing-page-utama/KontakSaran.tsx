import React, { useState, useEffect } from "react"
import { pb } from "../../lib/pocketbase"
import type { SiteSettings } from "../../types/cms"

interface KontakSaranProps {
  siteSettings?: SiteSettings | null
}

export default function KontakSaran({ siteSettings: propSettings }: KontakSaranProps = {}) {
  const [internalSettings, setInternalSettings] = useState<SiteSettings | null>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  useEffect(() => {
    if (propSettings) return
    pb.collection("site_settings")
      .getFirstListItem("", { sort: "-updated", requestKey: null })
      .then((record) => {
        setInternalSettings(record as unknown as SiteSettings)
      })
      .catch(() => {})
  }, [propSettings])

  const siteSettings = propSettings || internalSettings

  const badge = siteSettings?.kontak_saran_badge || "Hubungi & Berikan Masukan"
  const title = siteSettings?.kontak_saran_title || "Kontak Saran & Kritik"
  const desc =
    siteSettings?.kontak_saran_desc ||
    "Kami selalu terbuka untuk mendengarkan saran, kritik, dan masukan dari Anda. Karena setiap pesan dari Anda, membantu kami untuk terus berkembang dan memberikan yang terbaik."
  const infoTitle = siteSettings?.kontak_saran_info_title || "Buka 24 Jam / 7 Hari"
  const infoDesc =
    siteSettings?.kontak_saran_info_desc ||
    "Anda bisa mengirimkan saran, kritik, atau pertanyaan kapan saja. Kami siap membantu"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) {
      setStatusMessage({
        type: "error",
        text: "Silakan tuliskan saran atau pesan Anda.",
      })
      return
    }

    setIsSubmitting(true)
    setStatusMessage(null)

    try {
      await pb.collection("suggestions").create({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      })

      setName("")
      setEmail("")
      setMessage("")
      setStatusMessage({
        type: "success",
        text: "Terima kasih! Saran & kritik Anda telah berhasil dikirimkan.",
      })
    } catch (err: any) {
      console.error("Gagal mengirim saran:", err)
      const rawMsg = String(err?.message || "")
      if (rawMsg.includes("60 detik") || rawMsg.includes("rate limit")) {
        setStatusMessage({
          type: "error",
          text: "Harap tunggu 60 detik sebelum mengirim saran lagi.",
        })
      } else {
        setStatusMessage({
          type: "error",
          text: "Gagal mengirim masukan. Silakan periksa koneksi atau coba lagi.",
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="kontak" className="w-full bg-[#F5FFF6] py-[50px] font-sans">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-[71px]">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-stretch justify-center gap-[50px] lg:gap-[100px]">
          {/* Kiri: Form Card */}
          <div className="w-full lg:w-1/2 max-w-[556px] bg-[#012708] rounded-[20px] p-[40px] lg:p-[50px] flex flex-col shadow-2xl mx-auto lg:mx-0">
            <form className="flex flex-col gap-[20px] w-full" onSubmit={handleSubmit}>
              {statusMessage && (
                <div
                  className={`p-3.5 rounded-xl text-xs font-medium leading-relaxed border ${
                    statusMessage.type === "success"
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      : "bg-rose-500/20 text-rose-300 border-rose-500/30"
                  }`}
                >
                  {statusMessage.text}
                </div>
              )}

              {/* Nama Anda */}
              <div className="flex flex-col gap-2">
                <label className="text-white">
                  <span className="text-[16px] font-bold">Nama Anda</span>{" "}
                  <span className="text-[12px] font-normal text-gray-300">(Opsional)</span>
                </label>
                <input
                  type="text"
                  placeholder="Masukan Nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-[50px] bg-white rounded-[8px] px-4 text-[13px] font-normal text-black outline-none focus:ring-2 focus:ring-[#0CAD31]"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-white">
                  <span className="text-[16px] font-bold">Email</span>{" "}
                  <span className="text-[12px] font-normal text-gray-300">(Opsional)</span>
                </label>
                <input
                  type="email"
                  placeholder="Masukan Email Aktif"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[50px] bg-white rounded-[8px] px-4 text-[13px] font-normal text-black outline-none focus:ring-2 focus:ring-[#0CAD31]"
                />
              </div>

              {/* Saran / Pesan */}
              <div className="flex flex-col gap-2">
                <label className="text-white">
                  <span className="text-[16px] font-bold">
                    Saran / Pesan <span className="text-red-500">*</span>
                  </span>
                </label>
                <textarea
                  placeholder="Tuliskan masukan Anda disini..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full min-h-[160px] bg-white rounded-[8px] p-4 text-[13px] font-normal text-black outline-none focus:ring-2 focus:ring-[#0CAD31] resize-none leading-relaxed"
                  required
                ></textarea>
              </div>

              {/* Button */}
              <div className="flex justify-end w-full mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-[219px] h-[46px] bg-[#0CAD31] hover:bg-[#09992b] text-white font-bold text-[16px] rounded-full flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-[#0CAD31]/30 hover:-translate-y-1 hover:shadow-[#0CAD31]/50 active:scale-95 active:translate-y-0 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Mengirimkan..." : "Kirim Masukan"}
                  <i className="fa-solid fa-paper-plane text-sm"></i>
                </button>
              </div>
            </form>
          </div>

          {/* Kanan: Teks & Info Card */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left justify-start">
            <h4 className="text-[16px] font-bold text-[#0CAD31] mb-2">{badge}</h4>

            <h2 className="text-[40px] font-bold text-black mb-6 leading-tight whitespace-pre-line">
              {title}
            </h2>

            <p className="text-[16px] font-normal text-black mb-[50px] leading-relaxed max-w-[600px] whitespace-pre-line">
              {desc}
            </p>

            {/* Info Card */}
            <div className="border border-[#0CAD31] rounded-[10px] py-[20px] px-4 md:px-[30px] flex items-center gap-4 md:gap-6 bg-[#F5FFF6] w-full max-w-[550px] shadow-sm">
              {/* Icon */}
              <div className="text-[#0CAD31] text-[40px] flex-shrink-0">
                <i className="fa-solid fa-headset"></i>
              </div>

              {/* Garis Lurus (Divider) */}
              <div className="h-[60px] w-[1px] bg-[#0CAD31] flex-shrink-0"></div>

              {/* Text Info */}
              <div className="flex flex-col justify-center text-left">
                <h5 className="text-[16px] font-bold text-[#0CAD31] mb-1">{infoTitle}</h5>
                <p className="text-[12px] font-normal text-black leading-relaxed">{infoDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
