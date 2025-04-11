import Image from "next/image";
import Navbar from "@/components/navbar";
import ParallaxSlider from "@/components/jumbo";
import AboutUs from "./about_us/page";
import VisiMisi from "./visi-misi/page";
import Ourclient from "./client/page";
import Product from "./product/page";
import EventPage from "./event/page";

import FAQ from "@/components/faq";
import Footer from "@/components/footer";


export default function Home() {
  return (
     <div id="#home">
     <Navbar />
     <main className="p-4">
       <ParallaxSlider />
       <AboutUs />
       <VisiMisi/>
       <Ourclient />
       <Product />
       <EventPage />

      
      <FAQ />
       <Footer/>
     </main>
   </div>                                     
  );
}
