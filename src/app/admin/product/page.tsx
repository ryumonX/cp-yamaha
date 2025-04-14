'use client';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import API from '@/utils/axiosClient';
import ProductModal from './productModal';
import Sidebar from '@/components/UI/admin-sidebar';

const ProductTable = dynamic(() => import('./productTable'), { ssr: false });

export interface ProductData {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  imageFile?: File;
  links?: { id: number; url: string; productId: number }[];
  createdAt?: string;
  updatedAt?: string;
}

const ProductPage = () => {
  const [data, setData] = useState<ProductData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductData | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/product');
      setData(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product: ProductData) => {
    setIsEditMode(true);
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await API.delete(`/product/${id}`);

        window.location.reload(); 
      } catch (err) {
        console.error('Failed to delete product:', err);
      }
    }
  };

  const handleSubmit = async (formData: ProductData) => {
    if (!formData.name || !formData.links || formData.links.length === 0) {
      alert('Name, image, and links are required!');
      return;
    }
  
    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('description', formData.description);
      form.append('price', formData.price.toString());
  
      if (formData.imageFile) {
        form.append('image', formData.imageFile);
      } else if (formData.image) {
        form.append('image', formData.image);
      } else {
        alert('Image is required!');
        return;
      }
  
      formData.links.forEach((link) => {
        form.append('links[]', link.url);
      });
  
      if (isEditMode && currentProduct) {
        await API.put(`/product/${currentProduct.id}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await API.post('/product', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
  
      window.location.reload(); 
    } catch (err) {
      console.error('Failed to save product:', err);
      alert('Something went wrong. Please try again later.');
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100">
    <Sidebar />

    <div className="flex-1 p-6 max-w-screen-xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
            <button
              onClick={handleAdd}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
            >
              Add Product
            </button>
          </div>

          <ProductTable
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <ProductModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            isEditMode={isEditMode}
            initialData={currentProduct}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
