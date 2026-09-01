export interface TechItem {
  name: string
  icon: string
}

export interface Project {
  id: string
  title: string
  url: string
  description: string
  features: string[]
  tech: TechItem[]
  gradient: string
  accent: { dash: string; fill: string; text: string; bg: string }
  images: { mobile1: string; mobile2: string; main: string }
  mainImageFit?: 'cover' | 'fill'
}

const icon = (name: string, file: string): TechItem => ({ name, icon: `/icons/${file}` })
const react = icon('React', 'React_dark.svg')
const typescript = icon('TypeScript', 'typescript.svg')
const nextjs = icon('Next.js', 'nextjs_icon_dark.svg')
const tailwind = icon('Tailwind CSS', 'tailwindcss.svg')
const node = icon('Node.js', 'nodejs.svg')

const base = '/images/anjali-projects'

export const projects: Project[] = [
  {
    id: 'fabro',
    title: 'FABRO',
    url: 'https://github.com/A-verse/Fabro-Store',
    description: 'A premium fashion e-commerce platform featuring authentication, shopping cart, secure payments, product customization, admin dashboard, order management, and a luxury editorial UI.',
    features: ['Authentication, cart, secure payments, and product customization', 'Admin dashboard with order management', 'Luxury editorial interface built for performance'],
    tech: [nextjs, react, typescript, node, icon('MongoDB', 'Prisma_dark.svg'), tailwind, icon('Stripe', 'Vercel_dark.svg')],
    gradient: 'linear-gradient(12deg, rgb(69, 10, 10) 50%, rgb(127, 29, 29) 82%, rgb(239, 68, 68) 100%)',
    accent: { dash: 'bg-red-600', fill: 'fill-red-600', text: 'text-red-400', bg: 'bg-red-600/20' },
    images: { mobile1: `${base}/project-1.png`, mobile2: `${base}/project-1.png`, main: `${base}/project-1.png` },
  },
  {
    id: 'neurospeak',
    title: 'NeuroSpeak',
    url: 'https://github.com/A-verse/NeuroSpeak-webapp',
    description: 'An AI-powered assistive communication platform that leverages computer vision and machine learning to help users communicate through gesture recognition and real-time interaction.',
    features: ['Gesture recognition for accessible communication', 'Real-time computer vision interaction', 'AI-powered assistive user experience'],
    tech: [react, icon('TensorFlow', 'RuneLogo.svg'), icon('OpenCV', 'RuneLogo.svg'), icon('Supabase', 'Vercel_dark.svg'), typescript],
    gradient: 'linear-gradient(12deg, rgb(7, 47, 73) 50%, rgb(3, 105, 161) 82%, rgb(56, 189, 248) 100%)',
    accent: { dash: 'bg-sky-600', fill: 'fill-sky-600', text: 'text-sky-400', bg: 'bg-sky-600/20' },
    images: { mobile1: `${base}/project-2.png`, mobile2: `${base}/project-2.png`, main: `${base}/project-2.png` },
  },
  {
    id: 'jmrc',
    title: 'JMRC Connect',
    url: 'https://github.com/A-verse/JMRC-Connect',
    description: 'A modern metro passenger portal developed during my internship, featuring intelligent route planning, fare calculation, station search, and responsive UI for enhanced commuter experience.',
    features: ['Intelligent route planning and fare calculation', 'Station search for metro passengers', 'Responsive enterprise web experience'],
    tech: [react, typescript, tailwind, icon('Maps', 'Vercel_dark.svg'), icon('REST API', 'nodejs.svg')],
    gradient: 'linear-gradient(12deg, rgb(20, 37, 63) 50%, rgb(30, 64, 175) 82%, rgb(96, 165, 250) 100%)',
    accent: { dash: 'bg-blue-600', fill: 'fill-blue-600', text: 'text-blue-400', bg: 'bg-blue-600/20' },
    images: { mobile1: `${base}/project-3.png`, mobile2: `${base}/project-3.png`, main: `${base}/project-3.png` },
  },
  {
    id: 'palate',
    title: 'Palate',
    url: 'https://github.com/A-verse/Palate',
    description: 'A modern recipe platform with personalized recommendations, clean UI, responsive layouts, and intuitive browsing experience built using modern frontend technologies.',
    features: ['Personalized recipe recommendations', 'Clean, responsive browsing experience', 'Fast frontend architecture with Vite'],
    tech: [react, typescript, tailwind, icon('Vite', 'Vercel_dark.svg')],
    gradient: 'linear-gradient(12deg, rgb(67, 20, 7) 50%, rgb(154, 52, 18) 82%, rgb(251, 146, 60) 100%)',
    accent: { dash: 'bg-orange-600', fill: 'fill-orange-600', text: 'text-orange-400', bg: 'bg-orange-600/20' },
    images: { mobile1: `${base}/project-4.png`, mobile2: `${base}/project-4.png`, main: `${base}/project-4.png` },
  },
]

export const projectCount = projects.length
export const profileStats = { projects: '10+', years: '2+', dsa: '250+' }
