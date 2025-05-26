'use client';

import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Github , Linkedin , Mail } from 'lucide-react';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';
import LoadingSplash from '@/components/ui/LoadingSplash';
import TableOfContents from '@/components/ui/TableOfContents';
import Footer from '@/components/ui/Footer';
import { PERSONAL_INFO } from '@/lib/constants';
import { staggerContainer } from '@/lib/utils';
import AboutSection from '@/components/sections/About';
import { Button } from '@/components/ui/button';

// Dynamically import Three.js components with no SSR
const Scene = dynamic(() => import('@/components/three/Scene'), { ssr: false });
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = PERSONAL_INFO.cvPath;
    link.download = 'Gabriel_Angelo_Catimbang_CV.pdf';
    link.click();
  };

  return (
    <div className="bg-black min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingSplash key="loading" />
        ) : (
          <motion.main
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen bg-black text-white"
          >
            {/* Table of Contents */}
            <TableOfContents />

            {/* Hero Section with 3D Background */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
              <Scene className="absolute inset-0" />
              {/* Content */}
              <div className="relative z-10 text-center mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="space-y-6 w-full"
                >
                  <motion.h1
                    className="text-5xl md:text-7xl font-bold text-white max-w-5xl mx-auto mb-4"
                    style={{
                      transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                    }}
                  >
            Gabriel Angelo
                    <br />
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Catimbang
                    </span>
                  </motion.h1>

                  <div className="text-xl md:text-2xl max-w-2xl mx-auto text-white/80 h-16">
                    <TypeAnimation
                      sequence={[
                        "DevSecOps Engineer",
                        2000,
                        "Full-Stack Developer",
                        2000,
                        "Cybersecurity Specialist",
                        2000,
                        "System Administrator",
                        2000,
                      ]}
                      wrapper="span"
                      speed={50}
                      repeat={Number.POSITIVE_INFINITY}
                    />
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed"
                  >
            Passionate about building secure, scalable systems and creating innovative solutions. Currently serving as
            Webmaster at ThePILLARS Publication, with expertise in DevSecOps, cybersecurity, and full-stack development.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
                  >
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
              View My Work
                    </Button>
                    <Button onClick={handleDownloadCV} variant="outline" size="lg" className="border-white/20 text-black">
              Download Resume
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    className="flex items-center justify-center gap-6 mt-8"
                  >
                    <a
                      href="https://github.com/gab-cat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors duration-200"
                    >
                      <Github className="h-6 w-6" />
                    </a>
                    <a
                      href="https://linkedin.com/in/gabrielcatimbang"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors duration-200"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a
                      href="mailto:catimbanggabriel@gmail.com"
                      className="text-white/60 hover:text-white transition-colors duration-200"
                    >
                      <Mail className="h-6 w-6" />
                    </a>
                  </motion.div>
                </motion.div>
              </div>
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="text-center"
                >
                  <span className="block text-sm text-gray-400 mb-2">Scroll to explore</span>
                  <svg
                    className="w-6 h-6 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </svg>
                </motion.div>
              </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
              <div className="container mx-auto px-4">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  <AboutSection />
                </motion.div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 bg-gray-900">
              <div className="container mx-auto px-4">
                <Skills />
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-20 bg-gradient-to-b from-gray-900 to-black">
              <div className="container mx-auto px-4">
                <Experience />
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 bg-black">
              <div className="container mx-auto px-4">
                <Projects />
              </div>
            </section>

            {/* Achievements Section */}
            <section id="achievements" className="py-20 bg-gradient-to-b from-black to-gray-900">
              <div className="container mx-auto px-4">
                <Achievements />
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gray-900">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-12 text-center">Get in Touch</h2>
                <Contact />
              </div>
            </section>

            {/* Footer */}
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
