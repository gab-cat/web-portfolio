"use client";

import React, { memo, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Users, TrendingUp, Clock, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useStaggeredReveal } from "@/hooks/useAdvancedAnimations";

// Memoized project data
const projects = [
  {
    title: "MerchTrack",
    subtitle: "Ultimate Merchandise Management",
    description:
      "Launched and managed MerchTrack, a university merchandise e-commerce platform, achieving approximately 2,750 unique users within the first week. Streamlined ordering and payment processes, resulting in significant increase in order volume and enhanced user satisfaction.",
    image: "/placeholder.svg?height=300&width=500",
    liveUrl: "https://merchtrack.tech",
    githubUrl: "https://github.com/gab-cat/merchtrack",
    technologies: ["Nuxt.js", "Express.js", "MongoDB", "Redis", "Payment Integration", "E-commerce"],
    stats: [
      { label: "Users", value: "2,750+", icon: Users },
      { label: "Launch Date", value: "Mar 25, 2025", icon: Clock },
      { label: "Growth", value: "Week 1", icon: TrendingUp },
    ],
    highlights: [
      "2,750+ unique users in first week",
      "Streamlined payment processes",
      "Enhanced user satisfaction",
      "Organizational management tools",
      "Cross-functional team leadership",
    ],
  },
] as const;

const additionalProjects = [
  {
    title: "DevSecOps Pipeline",
    description:
      "Implemented comprehensive CI/CD pipeline with security scanning, automated testing, and deployment for ThePILLARS Publication.",
    technologies: ["Docker", "AWS", "Jenkins", "Security Scanning"],
    status: "Production",
  },
  {
    title: "CTF Challenge Platform",
    description:
      "Developed practice platform for cybersecurity challenges, used for training and competition preparation.",
    technologies: ["Node.js", "Docker", "Security Tools"],
    status: "Development",
  },
] as const;

// Memoized Main Project Card Component
const MainProjectCard = memo(({ project, isInView }: {
  project: (typeof projects)[number];
  isInView: boolean;
}) => {
  // Memoized variants to prevent recreation
  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), []);

  const imageVariants = useMemo(() => ({
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 1,
        ease: "easeOut" 
      }
    }
  }), []);

  const statsVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    }
  }), []);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group"
    >
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm holographic-card overflow-hidden">
        <CardContent className="p-0">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-80 lg:h-full overflow-hidden">
              <motion.div
                variants={imageVariants}
                className="absolute inset-0"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-300" />
              
              {/* Floating Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Link href={project.liveUrl} target="_blank">
                  <Button size="icon" className="bg-white/10 hover:bg-white/20 border-white/20">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href={project.githubUrl} target="_blank">
                  <Button size="icon" className="bg-white/10 hover:bg-white/20 border-white/20">
                    <Github className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 space-y-6">
              <div>
                <h3 className="text-3xl font-heading font-bold text-white mb-2">{project.title}</h3>
                <p className="text-blue-400 font-medium text-lg">{project.subtitle}</p>
              </div>

              <p className="text-white/80 leading-relaxed">{project.description}</p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="bg-white/10 text-white/90">
                    {tech}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <motion.div 
                variants={statsVariants}
                className="grid grid-cols-3 gap-4"
              >
                {project.stats.map((stat) => {
                  const IconComponent = stat.icon;
                  return (
                    <motion.div key={stat.label} variants={itemVariants} className="text-center">
                      <div className="flex justify-center mb-2">
                        <IconComponent className="h-6 w-6 text-blue-400" />
                      </div>
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      <div className="text-white/60 text-sm">{stat.label}</div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-white font-semibold">Key Achievements:</h4>
                <ul className="space-y-1">
                  {project.highlights.map((highlight, index) => (
                    <li key={index} className="text-white/70 text-sm flex items-center gap-2">
                      <Star className="h-3 w-3 text-yellow-400 flex-shrink-0" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

MainProjectCard.displayName = 'MainProjectCard';

// Memoized Additional Project Card Component
const AdditionalProjectCard = memo(({ project, index }: {
  project: (typeof additionalProjects)[number];
  index: number;
}) => {
  const cardVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }), [index]);

  const statusColor = useMemo(() => {
    return project.status === "Production" ? "text-green-400" : "text-yellow-400";
  }, [project.status]);

  return (
    <motion.div variants={cardVariants}>
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <h4 className="text-xl font-semibold text-white">{project.title}</h4>
            <Badge variant="outline" className={`${statusColor} border-current`}>
              {project.status}
            </Badge>
          </div>

          <p className="text-white/70 leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary" className="bg-white/10 text-white/70 text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

AdditionalProjectCard.displayName = 'AdditionalProjectCard';

// Main Component with comprehensive memoization
const ProjectsSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.1
  });
  
  // Optimized animations with throttled updates
  const { containerVariants, itemVariants } = useStaggeredReveal(0.15);

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
            >
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Projects
              </span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-white/70 text-lg max-w-2xl mx-auto"
            >
              Showcase of innovative solutions, technical expertise, and impactful digital experiences
            </motion.p>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-4"
              variants={itemVariants}
            />
          </motion.div>

          {/* Main Project */}
          <div className="space-y-8">
            {projects.map((project) => (
              <MainProjectCard 
                key={project.title}
                project={project}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Additional Projects */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-heading font-bold text-white mb-8 text-center">
              Additional{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {additionalProjects.map((project, index) => (
                <AdditionalProjectCard 
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Interested in Collaboration?</h3>
                <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                  I&apos;m always excited to work on new projects and innovative solutions. 
                  Let&apos;s discuss how we can bring your ideas to life.
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="#contact">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Get in Touch
                    </Button>
                  </Link>
                  <Link href="https://github.com/gab-cat" target="_blank">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Github className="h-4 w-4 mr-2" />
                      View All Projects
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;
