'use client';

import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useScroll, useTransform, useMotionValue, useSpring, useInView } from 'framer-motion';

// Enhanced throttle function with better performance
const throttle = <T extends unknown[]>(func: (...args: T) => void, limit: number) => {
  let inThrottle = false;
  return (...args: T) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Highly optimized scroll animations with minimal calculations
export const useOptimizedScrollAnimations = () => {
  const targetRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  // Memoized transforms to prevent recalculation
  const y = useMemo(() => 
    useTransform(scrollYProgress, [0, 1], ['0%', '10%']), 
  [scrollYProgress]
  );
  
  const opacity = useMemo(() => 
    useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]), 
  [scrollYProgress]
  );
  
  return {
    ref: targetRef,
    scrollYProgress,
    y,
    opacity
  };
};

// Optimized magnetic effect with throttled events
export const useSimpleMagneticEffect = (strength: number = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Lighter spring settings
  const springX = useSpring(x, { stiffness: 200, damping: 30, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 200, damping: 30, mass: 0.3 });

  // Memoized throttled mouse handler
  const throttledMouseMove = useMemo(
    () => throttle((e: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      x.set(deltaX);
      y.set(deltaY);
    }, 16), // ~60fps
    [strength, x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mousemove', throttledMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', throttledMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [throttledMouseMove, handleMouseLeave]);

  return {
    ref,
    x: springX,
    y: springY
  };
};

// Optimized text reveal with reduced calculations
export const useSimpleTextReveal = (threshold: number = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: threshold
  });
  
  // Memoized variants to prevent recreating objects
  const variants = useMemo(() => ({
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

  return {
    ref,
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    variants
  };
};

// Optimized scroll reveal with minimal re-renders
export const useScrollReveal = (threshold: number = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: threshold
  });
  
  const variants = useMemo(() => ({
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }), []);

  return {
    ref,
    variants,
    isInView
  };
};

// Highly optimized staggered reveal
export const useStaggeredReveal = (delay: number = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: "-50px",
    amount: 0.1
  });
  
  // Memoize variants based on dependencies
  const containerVariants = useMemo(() => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1
      }
    }
  }), [delay]);

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

  return {
    ref,
    isInView,
    containerVariants,
    itemVariants
  };
};

// Optimized intersection observer hook
export const useOptimizedInView = (threshold: number = 0.1, rootMargin: string = "-100px") => {
  const ref = useRef<HTMLElement>(null);
  
  const isInView = useInView(ref, { 
    once: true, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    margin: rootMargin as any,
    amount: threshold
  });

  return {
    ref,
    isInView
  };
};