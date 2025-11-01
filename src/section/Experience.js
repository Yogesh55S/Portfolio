"use client";
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion'; // Added motion imports

const experiences = [
  // ... Your experience data remains exactly the same ...
  {
    role: "Full-Stack Developer",
    company: "Indiefluence, Kurukshetra",
    date: "2025 - Present",
    description: "Working on full-stack web applications with modern frameworks like Next.js, Supabase, and TailwindCSS.",
    tech: ["Next.js", "Supabase", "TailwindCSS"],
    status: "current"
  },
  {
    role: "Full-Stack Intern",
    company: "Hopping Minds, Mohali",
    date: "Jul 2023 - Aug 2023",
    description: "Built full-stack applications using React.js, Node.js, and MongoDB, gaining experience in scalable architectures.",
    tech: ["React.js", "Node.js", "MongoDB"],
    status: "completed"
  },
  {
    role: "Web Developer Trainee",
    company: "Achievers Technologies, Kurukshetra",
    date: "Aug 2021 - Oct 2021",
    description: "Worked with HTML, CSS, JavaScript, and PHP to design responsive websites and integrate databases.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    status: "completed"
  },
  {
    role: "PHP Developer",
    company: "Achievers Technologies, Kurukshetra",
    date: "Aug 2021 - Oct 2021",
    description: "Developed backend APIs and dynamic modules with PHP and MySQL.",
    tech: ["PHP", "MySQL"],
    status: "completed"
  },
  {
    role: "Python with Database Trainee",
    company: "Achievers Technologies, Kurukshetra",
    date: "Aug 2021 - Oct 2021",
    description: "Worked with Python and MySQL to design database-driven applications.",
    tech: ["Python", "MySQL"],
    status: "completed"
  },
];

