"use client";

import React, { memo, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Server, Code, Smartphone, Database, Terminal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStaggeredReveal } from "@/hooks/useAdvancedAnimations";

// Memoized skill categories data
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
      "Network Security",
      "Digital Forensics",
      "Threat Intelligence",
      "Risk Assessment",
    ],
  },
  {
    title: "Frontend Development",
    icon: Code,
    color: "from-green-500 to-teal-500",
    skills: [
      "React/Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Web3/Blockchain",
      "Progressive Web Apps",
    ],
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    color: "from-purple-500 to-pink-500",
    skills: [
      "React Native",
      "Flutter",
      "Native Android",
      "iOS Development",
      "Cross-Platform",
      "Mobile UI/UX",
    ],
  },
  {
    title: "Backend Development",
    icon: Database,
    color: "from-yellow-500 to-orange-500",
    skills: [
      "Node.js",
      "Python",
      "PHP",
      "SQL Databases",
      "NoSQL Databases",
      "REST APIs",
    ],
  },
  {
    title: "System Administration",
    icon: Terminal,
    color: "from-indigo-500 to-purple-500",
    skills: [
      "Linux Server Management",
      "Windows Administration",
      "Network Configuration",
      "Automation Scripts",
      "System Monitoring",
      "Performance Optimization",
    ],
  },
] as const;

// Memoized Skill Badge Component
const SkillBadge = memo(({ skill, index }: { skill: string; index: number }) => {
  const badgeVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: -10 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.4,
          ease: "easeOut",
          delay: index * 0.05,
        },
      },
    }),
    [index]
  );

  return (
    <motion.div variants={badgeVariants} whileHover={{ scale: 1.05 }}>
      <Badge
        variant="secondary"
        className="bg-white/10 hover:bg-white/20 text-white border-white/20 transition-colors duration-200"
      >
        {skill}
      </Badge>
    </motion.div>
  );
});

SkillBadge.displayName = "SkillBadge";

// Memoized Skill Category Card Component
const SkillCategoryCard = memo(
  ({
    category,
    index,
  }: {
    category: (typeof skillCategories)[number];
    index: number;
  }) => {
    const IconComponent = category.icon;

    const cardVariants = useMemo(
      () => ({
        hidden: {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.5,
            ease: [0.25, 0.4, 0.25, 1],
            delay: index * 0.08,
          },
        },
      }),
      [index]
    );

    const skillsVariants = useMemo(
      () => ({
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1,
          },
        },
      }),
      []
    );

    return (
      <motion.div
        variants={cardVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Card className="holographic-card bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group h-full">
          <CardContent className="p-6 space-y-4 relative">
            {/* Icon with gradient background */}
            <motion.div
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center relative z-10`}
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <IconComponent className="h-6 w-6 text-white" />
            </motion.div>

            {/* Category title */}
            <h3 className="text-xl font-heading font-semibold text-white relative z-10">
              {category.title}
            </h3>

            {/* Skills badges */}
            <motion.div
              variants={skillsVariants}
              className="flex flex-wrap gap-2 relative z-10"
            >
              {category.skills.map((skill, skillIndex) => (
                <SkillBadge key={skill} skill={skill} index={skillIndex} />
              ))}
            </motion.div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
          </CardContent>
        </Card>
      </motion.div>
    );
  }
);

SkillCategoryCard.displayName = "SkillCategoryCard";

// Main Skills Section Component with comprehensive memoization
const SkillsSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.1 
  });

  // Optimized animations with throttled updates
  const { containerVariants, itemVariants } = useStaggeredReveal(0.08);

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
          <motion.div variants={itemVariants} className="text-center">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
            >
              Technical{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Skills
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-white/70 text-lg max-w-2xl mx-auto"
            >
              A comprehensive toolkit spanning DevSecOps, cybersecurity, and
              full-stack development
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-4"
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((category, index) => (
              <SkillCategoryCard
                key={category.title}
                category={category}
                index={index}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

SkillsSection.displayName = "SkillsSection";

export default SkillsSection;
