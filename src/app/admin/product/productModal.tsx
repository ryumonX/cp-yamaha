import { useState, useEffect } from 'react';

export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  imageFile?: File;
  links?: { id: number; url: string; productId: number }[];  // Use object type for links
  createdAt?: string;
  updatedAt?: string;
}

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditMode: boolean;
  initialData: ProductData | null;
  onSubmit: (data: ProductData) => void;
}

const ProductModal = ({
  isOpen,
  onClose,
  isEditMode,
  initialData,
  onSubmit,
}: ProductModalProps) => {
  const [formData, setFormData] = useState<ProductData>({
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    links: [],  // Pastikan links adalah array kosong sebagai default
    imageFile: undefined,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        links: initialData.links ?? [], // Pastikan links selalu array
        imageFile: undefined,  // Reset the imageFile to undefined when editing
      });
    } else {
      setFormData({
        id: 0,
        name: '',
        description: '',
        price: 0,
        image: '',
        links: [], // Reset ke array kosong
        imageFile: undefined,
      });
    }
  }, [initialData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const updatedLinks = [...(formData.links ?? [])];
    updatedLinks[index].url = e.target.value; // Update the URL of the specific link
    setFormData(prev => ({
      ...prev,
      links: updatedLinks,
    }));
  };

  const handleAddLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...(prev.links ?? []), { id: Date.now(), url: '', productId: prev.id }] // Generate unique id for new link
    }));
  };

  const handleRemoveLink = (index: number) => {
    const updatedLinks = (formData.links ?? []).filter((_, idx) => idx !== index);
    setFormData(prev => ({
      ...prev,
      links: updatedLinks,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData(prev => ({
        ...prev,
        image: previewUrl,
        imageFile: file,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataWithPrice = {
      ...formData,
      price: parseFloat(formData.price.toString()),
    };
    onSubmit(formDataWithPrice);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
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

            {/* Links */}
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">Product Links</label>
              {(formData.links ?? []).map((link, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => handleLinkChange(e, index)}
                    placeholder="Enter link"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(index)}
                    className="ml-2 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddLink}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2"
              >
                Add Link
              </button>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
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
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Preview"
                  className="mt-2 h-32 object-contain rounded"
                />
              )}
            </div>

            {/* Buttons */}
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

export default ProductModal;
