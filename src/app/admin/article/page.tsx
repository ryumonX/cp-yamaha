'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import API from '@/utils/axiosClient';
import ArticleModal from './articleModal';
import Sidebar from '@/components/UI/admin-sidebar';

const ArticleTable = dynamic(() => import('./articleTable'), { ssr: false });

export interface ArticleData {
  id: number;
  title: string;
  content: string;
  thumbnail?: string; // <- sudah boleh undefined
  thumbnailFile?: any;
  publishedAt: string;
  authorId: number;
}

const ArticlePage = () => {
  const [data, setData] = useState<ArticleData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<ArticleData | null>(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await API.get('/article');
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
    }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentArticle(null);
    setIsModalOpen(true);
  };

  const handleEdit = (article: ArticleData) => {
    setIsEditMode(true);
    setCurrentArticle(article);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await API.delete(`/article/${id}`);
        fetchArticles();
      } catch (err) {
        console.error('Failed to delete article:', err);
      }
    }
  };

  const handleSubmit = async (formData: ArticleData) => {
    if (!formData.title || !formData.thumbnailFile) {
      alert('Title and thumbnail are required!');
      return;
    }

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('content', formData.content);
      form.append('authorId', String(formData.authorId));
      form.append('thumbnail', formData.thumbnailFile);

      if (isEditMode && currentArticle) {
        await API.put(`/article/${currentArticle.id}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data', // Optional, can be omitted
          },
        });
      } else {
        await API.post('/article', form, {
          headers: {
            'Content-Type': 'multipart/form-data', // Optional, can be omitted
          },
        });
      }

      fetchArticles();
      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save article:', err);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
    <Sidebar />

    <div className="flex-1 p-6 max-w-screen-xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Article Management</h1>
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              Add Article
            </button>
          </div>

          <ArticleTable
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <ArticleModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isEditMode={isEditMode}
            initialData={currentArticle}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
