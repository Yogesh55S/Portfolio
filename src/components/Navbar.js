"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      className="fixed top-0 w-full z-50 backdrop-blur bg-black/40 border-b border-gray-800"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-blue-400 drop-shadow-[0_0_10px_#60a5fa]">
          Yogesh<span className="text-white">.</span>
        </h1>

        {/* Links */}
        <div className="hidden md:flex space-x-8">
          {navItems.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              className="text-gray-300 hover:text-blue-400 transition relative group"
              whileHover={{ scale: 1.1 }}
            >
              {item.name}
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-blue-400 group-hover:w-full transition-all duration-300"></span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
