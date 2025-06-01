"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Server, Code, Smartphone, Database, Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTextReveal, useAdvancedScrollAnimations } from "@/hooks/useAdvancedAnimations";

const skillCategories = [
  {
    title: "DevSecOps",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    skills: [
      "Docker",
      "CI/CD Pipelines",
      "AWS Cloud",
      "Linux Administration",
      "Nginx",
      "Security Automation",
    ],
  },
  {
    title: "Cybersecurity",
    icon: Server,
    color: "from-blue-500 to-cyan-500",
    skills: [
      "Incident Response",
      "Web Exploitation",
      "Windows Investigation",
      "Security Analysis",
      "Penetration Testing",
      "CTF Competitions",
    ],
  },
  {
    title: "Full-Stack Development",
    icon: Code,
    color: "from-purple-500 to-pink-500",
    skills: ["Nuxt.js", "Vue.js", "Express.js", "Node.js", "JavaScript", "HTML/CSS"],
  },
  {
    title: "Database & Cloud",
    icon: Database,
    color: "from-green-500 to-teal-500",
    skills: [
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "AWS Deployment",
      "Cloudflare",
      "Database Design",
    ],
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    color: "from-yellow-500 to-orange-500",
    skills: [
      "React Native",
      "Mobile UI/UX",
      "Cross-platform Development",
      "App Store Deployment",
    ],
  },
  {
    title: "System Administration",
    icon: Terminal,
    color: "from-indigo-500 to-purple-500",
    skills: [
      "Linux Systems",
      "Server Management",
      "Network Configuration",
      "Performance Optimization",
      "Monitoring",
      "Troubleshooting",
    ],
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Advanced animations
  const scrollAnimations = useAdvancedScrollAnimations();
  const textReveal = useTextReveal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -15,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const skillItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const iconVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="skills" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={cardVariants} className="text-center">
            <motion.h2 
              {...textReveal}
              className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
            >
              Technical{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Skills
              </span>
            </motion.h2>
            <motion.p 
              {...textReveal}
              className="text-white/70 text-lg max-w-2xl mx-auto"
            >
              A comprehensive toolkit spanning DevSecOps, cybersecurity, and
              full-stack development
            </motion.p>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-4"
              style={{ scaleX: scrollAnimations.scale }}
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div 
                  key={category.title} 
                  variants={cardVariants}
                  whileHover="hover"
                >
                  <Card className="holographic-card bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group h-full">
                    <CardContent className="p-6 space-y-4 relative">
                      {/* Floating particles effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="quantum-dots"></div>
                      </div>
                      
                      <div className="flex items-center gap-3 relative z-10">
                        <motion.div
                          className={`p-3 rounded-lg bg-gradient-to-r ${category.color}`}
                          variants={iconVariants}
                          whileHover="hover"
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </motion.div>
                        <motion.h3 
                          {...textReveal}
                          className="text-xl font-heading font-semibold text-white"
                        >
                          {category.title}
                        </motion.h3>
                      </div>

                      <div className="flex flex-wrap gap-2 relative z-10">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            custom={skillIndex}
                            variants={skillItemVariants}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                            transition={{
                              delay: index * 0.1 + skillIndex * 0.05,
                              duration: 0.3,
                            }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Badge
                              variant="secondary"
                              className="liquid-button bg-white/10 text-white/90 hover:bg-white/20 transition-colors duration-200"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
