import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import CompanySection from "@/components/CompanySection";
import NewsSection from "@/components/NewsSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "株式会社ゼゼヒヒ",
    legalName: "株式会社ゼゼヒヒ",
    url: "https://zezehihi-hp.pages.dev", // Cloudflare PagesのURLに変更してください
    logo: "https://zezehihi-hp.pages.dev/logo.png", // Cloudflare PagesのURLに変更してください
    description:
      "株式会社ゼゼヒヒは「是々非々」の精神を持ち、既存の枠組みにとらわれず顧客メリットを最大化する会社です。",
    address: {
      "@type": "PostalAddress",
      postalCode: "160-0023",
      addressRegion: "東京都",
      addressLocality: "新宿区",
      streetAddress: "西新宿３丁目３番１３号 西新宿水間ビル６階",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "zezehihi.line@gmail.com",
      contactType: "customer service",
      areaServed: "JP",
      availableLanguage: "Japanese",
    },
    foundingDate: "2025-10-29",
    founder: {
      "@type": "Person",
      name: "小林 俊介",
    },
    sameAs: [
      // SNSアカウントがあれば追加
      // "https://twitter.com/zezehihi",
      // "https://www.facebook.com/zezehihi",
      // "https://www.instagram.com/zezehihi",
    ],
  };

  return (
    <>
      {/* 構造化データ（JSON-LD） */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <main className="min-h-screen">
        <Header />
        <HeroSection />
        <ServicesSection />
        <CompanySection />
        <NewsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
