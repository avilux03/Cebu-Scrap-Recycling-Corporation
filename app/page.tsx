import HeroSection from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import SellSection from "@/components/Sellsection";
import BuySection from "@/components/BuySection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import ContactFormRHF from "@/components/Contact/rhf"  
import Footer from "@/components/Footer";


export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SellSection />
      <BuySection />
      <ServicesSection />
      <ContactSection />
      <ContactFormRHF /> 
      <Footer />

    </main>
  );
}