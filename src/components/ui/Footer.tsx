"use client";

import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { useRef, useMemo, memo } from 'react';
import { useSimpleMagneticEffect } from "@/hooks/useAdvancedAnimations";

// Memoized social links data
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
] as const;

// Memoized quick links data
const quickLinks = ["About", "Experience", "Skills", "Projects", "Contact"] as const;

// Memoized Social Link Component
const SocialLink = memo<{
  icon: typeof Github;
  href: string;
  label: string;
  color: string;
  index: number;
  isInView: boolean;
  magneticRef: { x: import('framer-motion').MotionValue<number>; y: import('framer-motion').MotionValue<number> };
    }>(({ icon: Icon, href, label, color, index, isInView, magneticRef }) => (
      <motion.a
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
    ));
SocialLink.displayName = 'SocialLink';

// Memoized Quick Link Component
const QuickLink = memo<{
  link: typeof quickLinks[number];
  index: number;
  isInView: boolean;
}>(({ link, index, isInView }) => (
  <motion.li 
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
));
QuickLink.displayName = 'QuickLink';

// Memoized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
} as const;

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
} as const;

const socialHoverVariants = {
  hover: {
    scale: 1.2,
    rotate: 5,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
} as const;

const Footer = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Simplified animations
  const magneticRef = useSimpleMagneticEffect(0.1);

  // Memoized current year to prevent recalculation
  const currentYear = useMemo(() => new Date().getFullYear(), []);
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
                variants={itemVariants}
                className="text-2xl font-heading font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              >
                Gabriel Catimbang
              </motion.h3>
              <motion.p 
                variants={itemVariants}
                className="text-white/60 max-w-xs"
              >
                DevSecOps Engineer & Full-Stack Developer passionate about building secure and scalable solutions.
              </motion.p>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <QuickLink 
                    key={link}
                    link={link}
                    index={index}
                    isInView={isInView}
                  />
                ))}
              </ul>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Connect</h4>
              <div className="flex gap-4">
                {socialLinks.map(({ icon, href, label, color }, index) => (
                  <SocialLink
                    key={label}
                    icon={icon}
                    href={href}
                    label={label}
                    color={color}
                    index={index}
                    isInView={isInView}
                    magneticRef={magneticRef}
                  />
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
              variants={itemVariants}
              className="text-white/60 text-sm text-center"
            >
              © {currentYear} Gabriel Catimbang. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
});
Footer.displayName = 'Footer';

export default Footer;