import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ComingSoonTable from "../components/bandingkan-paket/ComingSoonTable";
import { useSEO, pageTitle } from "../hooks/useSEO";

export default function BandingkanPaket() {
  useSEO({
    title: pageTitle("Bandingkan Paket"),
    description: "Pilih paket yang paling sesuai dengan kebutuhan bisnis Anda.",
  });

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F5FFF6]">
      <Navbar />
      
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 lg:px-[71px] pt-[50px] pb-[80px]">
        <ComingSoonTable />
      </main>
      
      <Footer />
    </div>
  );
}
