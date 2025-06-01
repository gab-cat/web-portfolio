'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { gsap } from 'gsap';

export const useAdvancedScrollAnimations = () => {
  const { scrollYProgress } = useScroll();
  
  // Create smooth spring-based values
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Create parallax values for different layers
  const backgroundY = useTransform(smoothProgress, [0, 1], ['0%', '50%']);
  const midgroundY = useTransform(smoothProgress, [0, 1], ['0%', '25%']);
  const foregroundY = useTransform(smoothProgress, [0, 1], ['0%', '15%']);
  
  // Create rotation values
  const rotateX = useTransform(smoothProgress, [0, 1], [0, 360]);
  const rotateY = useTransform(smoothProgress, [0, 1], [0, 180]);
  
  // Create scale values
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.2, 0.8]);
  
  // Create opacity values
  const fadeIn = useTransform(smoothProgress, [0, 0.2], [0, 1]);
  const fadeOut = useTransform(smoothProgress, [0.8, 1], [1, 0]);

  return {
    scrollYProgress: smoothProgress,
    backgroundY,
    midgroundY,
    foregroundY,
    rotateX,
    rotateY,
    scale,
    fadeIn,
    fadeOut
  };
};

export const useMagneticEffect = (strength: number = 0.5) => {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      x.set(deltaX);
      y.set(deltaY);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y, strength]);

  return { ref, x: springX, y: springY };
};

export const useTextReveal = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Split text into characters for animation
    const text = element.textContent || '';
    element.innerHTML = '';
    
    const chars = text.split('').map((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(100px) rotateZ(10deg)';
      span.style.transition = `all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${i * 0.02}s`;
      return span;
    });

    chars.forEach(char => element.appendChild(char));

    // Trigger animation when in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            chars.forEach((char) => {
              char.style.opacity = '1';
              char.style.transform = 'translateY(0) rotateZ(0deg)';
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return ref;
};

export const useMorphingBlob = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const blob = element.querySelector('.blob') as HTMLElement;
    if (!blob) return;

    let animationId: number;
    
    const animate = () => {
      const time = Date.now() * 0.001;
      
      const morphPath = `
        M${20 + Math.sin(time) * 5},${20 + Math.cos(time * 1.2) * 3}
        Q${40 + Math.sin(time * 0.8) * 8},${10 + Math.cos(time * 1.5) * 6}
        ${60 + Math.sin(time * 1.1) * 4},${20 + Math.cos(time * 0.9) * 5}
        Q${80 + Math.sin(time * 1.3) * 6},${40 + Math.cos(time * 1.1) * 7}
        ${60 + Math.sin(time * 0.7) * 5},${60 + Math.cos(time * 1.4) * 4}
        Q${40 + Math.sin(time * 1.6) * 7},${80 + Math.cos(time * 0.8) * 6}
        ${20 + Math.sin(time * 0.9) * 3},${60 + Math.cos(time * 1.2) * 5}
        Q${0 + Math.sin(time * 1.4) * 5},${40 + Math.cos(time * 1.6) * 4}
        ${20 + Math.sin(time) * 5},${20 + Math.cos(time * 1.2) * 3}Z
      `;
      
      blob.style.clipPath = `path('${morphPath}')`;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return ref;
};

export const useGlitchEffect = (triggerOnHover: boolean = true) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const createGlitch = () => {
      element.style.animation = 'none';
      void element.offsetHeight; // Trigger reflow
      element.style.animation = 'glitch 0.3s ease-in-out';
    };

    if (triggerOnHover) {
      element.addEventListener('mouseenter', createGlitch);
      return () => element.removeEventListener('mouseenter', createGlitch);
    }

    // Auto glitch effect
    const interval = setInterval(createGlitch, 3000);
    return () => clearInterval(interval);
  }, [triggerOnHover]);

  return ref;
};

export const useParticleTrail = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const particles: HTMLElement[] = [];

    const createParticle = (x: number, y: number) => {
      const particle = document.createElement('div');
      particle.className = 'particle-trail';
      particle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 4px;
        height: 4px;
        background: radial-gradient(circle, #4f46e5, transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: scale(1);
        opacity: 1;
        transition: all 0.6s ease-out;
      `;
      
      document.body.appendChild(particle);
      particles.push(particle);

      // Animate particle
      requestAnimationFrame(() => {
        particle.style.transform = 'scale(0) translateY(-20px)';
        particle.style.opacity = '0';
      });

      // Remove after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
        const index = particles.indexOf(particle);
        if (index > -1) particles.splice(index, 1);
      }, 600);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.7) { // Only create particles occasionally
        createParticle(e.clientX, e.clientY);
      }
    };

    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, []);

  return ref;
};

// Advanced scroll-triggered animations
export const useScrollTriggerAnimations = () => {
  useEffect(() => {
    // Register GSAP ScrollTrigger animations
    gsap.registerPlugin();
    
    // Stagger reveal animation for cards
    gsap.fromTo('.reveal-card', 
      {
        y: 100,
        opacity: 0,
        rotationX: -15,
        scale: 0.9
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.reveal-cards-container',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Morphing text animation
    gsap.to('.morphing-text', {
      scale: 1.1,
      duration: 2,
      yoyo: true,
      repeat: -1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.morphing-text',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1
      }
    });

    // Floating elements
    gsap.to('.floating-element', {
      y: '-=20',
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut',
      stagger: 0.5
    });

  }, []);
};

// Custom hook for advanced intersection observer
export const useAdvancedInView = (options = {}) => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-50px',
        ...options
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView] as const;
};
