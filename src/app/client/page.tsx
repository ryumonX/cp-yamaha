'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';

const clients: string[] = [
  "PT. Nusantara Digital",
  "CV. Teknologi Unggul",
  "PT. Solusi Global",
  "CV. Media Kreatif",
  "PT. Nusantara Digital",
  "CV. Teknologi Unggul",
  "PT. Solusi Global",
  "CV. Media Kreatif",
];

const Ourclient: React.FC = () => {
  return (
    <section id="our-client" className="py-16 px-4 text-center bg-black">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-white relative inline-block">
          Our Clients
          <span className="absolute left-0 bottom-0 h-0.5 bg-red-600 w-full 
            transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          autoplay={{ 
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          speed={600}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          loop={true}
        >
          {clients.map((name: string, idx: number) => (
            <SwiperSlide key={idx}>
              {/* Tambahkan transform skew pada hover */}
              <div className="relative overflow-hidden bg-gray-900 rounded-lg h-32 flex items-center justify-center
                border border-gray-800 group transition-transform duration-300 hover:-skew-x-12">
                
                {/* Horizontal hover effect */}
                <div className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-red-600/20 to-red-600/0 
                  group-hover:w-full transition-all duration-500 ease-out"></div>
                
                {/* Tambahkan counter-skew pada teks */}
                <span className="relative z-10 text-white text-lg font-medium px-6 text-center
                  transition-transform duration-300 group-hover:text-red-400 group-hover:skew-x-12">
                  {name}
                </span>
                
                {/* Horizontal line animation */}
                <div className="absolute bottom-0 left-0 h-px bg-red-600 w-0 
                  group-hover:w-full transition-all duration-700"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Ourclient;