'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
    '/resource/about.png',
    '/resource/about.png',
    '/resource/about.png',
    '/resource/about.png',
    '/resource/about.png',
    '/resource/about.png',
    '/resource/about.png',
    '/resource/about.png',
];

const Gallery = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(images.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const currentImages = images.slice(startIdx, startIdx + itemsPerPage);

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <>
            {/* Title dengan ID */}
            <div id="gallery" className="text-center my-6">
                <h1 className="text-3xl font-bold text-center text-black mb-10">Gallery</h1>
            </div>

            <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 p-4">
                {currentImages.map((img, index) => (
                    <div
                        key={index}
                        className="h-40 bg-cover bg-center cursor-pointer"
                        style={{ backgroundImage: `url(${img})` }}
                        onClick={() => setSelectedImage(img)}
                    />
                ))}
            </div>

            {/* Pagination controls */}
            <div className="flex justify-center items-center gap-4 mb-4">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-sm font-medium">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            src={selectedImage}
                            alt="Enlarged"
                            className="max-w-full max-h-full rounded-lg shadow-lg"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Gallery;
