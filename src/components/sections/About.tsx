"use client";

import React, { memo, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Calendar, Cloud, Shield, Code } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useStaggeredReveal } from "@/hooks/useAdvancedAnimations";

// Memoized contact data
const contactInfo = [
  {
    icon: MapPin,
    text: "Pili, Camarines Sur",
  },
  {
    icon: Phone,
    text: "0931-028-3773",
  },
  {
    icon: Mail,
    text: "catimbanggabriel@gmail.com",
  },
] as const;

// Memoized focus areas data
const focusAreas = [
  {
    icon: Cloud,
    title: "DevSecOps & System Administration",
    description:
      "Managing cloud deployments, CI/CD pipelines, and security implementations at ThePILLARS Publication.",
    gradient: "from-blue-500/20 to-purple-500/20",
    shadowColor: "blue-500/20",
  },
  {
    icon: Shield,
    title: "Cybersecurity Excellence",
    description:
      "Champion of Regional HackForGov CTF and 5th place nationally, specializing in incident response.",
    gradient: "from-purple-500/20 to-pink-500/20",
    shadowColor: "purple-500/20",
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    description:
      "Building scalable applications with modern frameworks and managing successful projects like MerchTrack.",
    gradient: "from-pink-500/20 to-blue-500/20",
    shadowColor: "pink-500/20",
  },
] as const;

// Memoized Contact Item Component
const ContactItem = memo(({ item }: { item: (typeof contactInfo)[number] }) => {
  const IconComponent = item.icon;

  return (
    <div className="flex items-center gap-3 text-white/80">
      <IconComponent className="h-5 w-5 text-blue-400" />
      <span>{item.text}</span>
    </div>
  );
});

ContactItem.displayName = "ContactItem";

// Memoized Focus Area Component
const FocusAreaCard = memo(
  ({ area, index }: { area: (typeof focusAreas)[number]; index: number }) => {
    const IconComponent = area.icon;

    const hoverVariants = useMemo(
      () => ({
        scale: 1.02,
        rotateY: index % 2 === 0 ? 5 : -5,
      }),
      [index]
    );

    return (
      <motion.div
        className={`p-4 bg-gradient-to-r ${area.gradient} rounded-lg border border-white/10 hover:shadow-lg hover:shadow-${area.shadowColor} transition-all duration-300`}
        whileHover={hoverVariants}
      >
        <h4 className="font-semibold text-white flex items-center gap-2 mb-2">
          <IconComponent className="h-5 w-5 text-blue-400" />
          {area.title}
        </h4>
        <p className="text-white/70 text-sm">{area.description}</p>
      </motion.div>
    );
  }
);

FocusAreaCard.displayName = "FocusAreaCard";

// Main About Section Component with comprehensive memoization
const AboutSection = memo(() => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    amount: 0.1,
  });

  // Optimized animations with throttled updates
  const { containerVariants, itemVariants } = useStaggeredReveal(0.15);

  // Memoized card variants
  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
      visible: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
          duration: 0.7,
          ease: [0.23, 1, 0.32, 1],
        },
      },
    }),
    []
  );

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
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              About{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div variants={cardVariants}>
                <Card className="holographic-card bg-white/5 border-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-heading font-semibold text-white mb-4">
                      Hi, I&apos;m Gabriel!
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      I specialize in DevSecOps, full-stack development, and cloud system
                      administration, with hands-on experience managing secure, scalable web
                      infrastructures. I currently serve as the Webmaster at ThePILLARS
                      Publication, where I lead cloud deployments, implement CI/CD pipelines,
                      and optimize system performance and security.
                      <br />
                      <br />
                      With a robust technical foundation and practical knowledge in system
                      operations, I&apos;m passionate about building reliable digital
                      solutions and mitigating security risks in high-pressure environments.
                      I also have a track record of excellence in customer support and
                      technical service, shaped by over two years at Quantrics Enterprises
                      (Bell Canada).
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={cardVariants}>
                <Card className="holographic-card bg-white/5 border-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-heading font-semibold text-white mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-3">
                      {contactInfo.map((item) => (
                        <ContactItem key={item.text} item={item} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div variants={cardVariants}>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm holographic-card hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-heading font-semibold text-white mb-4">
                      Current Focus
                    </h3>
                    <div className="space-y-4">
                      {focusAreas.map((area, index) => (
                        <FocusAreaCard key={area.title} area={area} index={index} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={cardVariants}>
                <Card className="holographic-card bg-white/5 border-white/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-heading font-semibold text-white mb-4">
                      Education
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-blue-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white">BS Computer Science</h4>
                          <p className="text-white/70">Ateneo de Naga University</p>
                          <p className="text-white/60 text-sm">
                            3rd Year Student • August 2022 – Present
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = "AboutSection";

export default AboutSection;
