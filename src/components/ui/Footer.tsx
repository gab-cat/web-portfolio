"use client";

import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useRef } from 'react';
import { useMagneticEffect, useTextReveal } from "@/hooks/useAdvancedAnimations";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/yourusername",
    label: "GitHub",
    color: "hover:text-purple-400",
  },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/yourusername",
    label: "LinkedIn",
    color: "hover:text-blue-400",
  },
  {
    icon: Twitter,
    href: "https://twitter.com/yourusername",
    label: "Twitter",
    color: "hover:text-sky-400",
  },
  {
    icon: Mail,
    href: "mailto:your.email@example.com",
    label: "Email",
    color: "hover:text-pink-400",
  },
];

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Advanced animations

  const textReveal = useTextReveal();
  const magneticRef = useMagneticEffect(0.1);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const socialHoverVariants = {
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };
  return (
    <footer className="relative mt-20" ref={ref}>
      
      {/* Background with blur effect */}
      <motion.div 
        className="relative bg-black/10 backdrop-blur-lg"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="space-y-4">
              <motion.h3 
                {...textReveal}
                className="text-2xl font-heading font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              >
                Gabriel Catimbang
              </motion.h3>
              <motion.p 
                {...textReveal}
                className="text-white/60 max-w-xs"
              >
                DevSecOps Engineer & Full-Stack Developer passionate about building secure and scalable solutions.
              </motion.p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2">
                {["About", "Experience", "Skills", "Projects", "Contact"].map((link, index) => (
                  <motion.li 
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-white/60 hover:text-blue-400 transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Connect</h4>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, href, label, color }, index) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-white/60 ${color} transition-colors duration-200`}
                    variants={socialHoverVariants}
                    whileHover="hover"
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    style={{ x: magneticRef.x, y: magneticRef.y }}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="sr-only">{label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <motion.p 
              {...textReveal}
              className="text-white/60 text-sm text-center"
            >
              © {new Date().getFullYear()} Gabriel Catimbang. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
} 