"use client";

import React, { memo, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Building, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStaggeredReveal } from "@/hooks/useAdvancedAnimations";

// Memoized experience data
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
					"Developed and maintained content creation workflows, collaborated with writers and editors to ensure quality output, and integrated content management systems for efficient publishing.",
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
					"Delivered exceptional customer service, resolved complex technical issues, and maintained high satisfaction ratings. Consistently recognized for performance excellence and customer advocacy.",
        skills: [
          "Customer Service",
          "Technical Support",
          "Problem Solving",
          "Communication",
          "Customer Advocacy",
          "Performance Excellence",
        ],
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

// CompanySection component definition
type CompanySectionProps = {
  experience: typeof experiences[number];
  index: number;
};

function CompanySection({ experience }: CompanySectionProps) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <Building className="text-blue-400" />
        <h3 className="text-2xl font-bold text-white">{experience.company}</h3>
        <span className="text-white/60 text-sm">{experience.location}</span>
      </div>
      <div className="space-y-8">
        {experience.positions.map((position, idx) => (
          <Card key={idx} className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span className="font-semibold text-white">{position.title}</span>
                    <span className="text-xs text-white/60">{position.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                    <Calendar className="w-4 h-4" />
                    <span>{position.duration}</span>
                  </div>
                  <p className="text-white/80 mb-2">{position.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {position.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  {position.achievement && (
                    <div className="mt-2 text-yellow-500 text-sm font-semibold">
                      {position.achievement}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    amount: 0.1,
  });

  // Optimized animations with throttled updates
  const { containerVariants, itemVariants } = useStaggeredReveal(0.1);

  // Memoized stats calculation
  const experienceStats = useMemo(() => {
    const totalPositions = experiences.reduce((acc, exp) => {
      return acc + exp.positions.length;
    }, 0);

    const allSkills = experiences.flatMap((exp) =>
      exp.positions.flatMap((pos) => pos.skills)
    );
    const uniqueSkills = new Set(allSkills).size;

    return {
      totalYears: "3+",
      totalPositions,
      uniqueSkills,
      companies: experiences.length,
    };
  }, []);

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
          {/* Header Section */}
          <motion.div variants={itemVariants} className="text-center">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-heading font-bold text-white mb-4"
            >
              Professional{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Experience
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-white/70 text-lg max-w-2xl mx-auto"
            >
              A journey through roles that shaped my expertise in development, DevOps,
              and customer experience
            </motion.p>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-4"
              variants={itemVariants}
            />
          </motion.div>

          {/* Experience Stats */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-blue-400">
                      {experienceStats.totalYears}
                    </div>
                    <div className="text-white/80 text-sm">
                      Years Experience
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-purple-400">
                      {experienceStats.totalPositions}
                    </div>
                    <div className="text-white/80 text-sm">
                      Positions Held
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-green-400">
                      {experienceStats.uniqueSkills}
                    </div>
                    <div className="text-white/80 text-sm">
                      Skills Applied
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-yellow-400">
                      {experienceStats.companies}
                    </div>
                    <div className="text-white/80 text-sm">
                      Organizations
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Experience Timeline */}
          <div className="space-y-16">
            {experiences.map((experience, index) => (
              <CompanySection
                key={experience.company}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(ExperienceSection);
