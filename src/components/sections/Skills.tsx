"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Server, Code, Smartphone, Database, Terminal } from "lucide-react"

const skillCategories = [
  {
    title: "DevSecOps",
    icon: Shield,
    color: "from-red-500 to-orange-500",
    skills: ["Docker", "CI/CD Pipelines", "AWS Cloud", "Linux Administration", "Nginx", "Security Automation"],
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
    skills: ["MongoDB", "PostgreSQL", "Redis", "AWS Deployment", "Cloudflare", "Database Design"],
  },
  {
    title: "Mobile Development",
    icon: Smartphone,
    color: "from-yellow-500 to-orange-500",
    skills: ["React Native", "Mobile UI/UX", "Cross-platform Development", "App Store Deployment"],
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
]

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

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
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Technical{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Skills</span>
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              A comprehensive toolkit spanning DevSecOps, cybersecurity, and full-stack development
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mt-4" />
          </motion.div>

          <motion.div variants={containerVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.div key={category.title} variants={itemVariants}>
                  <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 group h-full">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-3 rounded-lg bg-gradient-to-r ${category.color} group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">{category.title}</h3>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <motion.div
                            key={skill}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                            transition={{
                              delay: index * 0.1 + skillIndex * 0.05,
                              duration: 0.3,
                            }}
                          >
                            <Badge
                              variant="secondary"
                              className="bg-white/10 text-white/90 hover:bg-white/20 transition-colors duration-200"
                            >
                              {skill}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
