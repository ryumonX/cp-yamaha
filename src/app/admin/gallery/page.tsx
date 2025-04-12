'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import API from '@/utils/axiosClient';
import GalleryModal from './galleryModal';

const GalleryTable = dynamic(() => import('./galleryTable'), { ssr: false });

export interface galleryData {
  id: number;
  imageUrl: string;
  title: string;
  imageFile?: any;
}

const GalleryPage = () => {
  const [data, setData] = useState<galleryData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentGallery, setCurrentGallery] = useState<galleryData | null>(null);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await API.get('/gallery');
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch galleries:', err);
    }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentGallery(null);
    setIsModalOpen(true);
  };

  const handleEdit = (gallery: galleryData) => {
    setIsEditMode(true);
    setCurrentGallery(gallery);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this gallery?')) {
      try {
        await API.delete(`/gallery/${id}`);
        fetchGalleries();
      } catch (err) {
        console.error('Failed to delete gallery:', err);
      }
    }
  };

  const handleSubmit = async (formData: galleryData) => {
    if (!formData.title || !formData.imageUrl) {
      alert('Title and image are required!');
      return;
    }
    console.log('imageUrl', formData.imageUrl)
    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('imageUrl', formData.imageFile);

      if (isEditMode && currentGallery) {
        await API.put(`/gallery/${currentGallery.id}`, form);
      } else {
        await API.post('/gallery', form, {
          headers: {
            'Content-Type': 'multipart/form-data' // <-- Don't do this manually
          }
        });
      }

      fetchGalleries();

      setIsModalOpen(false);
    } catch (err) {
      console.error('Failed to save gallery:', err);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Gallery Management</h1>
            <button
              onClick={handleAdd}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              Add Gallery
            </button>
          </div>

          <GalleryTable
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <GalleryModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isEditMode={isEditMode}
            initialData={currentGallery}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
