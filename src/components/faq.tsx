'use client'
import React, { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqList: FAQItem[] = [
    {
        question: 'Apa itu layanan kami?', // Pastikan data ada di sini
        answer: 'Kami menyediakan solusi digital seperti pembuatan website, aplikasi mobile, dan sistem informasi berbasis cloud.',
      },
      {
        question: 'Bagaimana cara memulai proyek dengan kami?',
        answer: 'Anda bisa menghubungi kami melalui halaman kontak dan menjelaskan kebutuhan Anda. Kami akan segera menghubungi Anda kembali.',
      },
      {
        question: 'Apakah ada garansi untuk layanan kami?',
        answer: 'Ya, kami memberikan garansi dukungan dan perbaikan untuk setiap layanan yang kami tawarkan sesuai perjanjian awal.',
      },
      {
        question: 'Apakah kami melayani di luar kota?',
        answer: 'Tentu saja! Kami melayani klien dari seluruh Indonesia, baik secara daring maupun kunjungan langsung jika diperlukan.',
      },
    ];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-600 to-blue-800 px-6 py-24 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-white mb-4 lg:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-blue-100 text-lg lg:text-xl">
            Temukan jawaban atas pertanyaan umum tentang layanan kami
          </p>
        </div>

        <div className="space-y-4">
          {faqList.map((faq, index) => (
            <div 
              key={index}
              className={`bg-white rounded-2xl shadow-lg transition-all duration-300 ${
                openIndex === index 
                  ? 'ring-2 ring-blue-500 transform scale-[1.02]' 
                  : 'hover:shadow-xl'
              }`}
            >
              <button
                onClick={() => toggleIndex(index)}
                className="w-full flex justify-between items-center px-8 py-6 text-left"
              >
                <span className="text-xl font-semibold text-gray-800 pr-4 lg:text-xl">
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 ml-4 p-2 rounded-full ${
                  openIndex === index 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-blue-100 text-blue-600'
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
                <div className="px-8 pb-8 pt-2 text-gray-700 text-lg leading-relaxed animate-fade-in">
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