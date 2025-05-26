"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Calendar, Cloud, Shield, Code } from "lucide-react"

export default function AboutSection() {
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
    <section id="about" className="py-20 px-4 relative">
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
              About{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-4">Hi, I&apos;m Gabriel!</h3>
                  <p className="text-white/80 leading-relaxed">
                    I specialize in DevSecOps, full-stack development, and cloud system administration, 
                    with hands-on experience managing secure, scalable web infrastructures. I currently 
                    serve as the Webmaster at ThePILLARS Publication, where I lead cloud deployments, 
                    implement CI/CD pipelines, and optimize system performance and security.
                    <br />
                    <br />
                    With a robust technical foundation and practical knowledge in system operations, 
                    I&apos;m passionate about building reliable digital solutions and mitigating security 
                    risks in high-pressure environments. I also have a track record of excellence in 
                    customer support and technical service, shaped by over two years at Quantrics Enterprises (Bell Canada).
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white/80">
                      <MapPin className="h-5 w-5 text-blue-400" />
                      <span>Pili, Camarines Sur</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <Phone className="h-5 w-5 text-blue-400" />
                      <span>0931-028-3773</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <Mail className="h-5 w-5 text-blue-400" />
                      <span>catimbanggabriel@gmail.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-4">Current Focus</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-white/10">
                      <h4 className="font-semibold text-white flex items-center gap-2 mb-2"> <Cloud className="h-5 w-5 text-blue-400" /> DevSecOps & System Administration</h4>
                      <p className="text-white/70 text-sm">
                        Managing cloud deployments, CI/CD pipelines, and security implementations at ThePILLARS
                        Publication.
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-white/10">
                      <h4 className="font-semibold text-white flex items-center gap-2 mb-2"> <Shield className="h-5 w-5 text-blue-400" /> Cybersecurity Excellence</h4>
                      <p className="text-white/70 text-sm">
                        Champion of Regional HackForGov CTF and 5th place nationally, specializing in incident response.
                      </p>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-lg border border-white/10">
                      <h4 className="font-semibold text-white flex items-center gap-2 mb-2"> <Code className="h-5 w-5 text-blue-400" /> Full-Stack Development</h4>
                      <p className="text-white/70 text-sm">
                        Building scalable applications with modern frameworks and managing successful projects like
                        MerchTrack.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-4">Education</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-blue-400 mt-1" />
                      <div>
                        <h4 className="font-semibold text-white">BS Computer Science</h4>
                        <p className="text-white/70">Ateneo de Naga University</p>
                        <p className="text-white/60 text-sm">3rd Year Student • August 2022 – Present</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
