# Interactive Portfolio Website

A dynamic and visually engaging portfolio website built with Next.js, Three.js, and Framer Motion. The website features interactive 3D elements, smooth animations, and a modern design.

## Features

- Interactive 3D background with particle system
- Scroll-triggered animations
- Responsive design for all devices
- Dark mode by default
- Interactive skill visualization
- Animated timeline for experience
- 3D project cards with hover effects
- Achievement badges with animations
- Contact form with validation
- Modern and clean UI

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Three.js / React Three Fiber
- Framer Motion
- Tailwind CSS
- React Hook Form
- Zod Validation
- Bun Package Manager

## Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or higher)
- Node.js (v18.0.0 or higher)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/web-portfolio.git
   cd web-portfolio
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```env
   NEXT_PUBLIC_CONTACT_EMAIL=your@email.com
   ```

4. Start the development server:
   ```bash
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
web-portfolio/
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   │   ├── sections/     # Page sections
│   │   └── three/       # Three.js components
│   ├── lib/             # Utilities and constants
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
└── tailwind.config.ts   # Tailwind CSS configuration
```

## Customization

1. Update personal information in `src/lib/constants.ts`
2. Modify the theme in `tailwind.config.ts`
3. Add or modify sections in `src/components/sections/`
4. Customize 3D elements in `src/components/three/`

## Deployment

The project can be easily deployed to Vercel:

1. Push your code to GitHub
2. Import the repository to Vercel
3. Configure environment variables
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
