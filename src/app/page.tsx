'use client';

import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';
import LoadingSplash from '@/components/ui/LoadingSplash';
import TableOfContents from '@/components/ui/TableOfContents';
import Footer from '@/components/ui/Footer';
import { staggerContainer } from '@/lib/utils';
import AboutSection from '@/components/sections/About';

// Dynamically import Three.js components with no SSR
const UnifiedBackground = dynamic(() => import('@/components/three/UnifiedBackground'), { ssr: false });
const EnhancedHeroCard = dynamic(() => import('@/components/three/EnhancedHeroCard'), { ssr: false });
const Skills = dynamic(() => import('@/components/sections/Skills'), { ssr: false });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Extended loading time for more impressive intro animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
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
            {/* Unified 3D Background - spans all sections */}
            <UnifiedBackground className="fixed inset-0 z-0" />
            
            {/* Enhanced Sidebar Navigation */}
            <TableOfContents />

            {/* Hero Section with Enhanced Card */}
            <section id="hero" className="relative h-screen flex items-center justify-start overflow-hidden">
              <EnhancedHeroCard />
            </section>

            {/* About Section */}
            <section id="about" className="relative py-20 z-10">
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
            <section id="skills" className="relative py-20 z-10">
              <div className="container mx-auto px-4">
                <Skills />
              </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="relative py-20 z-10">
              <div className="container mx-auto px-4">
                <Experience />
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="relative py-20 z-10">
              <div className="container mx-auto px-4">
                <Projects />
              </div>
            </section>

            {/* Achievements Section */}
            <section id="achievements" className="relative py-20 z-10">
              <div className="container mx-auto px-4">
                <Achievements />
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative py-20 z-10">
              <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-12 text-center font-heading">Get in Touch</h2>
                <Contact />
              </div>
            </section>

            {/* Footer */}
            <div className="relative z-10">
              <Footer />
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
