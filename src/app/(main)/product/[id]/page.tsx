'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingCartIcon, TruckIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import API from '@/utils/axiosClient';
import { useParams, useRouter } from 'next/navigation';

type Link = {
  id: number;
  url: string;
  productId: number;
};

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  links: Link[];
};

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const productId = parseInt(id as string, 10) || 4;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/product/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!product) return <div className="text-center py-20">Product not found</div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center px-5 py-2.5 border border-red-600 text-sm font-semibold rounded-md text-white bg-red-600 hover:bg-white hover:text-red-600 transition-colors duration-300"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Kembali
        </button>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={`http://localhost:4000${product.image}`}
              alt={product.name}
              className="w-full h-full object-center object-cover rounded-lg shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <h1 className="text-2xl font-semibold text-black">
              Rp{product.price.toLocaleString('id-ID')}
            </h1>

            <div className="text-gray-700 text-lg space-y-4">
              {product.description.split('\n').map((para, index) => (
                <p key={index}>{para}</p>
              ))}
            </div>

            <div className="space-y-4">
              {product.links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  className="bg-green-600 hover:bg-green-700 flex items-center justify-center px-6 py-3 border border-transparent rounded-md text-white space-x-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Beli Produk di Sini</span>
                </a>
              ))}
            </div>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <TruckIcon className="h-6 w-6 flex-shrink-0" />
                <span className="text-sm">Gratis ongkir untuk seluruh Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;