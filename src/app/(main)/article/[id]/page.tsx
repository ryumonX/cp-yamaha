'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import API from '@/utils/axiosClient';
import { useRouter } from 'next/navigation';

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
            <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
            <div className="flex items-center text-sm space-x-4">
              <span>{article.author.name}</span>
              <span>{new Date(article.publishedAt).toLocaleDateString('id-ID', {
                day: 'numeric', month: 'long', year: 'numeric'
              })}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <article className="w-full bg-white rounded-lg shadow-md p-6 lg:p-8">
          {/* Thumbnail */}
          <div className="mb-8">
          <img src={`http://localhost:4000${article.thumbnail}`}
             alt={article.title} className="w-450 h-150 rounded-lg" />
          </div>

          {/* Content */}
          <div dangerouslySetInnerHTML={{ __html: article.content }} />

        </article>
      </main>
    </div>
  );
};

export default ArticleDetail;
