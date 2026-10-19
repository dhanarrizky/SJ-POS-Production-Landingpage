import { mediaUrl } from "../../lib/media"
import LazyImage from "./LazyImage"

const valueImg = mediaUrl("detail-produk/value-coins.webp")


export default function MarginTransparency() {
  return (
    <section className="bg-brand-lightest py-[100px] px-4 sm:px-[69px]">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-[30px] text-center">
        <div className="w-full flex flex-col items-center gap-5 max-w-[627px]">
          <span className="font-poppins text-base font-semibold text-brand">
            Akurasi Finansial &amp; Margin Laba
          </span>
          <h2 className="font-poppins text-[28px] sm:text-[40px] leading-[1.3] sm:leading-[60px] tracking-[-1.38px] font-semibold text-slate-900">
            Bahan Baku Terkunci, Margin Keuntungan Transparan
          </h2>
        </div>

        <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-[39px]">
          <p className="w-full text-base leading-6 text-slate-900 text-left max-w-[365px]">
            Ketahui persis berapa biaya modal tiap porsi menu dengan fitur
            Recipe Engineering. Sistem Spontan Jualan otomatis menghitung
            perubahan HPP saat harga telur, minyak, atau daging di pasar naik.
          </p>

          <LazyImage
            src={valueImg}
            alt="Ilustrasi nilai bahan baku & margin"
            className="w-full max-w-[380px] lg:max-w-[420px] h-auto object-contain lg:flex-shrink-0"
          />

          <div className="flex flex-col gap-[30px] w-full max-w-[310px]">
            <span className="inline-flex items-center justify-center text-center bg-brand text-white font-poppins font-semibold text-xs leading-6 px-[30px] py-2.5 rounded-full">
              Peringatan Menipis Otomatis
            </span>
            <span className="inline-flex items-center justify-center text-center bg-brand text-white font-poppins font-semibold text-xs leading-6 px-[30px] py-2.5 rounded-full">
              Pencatatan Waste &amp; Bahan Kadaluarsa
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
