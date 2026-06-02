'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Custom SVGs for Tech Icons to ensure 100% reliable offline renders ---
const CustomIcon = ({ name, className, color }) => {
  const strokeColor = color || 'currentColor';
  const fillColor = color || 'currentColor';

  switch (name) {
    case 'reactnative':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="1.5">
          <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill={fillColor} />
        </svg>
      );
    case 'expo':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 7l4.5 7.5h-9L12 7z" fill={fillColor} />
        </svg>
      );
    case 'nativewind':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h20M6 8h12M4 16h14" />
          <circle cx="12" cy="12" r="9" strokeWidth="1.5" strokeDasharray="3 3" />
        </svg>
      );
    case 'rest-api':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
          <circle cx="6" cy="6" r="2" fill={fillColor} />
          <circle cx="18" cy="12" r="2" fill={fillColor} />
          <circle cx="10" cy="18" r="2" fill={fillColor} />
          <path d="M6 6v6m12 0v6M10 18V12" strokeWidth="1.2" strokeDasharray="2 2" />
        </svg>
      );
    case 'jwt':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <circle cx="6" cy="12" r="3.5" />
          <circle cx="18" cy="12" r="3.5" />
          <path d="M9.5 12h5" strokeLinecap="round" strokeDasharray="2.5 1.5" />
          <path d="M12 9.5v5" strokeLinecap="round" />
          <path d="M12 12m-1.5 0a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0 -3 0" fill={fillColor} />
        </svg>
      );
    case 'webhook':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <path d="M4 12a8 8 0 0 1 12-7l3 3m1 0h-4m4 0V4M20 12a8 8 0 0 1-12 7l-3-3m-1 0h4m-4 0v4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="12" r="2" fill={fillColor} />
        </svg>
      );
    case 'microservices':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'aws-lambda':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2.5">
          <path d="M7 21c2.5-3 5-10 6.5-13.5C14.5 5 16 3 18.5 3M6.5 3c2 2 3.5 5.5 5.5 10.5M12 13.5l5 7.5" strokeLinecap="round" />
        </svg>
      );
    case 'aws-api-gateway':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <rect x="3" y="3" width="6" height="6" rx="1" />
          <rect x="15" y="3" width="6" height="6" rx="1" />
          <rect x="9" y="15" width="6" height="6" rx="1" />
          <path d="M6 9v3h6m0 0v3m0-3h6v-3" strokeLinecap="round" />
        </svg>
      );
    case 'aws-eventbridge':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <circle cx="5" cy="5" r="2" fill={fillColor} />
          <circle cx="19" cy="5" r="2" fill={fillColor} />
          <circle cx="12" cy="19" r="2" fill={fillColor} />
          <path d="M5 7v4a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V7" strokeLinecap="round" />
          <path d="M12 15v2" strokeLinecap="round" />
        </svg>
      );
    case 'aws-secrets':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M12 1a5 5 0 0 0-5 5v5h10V6a5 5 0 0 0-5-5z" />
          <circle cx="12" cy="16" r="1.5" fill={fillColor} />
        </svg>
      );
    case 'aws-watch':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 12l2-2" strokeLinecap="round" />
        </svg>
      );
    case 'vercel':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={fillColor}>
          <path d="M24 22.525H0L12 1.475l12 21.05z" />
        </svg>
      );
    case 'serverless':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" fill={fillColor} />
        </svg>
      );
    case 'drizzle-orm':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <path d="M12 3v3M8 6v2M16 6v2M6 10v1M18 10v1M10 12c0 1.1-.9 2-2 2s-2-.9-2-2m10 0c0 1.1-.9 2-2 2s-2-.9-2-2" strokeLinecap="round" />
          <path d="M12 14v7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'getstream':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <path d="M2 17c5-3 5-7 10-10s5-3 10 0" strokeLinecap="round" />
          <path d="M2 12c5-3 5-7 10-10s5-3 10 0" strokeLinecap="round" opacity="0.7" />
          <path d="M2 22c5-3 5-7 10-10s5-3 10 0" strokeLinecap="round" opacity="0.4" />
        </svg>
      );
    case 'cashfree':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M16 8h5v8h-5z" />
          <path d="M7 12h4" strokeLinecap="round" />
          <circle cx="18" cy="12" r="1.5" fill={fillColor} />
        </svg>
      );
    case 'razorpay':
      return (
        <svg viewBox="0 0 24 24" className={className} fill={fillColor}>
          <path d="M22.4 2.4L13.1 11.7l3.7 3.7c.6.6.6 1.5 0 2.1l-6.1 6.1H24V2.4h-1.6zM9 12.6l-6.6 6.6H13L21.4 11H9.8c-.5.1-.8.5-.8 1.6z" />
        </svg>
      );
    case 'shiprocket':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 17l10 5 10-5M2 7v10l10 5V12L2 7z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 2l5 8h-10l5-8z" opacity="0.1" />
        </svg>
      );
    case 'mtalkz':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke={strokeColor} strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

