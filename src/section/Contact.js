"use client";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { SiLeetcode, SiGeeksforgeeks } from "react-icons/si";

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-8 md:px-16 bg-gray-950 text-center">
      <motion.h2
        className="text-4xl font-bold mb-12 text-white drop-shadow-[0_0_15px_#60a5fa]"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Contact Me
      </motion.h2>

      {/* Contact Info */}
      <div className="mb-12">
        <p className="flex justify-center items-center gap-3 text-gray-300 text-lg mb-2">
          <FaEnvelope className="text-blue-400" />
          <a href="mailto:Yogeshama914@gmail.com" className="hover:underline">
            Yogeshama914@gmail.com
          </a>
        </p>
        <p className="flex justify-center items-center gap-3 text-gray-300 text-lg">
          <FaPhoneAlt className="text-blue-400" />
          <a href="tel:+919350161043" className="hover:underline">
            +91-9350161043
          </a>
        </p>
      </div>

      {/* Social Links */}
      <div className="flex justify-center space-x-8 mb-12">
        <a href="https://github.com/Yogesh55S" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition hover:text-blue-400 hover:drop-shadow-[0_0_10px_#60a5fa]">
          <FaGithub size={35} />
        </a>
        <a href="https://www.linkedin.com/in/yogesh-kumar-983840226/" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition hover:text-blue-400 hover:drop-shadow-[0_0_10px_#60a5fa]">
          <FaLinkedin size={35} />
        </a>
        <a href="https://leetcode.com/u/Yogeshkumar55/" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition hover:text-orange-400 hover:drop-shadow-[0_0_10px_#f97316]">
          <SiLeetcode size={35} />
        </a>
        <a href="https://www.geeksforgeeks.org/user/yogesha6ghc/" target="_blank" rel="noopener noreferrer" className="hover:scale-125 transition hover:text-green-400 hover:drop-shadow-[0_0_10px_#22c55e]">
          <SiGeeksforgeeks size={35} />
        </a>
      </div>

      {/* Contact Form */}
      <motion.form
        className="max-w-xl mx-auto bg-gray-900 p-8 rounded-xl shadow-md border border-gray-700"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-600 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-600 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            placeholder="Your Message"
            className="w-full p-3 border border-gray-600 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg shadow-md hover:shadow-[0_0_15px_#60a5fa] hover:bg-blue-600 transition"
        >
          Send Message
        </button>
      </motion.form>
    </section>
  );
}
