'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import API from '@/utils/axiosClient';
import { useRouter } from 'next/navigation';
import './ArticleDetail.css';


interface Article {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  publishedAt: string;
  author: {
    name: string;
  };
}


const ArticleDetail: React.FC = () => {
  const { id } = useParams(); // Get the dynamic id from the route
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        // Sesuaikan endpoint API jika perlu
        const res = await API.get(`/article/${id}`);
        setArticle(res.data);
      } catch (error) {
        console.error('Gagal mengambil data artikel:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Memuat artikel...</div>;
  }

  if (!article) {
    return <div className="text-center py-10 text-red-600">Artikel tidak ditemukan.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900">
  {/* Header */}
  <header className="bg-gradient-to-b from-black to-gray-800 text-white py-16 border-b-4 border-red-600 relative overflow-hidden">
    <div className="absolute inset-0 bg-opacity-20 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]" />
    <div className="container mx-auto px-4 relative">
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center text-red-500 hover:text-red-400 transition-all font-bold uppercase text-sm tracking-wider group"
      >
        <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Kembali ke Garasi
      </button>

      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-red-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">{article.title}</h1>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-300">
          <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-mono">Oleh: {article.author.name}</span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {new Date(article.publishedAt).toLocaleDateString('id-ID', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </span>
        </div>
      </div>
    </div>
  </header>

  {/* Main Content */}
  <main className="container mx-auto px-4 py-12">
    <article className="w-full bg-gray-800 rounded-lg shadow-2xl border-2 border-red-600 p-1 lg:p-2">
      <div className="flex flex-col lg:flex-row gap-8 bg-gray-900 rounded-lg p-6 lg:p-8">
        {/* Thumbnail */}
        <div className="flex-shrink-0 relative group">
          <div className="absolute inset-0 border-4 border-red-600 rounded-lg transform group-hover:rotate-2 transition-all duration-300" />
          <img
            src={`http://localhost:4000${article.thumbnail}`}
            alt={article.title}
            className="w-full lg:w-[450px] h-auto rounded-lg object-cover relative z-10 transform group-hover:-rotate-1 transition-all duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex-grow text-gray-300">
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ 
              __html: article.content.replace(
                /<p>/g, 
                '<p class="text-gray-300">'
              ) 
            }} 
          />
        </div>
      </div>
    </article>
  </main>
</div>
  );
};

export default ArticleDetail;
