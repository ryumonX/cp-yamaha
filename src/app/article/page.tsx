'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

const BlogPage: React.FC = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  const articles: Article[] = [
    {
      id: 1,
      title: 'Cara Meningkatkan Produktivitas Perusahaan',
      excerpt: 'Lorem ipsum dolor sit amet...',
      date: '2024-03-15',
      category: 'Produktivitas',
    },
    {
      id: 2,
      title: 'Strategi Digital Marketing 2024',
      excerpt: 'Ut enim ad minim veniam...',
      date: '2024-03-14',
      category: 'Marketing',
    },
    {
      id: 3,
      title: 'Inovasi Teknologi Perusahaan',
      excerpt: 'Duis aute irure dolor...',
      date: '2024-03-18',
      category: 'Teknologi',
    },
    {
      id: 4,
      title: 'Efisiensi Operasional',
      excerpt: 'Excepteur sint occaecat...',
      date: '2024-03-12',
      category: 'Manajemen',
    },
    {
      id: 5,
      title: 'Tren Bisnis 2024',
      excerpt: 'Sed ut perspiciatis unde...',
      date: '2024-03-10',
      category: 'Bisnis',
    },
  ];

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const recentPosts = [...articles]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const categories = ['All', 'Produktivitas', 'Marketing', 'Teknologi', 'Manajemen', 'Bisnis'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <header className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Blog & Artikel</h1>
          <p className="text-xl">Temukan wawasan terbaru seputar perkembangan perusahaan dan industri</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Artikel */}
          <section className="w-full lg:w-2/3">
            <div className="grid gap-8">
              {currentArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="p-6">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-3">
                      {article.category}
                    </span>
                    <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{new Date(article.date).toLocaleDateString('id-ID', {
                        day: 'numeric', month: 'long', year: 'numeric'
                      })}</span>
                      <button
                        onClick={() => router.push(`/article/${article.id}`)}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                      >
                        Baca Selengkapnya →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center items-center gap-4">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  ← Sebelumnya
                </button>
                <span className="text-sm text-gray-700">Halaman {currentPage} dari {totalPages}</span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                  Selanjutnya →
                </button>
              </div>
            )}
          </section>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-8">
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="Cari artikel..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Postingan Terbaru</h3>
                <ul className="space-y-3">
                  {recentPosts.map((post) => (
                    <li
                      key={post.id}
                      className="group hover:bg-gray-50 p-2 rounded transition-colors duration-200 cursor-pointer"
                      onClick={() => router.push(`/blog/${post.id}`)}
                    >
                      <div>
                        <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {new Date(post.date).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Kategori</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-800 transition-colors duration-200"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
