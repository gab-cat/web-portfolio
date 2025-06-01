"use client";

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Download, ArrowDown, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PERSONAL_INFO } from '@/lib/constants';

export default function EnhancedHeroCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for 3D effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  
  const springConfig = { stiffness: 150, damping: 30 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleMouseLeave = () => {
      mouseX.set(0);
      mouseY.set(0);
    };

    const card = cardRef.current;
    if (card) {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
      
      return () => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [mouseX, mouseY]);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = PERSONAL_INFO.cvPath;
    link.download = 'Gabriel_Angelo_Catimbang_CV.pdf';
    link.click();
  };

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center justify-between w-full min-h-screen px-4 md:px-8 lg:px-16">
      <div className="w-full max-w-8xl grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Column - Hero Card */}
        <motion.div
          ref={cardRef}
          className="relative"
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, y: 100, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            ease: [0.23, 1, 0.32, 1],
            delay: 0.5 
          }}
        >
          {/* Floating background elements */}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transform: "translateZ(-50px)" }}
          />

          <Card className="relative holographic-card rounded-2xl overflow-hidden">
            {/* Animated mesh gradient background */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/30" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            <CardContent className="relative p-8 md:p-12 space-y-6" style={{ transform: "translateZ(20px)" }}>
              {/* Title with typewriter effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <motion.p 
                  className="text-blue-400 font-semibold text-lg tracking-wide uppercase"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                >
                  Hello, I&apos;m
                </motion.p>
                
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mt-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                >
                  <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                    Gabriel Angelo
                  </span>
                </motion.h1>
                
                <motion.h2 
                  className="text-xl md:text-2xl text-gray-300 mt-4 font-light"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                >
                  {PERSONAL_INFO.title}
                </motion.h2>
              </motion.div>

              {/* Bio */}
              <motion.p 
                className="text-gray-400 text-lg leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                Specializing in DevSecOps, full-stack development, and cloud system administration. 
                Building secure, scalable digital solutions with expertise in CI/CD pipelines and infrastructure management.
              </motion.p>

              {/* Contact info */}
              <motion.div 
                className="flex flex-wrap gap-4 text-sm text-gray-400"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span>{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={handleDownloadCV}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download CV
                  </Button>
                </motion.div>

                {/* Social links */}
                <div className="flex gap-3">
                  <motion.a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotateY: 180 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="h-5 w-5" />
                  </motion.a>
                  
                  <motion.a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotateY: 180 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="h-5 w-5" />
                  </motion.a>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Column - Call to Action (Outside Card) */}
        <motion.div 
          className="space-y-8 ml-auto"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          {/* CTA Header */}
          <div className="space-y-4">
            <motion.h3 
              className="text-xl md:text-4xl lg:text-3xl font-bold text-white leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.4, duration: 0.8 }}
            >
              Ready to Build
              <span className="block font-heading bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Something Amazing?
              </span>
            </motion.h3>
            
            <motion.p 
              className="text-gray-300 text-base leading-relaxed max-w-lg"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.6, duration: 0.8 }}
            >
              Let&apos;s collaborate on your next project. From concept to deployment, 
              I deliver secure, scalable solutions that drive results.
            </motion.p>
          </div>

          {/* Key Selling Points */}
          <motion.div 
            className="space-y-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.8 }}
          >
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-blue-400/50"></div>
              <p className="text-gray-300 text-sm">
                <span className="text-white font-bold">Zero-downtime deployments</span> with advanced CI/CD pipelines
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-purple-400/50"></div>
              <p className="text-gray-300 text-sm">
                <span className="text-white font-bold">Enterprise-grade security</span> built into every solution
              </p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0 shadow-lg shadow-blue-400/50"></div>
              <p className="text-gray-300 text-sm">
                <span className="text-white font-bold">Cloud-native architecture</span> for maximum scalability
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 3, duration: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full max-w-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-5 rounded-xl font-heading font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl pulse-glow"
              >
                Let&apos;s Work Together
              </Button>
            </motion.div>
            
            <motion.p 
              className="text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.2, duration: 0.8 }}
            >
              Available for freelance projects • Fast response guaranteed
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.button
          onClick={scrollToNext}
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="h-5 w-5" />
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute -bottom-20 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <motion.button
          onClick={scrollToNext}
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors duration-300"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ArrowDown className="h-5 w-5" />
        </motion.button>
      </motion.div>
    </div>
  );
}
