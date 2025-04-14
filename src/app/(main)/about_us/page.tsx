import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section
      id="about-us"
      className="scroll-mt-24 bg-white min-h-screen py-8 px-4 sm:px-8 lg:px-24"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-red-700 mb-4">Tentang Kami</h1>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            Kami adalah komunitas pecinta motor Yamaha yang solid, aktif, dan peduli terhadap keselamatan berkendara serta kebersamaan.
          </p>
        </div>

        {/* About Description */}
        <div className="mb-16">
          <p className="text-gray-900 text-lg leading-relaxed text-justify">
            Club motor Yamaha kami lahir dari semangat kebersamaan dan kecintaan terhadap dunia otomotif.
            Kami bukan hanya berkumpul untuk touring, tapi juga membangun persaudaraan, saling mendukung, serta berbagi dalam berbagai kegiatan sosial.
            Kami percaya bahwa menjadi bagian dari komunitas berarti tumbuh bersama dan memberi dampak positif di jalan maupun di masyarakat.
          </p>
        </div>

        {/* Kegiatan dan Tujuan */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-red-700 mb-4">Kegiatan Kami</h2>
            <ul className="list-disc pl-5 text-gray-900 space-y-2">
              <li>Touring bersama ke berbagai destinasi menarik di Indonesia.</li>
              <li>Kegiatan bakti sosial dan donasi untuk masyarakat sekitar.</li>
              <li>Pelatihan safety riding untuk meningkatkan kesadaran berkendara aman.</li>
              <li>Kopdar rutin untuk mempererat tali silaturahmi antar anggota.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-red-700 mb-4">Tujuan Komunitas</h2>
            <ul className="list-disc pl-5 text-gray-900 space-y-2">
              <li>Menjadi wadah positif bagi para pengguna motor Yamaha.</li>
              <li>Menumbuhkan rasa persaudaraan dan solidaritas tanpa batas.</li>
              <li>Mengedepankan keselamatan dalam berkendara.</li>
              <li>Mengangkat nama komunitas melalui kegiatan yang bermanfaat.</li>
            </ul>
          </div>
        </div>

        {/* Nilai Komunitas */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-red-700 mb-6 text-center">Nilai-Nilai Kami</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {["Persaudaraan", "Keselamatan", "Solidaritas", "Tanggung Jawab"].map((value) => (
              <div
                key={value}
                className="bg-black rounded-lg shadow-md py-6 px-4 hover:bg-red-800 transition-all transform skew-x-[-12deg] flex items-center justify-center h-28"
              >
                <p className="text-xl font-medium text-white transform skew-x-[12deg] text-center">
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
