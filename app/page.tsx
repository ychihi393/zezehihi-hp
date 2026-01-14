import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CompanySection from "@/components/CompanySection";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <CompanySection />
      <NewsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
