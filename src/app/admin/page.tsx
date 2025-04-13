'use client'
import { motion } from "framer-motion";
import { Bars3Icon, XMarkIcon, BellIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Sidebar from "@/components/UI/admin-sidebar";

export default function AdminDashboard() {
  // Variants untuk animasi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 120 
      }
    }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse" as const // Fixed the type here
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-6 max-w-screen-xl mx-auto relative overflow-hidden">
        {/* Background Decorative Elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute -top-32 -right-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-10"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute -bottom-32 -left-20 w-96 h-96 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full blur-2xl opacity-10"
        />

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen flex items-center justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center w-full flex flex-col items-center"
          >
            {/* Judul dengan efek floating */}
            <motion.div
              variants={floatingVariants}
              animate="float"
              className="mb-8"
            >
              <motion.h1
                variants={itemVariants}
                className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4"
              >
                Selamat Datang,{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Administrator
                </span>
              </motion.h1>
            </motion.div>

            {/* Deskripsi dengan animasi terpisah */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl leading-relaxed"
            >
              Silakan gunakan panel navigasi untuk mengelola konten dan pengaturan sistem
            </motion.p>

            {/* Tombol dengan hover dan tap animation */}
            <motion.div
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              <button className="relative bg-blue-600 text-white px-8 py-4 rounded-lg shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 text-lg font-semibold flex items-center gap-2">
                <span>Mulai Kelola Sistem</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.div>
              </button>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}