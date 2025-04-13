'use client';
import React, { useState, useEffect } from 'react';
import API from '@/utils/axiosClient';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

interface Article {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  publishedAt: string;
  author: {
    name: string;
  };
}

const BlogPage: React.FC = () => {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 3;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await API.get('/article'); // ganti ini ke endpoint kamu yang sebenarnya
        setArticles(res.data);
      } catch (error) {
        console.error('Gagal mengambil artikel:', error);
      }
    };

    fetchArticles();
  }, []);

  // Pagination logic
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const recentPosts = [...articles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <header className="bg-black py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4 text-red-600">Blog & Artikel</h1>
          <p className="text-xl text-white">Temukan wawasan terbaru seputar perkembangan perusahaan dan industri</p>
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
                  <img src={`http://localhost:4000${article.thumbnail}`}
                    alt={article.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span>Oleh <strong>{article.author.name}</strong></span>
                      <span>{new Date(article.publishedAt).toLocaleDateString('id-ID', {
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
                      onClick={() => router.push(`/article/${post.id}`)}
                    >
                      <div>
                        <h4 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                          {post.title}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {new Date(post.publishedAt).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'long', year: 'numeric'
                          })}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
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
