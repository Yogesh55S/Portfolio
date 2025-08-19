"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Blood Donation Management System",
    date: "Oct 2021",
    description:
      "A system built for my college's annual blood donation fair to store and manage donor information easily.",
    tech: "HTML, CSS, JavaScript, Bootstrap, PHP, MySQL",
    category: "Healthcare",
    status: "Completed"
  },
  {
    title: "Billing System with Python",
    date: "Oct 2022",
    description:
      "A billing application that provides product details like quantity, quality, and price simultaneously.",
    tech: "Python, Tkinter, MySQL",
    category: "Desktop App",
    status: "Completed"
  },
  {
    title: "Agri-Farma (Full-Stack Platform)",
    date: "Nov 2024",
    description:
      "A platform for farmers to buy farm medicines and access the latest government information & offers.",
    tech: "React.js, Node.js, MongoDB, Vite, Bootstrap",
    category: "Agriculture",
    status: "Completed"
  },
  {
    title: "Rabbit Auto Care",
    date: "2025",
    description:
      "An innovative car care platform offering services, product management, and modern dashboards for customers and admins.",
    tech: "Next.js, TailwindCSS, Supabase, Node.js",
    category: "Automotive",
    status: "In Progress"
  },
];

// Pre-defined positions to avoid hydration mismatch
const particlePositions = [
  { left: 15, top: 20 },
  { left: 85, top: 60 },
  { left: 30, top: 80 },
  { left: 70, top: 25 },
  { left: 50, top: 45 },
  { left: 90, top: 35 }
];

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingAnimation = {
    y: [-8, 8, -8],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const shimmerVariants = {
    initial: { x: "-100%" },
    animate: { 
      x: "100%",
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  return (
    <section id="projects" className="py-20 px-8 md:px-16 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-gray-700 to-gray-500 rounded-full mix-blend-multiply filter blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles - only render after mount */}
      {isMounted && particlePositions.map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-gray-400 rounded-full opacity-20"
          style={{
            left: `${position.left}%`,
            top: `${position.top}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3 + (i % 3),
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}

      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6 relative"
            animate={isMounted ? floatingAnimation : {}}
          >
            My Projects
            {/* Glowing underline */}
            <motion.div
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full"
              initial={{ width: "0%" }}
              whileInView={{ width: "60%" }}
              transition={{ duration: 1.2, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            A showcase of innovative solutions and technical expertise across various domains
          </motion.p>

          {/* Decorative elements */}
          <motion.div
            className="flex justify-center mt-8 space-x-4"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-gray-500 rounded-full"
                animate={isMounted ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="group relative"
              variants={cardVariants}
              whileHover={isMounted ? { 
                scale: 1.02,
                rotateY: 5,
                z: 50
              } : {}}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 overflow-hidden transition-all duration-500 ease-out group-hover:border-gray-500/70 text-left h-full">
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                    variants={shimmerVariants}
                    initial="initial"
                    animate={isMounted && hoveredIndex === index ? "animate" : "initial"}
                  />
                </div>

                {/* Status Badge */}
                <motion.div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    project.status === "Completed" 
                      ? "bg-green-500/20 text-green-400 border border-green-500/30" 
                      : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                  }`}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {project.status}
                </motion.div>

                {/* Category Tag */}
                <motion.span
                  className="inline-block mb-4 px-3 py-1 bg-gray-700/50 text-gray-300 text-sm rounded-full border border-gray-600/30"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {project.category}
                </motion.span>

                {/* Title */}
                <motion.h3
                  className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight"
                  animate={isMounted && hoveredIndex === index ? {
                    x: [0, 5, 0],
                    transition: { duration: 0.5 }
                  } : {}}
                >
                  {project.title}
                </motion.h3>

                {/* Date */}
                <motion.p
                  className="text-gray-400 text-sm mb-4 font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  📅 {project.date}
                </motion.p>

                {/* Description */}
                <motion.p
                  className="text-gray-300 mb-6 leading-relaxed text-base"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {project.description}
                </motion.p>

                {/* Tech Stack */}
                <motion.div
                  className="border-t border-gray-700/50 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm">
                    <span className="font-bold text-gray-200 mb-2 block">🔧 Technologies Used:</span>
                    <span className="text-gray-400 leading-relaxed">{project.tech}</span>
                  </p>
                </motion.div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.02) 100%)'
                  }}
                />

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gray-400 via-gray-500 to-gray-400 rounded-full"
                  initial={{ width: "0%" }}
                  animate={isMounted && hoveredIndex === index ? { width: "100%" } : { width: "0%" }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decoration */}
        <motion.div
          className="flex justify-center mt-16 space-x-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-8 bg-gradient-to-t from-gray-600 to-transparent rounded-full"
              animate={isMounted ? {
                scaleY: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}