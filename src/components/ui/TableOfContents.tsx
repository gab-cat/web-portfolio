"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: "about", label: "About Me", color: "from-blue-400 to-purple-400" },
  { id: "skills", label: "Skills", color: "from-pink-400 to-orange-400" },
  { id: "experience", label: "Experience", color: "from-purple-400 to-pink-400" },
  { id: "projects", label: "Projects", color: "from-orange-400 to-yellow-400" },
  { id: "achievements", label: "Achievements", color: "from-yellow-400 to-green-400" },
  { id: "contact", label: "Contact", color: "from-green-400 to-blue-400" },
];

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState("");
  const [isInHeroSection, setIsInHeroSection] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            // Hide navigation when in hero section
            setIsInHeroSection(entry.target.id === "hero");
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
      }
    );

    // Observe all sections including hero
    const allSections = ["hero", ...sections.map(s => s.id)];
    allSections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -100, rotateY: -45 }}
      animate={{ 
        opacity: isInHeroSection ? 0 : 1, 
        x: isInHeroSection ? -100 : 0, 
        rotateY: isInHeroSection ? -45 : 0,
        pointerEvents: isInHeroSection ? "none" : "auto"
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.23, 1, 0.32, 1],
        staggerChildren: 0.1
      }}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div 
        className="bg-black/30 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl"
        whileHover={{ 
          scale: 1.02, 
          rotateY: 2,
          boxShadow: "0 25px 50px rgba(79, 70, 229, 0.3)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Glowing background effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <div className="space-y-3 relative">
          <motion.h3 
            className="text-sm font-heading font-semibold text-white/70 mb-4 tracking-wider uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Navigation
          </motion.h3>
          {sections.map(({ id, label, color }, index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -20, rotateX: -30 }}
              animate={{ opacity: 1, x: 0, rotateX: 0 }}
              transition={{ 
                delay: 0.1 * index,
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1]
              }}
            >
              <motion.button
                onClick={() => handleClick(id)}
                className={`flex items-center w-full group transition-all duration-500 relative overflow-hidden rounded-lg ${
                  activeSection === id ? "text-white" : "text-white/50 hover:text-white/90"
                }`}
                whileHover={{ 
                  x: 8, 
                  scale: 1.02,
                  rotateY: 5,
                  transformOrigin: "left center"
                }}
                whileTap={{ scale: 0.95 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="relative py-3 px-4 w-full">
                  {/* Active indicator with enhanced animations */}
                  {activeSection === id && (
                    <motion.div
                      layoutId="activeSection"
                      className={`absolute inset-0 rounded-lg bg-gradient-to-r ${color} opacity-20`}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400, 
                        damping: 30,
                        duration: 0.6 
                      }}
                      initial={false}
                    />
                  )}
                  
                  {/* Hover glow effect */}
                  <motion.div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r ${color} opacity-0 blur-sm`}
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <span className="relative flex items-center gap-3 font-medium">
                    <motion.div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${color}`}
                      animate={{
                        scale: activeSection === id ? [1, 1.3, 1] : 1,
                        opacity: activeSection === id ? [0.7, 1, 0.7] : 0.4,
                      }}
                      transition={{
                        duration: 2,
                        repeat: activeSection === id ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.span
                      className="text-sm tracking-wide"
                      animate={{
                        x: activeSection === id ? 2 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {label}
                    </motion.span>
                  </span>
                  
                  {/* Interactive particle effect on hover */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    whileHover={{
                      background: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${color.includes('blue') ? 'rgba(79, 70, 229, 0.1)' : 'rgba(124, 58, 237, 0.1)'} 0%, transparent 70%)`,
                    }}
                  />
                </div>
              </motion.button>
            </motion.div>
          ))}
        </div>
        
        {/* Floating elements */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
} 