// --- NEW HELPER COMPONENT for animations ---
const AnimatedSection = ({ children, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

// --- NEW HELPER COMPONENT for Desktop Item ---
const DesktopExperienceItem = ({ exp, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 * index, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="relative group">
        {/* Connection line */}
        {!isLast && (
          <div className="absolute left-0 top-full h-32 w-px bg-gradient-to-b from-gray-300 to-transparent ml-8"></div>
        )}

        <div className="flex items-start gap-8">
          {/* Timeline marker */}
          <div className="flex-shrink-0 relative pt-2">
            <div className="w-16 h-16 border-4 border-black bg-white relative transition-all duration-300 group-hover:scale-110">
              <div className="absolute inset-0 bg-black transform scale-0 transition-transform duration-300 group-hover:scale-100"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-black group-hover:text-white relative z-10 transition-colors duration-300">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
            {/* Removed the small black square marker for 'current' */}
          </div>

          {/* Content */}
          <div className="flex-1 bg-white/80 backdrop-blur-sm border-2 border-gray-300 p-10 transition-all duration-300 group-hover:border-gray-900 group-hover:-translate-y-2 group-hover:shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-8 pb-6 border-b-2 border-gray-200">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-3">
                  <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                    {exp.date}
                  </span>
                  {exp.status === 'current' && (
                    <div className="flex items-center gap-2">
                      {/* --- NEW Pulsing Dot --- */}
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-black"></span>
                      </span>
                      <span className="text-xs font-bold tracking-[0.2em] uppercase">
                        Active Role
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">
                  {exp.role}
                </h3>
                <p className="text-lg font-semibold text-gray-600 tracking-wide">
                  {exp.company}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {exp.description}
            </p>

            {/* Tech Stack */}
            <div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-4">
                Technologies
              </div>
              <div className="flex flex-wrap gap-3">
                {/* --- NEW Tech Pill Styling --- */}
                {exp.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full transition-all duration-200 hover:bg-gray-200 hover:-translate-y-px"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-gray-300 -mt-px -mr-px"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-gray-300 -mb-px -ml-px"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- NEW HELPER COMPONENT for Mobile Item ---
const MobileExperienceItem = ({ exp, index, isLast }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 * index, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="relative">
        {/* Connection line */}
        {!isLast && (
          <div className="absolute left-6 top-full h-12 w-px bg-gradient-to-b from-gray-300 to-transparent"></div>
        )}

        <div className="flex gap-4 sm:gap-6">
          {/* Timeline marker */}
          <div className="flex-shrink-0 relative"> {/* Added relative here */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 border-3 border-black bg-white relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-black">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
            </div>
            {/* Removed the small black square marker for 'current' */}
          </div>

          {/* Content Card */}
          <div className="flex-1 bg-white/80 backdrop-blur-sm border-2 border-gray-300 p-6 sm:p-8">
            {/* Header */}
            <div className="mb-6 pb-5 border-b-2 border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">
                  {exp.date}
                </span>
                {exp.status === 'current' && (
                  <div className="flex items-center gap-2">
                    {/* --- NEW Pulsing Dot (mobile) --- */}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
                    </span>
                    <span className="text-xs font-bold tracking-[0.15em] uppercase">
                      Active
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
                {exp.role}
              </h3>
              <p className="text-base sm:text-lg font-semibold text-gray-600">
                {exp.company}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
              {exp.description}
            </p>

            {/* Tech Stack */}
            <div>
              <div className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mb-3">
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {/* --- NEW Tech Pill Styling (mobile) --- */}
                {exp.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Decorative corners */}
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gray-300 -mt-px -mr-px"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};


// --- Main Component ---
export default function Experience() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Sophisticated background patterns (Slightly enhanced) */}
      <div className="absolute inset-0">
        {/* Diagonal lines pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 60px, #9ca3af 60px, #9ca3af 61px),
                            repeating-linear-gradient(-45deg, transparent, transparent 60px, #9ca3af 60px, #9ca3af 61px)`
        }}></div>

        {/* Dot grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle, #9ca3af 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>

        {/* Large geometric shapes */}
        <div className="absolute -top-64 -right-64 w-[600px] h-[600px] border border-gray-200 rounded-full"></div>
        <div className="absolute -bottom-48 -left-48 w-96 h-96 border border-gray-200 rotate-45"></div>
        <div className="absolute top-1/3 -right-32 w-64 h-64 border border-gray-200"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header Section (Wrapped in animation) */}
          <AnimatedSection className="mb-20 sm:mb-28 lg:mb-36">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-black"></div>
                <span className="text-gray-500 text-xs tracking-[0.4em] font-semibold uppercase">
                  Professional Journey
                </span>
              </div>
              
              <h1 className="text-gray-900 font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter mb-6">
                Experience
              </h1>
              
              <p className="text-gray-600 text-lg sm:text-xl max-w-2xl leading-relaxed">
                A chronicle of growth, learning, and building impactful digital solutions across various technologies and platforms.
              </p>
            </div>
          </AnimatedSection>

          {/* Desktop Timeline View (Now uses component) */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Year markers on the side */}
              <div className="absolute -left-32 top-0 space-y-24">
                <div className="text-6xl font-bold text-gray-100 tracking-tighter">2025</div>
                <div className="text-6xl font-bold text-gray-100 tracking-tighter">2023</div>
                <div className="text-6xl font-bold text-gray-100 tracking-tighter">2021</div>
              </div>

              <div className="space-y-32">
                {experiences.map((exp, index) => (
                  <DesktopExperienceItem
                    key={index}
                    exp={exp}
                    index={index}
                    isLast={index === experiences.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet View (Now uses component) */}
          <div className="lg:hidden">
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <MobileExperienceItem
                  key={index}
                  exp={exp}
                  index={index}
                  isLast={index === experiences.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Footer Section (Wrapped in animation) */}
          <AnimatedSection className="mt-28 sm:mt-36 lg:mt-44 border-t-2 border-gray-200 pt-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <div className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-2">
                  Looking Forward
                </div>
                <p className="text-gray-700 text-lg sm:text-xl font-medium max-w-2xl">
                  Continuously evolving, learning new technologies, and creating meaningful digital experiences
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-px bg-gray-300"></div>
                <span className="text-6xl font-bold text-gray-100 tracking-tighter">
                  {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}