// --- Comprehensive Tech Skills List with customized metadata ---
const skillsData = [
  // --- Languages ---
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    iconType: "devicon",
    color: "#d97706",
    useCase: "Core language for front-end actions and full-stack interactive features."
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    iconType: "devicon",
    color: "#2563eb",
    useCase: "Enforces strict type safety and auto-documentation across our hooks."
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    iconType: "devicon",
    color: "#0284c7",
    useCase: "Engineered AWS Lambda microservices and automation script processors."
  },
  {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    iconType: "devicon",
    color: "#4f46e5",
    useCase: "Optimized programmatic calculations and core system structures."
  },

  // --- Frontend ---
  {
    name: "React.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    iconType: "devicon",
    color: "#06b6d4",
    useCase: "Developed interactive state nodes and reusable view component layouts."
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    iconType: "devicon",
    color: "#0f172a",
    useCase: "SSR and SEO-optimized e-commerce platforms (Rabbit Auto Care, Genesis Classes)."
  },
  {
    name: "React Native",
    icon: "reactnative",
    iconType: "custom",
    color: "#06b6d4",
    useCase: "Built production veterinary telehealth apps featuring WebRTC video consultations."
  },
  {
    name: "Expo",
    icon: "expo",
    iconType: "custom",
    color: "#334155",
    useCase: "Managed cross-platform mobile setups, bare plugins, and OTA deployments."
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    iconType: "devicon",
    color: "#ea580c",
    useCase: "Structured semantic document layers ensuring solid SEO and accessibility."
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    iconType: "devicon",
    color: "#2563eb",
    useCase: "Designed customized premium layouts, glassmorphism filters, and smooth motions."
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    iconType: "devicon",
    color: "#0d9488",
    useCase: "Rapid styled layouts using modern responsive parameters and utility declarations."
  },
  {
    name: "NativeWind",
    icon: "nativewind",
    iconType: "custom",
    color: "#0f766e",
    useCase: "Integrated Tailwind CSS utility architecture straight into React Native mobile views."
  },
  {
    name: "Vite",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
    iconType: "devicon",
    color: "#7c3aed",
    useCase: "Ultra-fast frontend build configurations and lightning local hot reloads."
  },

  // --- Backend ---
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    iconType: "devicon",
    color: "#16a34a",
    useCase: "Architected back-end API microservices using lightweight, event-driven processes."
  },
  {
    name: "REST API",
    icon: "rest-api",
    iconType: "custom",
    color: "#9333ea",
    useCase: "Designed clean structured route pathways, data formats, and endpoint validations."
  },
  {
    name: "JWT Auth",
    icon: "jwt",
    iconType: "custom",
    color: "#db2777",
    useCase: "Secured web environments using stateless encrypted login tokens and route guards."
  },
  {
    name: "Webhooks",
    icon: "webhook",
    iconType: "custom",
    color: "#2563eb",
    useCase: "Created event listener hubs with strict idempotency guards (Cashfree/GetStream)."
  },
  {
    name: "Microservices",
    icon: "microservices",
    iconType: "custom",
    color: "#4f46e5",
    useCase: "Engineered AWS-decoupled computation servers, separating key back-end layers."
  },

  // --- Cloud & Infra ---
  {
    name: "AWS Lambda",
    icon: "aws-lambda",
    iconType: "custom",
    color: "#ea580c",
    useCase: "Serverless computational functions, resolving critical timeout issues at scale."
  },
  {
    name: "AWS API Gateway",
    icon: "aws-api-gateway",
    iconType: "custom",
    color: "#e11d48",
    useCase: "Managed serverless endpoint structures, isolating AWS Lambdas from direct web traffic."
  },
  {
    name: "AWS EventBridge",
    icon: "aws-eventbridge",
    iconType: "custom",
    color: "#c2410c",
    useCase: "Engineered transactional schedules and cleanup checks for telehealth rooms."
  },
  {
    name: "AWS Secrets",
    icon: "aws-secrets",
    iconType: "custom",
    color: "#dc2626",
    useCase: "Cached encrypted database credentials, securing active keys from git commits."
  },
  {
    name: "AWS CloudWatch",
    icon: "aws-watch",
    iconType: "custom",
    color: "#be123c",
    useCase: "Tracked infrastructure diagnostics logs, error graphs, and real-time alerts."
  },
  {
    name: "Vercel",
    icon: "vercel",
    iconType: "custom",
    color: "#0f172a",
    useCase: "Configured Git-connected continuous deployment and instant serverless builds."
  },
  {
    name: "Serverless Architecture",
    icon: "serverless",
    iconType: "custom",
    color: "#f43f5e",
    useCase: "Created scalable architectures that downscale to zero, saving operational bills."
  },

  // --- Databases & Caching ---
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    iconType: "devicon",
    color: "#16a34a",
    useCase: "Designed atomic multi-document transactions for double-entry ledger platforms."
  },
  {
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    iconType: "devicon",
    color: "#1d4ed8",
    useCase: "Configured relational tables and high-efficiency indexed JOIN queries."
  },
  {
    name: "Supabase",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg",
    iconType: "devicon",
    color: "#059669",
    useCase: "Integrated Postgres database engines with secure row-level auth rules."
  },
  {
    name: "Drizzle ORM",
    icon: "drizzle-orm",
    iconType: "custom",
    color: "#84cc16",
    useCase: "Enforced type-safe database tables matching strict TypeScript parameters."
  },
  {
    name: "Valkey / Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    iconType: "devicon",
    color: "#b91c1c",
    useCase: "Implemented distributed session caching to bypass heavy SQL database queries."
  },

  // --- Real-time & Integrations ---
  {
    name: "GetStream Video SDK",
    icon: "getstream",
    iconType: "custom",
    color: "#2563eb",
    useCase: "Embedded live, real-time WebRTC audio/video consultations for mobile apps."
  },
  {
    name: "Cashfree Payments",
    icon: "cashfree",
    iconType: "custom",
    color: "#4f46e5",
    useCase: "Automated merchant multi-tier split payouts and split escrow frameworks."
  },
  {
    name: "Razorpay",
    icon: "razorpay",
    iconType: "custom",
    color: "#1d4ed8",
    useCase: "Built tuition portals and e-commerce carts with secure checkout cards."
  },
  {
    name: "Shiprocket",
    icon: "shiprocket",
    iconType: "custom",
    color: "#6d28d9",
    useCase: "Synchronized logistics, tracking details, and shipment dispatches automatically."
  },
  {
    name: "Mtalkz",
    icon: "mtalkz",
    iconType: "custom",
    color: "#b45309",
    useCase: "Integrated messaging reminders, text notifications, and OTP gates."
  },
  {
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    iconType: "devicon",
    color: "#1f2937",
    useCase: "Version control repositories, git commits logic, and pull request workflows."
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    iconType: "devicon",
    color: "#ea580c",
    useCase: "Distributed version control system tracking local edits and branch changes."
  }
];

