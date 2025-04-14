'use client'
import React, { useState, useEffect } from 'react';
import API from '@/utils/axiosClient';
import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/solid';

const Gallery = () => {
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        API.get('/gallery')
            .then((response) => {
                const fetchedImages = response.data.map((item: { imageUrl: string }) =>
                    `http://localhost:4000${item.imageUrl}`
                );
                setImages(fetchedImages);
            })
            .catch((error) => {
                console.error('Error fetching images:', error);
            });
    }, []);

    return (
        <section className="py-12 px-4 md:px-8 bg-gray-50">
            <div id="gallery" className="scroll-mt-24 mb-12">
                <div className="flex items-center justify-center mb-6">
                    <div className="flex-1 border-t-2 border-amber-500"></div>
                    <h1 className="text-4xl md:text-5xl font-bold text-center px-6 text-gray-800">
                        Gallery Kami
                    </h1>
                    <div className="flex-1 border-t-2 border-amber-500"></div>
                </div>
                <p className="text-center text-gray-600 text-lg mt-2">
                    Kita Bukan Sekadar Club, Kita Keluarga di Aspal
                </p>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                {images.map((img, index) => (
                    <motion.div
                        key={index}
                        className="relative group cursor-pointer aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                        whileHover={{ scale: 1.02 }}
                        onClick={() => setSelectedImage(img)}
                    >
                        <img
                            src={img}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/30" />
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-amber-500 transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <XMarkIcon className="h-8 w-8" />
                        </button>

                        <motion.div
                            className="relative max-w-6xl max-h-[90vh]"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <img
                                src={selectedImage}
                                alt="Enlarged"
                                className="rounded-xl shadow-2xl object-contain max-h-[80vh]"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div className="absolute inset-0 border-4 border-white/20 rounded-xl pointer-events-none" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;