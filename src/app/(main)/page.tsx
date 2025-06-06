'use client'
import Navbar from "@/components/navbar";
import Jumbotron from "@/components/jumbo";
import AboutUs from "./about_us/page";
import VisiMisi from "./visi-misi/page";
import Ourclient from "./client/page";
import Product from "./product/page";
import EventPage from "./event/page";
import Gallery from "./gallery/page";
import FAQ from "@/components/faq";
import ContactSection from "./contact/page";
import Footer from "@/components/footer";
import FadeUpSection from "@/utils/fadeupsection";

export default function Home() {
  return (
    <div id="#home">
      <Navbar />
      <main>
        <Jumbotron />
          
        <FadeUpSection >
          <AboutUs />
        </FadeUpSection>

        <FadeUpSection delay={0.1}>
          <Ourclient />
        </FadeUpSection>

        <FadeUpSection delay={0.2}>
          <VisiMisi />
        </FadeUpSection>

        <FadeUpSection delay={0.3}>
          <FAQ />
        </FadeUpSection>

        <FadeUpSection delay={0.4}>
          <Product />
        </FadeUpSection>

        <FadeUpSection delay={0.5}>
          <EventPage />
        </FadeUpSection>

        <FadeUpSection delay={0.6}>
          <Gallery />
        </FadeUpSection>

        <ContactSection/>

        <Footer />
      </main>
    </div>
  );
}