// --- Desktop Floating Icon Coordinates (Exactly 24 balanced spots) ---
const desktopFloatingIcons = [
  // Top Area (0% - 30%)
  { name: "HTML5", top: "20%", left: "8%", size: "w-12 h-12 md:w-18 md:h-18" },
  { name: "TypeScript", top: "12%", left: "22%", size: "w-14 h-14 md:w-20 md:h-20" },
  { name: "JavaScript", top: "10%", left: "38%", size: "w-12 h-12 md:w-18 md:h-18" },
  { name: "Tailwind CSS", top: "15%", left: "54%", size: "w-12 h-12 md:w-18 md:h-18" },
  { name: "C++", top: "8%", left: "70%", size: "w-12 h-12 md:w-18 md:h-18" },
  { name: "Vite", top: "22%", left: "85%", size: "w-14 h-14 md:w-24 md:h-24" },
  { name: "AWS Lambda", top: "5%", left: "54%", size: "w-12 h-12 md:w-18 md:h-18" },
  { name: "Next.js", top: "4%", left: "88%", size: "w-10 h-10 md:w-14 md:h-14" },

  // Middle Area (30% - 60%)
  { name: "MongoDB", top: "38%", left: "5%", size: "w-12 h-12 md:w-18 md:h-18" },
  { name: "CSS3", top: "45%", left: "22%", size: "w-12 h-12 md:w-18 md:h-18" },
  { name: "React.js", top: "35%", left: "42%", size: "w-12 h-12 md:w-18 md:h-18" },
  { name: "React Native", top: "42%", left: "58%", size: "w-12 h-12 md:w-18 md:h-18" },
  { name: "Supabase", top: "34%", left: "72%", size: "w-12 h-12 md:w-16 md:h-16" },
  { name: "Valkey / Redis", top: "45%", left: "88%", size: "w-12 h-12 md:w-16 md:h-16" },
  { name: "Expo", top: "52%", left: "12%", size: "w-10 h-10 md:w-14 md:h-14" },
  { name: "Node.js", top: "58%", left: "30%", size: "w-12 h-12 md:w-18 md:h-18" },

  // Bottom Area (60% - 90%)
  { name: "Python", top: "70%", left: "6%", size: "w-14 h-14 md:w-20 md:h-20" },
  { name: "Vercel", top: "82%", left: "20%", size: "w-10 h-10 md:w-14 md:h-14" },
  { name: "Git", top: "72%", left: "46%", size: "w-12 h-12 md:w-18 md:h-18" },
  { name: "Drizzle ORM", top: "84%", left: "62%", size: "w-10 h-10 md:w-14 md:h-14" },
  { name: "GetStream Video SDK", top: "76%", left: "78%", size: "w-12 h-12 md:w-16 md:h-16" },
  { name: "MySQL", top: "68%", left: "90%", size: "w-14 h-14 md:w-20 md:h-20" },
  { name: "Razorpay", top: "88%", left: "40%", size: "w-12 h-12 md:w-18 md:h-18" },
  { name: "GitHub", top: "86%", left: "82%", size: "w-10 h-10 md:w-14 md:h-14" }
];

