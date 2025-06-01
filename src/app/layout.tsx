import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { Poppins, Orbitron } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-orbitron',
});

export const metadata: Metadata = {
  title: 'Gabriel Angelo B. Catimbang | Portfolio',
  description: 'Senior DevSecOps Engineer & Full Stack Developer with expertise in cloud infrastructure, security, and modern web development.',
  keywords: [
    'DevSecOps',
    'Full Stack Developer',
    'Cloud Infrastructure',
    'Security',
    'AWS',
    'Docker',
    'Kubernetes',
    'React',
    'Node.js',
    'TypeScript',
  ],
  authors: [{ name: 'Gabriel Angelo B. Catimbang' }],
  creator: 'Gabriel Angelo B. Catimbang',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${orbitron.variable} ${poppins.className}`} style={{ backgroundColor: '#0a0a0a', color: '#ffffff' }}>
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
      </body>
    </html>
  );
}
