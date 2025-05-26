"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building, Award } from "lucide-react"

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
        title: "Web Developer",
        type: "Full-time",
        duration: "Jun 2024 – Jul 2024 · 2 mos",
        description:
          "Developed full-stack applications using Nuxt3 for front-end and Express/Mongoose for back-end. Collaborated with teams to design secure, efficient, and user-friendly web solutions.",
        skills: ["Nuxt.js", "Express.js", "Mongoose", "Full-stack Development", "MongoDB", "Redis"],
      },
      {
        title: "Front-end Developer Apprentice",
        type: "Apprenticeship",
        duration: "Jan 2024 – Jun 2024 · 6 mos",
        description:
          "Gained hands-on experience with Vue.js, CSS, JavaScript, and Nuxt3 framework. Contributed to front-end development projects, focusing on seamless user experiences.",
        skills: ["HTML", "CSS", "JavaScript", "Nuxt3", "Vue.js", "Front-end Development"],
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
        duration: "May 2022 – April 2025 · 3 yrs",
        description:
          "Effectively resolved all of the customer's concerns with ease, accuracy, and maintaining engaging dynamics between the customers as proven by the awards given by Bell. Excellence in multitasking as proven by engaging with two customers at the same time while providing the best solutions without diminished quality.",
        skills: ["Customer Service", "Communication soft skills", "Customer relationship management"],
        achievement: "4x Bell All Star Winner (Periods 13, 14, 15, 16)",
      },
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
        skills: ["Unreal Engine", "Game Design", "Jira", "Agile", "Scrum", "Game Development"],
      },
    ],
  },
]

export default function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Work{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Experience
              </span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              A journey through diverse roles in technology, customer service, and leadership
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-4" />
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-purple-400" />

            <div className="space-y-12">
              {experiences.map((company, companyIndex) => (
                <motion.div key={company.company} variants={itemVariants}>
                  <div className="space-y-8">
                    {company.positions.map((position, positionIndex) => (
                      <div
                        key={positionIndex}
                        className={`relative flex items-center ${
                          (companyIndex + positionIndex) % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                      >
                        {/* Timeline Dot */}
                        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-4 border-slate-900 z-10" />

                        {/* Content Card */}
                        <div
                          className={`w-full md:w-1/2 ml-12 md:ml-0 ${
                            (companyIndex + positionIndex) % 2 === 0 ? "md:pr-8" : "md:pl-8"
                          }`}
                        >
                          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
                            <CardContent className="p-6 space-y-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-blue-400">
                                  <Building className="h-4 w-4" />
                                  <span className="font-semibold">{company.company}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white">{position.title}</h3>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-white/70">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm">{position.duration}</span>
                                  </div>
                                  <span className="hidden sm:block">•</span>
                                  <span className="text-sm">{position.type}</span>
                                </div>
                                <div className="flex items-center gap-1 text-white/60">
                                  <MapPin className="h-4 w-4" />
                                  <span className="text-sm">{company.location}</span>
                                </div>
                              </div>

                              {position.achievement && (
                                <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
                                  <Award className="h-4 w-4 text-yellow-400" />
                                  <span className="text-yellow-200 text-sm font-medium">{position.achievement}</span>
                                </div>
                              )}

                              <p className="text-white/80 leading-relaxed">{position.description}</p>

                              <div className="flex flex-wrap gap-2">
                                {position.skills.map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="bg-white/10 text-white/90 hover:bg-white/20 transition-colors duration-200"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
