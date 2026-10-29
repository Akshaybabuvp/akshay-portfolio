import { Monitor, Server, Sparkles, Wrench } from 'lucide-react';

// Edit this file to change the Skills section.
// To ADD a skill: copy one { name, abbr } line and change the text.
// To REMOVE a skill: delete its line.
// "abbr" is the 2-3 letter badge shown beside the skill name.
// "wide: true" makes that category card use the full width on large screens.
// Only list skills you can explain in an interview.
export const skillsContent = {
  eyebrow: 'SKILLS',
  heading: 'Skills and Technologies',
  description:
    'The tools and technologies I use to build responsive, user-friendly web applications.',

  categories: [
    {
      title: 'Frontend Development',
      icon: Monitor,
      wide: true,
      skills: [
        { name: 'React.js', abbr: 'Re' },
        { name: 'Next.js', abbr: 'Nx' },
        { name: 'JavaScript (ES6+)', abbr: 'JS' },
        { name: 'TypeScript', abbr: 'TS' },
        { name: 'HTML5', abbr: 'H5' },
        { name: 'CSS3', abbr: 'C3' },
        { name: 'Tailwind CSS', abbr: 'Tw' },
        { name: 'Bootstrap', abbr: 'Bs' },
        { name: 'Responsive Web Design', abbr: 'RD' },
        { name: 'React Hooks', abbr: 'Hk' },
        { name: 'Context API', abbr: 'Cx' },
        { name: 'Redux Toolkit', abbr: 'RT' },
        { name: 'Redux', abbr: 'Rx' },
        { name: 'React Router', abbr: 'Rr' },
        { name: 'Component-Based Architecture', abbr: 'CB' },
        { name: 'Fetch API', abbr: 'Fe' },
        { name: 'Axios', abbr: 'Ax' },
        { name: 'Framer Motion', abbr: 'Fm' },
        { name: 'Search Engine Optimisation (SEO)', abbr: 'SEO' },
      ],
    },
    {
      title: 'Backend and Database',
      icon: Server,
      skills: [
        { name: 'Node.js', abbr: 'No' },
        { name: 'Supabase', abbr: 'Sb' },
        { name: 'Firebase', abbr: 'Fb' },
        { name: 'REST APIs', abbr: 'API' },
        { name: 'Web Services', abbr: 'WS' },
        { name: 'Payment Integration (Razorpay)', abbr: 'Rp' },
      ],
    },
    {
      title: 'Tools and Platforms',
      icon: Wrench,
      skills: [
        { name: 'Git', abbr: 'Git' },
        { name: 'GitHub', abbr: 'GH' },
        { name: 'Postman', abbr: 'Pm' },
        { name: 'Vercel', abbr: 'Vc' },
        { name: 'Netlify', abbr: 'Nl' },
        { name: 'Google Cloud', abbr: 'GCl' },
        { name: 'Google Console', abbr: 'GCn' },
        { name: 'Deployments', abbr: 'Dp' },
      ],
    },
    {
      title: 'AI and Productivity Tools',
      icon: Sparkles,
      wide: true,
      skills: [
        { name: 'GitHub Copilot', abbr: 'Cp' },
        { name: 'Claude AI', abbr: 'Cl' },
        { name: 'ChatGPT', abbr: 'GPT' },
        { name: 'Prompt Engineering', abbr: 'PE' },
        { name: 'Replit', abbr: 'Rl' },
        { name: 'v0.vercel', abbr: 'v0' },
      ],
    },
  ],
};
