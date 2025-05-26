"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Users, TrendingUp, Clock, Star } from "lucide-react"
import Image from "next/image"

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
]

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
    status: "Active",
  },
  {
    title: "System Monitoring Dashboard",
    description: "Real-time monitoring solution for infrastructure health, performance metrics, and security alerts.",
    technologies: ["React", "Node.js", "Grafana", "Prometheus"],
    status: "Deployed",
  },
]

export default function ProjectsSection() {
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  }

  return (
    <section id="projects" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Showcasing innovative solutions and successful implementations
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-4" />
          </motion.div>

          {/* Featured Project */}
          <motion.div variants={itemVariants}>
            {projects.map((project) => (
              <Card key={project.title} className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-2 gap-0">
                    {/* Project Image */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-64 lg:h-full object-cover opacity-80"
                        width={500}
                        height={300}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-8 space-y-6">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-blue-400 font-medium">{project.subtitle}</p>
                      </div>

                      <p className="text-white/80 leading-relaxed">{project.description}</p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4">
                        {project.stats.map((stat) => {
                          const IconComponent = stat.icon
                          return (
                            <div
                              key={stat.label}
                              className="text-center p-3 bg-white/5 rounded-lg border border-white/10"
                            >
                              <IconComponent className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                              <div className="text-white font-semibold">{stat.value}</div>
                              <div className="text-white/60 text-xs">{stat.label}</div>
                            </div>
                          )
                        })}
                      </div>

                      {/* Highlights */}
                      <div>
                        <h4 className="text-white font-semibold mb-3">Key Achievements</h4>
                        <ul className="space-y-2">
                          {project.highlights.map((highlight, index) => (
                            <li key={index} className="flex items-center gap-2 text-white/80">
                              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-white font-semibold mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="bg-white/10 text-white/90 hover:bg-white/20 transition-colors duration-200"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-4">
                        <Button
                          asChild
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                        <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/10">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Source Code
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Additional Projects */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Other Notable Projects</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalProjects.map((project, index) => (
                <motion.div key={project.title} variants={itemVariants} transition={{ delay: index * 0.1 }}>
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-semibold text-white">{project.title}</h4>
                        <Badge
                          variant="secondary"
                          className={`${
                            project.status === "Production"
                              ? "bg-green-500/20 text-green-300 border-green-500/30"
                              : project.status === "Active"
                                ? "bg-blue-500/20 text-blue-300 border-blue-500/30"
                                : "bg-purple-500/20 text-purple-300 border-purple-500/30"
                          }`}
                        >
                          {project.status}
                        </Badge>
                      </div>

                      <p className="text-white/80 text-sm leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs border-white/20 text-white/70">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
