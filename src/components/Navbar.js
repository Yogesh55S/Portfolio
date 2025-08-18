"use client";
import { motion } from "framer-motion";
import Link from "next/link";

// Add your logo image path here
const logoSrc = "/logo2.png";

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
        <a href="#home" className="flex items-center">
          <motion.img
            src={logoSrc}
            alt="Yogesh logo"
            className="h-10 w-10 object-contain drop-shadow-lg"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            draggable={false}
          />
        </a>

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
