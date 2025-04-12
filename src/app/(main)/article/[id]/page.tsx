'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
}

const ArticleDetail: React.FC = () => {
  const router = useRouter();

  const article: Article = {
    id: 1,
    title: 'Cara Meningkatkan Produktivitas Perusahaan',
    content: `
      <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <h2 class="text-2xl font-bold mt-8 mb-4">Strategi Utama</h2>
      <p class="mb-4">Duis aute irure dolor in reprehenderit...</p>
      <ul class="list-disc pl-6 mb-6">
        <li class="mb-2">Manajemen waktu efektif</li>
        <li class="mb-2">Penggunaan teknologi modern</li>
        <li class="mb-2">Pelatihan karyawan berkala</li>
      </ul>
      <p class="mb-4">Sed ut perspiciatis unde omnis iste natus error...</p>
    `,
    date: '15 Maret 2024',
    category: 'Produktivitas',
    author: 'John Doe',
    readTime: '5 menit baca'
  };

  const relatedArticles = [
    { id: 2, title: 'Manajemen Waktu Modern', category: 'Produktivitas', date: '14 Maret 2024' },
    { id: 3, title: 'Tools Produktivitas 2024', category: 'Teknologi', date: '13 Maret 2024' },
    { id: 4, title: 'Pelatihan Karyawan Efektif', category: 'HR', date: '12 Maret 2024' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <button
            onClick={() => router.back()}
            className="mb-6 inline-flex items-center text-white hover:text-blue-100 transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Kembali ke Artikel
          </button>
          <div className="max-w-3xl mx-auto">
            <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center text-sm space-x-4">
              <span>{article.author}</span>
              <span>{article.date}</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <article className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md p-6 lg:p-8">
              <div className="mb-8 bg-gray-200 h-64 rounded-lg" />

              <div 
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <span className="text-gray-600 mr-2">Tags:</span>
                <button className="mr-2 px-3 py-1 bg-gray-100 rounded-full text-sm">Produktivitas</button>
                <button className="px-3 py-1 bg-gray-100 rounded-full text-sm">Manajemen</button>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3">
            <div className="sticky top-8 space-y-8">
              {/* Related Articles */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Artikel Terkait</h3>
                <ul className="space-y-4">
                  {relatedArticles.map((post) => (
                    <li key={post.id} className="group hover:bg-gray-50 p-3 rounded-lg transition">
                      <Link href={`/artikel/${post.id}`} className="block">
                        <span className="text-sm text-blue-600 font-medium">{post.category}</span>
                        <h4 className="font-medium text-gray-800 group-hover:text-blue-600">
                          {post.title}
                        </h4>
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter */}
              <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Berlangganan Artikel</h3>
                <p className="mb-4 text-blue-100">Dapatkan update artikel terbaru langsung ke email Anda</p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Alamat email"
                    className="w-full px-4 py-2 rounded-lg text-gray-900"
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition"
                  >
                    Berlangganan
                  </button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default ArticleDetail;
