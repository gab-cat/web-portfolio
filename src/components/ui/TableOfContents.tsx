"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
      }
    );

    sections.forEach(({ id }) => {
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
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
    >
      <div className="bg-black/20 backdrop-blur-lg rounded-lg p-4 border border-white/10">
        <div className="space-y-2">
          {sections.map(({ id, label, color }) => (
            <motion.button
              key={id}
              onClick={() => handleClick(id)}
              className={`flex items-center w-full group transition-all duration-300 ${
                activeSection === id ? "text-white" : "text-white/50 hover:text-white/80"
              }`}
              whileHover={{ x: 5 }}
            >
              <div className="relative py-2 px-4">
                {/* Active indicator */}
                {activeSection === id && (
                  <motion.div
                    layoutId="activeSection"
                    className={`absolute inset-0 rounded-md bg-gradient-to-r ${color} opacity-20`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <span className="relative flex items-center gap-2">
                  <ChevronRight
                    className={`h-4 w-4 transition-transform duration-300 ${
                      activeSection === id ? "translate-x-1" : "group-hover:translate-x-1"
                    }`}
                  />
                  {label}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 