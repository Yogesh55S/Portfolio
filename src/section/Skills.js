"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb, SiMysql, SiPhp, SiPython, SiSupabase, SiC, SiCplusplus } from "react-icons/si";

const skills = [
  { 
    name: "C", 
    icon: <SiC size={48} />, 
    color: "text-blue-600",
    percentage: 85
  },
  { 
    name: "C++", 
    icon: <SiCplusplus size={48} />, 
    color: "text-blue-700",
    percentage: 80
  },
  { 
    name: "Python", 
    icon: <SiPython size={48} />, 
    color: "text-yellow-500",
    percentage: 90
  },
  { 
    name: "PHP", 
    icon: <SiPhp size={48} />, 
    color: "text-purple-600",
    percentage: 75
  },
  { 
    name: "JavaScript", 
    icon: <SiJavascript size={48} />, 
    color: "text-yellow-400",
    percentage: 92
  },
  { 
    name: "React.js", 
    icon: <SiReact size={48} />, 
    color: "text-cyan-500",
    percentage: 88
  },
  { 
    name: "Next.js", 
    icon: <SiNextdotjs size={48} />, 
    color: "text-black",
    percentage: 82
  },
  { 
    name: "TailwindCSS", 
    icon: <SiTailwindcss size={48} />, 
    color: "text-teal-500",
    percentage: 95
  },
  { 
    name: "Node.js", 
    icon: <SiNodedotjs size={48} />, 
    color: "text-green-600",
    percentage: 85
  },
  { 
    name: "Supabase", 
    icon: <SiSupabase size={48} />, 
    color: "text-green-500",
    percentage: 78
  },
  { 
    name: "MongoDB", 
    icon: <SiMongodb size={48} />, 
    color: "text-green-600",
    percentage: 83
  },
  { 
    name: "MySQL", 
    icon: <SiMysql size={48} />, 
    color: "text-orange-500",
    percentage: 87
  },
];

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);

  const handleClick = (index) => {
    setClickedIndex(clickedIndex === index ? null : index);
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const floatingAnimation = {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return "text-green-400";
    if (percentage >= 75) return "text-yellow-400";
    if (percentage >= 60) return "text-orange-400";
    return "text-red-400";
  };

  const getProgressBarColor = (percentage) => {
    if (percentage >= 90) return "from-green-400 to-green-600";
    if (percentage >= 75) return "from-yellow-400 to-yellow-600";
    if (percentage >= 60) return "from-orange-400 to-orange-600";
    return "from-red-400 to-red-600";
  };

  return (
    <section id="skills" className="py-20 px-8 md:px-16 bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gray-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-gray-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-gray-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent mb-4"
            animate={floatingAnimation}
          >
            Skills & Technologies
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
          <p className="mt-6 text-gray-300 text-lg max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
          <p className="mt-2 text-gray-400 text-sm">
            Click on any skill to see my proficiency level
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className={`
                relative flex flex-col items-center justify-center 
                bg-gray-800 border-gray-600 hover:bg-gray-700
                p-6 rounded-2xl border-2 cursor-pointer
                transition-all duration-300 ease-out
                group overflow-hidden
                ${clickedIndex === index ? 'ring-2 ring-blue-400 bg-gray-700' : ''}
              `}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                z: 50
              }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => handleClick(index)}
              layout
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
              
              {/* Icon with rotation animation */}
              <motion.div
                className={`${skill.color} relative z-10 mb-3`}
                animate={
                  clickedIndex === index 
                    ? { rotateY: 360, scale: [1, 1.2, 1] }
                    : hoveredIndex === index 
                      ? { rotateY: [0, 360], transition: { duration: 0.8, ease: "easeInOut" } }
                      : {}
                }
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {skill.icon}
              </motion.div>

              {/* Skill name and percentage */}
              <motion.div className="relative z-10 text-center">
                <motion.p
                  className="text-gray-200 font-semibold text-sm md:text-base mb-2"
                  animate={hoveredIndex === index ? {
                    y: [-2, 2, -2],
                    transition: { duration: 0.5, repeat: Infinity }
                  } : {}}
                >
                  {skill.name}
                </motion.p>

                {/* Percentage display with animation */}
                <AnimatePresence>
                  {clickedIndex === index && (
                    <motion.div
                      className="mt-2"
                      initial={{ opacity: 0, scale: 0.5, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.5, y: 10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <motion.span
                        className={`text-2xl font-bold ${getPercentageColor(skill.percentage)}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                      >
                        {skill.percentage}%
                      </motion.span>
                      
                      {/* Circular progress indicator */}
                      <motion.div
                        className="relative w-12 h-12 mx-auto mt-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
                      >
                        <svg className="w-12 h-12 transform -rotate-90">
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            className="text-gray-600"
                          />
                          <motion.circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                            className={getPercentageColor(skill.percentage)}
                            strokeDasharray={`${2 * Math.PI * 20}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
                            animate={{ 
                              strokeDashoffset: 2 * Math.PI * 20 * (1 - skill.percentage / 100) 
                            }}
                            transition={{ 
                              delay: 0.4, 
                              duration: 1, 
                              ease: "easeOut" 
                            }}
                          />
                        </svg>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Hover effect - shine */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 -translate-x-full group-hover:translate-x-full group-hover:opacity-20"
                transition={{ duration: 0.6 }}
              />

              {/* Progress bar at bottom */}
              <motion.div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${
                  clickedIndex === index 
                    ? getProgressBarColor(skill.percentage)
                    : 'from-gray-400 to-gray-600'
                } rounded-full`}
                initial={{ width: "0%" }}
                animate={
                  clickedIndex === index 
                    ? { width: `${skill.percentage}%` }
                    : hoveredIndex === index 
                      ? { width: "100%" } 
                      : { width: "0%" }
                }
                transition={{ 
                  duration: clickedIndex === index ? 1 : 0.5,
                  ease: "easeOut" 
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional decorative elements */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}