import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section id="about-us" className="bg-white min-h-screen py-16 px-4 sm:px-8 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">Tentang Kami</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Perusahaan kami berdedikasi untuk menghadirkan inovasi terbaik di bidang teknologi dan digitalisasi.
          </p>
        </div>

        {/* About Description */}
        <div className="mb-16">
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            Sejak berdiri, kami telah membantu berbagai bisnis dan instansi dalam memanfaatkan teknologi untuk meningkatkan efisiensi, kualitas, dan jangkauan layanan mereka. Dengan tim profesional yang berpengalaman, kami percaya bahwa teknologi adalah kunci masa depan yang lebih baik.
          </p>
        </div>

        {/* Visi dan Misi */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Visi Kami</h2>
            <p className="text-gray-700 leading-relaxed">
              Menjadi pelopor dalam transformasi digital di Indonesia dengan solusi inovatif dan berdampak.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Misi Kami</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Menyediakan solusi teknologi yang relevan dan efisien.</li>
              <li>Menjadi mitra strategis dalam pengembangan bisnis digital.</li>
              <li>Mendukung SDM unggul melalui edukasi dan pelatihan teknologi.</li>
              <li>Menumbuhkan budaya kerja yang inovatif dan kolaboratif.</li>
            </ul>
          </div>
        </div>

        {/* Nilai Perusahaan */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 text-center">
            {["Integritas", "Inovasi", "Komitmen", "Kolaborasi"].map((value) => (
             <div 
             key={value} 
             className="bg-blue-600 rounded-lg shadow-md py-6 px-8 hover:bg-blue-700 transition-all transform skew-x-[-12deg] overflow-hidden"
           >
             <p className="text-xl font-medium text-white transform skew-x-[12deg]">
               {value}
             </p>
           </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
