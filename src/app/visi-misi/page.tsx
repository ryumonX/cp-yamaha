import React from "react";

const VisiMisi: React.FC = () => {
  return (
    <section
      id="visi-misi"
      className="bg-gradient-to-b from-white to-gray-50 min-h-screen py-20 px-6 sm:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Visi */}
        <div className="bg-white shadow-lg rounded-2xl p-10 mb-20 flex flex-col lg:flex-row items-center gap-10">
          <div className="lg:w-1/2">
            <img
              src="/images/visi-ilustrasi.jpg" // Ganti dengan path gambar sesuai kebutuhanmu
              alt="Visi Kami"
              className="w-full h-auto rounded-xl shadow-md"
            />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Visi Kami</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Menjadi perusahaan teknologi digital terpercaya di Indonesia yang mendorong transformasi digital dan menciptakan dampak sosial serta bisnis yang positif dan berkelanjutan.
            </p>
          </div>
        </div>

        {/* Misi */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center">Misi Kami</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {[
              "Mengembangkan solusi digital inovatif yang relevan dengan kebutuhan pasar.",
              "Membangun hubungan jangka panjang dengan pelanggan berbasis kepercayaan dan kualitas.",
              "Mendorong budaya kerja yang kolaboratif, adaptif, dan berorientasi pada hasil.",
              "Memberdayakan sumber daya manusia melalui pelatihan, teknologi, dan kepemimpinan.",
              "Menjadi pelopor dalam praktik bisnis yang berkelanjutan dan bertanggung jawab sosial.",
            ].map((misi, index) => (
              <div
                key={index}
                className="flex bg-white rounded-2xl shadow-md p-6 w-full sm:w-[48%] lg:w-[32%] items-start gap-4 hover:shadow-lg transition"
              >
                <div className="text-indigo-600 text-3xl font-bold">{index + 1}.</div>
                <p className="text-gray-700 leading-relaxed">{misi}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisiMisi;
