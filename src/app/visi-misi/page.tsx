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
      className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-10 px-6 sm:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Visi */}
        <div className="bg-white shadow-lg rounded-2xl p-10 mb-20 flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img
              src="/resource/about.png"
              alt="Visi Kami"
              className="w-full h-auto rounded-xl"
            />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Visi Kami</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Menjadi komunitas motor Yamaha yang solid, berjiwa sosial, serta menjadi contoh dalam keselamatan dan etika berkendara di Indonesia.
            </p>
          </div>
        </div>

        {/* Misi */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center">
            Misi Kami
          </h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {misiList.map((misi, index) => (
              <motion.div
                key={index}
                className="group flex bg-white rounded-xl shadow-md p-6 w-full sm:w-[48%] lg:w-[48%] items-start gap-4 border-l-4 border-indigo-600 hover:bg-indigo-600 transition hover:shadow-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6, type: "spring" }}
              >
                <div className="text-indigo-600 group-hover:text-white text-2xl font-bold transition">{index + 1}.</div>
                <p className="text-gray-700 group-hover:text-white leading-relaxed transition">
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
