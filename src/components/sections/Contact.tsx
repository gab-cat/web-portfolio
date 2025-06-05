'use client';

import React, { memo, useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import toast from 'react-hot-toast';
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';

// Memoized schema to prevent recreation
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

// Memoized contact info data
const contactInfo = [
  {
    type: 'email' as const,
    icon: Mail,
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    label: 'Email',
  },
  {
    type: 'location' as const,
    icon: MapPin,
    value: PERSONAL_INFO.location,
    label: 'Location',
  },
] as const;

// Memoized social links data
const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: PERSONAL_INFO.github,
    ariaLabel: 'Visit GitHub profile',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: PERSONAL_INFO.linkedin,
    ariaLabel: 'Visit LinkedIn profile',
  },
] as const;

// Memoized Contact Info Item Component
const ContactInfoItem = memo(
  ({ item }: { item: (typeof contactInfo)[number] }) => {
    const IconComponent = item.icon;

    const content = (
      <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
        <IconComponent className="w-6 h-6" />
        <span>{item.value}</span>
      </div>
    );

    if ('href' in item) {
      return <a href={item.href}>{content}</a>;
    }
    return <div>{content}</div>;
  }
);

ContactInfoItem.displayName = 'ContactInfoItem';

// Memoized Social Link Component
const SocialLink = memo(({ link }: { link: (typeof socialLinks)[number] }) => {
  const IconComponent = link.icon;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-colors"
      aria-label={link.ariaLabel}
    >
      <IconComponent className="w-6 h-6" />
    </a>
  );
});

SocialLink.displayName = 'SocialLink';

// Memoized Form Field Component
const FormField = memo(
  ({
    id,
    label,
    type = 'text',
    placeholder,
    register,
    error,
    rows,
  }: {
    id: keyof ContactForm;
    label: string;
    type?: string;
    placeholder: string;
    register: ReturnType<typeof useForm<ContactForm>>['register'];
    error?: string;
    rows?: number;
  }) => {
    const inputClasses =
      'w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent';

    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium mb-2">
          {label}
        </label>
        {rows ? (
          <textarea
            id={id}
            {...register(id)}
            rows={rows}
            className={inputClasses}
            placeholder={placeholder}
          />
        ) : (
          <input
            type={type}
            id={id}
            {...register(id)}
            className={inputClasses}
            placeholder={placeholder}
          />
        )}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

FormField.displayName = 'FormField';

// Main Contact Component with comprehensive memoization
const ContactSection = memo(() => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  // Memoized animation variants
  const slideInFromLeft = useMemo(
    () => ({
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  const slideInFromRight = useMemo(
    () => ({
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  const fadeInVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  // Memoized submit handler
  const onSubmit = useCallback(async (formData: ContactForm) => {
    setIsSubmitting(true);
    try {
      console.log('Form data:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Message sent successfully!');
      reset();
    } catch (err) {
      console.error('Error sending message:', err);
      toast.error('Failed to send message. Please try again.');
    }
    setIsSubmitting(false);
  }, [reset]);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          variants={slideInFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <div>
            <h3 className="text-2xl font-heading font-bold mb-4">Let&apos;s Connect</h3>
            <p className="text-gray-400">
              I&apos;m always open to new opportunities and interesting projects.
              Feel free to reach out!
            </p>
          </div>

          <div className="space-y-4">
            {contactInfo.map((item) => (
              <motion.div key={item.type} variants={fadeInVariants}>
                <ContactInfoItem item={item} />
              </motion.div>
            ))}

            <div className="flex space-x-4 pt-4">
              {socialLinks.map((link) => (
                <motion.div key={link.name} variants={fadeInVariants}>
                  <SocialLink link={link} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={slideInFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
            <FormField
              id="name"
              label="Name"
              placeholder="Your name"
              register={register}
              error={errors.name?.message}
            />

            <FormField
              id="email"
              label="Email"
              type="email"
              placeholder="your@email.com"
              register={register}
              error={errors.email?.message}
            />

            <FormField
              id="message"
              label="Message"
              placeholder="Your message"
              register={register}
              error={errors.message?.message}
              rows={4}
            />

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full mx-auto flex text-center py-2 max-w-sm bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-heading font-bold text-base transition-all duration-300 shadow-lg hover:shadow-xl pulse-glow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex-1">
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;