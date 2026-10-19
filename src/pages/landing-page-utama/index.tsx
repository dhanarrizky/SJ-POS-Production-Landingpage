import Navbar from "../../components/layout/Navbar"
import Footer from "../../components/Footer"
import Header from "../../components/landing-page-utama/Header"
import TentangKami from "../../components/landing-page-utama/TentangKami"
import VideoDemo from "../../components/landing-page-utama/VideoDemo"
import Produk from "../../components/landing-page-utama/Produk"
import PaketHarga from "../../components/landing-page-utama/PaketHarga"
import MitraPertama from "../../components/landing-page-utama/MitraPertama"
import CaraMulai from "../../components/landing-page-utama/CaraMulai"
import FeedbackCustomer from "../../components/landing-page-utama/FeedbackCustomer"
import FAQ from "../../components/landing-page-utama/FAQ"
import KontakSaran from "../../components/landing-page-utama/KontakSaran"
import Blog from "../../components/landing-page-utama/Blog"

export default function LandingPageUtama() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans">
      <Navbar />
      <main className="flex-grow">
        <Header />
        <TentangKami />
        <VideoDemo />
        <Produk />
        <PaketHarga />
        <MitraPertama />
        <CaraMulai />
        <FeedbackCustomer />
        <FAQ />
        <KontakSaran />
        <Blog />
      </main>
      <Footer />
    </div>
  )
}
