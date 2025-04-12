'use client';

import React from 'react';
import Navbar from '@/components/navbar';
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  tags: string[];
};

const products: Product[] = [
  {
    id: 1,
    name: 'Produk A',
    description: 'Deskripsi singkat produk A.',
    image: '/images/produk-a.jpg',
    price: 150000,
    tags: ['Elektronik', 'Baru'],
  },
  {
    id: 2,
    name: 'Produk B',
    description: 'Deskripsi singkat produk B.',
    image: '/images/produk-b.jpg',
    price: 200000,
    tags: ['Fashion', 'Diskon'],
  },
  {
    id: 3,
    name: 'Produk C',
    description: 'Deskripsi singkat produk C.',
    image: '/images/produk-c.jpg',
    price: 180000,
    tags: ['Aksesoris'],
  },
  {
    id: 4,
    name: 'Produk D',
    description: 'Deskripsi singkat produk D.',
    image: '/images/produk-d.jpg',
    price: 210000,
    tags: ['Rumah Tangga', 'Rekomendasi'],
  },
];

const allTags = Array.from(
  new Set(products.flatMap((product) => product.tags))
);

const ProductListPage: React.FC = () => {
  const router = useRouter();

  const handleDetail = (id: number) => {
    router.push(`/products/${id}`);
  };

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Our Products</h1>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full py-2 px-4 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => console.log(e.target.value)}
            />
            <button className="absolute right-3 text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tag global */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {allTags.map((tag, index) => (
            <button
              key={index}
              className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full shadow-sm hover:bg-blue-200 transition duration-200"
              onClick={() => console.log(`Klik tag: ${tag}`)}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Grid produk */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleDetail(product.id)}
              className="cursor-pointer transform skew-x-[-6deg] bg-gray-800 bg-opacity-90 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition duration-300"
            >
              <div className="transform skew-x-[6deg]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-white">
                  <h2 className="text-xl font-bold mb-1">{product.name}</h2>
                  <p className="text-gray-300 mb-2">{product.description}</p>
                  <p className="font-semibold text-red-400 text-lg mb-3">
                    Rp {product.price.toLocaleString('id-ID')}
                  </p>

                  {/* Tag per produk */}
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-block bg-white text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
