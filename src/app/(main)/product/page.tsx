'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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

const Product: React.FC = () => {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await API.get('/product');
        const filteredProducts = response.data.map((product: any) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price,
          links: product.links || [],
        }));
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Gagal mengambil produk:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleNavigate = () => {
    router.push('/product/productList');
  };

  // const handleDetail = (id: number) => {
  //   router.push(`/product/${id}`);
  // };

  return (
    <div id='product' className="scroll-mt-24 max-w-7xl mx-auto px-4 py-10 bg-white">
      <h1 className="text-4xl md:text-5xl font-bold text-black mb-16 text-center relative pb-4">
          Product Kami
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-red-600 rounded-full"></span>
        </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            // onClick={() => handleDetail(product.id)}
            className="relative group transform skew-x-[-6deg] bg-zinc-900 bg-opacity-90 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition duration-300 cursor-pointer"
          >
            <div className="transform skew-x-[6deg]">
              <div className="relative">
                <img
                  src={`http://localhost:4000${product.image}`}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 bg-zinc-900 rounded-xl text-white">
                  <div>
                    <h2 className="text-xl font-bold mb-1">{product.name}</h2>
                    <p className="text-gray-300 mb-8">{product.description}</p>
                  </div>
                  {/* Harga di kanan bawah */}
                  <span className="absolute bottom-4 right-4 text-red-500 text-sm font-bold px-4 py-2 ">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>


            {/* Dropdown link muncul saat hover */}
            {product.links?.length > 0 && (
              <div
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
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

      {/* Tombol Produk Lainnya */}
      <div className="text-center mt-10">
        <button
          onClick={handleNavigate}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition duration-300"
        >
          Produk Lainnya
        </button>
      </div>
    </div>
  );
};

export default Product;
