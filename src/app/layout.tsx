import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'react-hot-toast';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
      </body>
    </html>
  );
}
