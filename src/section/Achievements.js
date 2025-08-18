"use client";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaUsers } from "react-icons/fa";

const achievements = [
  {
    title: "Smart India Hackathon",
    description: "Participated in the national level Smart India Hackathon.",
    icon: <FaTrophy size={42} className="text-yellow-400" />,
  },
  {
    title: "KAVACH Hackathon",
    description: "Represented my college team in KAVACH Hackathon.",
    icon: <FaMedal size={42} className="text-orange-400" />,
  },
  {
    title: "Jaipur Hackathon - Runner Up",
    description: "Secured Runner-up position at Jaipur Hackathon.",
    icon: <FaTrophy size={42} className="text-gray-400" />,
  },
  {
    title: "College Club Convener",
    description: "Organized and managed multiple technical & cultural events.",
    icon: <FaUsers size={42} className="text-gray-400" />,
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-black via-gray-900 to-gray-800 min-h-[75vh] flex flex-col items-center justify-center">
      <div className="w-full max-w-5xl px-4 mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-white text-center mb-14 tracking-tight"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Achievements
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-10 place-items-center"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          viewport={{ once: true }}
        >
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              className="group relative w-full max-w-md rounded-2xl px-8 py-12
                         bg-gray-900 border border-gray-700
                         shadow-xl flex flex-col items-center text-center
                         transition-all duration-300
                         hover:shadow-2xl hover:border-gray-400"
              variants={{
                hidden: { opacity: 0, scale: 0.96, y: 48 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={{ duration: 0.44, ease: "easeOut" }}
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 40px #aaa4",
                borderColor: "#9ca3af",
              }}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
              {/* Soft glow */}
              <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-20 bg-gray-500/10 rounded-full blur-lg opacity-80 group-hover:opacity-95 transition-all duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
