import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};


const floatingDotsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: [0.2, 0.5, 0.2],
    y: -20,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const logoPathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};

const glowVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function LoadingSplash() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("INITIALIZING");
  
  useEffect(() => {
    const texts = ["INITIALIZING", "LOADING ASSETS", "PREPARING DATA", "ALMOST READY"];
    let currentIndex = 0;
    
    const textInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length;
      setLoadingText(texts[currentIndex]);
    }, 800);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            suppressHydrationWarning
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            variants={floatingDotsVariants}
            custom={i}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Central Loading Animation */}
      <div className="relative flex flex-col items-center">
        {/* Logo Container */}
        <div className="relative w-48 h-48 mb-12">
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-2xl"
            variants={glowVariants}
          />
          
          {/* Logo SVG */}
          <motion.svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            initial="hidden"
            animate="visible"
          >
            {/* Outer Circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              className="stroke-white/20 fill-none"
              strokeWidth="0.5"
              variants={logoPathVariants}
            />
            
            {/* G Path */}
            <motion.path
              d="M35 35C35 35 45 35 55 35C65 35 65 45 65 50C65 55 65 65 55 65C45 65 35 65 35 65L35 35"
              className="stroke-white fill-none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={logoPathVariants}
            />
            
            {/* C Path */}
            <motion.path
              d="M45 45C45 45 55 45 60 45C65 45 65 50 65 55C65 60 60 65 55 65C50 65 45 65 45 65"
              className="stroke-white fill-none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={logoPathVariants}
            />

            {/* Decorative Lines */}
            <motion.line
              x1="30"
              y1="30"
              x2="70"
              y2="30"
              className="stroke-white/10"
              strokeWidth="0.5"
              variants={logoPathVariants}
            />
            <motion.line
              x1="30"
              y1="70"
              x2="70"
              y2="70"
              className="stroke-white/10"
              strokeWidth="0.5"
              variants={logoPathVariants}
            />
          </motion.svg>

          {/* Rotating Ring */}
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="48"
                className="stroke-white/5 fill-none"
                strokeWidth="0.5"
                strokeDasharray="1,3"
              />
            </svg>
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          className="text-xl font-bold text-white/80 mb-8 h-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {loadingText}
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.div
          className="text-sm text-white/60 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {progress}%
        </motion.div>
      </div>
    </motion.div>
  );
} 