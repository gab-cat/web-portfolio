"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin, Building, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdvancedScrollAnimations, useMagneticEffect, useTextReveal } from "@/hooks/useAdvancedAnimations";

const experiences = [
  {
    company: "ThePILLARS PUBLICATION",
    location: "Naga City, Camarines Sur",
    positions: [
      {
        title: "Webmaster",
        type: "Full-time · Hybrid",
        duration: "Jul 2024 – Present · 11 mos",
        description:
          "Oversee project development and delivery, ensure efficient workflows using Kanban boards and manage cloud-based deployments, optimize performance, and secure systems. Implement DevSecOps processes, including CI/CD pipelines, and automate testing, builds, and deployments.",
        skills: [
          "Docker",
          "Linux System Administration",
          "DevOps",
          "CI/CD",
          "AWS Cloud Deployment",
          "Cloudflare Proxy",
          "Postgres",
          "Nginx",
        ],
        achievement: "",
      },
      {
        title: "Frontend Developer",
        type: "Full-time · Hybrid",
        duration: "Mar 2024 – Jul 2024 · 5 mos",
        description:
          "Designed and developed intuitive user interfaces for web applications, ensuring responsive design and cross-browser compatibility. Collaborated with the team to implement user feedback and optimize performance for better user experience.",
        skills: [
          "Vue.js",
          "TypeScript",
          "Tailwind CSS",
          "Responsive Design",
          "Cross-browser Compatibility",
          "UI/UX Design",
          "Performance Optimization",
        ],
        achievement: "",
      },
      {
        title: "Apprentice Frontend Developer",
        type: "Internship · Hybrid",
        duration: "Jan 2024 – Jun 2024 · 6 mos",
        description:
          "Assisted in the development of web applications, focusing on frontend technologies. Gained hands-on experience in building responsive and user-friendly interfaces, collaborating with senior developers to implement best practices.",
        skills: [
          "HTML",
          "CSS",
          "JavaScript",
          "Vue.js",
          "Nuxt 3",
          "Frontend Development",
          "Responsive Design",
          "Version Control (Git)",
        ],
      }
    ],
  },
  {
    company: "ATENEO DE NAGA UNIVERSITY",
    location: "Department of Digital Illustration and Animation",
    positions: [
      {
        title: "Lead Game Programmer",
        type: "Internship - Hybrid",
        duration: "Jun 2024 – Jul 2024 · 2 mos",
        description:
          "Spearheaded the development and implementation of core gameplay mechanics, ensuring a seamless and engaging player experience. Coordinated with the team to design, develop, and refine game systems and features using Agile and Scrum methodologies.",
        skills: [
          "Unreal Engine",
          "Game Design",
          "Jira",
          "Agile",
          "Scrum",
          "Team Leadership",
          "Gameplay Programming",
          "C++",
        ],
        achievement: "",
      },
    ],
  },
  {
    company: "Bell Canada (Quantrics Enterprises Inc.)",
    location: "Naga City, Camarines Sur",
    positions: [
      {
        title: "eChat Representative",
        type: "Care eChat, Quantrics Enterprises Inc.",
        duration: "May 2022 – Apr 2025 · 3 yrs",
        description:
          "Effectively resolved all of the customer's concerns with ease, accuracy, and maintaining engaging dynamics between the customers as proven by the awards given by Bell. Excellence in multitasking as proven by engaging with two customers at the same time while providing the best solutions without diminished quality.",
        skills: ["Customer Service", "Communication soft skills", "Customer relationship management"],
        achievement: "4x Bell All Star Winner (Periods 13, 14, 15, 16)",
      },
    ],
  },
  {
    company: "FREELANCE",
    location: "Remote",
    positions: [
      {
        title: "Fullstack Developer",
        type: "Contract · Remote",
        duration: "Jan 2023 – Present · 2 yrs",
        description:
          "Developed full-stack web applications for various clients, from concept to deployment. Built responsive frontends, robust backends, and integrated third-party services. Managed projects independently and delivered solutions that exceeded client expectations.",
        skills: [
          "React.js",
          "Node.js",
          "Express.js",
          "MongoDB",
          "PostgreSQL",
          "REST APIs",
          "GraphQL",
          "AWS",
          "Digital Ocean",
          "Project Management",
        ],
        achievement: "Successfully delivered 15+ projects with 100% client satisfaction",
      },
    ],
  },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Advanced animations
  const scrollAnimations = useAdvancedScrollAnimations();
  const textReveal = useTextReveal();
  const magneticRef = useMagneticEffect(0.3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      rotateY: 5,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="experience" className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <motion.h2 
              {...textReveal}
              className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
            >
              Work{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Experience
              </span>
            </motion.h2>
            <motion.p 
              {...textReveal}
              className="text-white/70 text-lg max-w-2xl mx-auto"
            >
              A journey through diverse roles in technology, customer service, and
              leadership
            </motion.p>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-4"
              style={{ scaleX: scrollAnimations.scale }}
            />
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <motion.div 
              className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400"
              style={{ scaleY: scrollAnimations.scale }}
            />

            <div className="space-y-12">
              {experiences.map((company, companyIndex) => (
                <motion.div key={company.company} variants={itemVariants}>
                  <div className="space-y-8">
                    {company.positions.map((position, positionIndex) => (
                      <motion.div
                        key={positionIndex}
                        className={`relative flex items-center ${
                          (companyIndex + positionIndex) % 2 === 0
                            ? "md:flex-row"
                            : "md:flex-row-reverse"
                        }`}
                        whileHover="hover"
                        variants={cardHoverVariants}
                      >
                        {/* Timeline Dot */}
                        <motion.div 
                          className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-4 border-slate-900 z-10"
                          whileHover={{ scale: 1.5 }}
                          transition={{ duration: 0.2 }}
                        />

                        {/* Content Card */}
                        <motion.div
                          className={`w-full md:w-1/2 ml-12 md:ml-0 ${
                            (companyIndex + positionIndex) % 2 === 0
                              ? "md:pr-8"
                              : "md:pl-8"
                          }`}
                          style={{ x: magneticRef.x, y: magneticRef.y }}
                        >
                          <Card 
                            className="holographic-card bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group"
                          >
                            <CardContent className="p-6 space-y-4 relative">
                              {/* Floating particles effect */}
                              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="quantum-dots"></div>
                              </div>
                              
                              <div className="space-y-2 relative z-10">
                                <div className="flex items-center gap-2 text-blue-400">
                                  <Building className="h-4 w-4" />
                                  <span className="font-semibold">
                                    {company.company}
                                  </span>
                                </div>
                                <motion.h3 
                                  {...textReveal}
                                  className="text-xl font-heading font-bold text-white"
                                >
                                  {position.title}
                                </motion.h3>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-white/70">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm">
                                      {position.duration}
                                    </span>
                                  </div>
                                  <span className="hidden sm:block">•</span>
                                  <span className="text-sm">
                                    {position.type}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1 text-white/60">
                                  <MapPin className="h-4 w-4" />
                                  <span className="text-sm">
                                    {company.location}
                                  </span>
                                </div>
                              </div>

                              {position.achievement && (
                                <motion.div 
                                  className="flex items-center gap-2 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  <Award className="h-4 w-4 text-yellow-400" />
                                  <span className="text-yellow-200 text-sm font-medium">
                                    {position.achievement}
                                  </span>
                                </motion.div>
                              )}

                              <p className="text-white/80 leading-relaxed relative z-10">
                                {position.description}
                              </p>

                              <div className="flex flex-wrap gap-2 relative z-10">
                                {position.skills.map((skill, skillIndex) => (
                                  <motion.div
                                    key={skill}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: skillIndex * 0.05 }}
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
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
