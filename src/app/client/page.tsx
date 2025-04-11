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
    <section id="our-client" className="py-16 px-4 text-center bg-white">
      <h2 className="text-4xl font-bold mb-10 text-gray-800">Our client</h2>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        autoplay={{ delay: 2500 }}
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
            <div className="bg-gray-100 rounded-xl shadow p-6 h-20 flex items-center justify-center font-medium text-gray-700 hover:bg-gray-200 transition">
              {name}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Ourclient;
