import { useState, useEffect } from 'react';

export interface ArticleData {
  id: number;
  title: string;
  content: string;
  thumbnail?: string;
  thumbnailFile?: any;
  publishedAt: string;
  authorId: number;
}

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  initialData: ArticleData | null;
  onSubmit: (data: ArticleData) => void;
}

const ArticleModal = ({
  isOpen,
  onClose,
  isEditMode,
  initialData,
  onSubmit,
}: ArticleModalProps) => {
  const [formData, setFormData] = useState<ArticleData>({
    id: 0,
    title: '',
    content: '',
    thumbnail: '',
    thumbnailFile: '',
    publishedAt: '',
    authorId: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        thumbnailFile: '',
      });
    } else {
      setFormData({
        id: 0,
        title: '',
        content: '',
        thumbnail: '',
        thumbnailFile: '',
        publishedAt: '',
        authorId: 0,
      });
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'authorId' ? parseInt(value, 10) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        thumbnail: previewUrl,
        thumbnailFile: file,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {isEditMode ? 'Edit Article' : 'Add New Article'}
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

            {/* Content */}
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-bold text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={5}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            {/* Author ID */}
            <div className="mb-4">
              <label htmlFor="authorId" className="block text-sm font-bold text-gray-700 mb-1">
                Author ID
              </label>
              <input
                type="number"
                id="authorId"
                name="authorId"
                value={formData.authorId}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
            <label htmlFor="thumbnail" className="block text-sm font-bold text-gray-700 mb-1">
                Upload Thumbnail
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required={!isEditMode}
              />

              {isEditMode && formData.thumbnail && !formData.thumbnail.startsWith('blob:') && (
                <img
                  src={`http://localhost:4000${formData.thumbnail}`}
                  alt="Existing"
                  className="mt-2 h-32 object-contain rounded"
                />
              )}

              {formData.thumbnail && formData.thumbnail.startsWith('blob:') && (
                <img
                  src={formData.thumbnail}
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

export default ArticleModal;
