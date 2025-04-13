'use client';

import React, { useEffect, useState } from 'react';
import API from '@/utils/axiosClient';

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
  links: Link[];
};

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get<Product[]>('/product');
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen py-10 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
      PRODUK KAMI
      </h1>

      {/* Grid produk */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative group transform skew-x-[-6deg] bg-gray-800 bg-opacity-90 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition duration-300"
          >
            <div className="transform skew-x-[6deg]">
              <img
                src={`http://localhost:4000${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex items-center justify-between bg-zinc-900 rounded-xl text-white">
                <div>
                  <h2 className="text-xl font-bold mb-1">{product.name}</h2>
                  <p className="text-gray-300 mb-2">{product.description}</p>
                </div>
                <div className="ml-4">
                  <span className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

            </div>

            {/* Hover icon + links */}
            {product.links?.length > 0 && (
              <div className="absolute top-2 right-2 group-hover:opacity-100 opacity-0 transition-opacity duration-300">
                <div className="relative">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="bg-gradient-to-br from-red-700 to-black text-white p-2 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
                    title="Lihat pilihan pembelian"
                  >
                    🛒
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-[#111] text-sm text-white shadow-xl rounded-md z-10 overflow-hidden border border-red-600">
                    <div className="px-4 py-2 font-semibold text-red-500 border-b border-red-600 bg-black">
                      Pilih Toko
                    </div>
                    {product.links.map((link) => (
                      <a
                        key={link.id}
                        href={
                          link.url.startsWith('http') ? link.url : `https://${link.url}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-2 hover:bg-red-700 hover:text-white transition-colors duration-200"
                        onClick={(e) => e.stopPropagation()}
                      >
                        🔗 Link pembelian
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
