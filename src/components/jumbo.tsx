import { motion } from 'framer-motion';

const Jumbotron = () => {
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const slideInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  // SVG pattern untuk bintik-bintik
  const DotsPattern = () => (
    <svg className="absolute inset-0 h-full w-full opacity-20">
      <pattern
        id="dots-pattern"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
      >
        <circle cx="10" cy="10" r="1" fill="white" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dots-pattern)" />
    </svg>
  );

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-900">
      {/* Background dengan efek parallax dan overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('/motorcycle-group.jpg')] bg-cover bg-center"
        style={{
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <DotsPattern /> {/* Tambahkan pattern bintik-bintik */}
      </motion.div>

      {/* Konten utama */}
      <div className="relative flex h-full items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
            className="flex flex-col items-center"
          >
            {/* Nama klub */}
            <motion.div
              variants={slideInFromLeft}
              transition={{ duration: 0.8 }}
              className="mb-4 self-start md:self-center"
            >
              <h2 className="text-xl font-semibold text-red-500 md:text-2xl">
                KLUB MOTOR
              </h2>
            </motion.div>

            {/* Judul utama */}
            <motion.h1
              variants={fadeInVariants}
              transition={{ duration: 0.8 }}
              className="mb-6 text-5xl font-bold text-white md:text-7xl lg:text-8xl"
            >
              <span className="block">YAMAHA</span>
              <span className="text-red-500">RIDERS</span>
            </motion.h1>

            {/* Garis pemisah animasi */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '200px' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="my-6 h-1 bg-red-500"
            />

            {/* Deskripsi */}
            <motion.p
              variants={fadeInVariants}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-8 max-w-2xl text-lg text-gray-300 md:text-xl"
            >
              Komunitas pengendara Yamaha yang bersatu dalam semangat kebersamaan,
              petualangan, dan kecintaan terhadap dunia otomotif.
            </motion.p>

            {/* Container tombol */}
            <motion.div
              variants={fadeInVariants}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(220, 38, 38, 0.7)" // glow effect
                }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg bg-red-600 px-8 py-3 font-bold text-white transition-all hover:bg-red-700"
              >
                Gabung Komunitas
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg border-2 border-white bg-transparent px-8 py-3 font-bold text-white transition-all hover:bg-white hover:text-gray-900"
              >
                Event Kami
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Elemen dekoratif bawah */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-0 right-0 flex justify-center"
      >
        <motion.svg
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
};

export default Jumbotron;