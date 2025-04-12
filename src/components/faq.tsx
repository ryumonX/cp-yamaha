import React, { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqList: FAQItem[] = [
  {
    question: 'Apa itu komunitas motor Yamaha ini?',
    answer:
      'Kami adalah komunitas penggemar motor Yamaha yang aktif dalam berbagai kegiatan touring, kopdar, dan aksi sosial. Kami menjunjung tinggi persaudaraan dan keselamatan berkendara.',
  },
  {
    question: 'Siapa saja yang bisa bergabung?',
    answer:
      'Siapa pun yang memiliki motor Yamaha dan semangat kebersamaan dapat bergabung dengan komunitas kami. Tidak ada batasan usia maupun jenis motor Yamaha.',
  },
  {
    question: 'Apakah ada biaya untuk menjadi anggota?',
    answer:
      'Untuk bergabung sebagai anggota resmi, ada biaya pendaftaran dan iuran rutin yang digunakan untuk mendukung kegiatan komunitas. Besarannya transparan dan dibahas bersama.',
  },
  {
    question: 'Kegiatan apa saja yang rutin dilakukan?',
    answer:
      'Kami rutin mengadakan kopdar, touring ke berbagai kota, pelatihan safety riding, hingga kegiatan sosial seperti bakti lingkungan dan donasi ke panti asuhan.',
  },
  {
    question: 'Apakah saya harus ikut semua kegiatan?',
    answer:
      'Tidak harus. Anggota bebas memilih kegiatan yang ingin diikuti. Kami memahami bahwa setiap orang punya kesibukan masing-masing.',
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black px-6 py-24 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4 lg:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 text-lg lg:text-xl">
            Temukan jawaban atas pertanyaan umum tentang layanan kami
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqList.map((faq, index) => (
            <div 
              key={index}
              className={`bg-gray-800 bg-opacity-80 rounded-2xl shadow-lg transition-all duration-300 ${
                openIndex === index 
                  ? 'ring-2 ring-red-600 transform scale-[1.02]' 
                  : 'hover:shadow-xl'
              }`}
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center px-8 py-6 text-left"
              >
                <span className="text-xl font-semibold text-white pr-4 lg:text-xl">
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 ml-4 p-2 rounded-full ${
                  openIndex === index 
                    ? 'bg-red-600 text-white' 
                    : 'bg-red-100 text-red-600'
                }`}>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-8 pb-8 pt-2 text-gray-200 text-lg leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
