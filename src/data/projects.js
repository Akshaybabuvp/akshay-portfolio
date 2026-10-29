// Edit this file to change the Projects section.
//
// image:     the screenshot, saved in public/images/ (the path starts with /images/).
//            Leave '' to show the placeholder mockup instead.
// liveUrl:   the Vercel link of the project. Leave '' until it exists ("Coming soon" is shown).
// githubUrl: the GitHub repository link. Leave '' until it exists.
// features:  delete any feature you did NOT actually build.
// mockup:    the placeholder layout used only when image is '' ('dashboard', 'shop' or 'table').
export const projectsContent = {
  eyebrow: 'PROJECTS',
  heading: 'Featured Projects',
  description:
    'Personal projects I built to practice component-based development, API integration, authentication, and responsive design.',

  projects: [
    {
      id: 'fitlife-studio',
      title: 'FitLife Studio',
      description:
        'A gym member management application designed to help manage member information, membership payments, expiry dates, and dashboard insights.',
      technologies: ['Next.js', 'Tailwind CSS', 'Supabase'],
      features: [
        'Member management',
        'Dashboard statistics',
        'Membership expiry tracking',
        'Database integration',
        'Responsive interface',
      ],
      image: '/images/fitlife.png',
      mockup: 'dashboard',
      liveUrl: 'https://fitlife-studio-beta.vercel.app/',
      githubUrl: 'https://github.com/Akshaybabuvp/fitlife-studio',
    },
    {
      id: 'shopflow',
      title: 'ShopFlow — E-commerce Application',
      description:
        'A responsive e-commerce application focused on product browsing, shopping cart functionality, checkout flow, and order management.',
      technologies: ['React.js', 'Tailwind CSS', 'Supabase'],
      features: [
        'Product listing',
        'Shopping cart',
        'Authentication',
        'Order management',
        'Responsive UI',
      ],
      image: '/images/shopflow.png',
      mockup: 'shop',
      liveUrl: 'https://shop-flow-gray.vercel.app/',
      githubUrl: 'https://github.com/Akshaybabuvp/shopFlow',
    },
    {
      id: 'portfolio-website',
      title: 'Personal Portfolio Website',
      description:
        'This responsive single-page portfolio, built with React, Vite and Tailwind CSS, with smooth section navigation, motion animations, and a contact form that sends real email through EmailJS.',
      technologies: ['React.js', 'Vite', 'Tailwind CSS', 'EmailJS'],
      features: [
        'Single-page smooth navigation',
        'Animated hero section',
        'Contact form with email delivery',
        'CV and WhatsApp integration',
        'Responsive and accessible layout',
      ],
      image: '/images/portfolio.png',
      mockup: 'dashboard',
      liveUrl: '', // <-- paste THIS portfolio's Vercel link here after you deploy it
      githubUrl: '', // <-- paste this portfolio's GitHub link here after you push it
    },
  ],
};
