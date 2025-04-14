'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '@/utils/axiosClient';
import { ArrowRightIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

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

  const handleDetail = (id: number) => {
    router.push(`/product/${id}`);
  };

  const ProductCard = (product: Product) => (
    <div
      key={product.id}
      onClick={() => handleDetail(product.id)}
      className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer overflow-hidden"
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={`http://localhost:4000${product.image}`}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
        <span className="absolute bottom-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
          Rp {product.price.toLocaleString('id-ID')}
        </span>
      </div>
      <div className="p-4 bg-white">
        <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">
          {product.name}
        </h2>
        <div className="flex justify-between items-center">
          <button className="text-red-600 hover:text-red-700 font-medium flex items-center">
            Lihat Detail
            <ArrowRightIcon className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="bg-white rounded-full p-3 shadow-lg animate-bounce">
          <ShoppingCartIcon className="w-8 h-8 text-red-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div id="product" className="scroll-mt-24 max-w-7xl mx-auto px-4 py-16 bg-white">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center relative pb-4">
        Product Kami
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1.5 bg-red-600 rounded-full"></span>
      </h1>

      {products.length > 4 ? (
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ 
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          speed={600}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          pagination={{ clickable: true }}
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>{ProductCard(product)}</SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => ProductCard(product))}
        </div>
      )}
    </div>
  );
};

export default Product;
