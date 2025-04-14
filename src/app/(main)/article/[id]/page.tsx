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
  const { id } = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchArticle = async () => {
      try {
        const res = await API.get(`/article/${id}`);
        setArticle(res.data);
      } catch (error) {
        console.error('Failed to fetch article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading article...</div>;
  }

  if (!article) {
    return <div className="text-center py-10 text-red-600">Article not found.</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="relative bg-gradient-to-br from-black via-blue-900 to-blue-700 text-white py-20 border-b-8 border-blue-500 overflow-hidden">
        <div className="absolute inset-0 bg-opacity-20 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={() => router.back()}
              className="mb-8 inline-flex items-center text-blue-300 hover:text-white transition-all font-semibold uppercase text-sm tracking-wide group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Homepage
            </button>

            <div className="space-y-6">
              <h1 className="text-5xl font-bold leading-tight text-white drop-shadow-lg">{article.title}</h1>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-white/90">
                <div className="flex items-center bg-blue-500/20 px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">{article.author.name}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time className="font-medium">
                    {new Date(article.publishedAt).toLocaleDateString('id-ID', {
                      day: 'numeric', month: 'long', year: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <article className="w-full bg-white rounded-none shadow-none border-t border-b border-gray-300">
          {/* Thumbnail */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <img
              src={`http://localhost:4000${article.thumbnail}`}
              alt={article.title}
              className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12 space-y-8">
            <div className="prose prose-lg max-w-none text-black">
              <div
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: article.content
                    .replace(/<h1/g, '<h1 class="text-blue-600 mb-6"')
                    .replace(/<h2/g, '<h2 class="text-2xl font-bold text-black mt-8 mb-4"')
                    .replace(/<h3/g, '<h3 class="text-xl font-semibold text-black mt-6 mb-3"')
                    .replace(/<p(?![^>]*class=)/g, '<p class="mb-6 leading-relaxed text-gray-800 text-lg"')
                    .replace(/<p class="([^"]*)"/g, '<p class="$1 mb-6 leading-relaxed text-gray-800 text-lg"')
                    .replace(/<ul/g, '<ul class="list-disc pl-6 mb-6"')
                    .replace(/<ol/g, '<ol class="list-decimal pl-6 mb-6"')
                    .replace(/<li/g, '<li class="mb-2"')
                    .replace(/<a/g, '<a class="text-blue-600 hover:text-blue-500 underline"')
                    .replace(/<strong/g, '<strong class="font-semibold text-black"')
                }}
              />
            </div>

            <div className="pt-8 border-t border-gray-300">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center text-blue-600 hover:text-blue-500 font-semibold transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Previous Page
              </button>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default ArticleDetail;
