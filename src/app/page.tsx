import Navbar from "@/components/navbar";
import ParallaxSlider from "@/components/jumbo";
import AboutUs from "./about_us/page";
import VisiMisi from "./visi-misi/page";
import Ourclient from "./client/page";
import Product from "./product/page";
import EventPage from "./event/page";

import Gallery from "./gallery/page";

import FAQ from "@/components/faq";
import Footer from "@/components/footer";


export default function Home() {
  return (
     <div id="#home">
     <Navbar />
     <main className="">
       <ParallaxSlider />
       <AboutUs />
       <Ourclient />
       <VisiMisi/>
       <FAQ />
       <Product />
       <EventPage />

       <Gallery/>

      
      
       <Footer/>
     </main>
   </div>                                     
  );
}