export default function Skills() {
  const sectionRef = useRef(null);
  const constraintsRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [positions, setPositions] = useState(desktopFloatingIcons);
  const [isFormingCircle, setIsFormingCircle] = useState(false);
  const [activeDragIndex, setActiveDragIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Resize-aware viewport tracker for Next.js SSR/hydration compatibility
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Map coordinate spots to technical data objects
  const floatingSkills = positions.map(item => {
    const data = skillsData.find(s => s.name === item.name || (item.name === "GetStream Video SDK" && s.name === "GetStream Video SDK") || (item.name === "Valkey / Redis" && s.name === "Valkey / Redis"));
    const match = data || skillsData.find(s => s.name.toLowerCase().includes(item.name.toLowerCase().split(" ")[0]));
    return { ...item, ...match };
  });

  // Reshuffle skill items across coordinates smoothly after forming a circular or square orbit
  const triggerCircleShuffle = () => {
    if (isFormingCircle) return; // Prevent double-triggering during animation
    
    // Step 1: Form the target orbit around the text
    setIsFormingCircle(true);
    
    // Step 2: After exactly 1.2 seconds, shuffle the positions and disperse outward smoothly
    setTimeout(() => {
      const skillsList = positions.map(p => p.name);
      const shuffledSkills = [...skillsList].sort(() => Math.random() - 0.5);
      const newPositions = desktopFloatingIcons.map((spot, idx) => ({
        ...spot,
        name: shuffledSkills[idx]
      }));
      setPositions(newPositions);
      setIsFormingCircle(false);
    }, 1200);
  };

  // Helper to calculate exact coordinates dynamically (Square for Mobile, Circle for Desktop)
  const getStyle = (pos, index) => {
    if (isFormingCircle) {
      if (isMobile) {
        // Perfect Square Orbit Layout for mobile viewports (centered on the container)
        const S = 120; // Half-side length (240px total square perimeter - fits all mobile devices!)
        let x, y;
        
        if (index < 6) {
          // Top side: x goes from -S to S, y = -S
          y = -S;
          x = -S + (2 * S) * (index / 6);
        } else if (index < 12) {
          // Right side: x = S, y goes from -S to S
          x = S;
          y = -S + (2 * S) * ((index - 6) / 6);
        } else if (index < 18) {
          // Bottom side: x goes from S to -S, y = S
          y = S;
          x = S - (2 * S) * ((index - 12) / 6);
        } else {
          // Left side: x = -S, y goes from S to -S
          x = -S;
          y = S - (2 * S) * ((index - 18) / 6);
        }
        
        return {
          top: `calc(50% + ${y}px)`,
          left: `calc(50% + ${x}px)`,
          marginTop: "-22px", // Compensation offset for mobile icon centering
          marginLeft: "-22px"
        };
      } else {
        // Perfect Circle Orbit Layout for desktop viewports
        const radius = 250;
        const angle = index * ((2 * Math.PI) / 24);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        return {
          top: `calc(50% + ${y}px)`,
          left: `calc(50% + ${x}px)`,
          marginTop: "-24px",
          marginLeft: "-24px"
        };
      }
    }
    return {
      top: pos.top,
      left: pos.left
    };
  };

  return (
    <div 
      ref={sectionRef}
      onClick={() => {
        if (isMobile) {
          setHoveredIndex(null); // Tap outside to dismiss tooltip on mobile
        }
      }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-white to-indigo-50 px-4 sm:px-6 lg:px-8 py-20 group font-sans select-none"
    >
      
      {/* Background Image with Hover Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-20 transition-opacity duration-700 ease-in-out pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/used/imgs.jpg)',
          filter: 'blur(0px) group-hover:blur(0px)',
        }}
      />

      {/* Decorative ambient light spheres */}
      <div className="absolute top-1/4 left-10 w-80 h-80 rounded-full bg-indigo-50/50 blur-[100px] pointer-events-none select-none z-0" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 rounded-full bg-teal-50/50 blur-[100px] pointer-events-none select-none z-0" />
      
      {/* Dedicated absolutely positioned, non-flex container for drag constraints to ensure flawless 360-degree dragging */}
      <div ref={constraintsRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* --- SCATTERED VIEWPORT (Now Desktop & Mobile Unified!): Draggable Absolute Icons with Direct Tooltips --- */}
      {floatingSkills.map((pos, index) => {
        const isHovered = hoveredIndex === index;
        const isDragging = activeDragIndex === index;
        const coordinates = getStyle(pos, index);

        return (
          <motion.div
            key={index} // Stable React Key prevents unmounting and enables gorgeous morphing transitions!
            layout // Framer Motion smooth position morphing when clicked to shuffle or form circle/square!
            drag={!isFormingCircle} // Prevent dragging while in orbit animation
            dragConstraints={constraintsRef}
            dragElastic={0.25}
            dragMomentum={true}
            whileDrag={{ scale: 1.35, zIndex: 100 }}
            onDragStart={() => setActiveDragIndex(index)}
            onDragEnd={() => setActiveDragIndex(null)}
            onMouseEnter={() => !isMobile && setHoveredIndex(index)}
            onMouseLeave={() => !isMobile && setHoveredIndex(null)}
            onClick={(e) => {
              if (isMobile) {
                e.stopPropagation();
                setHoveredIndex(isHovered ? null : index); // Toggle on mobile click
              }
            }}
            className={`absolute ${pos.size} cursor-grab active:cursor-grabbing items-center justify-center z-20 flex`}
            style={coordinates}
            animate={isFormingCircle ? { x: 0, y: 0 } : undefined}
            transition={{
              layout: {
                type: "spring",
                stiffness: 110,
                damping: 18
              }
            }}
          >
            {/* Premium Direct Tooltip (Centered directly over the active icon) */}
            <div className={`absolute bottom-[115%] left-1/2 -translate-x-1/2 mb-2 w-48 md:w-60 bg-white/95 backdrop-blur-md border border-slate-200/60 p-2.5 md:p-3.5 rounded-xl shadow-xl transition-all duration-300 transform z-50 text-left flex flex-col gap-0.5 select-none ${
              isHovered && !isFormingCircle
                ? 'opacity-100 pointer-events-auto translate-y-0' 
                : 'opacity-0 pointer-events-none translate-y-2'
            }`}>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="font-extrabold text-xs md:text-sm" style={{ color: pos.color }}>{pos.name}</span>
              </div>
              <p className="text-[9px] md:text-xs text-slate-650 font-semibold leading-relaxed mt-0.5">
                {pos.useCase}
              </p>
              {/* Micro tooltip arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white/95 border-r border-b border-slate-200/60 rotate-45 -translate-y-1.2" />
            </div>

            {/* Glowing child float container so float oscillations do not override drag coordinates! */}
            <motion.div
              className="w-full h-full flex items-center justify-center relative"
              animate={{
                y: isHovered || isFormingCircle || isDragging ? 0 : [0, -15, 0],
                rotate: isHovered || isFormingCircle || isDragging ? 0 : [0, 4, 0]
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 4,
                  ease: "easeInOut",
                  delay: index * 0.15
                },
                rotate: {
                  repeat: Infinity,
                  repeatType: "mirror",
                  duration: 4,
                  ease: "easeInOut",
                  delay: index * 0.15
                }
              }}
            >
              {/* Glowing halo behind hovered icon */}
              <div 
                className={`absolute inset-0 rounded-full blur-xl scale-120 transition-all duration-500 pointer-events-none ${
                  isHovered && !isFormingCircle ? 'opacity-20' : 'opacity-0'
                }`}
                style={{ backgroundColor: pos.color }}
              />

              {pos.iconType === 'devicon' ? (
                <img 
                  src={pos.icon} 
                  alt="" 
                  className="w-full h-full object-contain filter drop-shadow-2xl opacity-80 hover:opacity-100 transition-all duration-300 pointer-events-auto select-none" 
                  draggable="false" // Prevents default browser image drag from interfering with Framer Motion drag!
                />
              ) : (
                <div className="w-full h-full p-2 flex items-center justify-center bg-white/10 hover:bg-white/40 rounded-2xl border border-transparent hover:border-slate-200/30 transition-all duration-300 shadow-sm hover:shadow-md pointer-events-auto">
                  <CustomIcon 
                    name={pos.icon} 
                    className="w-full h-full filter drop-shadow-2xl opacity-80 hover:opacity-100 transition-all duration-300" 
                    color={pos.color} 
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Central Skills Logo & Title */}
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center z-10 px-4">
        <div className="text-center select-none">
          <div 
            onClick={(e) => {
              e.stopPropagation();
              triggerCircleShuffle();
            }}
            className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-wider cursor-pointer hover:scale-105 transition-transform duration-300 active:scale-95 group/title"
            title="Click to reshuffle all icons!"
          >
            <span className="text-teal-500 drop-shadow-lg transition-transform group-hover/title:-translate-x-1" style={{ fontSize: '0.8em' }}>&lt;</span>
            <span className="flex items-center gap-1 sm:gap-2 relative">
              <span className="text-slate-800 drop-shadow-md font-space-grotesk">SKILLS</span>
            </span>
            <span className="text-teal-500 drop-shadow-lg transition-transform group-hover/title:translate-x-1" style={{ fontSize: '0.8em' }}>/&gt;</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatIcon {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(8deg);
          }
        }
        
        @keyframes leafFloat {
          0%, 100% {
            transform: translateX(-50%) translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateX(-50%) translateY(-8px) rotate(-5deg);
          }
          75% {
            transform: translateX(-50%) translateY(-5px) rotate(5deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          @keyframes floatIcon {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-12px) rotate(4deg);
            }
          }
        }
      `}</style>
    </div>
  );
}