import { Monitor, Timer, BarChart3 } from "lucide-react"
import { mediaUrl } from "../../lib/media"
import LazyImage from "./LazyImage"

const dapurImg = mediaUrl("detail-produk/kitchen-modernization.webp")

const kdsHighlights = [
  {
    Icon: Monitor,
    title: "Tanpa Kertas",
    desc: "Layar tahan air dan panas untuk tiket",
  },
  {
    Icon: Timer,
    title: "Alur Lebih Baik",
    desc: "Pewaktu waktu nyata (real-time timers) melacak kecepatan memasak",
  },
  {
    Icon: BarChart3,
    title: "Wawasan & Data",
    desc: "Metrik kinerja dalam sekejap",
  },
]

const seatingStats = [
  {
    value: "0 Menit",
    label: "Antrean Minimal",
    desc: "Waktu tunggu kasir mengecek ketersediaan meja",
  },
  {
    value: "100%",
    label: "Sinkronisasi Penuh",
    desc: "Reservasi selalu disinkronkan",
  },
]

export default function KitchenModernization() {
  return (
    <section>
      <div className="bg-brand-lightest py-[50px] px-4 sm:px-[71px]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-[145px]">
          {/* Copy side */}
          <div className="w-full flex flex-col gap-5 max-w-[392px]">
            <span className="font-poppins text-base font-semibold text-brand">
              Fasilitas Dapur Modern
            </span>
            <div className="flex flex-col gap-5">
              <h2 className="font-poppins text-[28px] sm:text-[40px] leading-[1.3] sm:leading-[60px] tracking-[-1.38px] font-semibold text-slate-900">
                Modernisasi Dapur Anda
              </h2>
              <p className="font-poppins text-base leading-6 text-slate-900">
                Tingkatkan performa dengan sistem Tampilan Dapur (Kitchen
                Display System) ramping. Ganti tiket kertas yang beranatakan
              </p>
            </div>
          </div>

          {/* Visual side */}
          <div className="relative w-full max-w-[759px]">
            {/* Gambar disembunyikan di mobile, tampil dari lg: ke atas */}
            <div className="hidden lg:block relative aspect-[759/567]">
              <LazyImage
                src={dapurImg}
                alt="Aktivitas dapur modern"
                className="absolute left-[5.8%] top-[4.76%] w-[94.2%] h-[76.4%] object-cover"
                style={{
                  clipPath:
                    "polygon(1.3% 49.4%, 2.2% 46.1%, 3.8% 41.3%, 6.0% 36.5%, 8.4% 32.4%, 10.4% 29.2%, 13.4% 25.5%, 16.4% 22.3%, 18.3% 20.3%, 21.4% 17.6%, 23.4% 16.0%, 25.5% 14.4%, 28.5% 12.6%, 30.5% 11.3%, 32.5% 10.0%, 34.3% 9.0%, 36.5% 7.9%, 38.5% 7.1%, 40.5% 6.1%, 42.6% 5.3%, 45.2% 4.2%, 46.6% 3.7%, 49.6% 2.9%, 51.6% 2.4%, 53.6% 1.8%, 55.6% 1.5%, 58.7% 0.8%, 60.7% 0.5%, 63.7% 0.2%, 65.7% 0.2%, 68.7% 0.2%, 71.7% 0.3%, 74.7% 0.5%, 78.8% 1.5%, 81.8% 2.6%, 85.8% 4.8%, 88.8% 7.6%, 91.2% 10.6%, 94.1% 15.5%, 95.4% 18.7%, 97.3% 25.2%, 97.9% 27.6%, 98.9% 33.9%, 99.3% 38.1%, 99.9% 46.6%, 100.0% 52.6%, 100.0% 57.4%, 99.7% 63.9%, 99.0% 68.7%, 98.9% 69.8%, 97.4% 75.2%, 95.8% 80.0%, 93.1% 84.8%, 90.5% 88.1%, 87.0% 91.3%, 83.8% 93.4%, 80.8% 95.0%, 77.8% 96.5%, 74.7% 97.4%, 71.7% 98.1%, 68.7% 98.5%, 65.7% 99.0%, 62.7% 99.4%, 60.7% 99.5%, 58.7% 99.7%, 55.6% 99.7%, 53.6% 99.7%, 50.6% 99.8%, 48.6% 99.8%, 46.6% 99.8%, 43.6% 99.8%, 41.5% 100.0%, 39.5% 100.0%, 36.5% 99.7%, 33.5% 99.8%, 31.5% 99.7%, 28.5% 99.7%, 24.4% 99.2%, 21.4% 98.5%, 17.4% 97.3%, 14.4% 95.8%, 10.4% 92.9%, 7.3% 89.8%, 5.2% 86.5%, 3.3% 82.4%, 2.0% 78.4%, 0.6% 71.9%, 0.3% 68.4%, 0.1% 63.9%, 0.3% 57.4%, 0.8% 52.6%)",
                  filter: "drop-shadow(0 4px 50px rgba(0,0,0,0.25))",
                }}
              />
            </div>

            {/* Mobile/tablet: kartu tampil normal tanpa gambar. lg+: overlay 52.4% bawah gambar seperti desain */}
            <div className="flex flex-col sm:flex-row gap-[30px] lg:absolute lg:top-[52.4%] lg:left-0 lg:right-0 lg:bottom-0">
              {kdsHighlights.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex-1 bg-white rounded-[20px] p-[30px] flex flex-col gap-5"
                >
                  <span className="w-[60px] h-[60px] rounded-full bg-brand text-white flex items-center justify-center flex-shrink-0">
                    <Icon size={30} />
                  </span>
                  <div className="flex flex-col gap-2.5">
                    <h3 className="font-poppins text-base font-semibold text-slate-900">
                      {title}
                    </h3>
                    <p className="font-poppins text-base leading-6 text-slate-900">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Seating banner */}
      <div className="bg-[#012708] py-[50px] px-4 sm:px-[71px]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-[183px]">
          <div className="w-full flex flex-col gap-5 max-w-[471px]">
            <h3 className="font-poppins text-xl leading-[30px] font-semibold text-white">
              Optimalkan Tempat Duduk Tamu
            </h3>
            <p className="font-poppins text-base leading-6 text-white">
              Kelola meja secara dinamis dan cegah konflik pemesanan
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-[30px] w-full lg:w-auto">
            {seatingStats.map((s) => (
              <div
                key={s.label}
                className="bg-brand-lightest rounded-[20px] p-5 sm:p-[30px] flex flex-col gap-2.5 w-full lg:w-[307px] min-h-[140px] sm:min-h-[196px]"
              >
                <div className="font-poppins text-xl leading-[30px] font-semibold text-brand">
                  {s.value}
                </div>
                <div className="flex flex-col gap-2.5 sm:gap-5">
                  <div className="font-poppins text-base font-semibold text-slate-900">
                    {s.label}
                  </div>
                  <p className="font-poppins text-base leading-6 text-slate-900">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
