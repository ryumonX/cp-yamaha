'use client'
import React from "react";
import { motion } from "framer-motion";

const VisiMisi: React.FC = () => {
  const misiList = [
    "Membangun rasa persaudaraan yang erat antar anggota melalui kegiatan rutin dan kopdar.",
    "Menjadi pelopor keselamatan berkendara dengan edukasi dan praktik yang baik di jalan.",
    "Mengadakan touring sebagai sarana eksplorasi dan mempererat kebersamaan.",
    "Berperan aktif dalam kegiatan sosial untuk memberikan manfaat bagi masyarakat.",
    "Menjaga nama baik komunitas dan merek Yamaha dengan sikap positif dan profesional.",
  ];

  return (
    <section
      id="visi-misi"
      className="scroll-mt-24 bg-gray-100 min-h-screen py-10 px-6 sm:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Visi */}
        <div className="bg-white shadow-lg rounded-2xl p-10 mb-20 flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img
              src="\resource\yamaha.jpg"
              alt="Visi Kami"
              className="w-full h-auto rounded-xl"
            />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-bold text-red-600 mb-4">Visi Kami</h2>
            <p className="text-lg text-gray-800 leading-relaxed">
              "Menjadi komunitas Yamaha Riders yang solid, tertib, dan inspiratif dalam berkendara, serta aktif dalam kegiatan sosial dan persaudaraan antar bikers di seluruh Indonesia."
            </p>
          </div>
        </div>

        {/* Misi */}
        <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-16 text-center relative pb-4">
          Misi kami
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-600 rounded-full"></span>
        </h1>
          <div className="flex flex-wrap gap-6 justify-center">
            {misiList.map((misi, index) => (
              <motion.div
                key={index}
                className="group flex bg-white rounded-xl shadow-md p-6 w-full sm:w-[48%] lg:w-[48%] items-start gap-4 border-l-4 border-red-600 hover:bg-red-600 transition hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
              >
                <div className="text-red-600 font-bold group-hover:text-white text-2xl transition">
                  {index + 1}.
                </div>
                <p className="text-gray-800 group-hover:text-white leading-relaxed transition">
                  {misi}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisi;
