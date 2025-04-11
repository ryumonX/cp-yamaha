import { motion, AnimatePresence } from 'framer-motion';

const LoadingOverlay = ({ isLoading }: { isLoading: boolean }) => {
  // Variants untuk animasi putaran roda motor
  const spinnerVariants = {
    hidden: { opacity: 0, rotate: 0 },
    visible: { opacity: 1, rotate: 360 },
  };

  // Pattern dots yang konsisten dengan Jumbotron
  const DotsPattern = () => (
    <svg className="absolute inset-0 h-full w-full opacity-20">
      <pattern
        id="dots-pattern"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="10" cy="10" r="1" fill="white" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#dots-pattern)" />
    </svg>
  );

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900"
        >
          {/* Background yang match dengan Jumbotron */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('/motorcycle-group.jpg')] bg-cover bg-center blur-sm" />
            <div className="absolute inset-0 bg-black/80" />
            <DotsPattern />
          </div>

          {/* Spinner Custom */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={spinnerVariants}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear"
            }}
            className="relative h-24 w-24"
          >
            {/* Roda Motor */}
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full"
            >
              {/* Lingkaran luar */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(220, 38, 38, 0.8)"
                strokeWidth="4"
                fill="transparent"
                strokeLinecap="round"
                strokeDasharray="10 15"
              />
              
              {/* Logo Yamaha kecil di tengah */}
              <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fill="#dc2626"
                fontSize="20"
                fontFamily="Arial"
                fontWeight="bold"
              >
                Y
              </text>
            </svg>

            {/* Efek bintik-bintik berputar */}
            <motion.div
              animate={{
                rotate: -360,
                transition: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear"
                }
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-red-500"
                  style={{
                    top: "10%",
                    left: "50%",
                    originX: 0.5,
                    originY: 2.5,
                    rotate: i * 60
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Text Loading */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
            className="absolute bottom-1/3 text-red-500 font-bold tracking-wider"
          >
            MEMULAI MESIN...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;