'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
};

const products: Product[] = [
  {
    id: 1,
    name: 'Produk A',
    description: 'Deskripsi singkat produk A.',
    image: '/images/produk-a.jpg',
    price: 150000,
  },
  {
    id: 2,
    name: 'Produk B',
    description: 'Deskripsi singkat produk B.',
    image: '/images/produk-b.jpg',
    price: 200000,
  },
  {
    id: 3,
    name: 'Produk C',
    description: 'Deskripsi singkat produk C.',
    image: '/images/produk-c.jpg',
    price: 180000,
  },
  {
    id: 4,
    name: 'Produk D',
    description: 'Deskripsi singkat produk D.',
    image: '/images/produk-d.jpg',
    price: 210000,
  },
];

const Product: React.FC = () => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push('/product/productList');
  };

  const handleDetail = (id: number) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold text-center text-black mb-10">Our Products</h1>

      {/* Grid 4 kotak */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleDetail(product.id)}
            className="cursor-pointer transform skew-x-[-6deg] bg-blue-600 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition duration-300"
          >
            <div className="transform skew-x-[6deg]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                <p className="text-blue-100 mb-4">{product.description}</p>
                <p className="font-semibold text-lg">
                  Rp {product.price.toLocaleString('id-ID')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tombol Other */}
      <div className="text-center">
        <button
          onClick={handleNavigate}
          className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300"
        >
          Other Products
        </button>
      </div>
    </div>
  );
};

export default Product;
