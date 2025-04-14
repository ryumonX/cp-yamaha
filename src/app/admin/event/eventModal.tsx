'use client';

import { useState, useEffect } from 'react';
import { getCurrentUser } from '@/utils/authMethod';

export interface eventData {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  image?: string;
  imageFile?: any;
  authorId?: number;
}

interface eventModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  initialData: eventData | null;
  onSubmit: (data: eventData) => void;
}

const EventModal = ({
  isOpen,
  onClose,
  isEditMode,
  initialData,
  onSubmit,
}: eventModalProps) => {
  const [formData, setFormData] = useState<eventData>({
    id: 0,
    title: '',
    description: '',
    location: '',
    date: '',
    image: '',
    imageFile: '',
    authorId: undefined,
  });

  const [currentUser, setCurrentUser] = useState<{ id: number; username: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        imageFile: '',
        date: initialData.date.split('T')[0], 
      });
    } else {
      setFormData({
        id: 0,
        title: '',
        description: '',
        location: '',
        date: '',
        image: '',
        imageFile: '',
        authorId: undefined,
      });
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData(prev => ({
      ...prev,
      image: file ? URL.createObjectURL(file) : prev.image,
      imageFile: file || prev.imageFile,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      alert('User belum login!');
      return;
    }

    const dataWithAuthor = {
      ...formData,
      authorId: currentUser.id,
      image: formData.image ? formData.image : formData.image || '', 
    };

    if (!isEditMode && !formData.imageFile) {
      alert('Image is required!');
      return;
    }

    onSubmit(dataWithAuthor);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {isEditMode ? 'Edit Event' : 'Add New Event'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-bold text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Location */}
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-bold text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Date */}
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-bold text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label htmlFor="image" className="block text-sm font-bold text-gray-700 mb-1">
                Upload Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required={!isEditMode}
              />

              {/* Preview image */}
              {isEditMode && formData.image && !formData.image.startsWith('blob:') && (
                <img
                  src={`http://localhost:4000${formData.image}`}
                  alt="Existing"
                  className="mt-2 h-32 object-contain rounded"
                />
              )}

              {/* Preview image */}
              {formData.image && formData.image.startsWith('blob:') && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2 h-32 object-contain rounded"
                />
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {isEditMode ? 'Update' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
