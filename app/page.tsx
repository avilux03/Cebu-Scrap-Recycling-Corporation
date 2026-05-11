import HeroSection from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import SellSection from "@/components/Sellsection";
import BuySection from "@/components/BuySection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import ContactFormRHF from "@/components/Contact/rhf";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <div id="home">
        <HeroSection />
      </div>

      <div id="about">
        <AboutSection />
      </div>

      <div id="sell">
        <SellSection />
      </div>

      <div id="buy">
        <BuySection />
      </div>

      <div id="services">
        <ServicesSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>

      <div id="contact-form">
        <ContactFormRHF />
      </div>

      <Footer />
    </main>
  );
}