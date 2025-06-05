"use client";

import React, { memo, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Medal, Star, Calendar, GamepadIcon, ContainerIcon, Github, Database, Code2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useStaggeredReveal } from "@/hooks/useAdvancedAnimations";

// Memoized achievement data to prevent recreating objects
const achievements = [
  {
    title: "5th Highest Overall Scorer",
    subtitle: "3rd National HackForGov CTF",
    issuer: "DICT - CERT/NCERT - PH",
    date: "Oct 2024",
    description:
      "Ranked 5th out of 80 participants in a national cybersecurity competition, showcasing strong problem-solving and technical skills. Proven expertise in web exploitations and Windows investigation response to cyber attacks.",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
    stats: { rank: "5th", participants: "80", category: "National" },
  },
  {
    title: "Champion",
    subtitle: "3rd Annual Regional HackForGov CTF - Region V",
    issuer: "DICT - Region V",
    date: "Sep 2024",
    description:
      "Led a team to victory in a regional cybersecurity challenge, demonstrating teamwork, innovation, and expertise in cybersecurity.",
    icon: Medal,
    color: "from-blue-500 to-purple-500",
    stats: { rank: "1st", category: "Regional", type: "Team Lead" },
  },
  {
    title: "4x Bell All Star Winner",
    subtitle: "Periods 13, 14, 15, 16",
    issuer: "Bell Canada",
    date: "2022–2024",
    description:
      "Consistently ranked in the top 10% of peers for exceptional customer service and performance while balancing full-time studies.",
    icon: Star,
    color: "from-green-500 to-teal-500",
    stats: { awards: "4x", ranking: "Top 10%", duration: "3 years" },
  },
] as const;

// Memoized certification data
const certifications = [
  {
    title: "Unreal Engine 5: Soulslike Melee Combat System",
    issuer: "Udemy",
    date: "Jul 2024",
    credentialId: "UC-7fc26bda-c805-41fe-8083-c0e988b72958",
    icon: GamepadIcon,
    skills: ["Unreal Engine 4", "Game Development", "Blueprinting", "Game Programming"]
  },
  {
    title: "Docker for the Absolute Beginner - Hands On - DevOps",
    issuer: "Udemy",
    date: "Jun 2024",
    credentialId: "UC-318e99a9-cb34-46e5-bb3c-ce02129142f7",
    icon: ContainerIcon,
    skills: ["Docker", "Docker Products"]
  },
  {
    title: "GitHub Foundations",
    issuer: "Github",
    date: "Dec 2024",
    credentialId: "dcde5918-9ae2-44cd-89ac-35fc76c44959",
    icon: Github,
    skills: ["GitHub", "Git", "Github Actions", "GitHub CI/CD"]
  },
  {
    title: "MongoDB Node.js Developer Path",
    issuer: "MongoDB University",
    date: "Dec 2024",
    credentialId: "MDB5voas4ali7",
    icon: Database,
    skills: ["MongoDB", "Node.js", "Express", "RESTful APIs"]
  },
  {
    title: "Master Nuxt 3 - Full-Stack Complete Guide",
    issuer: "Udemy",
    date: "Dec 2024",
    credentialId: "UC-c236c9e1-3b33-481a-91cc-d9ca6da19eOe",
    icon: Code2,
    skills: ["Nuxt 3", "Vue.js", "JavaScript", "TypeScript"]
  },
] as const;

// Memoized Achievement Card Component
const AchievementCard = memo(({ achievement, index, isInView }: {
  achievement: (typeof achievements)[number];
  index: number;
  isInView: boolean;
}) => {
  const IconComponent = achievement.icon;
  
  // Memoized variants to prevent recreation
  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }), []);

  const iconVariants = useMemo(() => ({
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        delay: index * 0.1, 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  }), [index]);

  const statsEntries = useMemo(() => Object.entries(achievement.stats), [achievement.stats]);

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm holographic-card overflow-hidden group">
        <CardContent className="p-0 relative">
          <div className="grid lg:grid-cols-3 gap-0 relative z-20">
            {/* Icon Section */}
            <div className={`p-8 bg-gradient-to-br ${achievement.color} flex items-center justify-center`}>
              <motion.div
                variants={iconVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="text-white"
              >
                <IconComponent className="h-16 w-16" />
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="lg:col-span-2 p-8 space-y-4">
              <div>
                <h3 className="text-2xl font-heading font-bold text-white mb-1">{achievement.title}</h3>
                <p className="text-blue-400 font-medium">{achievement.subtitle}</p>
              </div>

              <div className="flex items-center gap-4 text-white/70">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{achievement.date}</span>
                </div>
                <span>•</span>
                <span className="text-sm">{achievement.issuer}</span>
              </div>

              <p className="text-white/80 leading-relaxed">{achievement.description}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-4">
                {statsEntries.map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-white/10 text-white/90">
                      {key}: {value}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

AchievementCard.displayName = 'AchievementCard';

// Memoized Certification Card Component
const CertificationCard = memo(({ cert, index }: {
  cert: (typeof certifications)[number];
  index: number;
}) => {
  const IconComponent = cert.icon;
  
  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: index * 0.05,
        duration: 0.4,
        ease: "easeOut"
      }
    }
  }), [index]);

  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <IconComponent className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white text-sm">{cert.title}</h4>
              <p className="text-white/70 text-xs">{cert.issuer}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-1 text-white/60">
              <Calendar className="h-3 w-3" />
              <span className="text-xs">{cert.date}</span>
            </div>
            <div className="text-xs text-white/50">ID: {cert.credentialId}</div>
            {cert.skills && (
              <div className="flex flex-wrap gap-2 mt-2">
                {cert.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-white/10 text-white/70 text-xs"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

CertificationCard.displayName = 'CertificationCard';

// Main Component with comprehensive memoization
const AchievementsSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.1
  });
  
  // Optimized animations with throttled updates
  const { containerVariants, itemVariants } = useStaggeredReveal(0.08);

  // Memoized achievement highlights data
  const highlightStats = useMemo(() => [
    { value: "5th", label: "National CTF Ranking", color: "text-blue-400" },
    { value: "1st", label: "Regional Champion", color: "text-purple-400" },
    { value: "4x", label: "Bell All Star", color: "text-green-400" },
    { value: "5", label: "Recent Certifications", color: "text-yellow-400" },
  ], []);

  return (
    <section id="achievements" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
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
              Honors &{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Achievements
              </span>
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-white/70 text-lg max-w-2xl mx-auto"
            >
              Recognition for excellence in cybersecurity, customer service, and technical innovation
            </motion.p>
            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-4"
              variants={itemVariants}
            />
          </motion.div>

          {/* Major Achievements */}
          <div className="space-y-8">
            {achievements.map((achievement, index) => (
              <AchievementCard 
                key={achievement.title}
                achievement={achievement}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Certifications */}
          <motion.div variants={itemVariants} className="mt-16">
            <h3 className="text-3xl font-heading font-bold text-white mb-8 text-center">
              Professional{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Certifications
              </span>
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert, index) => (
                <CertificationCard 
                  key={cert.title}
                  cert={cert}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          {/* Achievement Summary - Memoized */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-4">Achievement Highlights</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  {highlightStats.map((stat) => (
                    <div key={stat.label} className="space-y-2">
                      <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-white/80 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

AchievementsSection.displayName = 'AchievementsSection';

export default AchievementsSection;
