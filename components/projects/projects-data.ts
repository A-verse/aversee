export interface TechItem {
  name: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  url: string;
  description: string;
  features: string[];
  tech: TechItem[];
  gradient: string;
  accent: {
    dash: string;
    fill: string;
    text: string;
    bg: string;
  };
  images: {
    mobile1: string;
    mobile2: string;
    main: string;
  };
  mainImageFit?: "cover" | "fill";
}

const icon = (name: string, file: string): TechItem => ({
  name,
  icon: `/icons/${file}`,
});

const tech = {
  react: icon("React", "React_dark.svg"),
  typescript: icon("TypeScript", "typescript.svg"),
  nextjs: icon("Next.js", "nextjs_icon_dark.svg"),
  tailwind: icon("Tailwind CSS", "tailwindcss.svg"),
  node: icon("Node.js", "nodejs.svg"),
  mongodb: icon("MongoDB", "Prisma_dark.svg"),
  stripe: icon("Stripe", "Vercel_dark.svg"),
  tensorflow: icon("TensorFlow", "RuneLogo.svg"),
  opencv: icon("OpenCV", "RuneLogo.svg"),
  supabase: icon("Supabase", "Vercel_dark.svg"),
  maps: icon("Maps", "Vercel_dark.svg"),
  rest: icon("REST API", "nodejs.svg"),
  vite: icon("Vite", "Vercel_dark.svg"),
};

const base = "/anjali-projects";

export const projects: Project[] = [
  {
    id: "fabro",
    title: "FABRO",
    url: "https://github.com/A-verse/Fabro-Store",
    description:
      "A full-stack fashion e-commerce platform focused on product discovery, customization, shopping, payments, order management, and personalized recommendations.",
    features: [
      "Authentication, product discovery, cart, checkout, and payments",
      "Product customization and structured order management",
      "Admin dashboard for products, inventory, and customer orders",
      "Personalized and similar-product recommendations",
      "Responsive luxury-focused shopping experience",
    ],
    tech: [
      tech.nextjs,
      tech.react,
      tech.typescript,
      tech.node,
      tech.mongodb,
      tech.tailwind,
      tech.stripe,
    ],
    gradient:
      "linear-gradient(12deg, rgb(69, 10, 10) 50%, rgb(127, 29, 29) 82%, rgb(239, 68, 68) 100%)",
    accent: {
      dash: "bg-red-600",
      fill: "fill-red-600",
      text: "text-red-400",
      bg: "bg-red-600/20",
    },
    images: {
      mobile1: `${base}/project-1-mobile-1.jpeg`,
      mobile2: `${base}/project-1-mobile-2.jpeg`,
      main: `${base}/project-1.png`,
    },
  },

  {
    id: "neurospeak",
    title: "NeuroSpeak",
    url: "https://github.com/A-verse/NeuroSpeak-webapp",
    description:
      "An AI-assisted communication platform combining computer vision and machine learning to interpret gestures and create an accessible real-time communication experience.",
    features: [
      "Real-time gesture recognition for assistive communication",
      "Computer vision pipeline for gesture-based input",
      "Machine learning for gesture interpretation",
      "Interactive real-time communication workflow",
      "Persistent user data and application workflows",
    ],
    tech: [
      tech.react,
      tech.typescript,
      tech.tensorflow,
      tech.opencv,
      tech.supabase,
    ],
    gradient:
      "linear-gradient(12deg, rgb(7, 47, 73) 50%, rgb(3, 105, 161) 82%, rgb(56, 189, 248) 100%)",
    accent: {
      dash: "bg-sky-600",
      fill: "fill-sky-600",
      text: "text-sky-400",
      bg: "bg-sky-600/20",
    },
    images: {
      mobile1: `${base}/project-2-mobile-1.jpeg`,
      mobile2: `${base}/project-2-mobile-2.jpeg`,
      main: `${base}/project-2.png`,
    },
  },

  {
    id: "jmrc",
    title: "JMRC Connect",
    url: "https://github.com/A-verse/JMRC-Connect",
    description:
      "A metro passenger portal developed during my internship to simplify transit planning through route discovery, station search, fare calculation, and commuter information.",
    features: [
      "Route planning for metro journeys",
      "Fare calculation and travel cost estimates",
      "Station search and structured station information",
      "REST API integration for transit data",
      "Responsive passenger-focused interface",
    ],
    tech: [tech.react, tech.typescript, tech.tailwind, tech.maps, tech.rest],
    gradient:
      "linear-gradient(12deg, rgb(20, 37, 63) 50%, rgb(30, 64, 175) 82%, rgb(96, 165, 250) 100%)",
    accent: {
      dash: "bg-blue-600",
      fill: "fill-blue-600",
      text: "text-blue-400",
      bg: "bg-blue-600/20",
    },
    images: {
      mobile1: `${base}/project-3-mobile-1.png`,
      mobile2: `${base}/project-3-mobile-2.png`,
      main: `${base}/project-3.png`,
    },
  },

  {
    id: "palate",
    title: "Palate",
    url: "https://github.com/A-verse/Palate",
    description:
      "A modern recipe discovery platform built around structured browsing, personalized recommendations, intuitive navigation, and a fast responsive experience.",
    features: [
      "Structured recipe discovery and browsing",
      "Personalized recipe recommendations",
      "Responsive desktop and mobile layouts",
      "Clean content-focused interface",
      "Fast client-side application architecture",
    ],
    tech: [tech.react, tech.typescript, tech.tailwind, tech.vite],
    gradient:
      "linear-gradient(12deg, rgb(67, 20, 7) 50%, rgb(154, 52, 18) 82%, rgb(251, 146, 60) 100%)",
    accent: {
      dash: "bg-orange-600",
      fill: "fill-orange-600",
      text: "text-orange-400",
      bg: "bg-orange-600/20",
    },
    images: {
      mobile1: `${base}/project-4-mobile-1.png`,
      mobile2: `${base}/project-4-mobile-2.jpeg`,
      main: `${base}/project-4.png`,
    },
  },
];

export const projectCount = projects.length;

export const profileStats = {
  projects: "10+",
  years: "2+",
  dsa: "250+",
};
