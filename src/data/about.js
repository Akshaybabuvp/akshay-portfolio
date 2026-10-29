import {
  BookOpen,
  Braces,
  Briefcase,
  Code,
  GraduationCap,
  MapPin,
  Smartphone,
  Users,
} from 'lucide-react';

// Edit this file to change the About section. No other file needs to change.
export const aboutContent = {
  eyebrow: 'ABOUT',
  heading: 'A Little About Me',

  // One string per paragraph (based on the summary in the CV).
  paragraphs: [
    "I'm a Junior React Developer with hands-on experience building responsive and scalable web applications using React.js, JavaScript (ES6+), Next.js, TypeScript, Tailwind CSS, REST APIs, Axios, Supabase, and Firebase.",
    "I have experience developing reusable components, state management, API integration, authentication, CRUD operations, responsive UI, and database-driven applications. I'm also familiar with React Hooks, React Router, Redux Toolkit, Git, GitHub, and modern frontend development practices.",
    "I'm seeking a Junior React Developer / Frontend Developer opportunity where I can keep learning from experienced developers and contribute to real-world projects.",
  ],

  // The four information cards.
  infoCards: [
    {
      label: 'Role',
      value: 'Junior React / Frontend Developer',
      icon: Briefcase,
    },
    { label: 'Primary Focus', value: 'React.js and JavaScript', icon: Code },
    {
      label: 'Education',
      value: 'BCA Computer Science (IGNOU) and Frontend Development Course',
      icon: GraduationCap,
    },
    {
      label: 'Location',
      value: 'Panambad, Maranchery, Kerala, India',
      icon: MapPin,
    },
  ],

  // The four personal values.
  values: [
    {
      title: 'Clean code',
      description:
        'Readable, well-organized components that are easy to maintain.',
      icon: Braces,
    },
    {
      title: 'Continuous learning',
      description: 'Improving my skills a little every day through practice.',
      icon: BookOpen,
    },
    {
      title: 'Responsive design',
      description:
        'Interfaces that work well on phones, tablets, and desktops.',
      icon: Smartphone,
    },
    {
      title: 'User-focused development',
      description: 'Building with the person using the app in mind.',
      icon: Users,
    },
  ],
};
