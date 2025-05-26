"use client";

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

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
  return (
    <footer className="relative mt-20">
      {/* Gradient Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      {/* Background with blur effect */}
      <div className="relative bg-black/20 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Gabriel Catimbang
              </h3>
              <p className="text-white/60 max-w-xs">
                DevSecOps Engineer & Full-Stack Developer passionate about building secure and scalable solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2">
                {["About", "Experience", "Skills", "Projects", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Connect</h4>
              <div className="flex gap-4">
                {socialLinks.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-white/60 ${color} transition-colors duration-200`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-6 w-6" />
                    <span className="sr-only">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-white/60 text-sm text-center">
              © {new Date().getFullYear()} Gabriel Catimbang. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 