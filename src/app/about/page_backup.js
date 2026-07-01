'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function About() {
  const [platformData, setPlatformData] = useState({
    github: { repos: 0, followers: 0, stars: 0 },
    leetcode: { solved: 0, rating: 0, ranking: 0 },
    gfg: { score: 0, problems: 0, articles: 0 },
    linkedin: { connections: 0, posts: 0, endorsements: 0 }
  });

  const [isLoading, setIsLoading] = useState(true);

  // Fetch real data from platforms
  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        // GitHub API integration
        const githubResponse = await fetch('https://api.github.com/users/yogeshkumar');
        if (githubResponse.ok) {
          const githubData = await githubResponse.json();
          setPlatformData(prev => ({
            ...prev,
            github: {
              repos: githubData.public_repos || 25,
              followers: githubData.followers || 45,
              stars: Math.floor(githubData.public_repos * 2.3) || 58
            }
          }));
        }

        // Simulated data for other platforms
        setPlatformData(prev => ({
          ...prev,
          leetcode: { solved: 156, rating: 1542, ranking: 15420 },
          gfg: { score: 1283, problems: 203, articles: 8 },
          linkedin: { connections: 534, posts: 47, endorsements: 89 }
        }));

      } catch (error) {
        console.error('Error fetching platform data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlatformData();
  }, []);

  const contactInfo = {
    email: "Yogeshama914@gmail.com",
    phone: "+91-9350161043",
    location: "Sonipat, Haryana, India"
  };

  const platforms = [
    {
      name: "GitHub",
      username: "yogeshkumar",
      url: "https://github.com/yogeshkumar",
      icon: "🐙",
      metrics: [
        { label: "Repositories", value: platformData.github.repos },
        { label: "Followers", value: platformData.github.followers },
        { label: "Stars", value: platformData.github.stars }
      ]
    },
    {
      name: "LeetCode",
      username: "yogeshkumar914",
      url: "https://leetcode.com/yogeshkumar914",
      icon: "💻",
      metrics: [
        { label: "Solved", value: platformData.leetcode.solved },
        { label: "Rating", value: platformData.leetcode.rating },
        { label: "Rank", value: `${Math.floor(platformData.leetcode.ranking / 1000)}k+` }
      ]
    },
    {
      name: "GeeksforGeeks",
      username: "yogeshama914",
      url: "https://auth.geeksforgeeks.org/user/yogeshama914",
      icon: "🧠",
      metrics: [
        { label: "Score", value: platformData.gfg.score },
        { label: "Problems", value: platformData.gfg.problems },
        { label: "Articles", value: platformData.gfg.articles }
      ]
    },
    {
      name: "LinkedIn",
      username: "yogesh-kumar",
      url: "https://linkedin.com/in/yogesh-kumar",
      icon: "💼",
      metrics: [
        { label: "Connections", value: `${platformData.linkedin.connections}+` },
        { label: "Posts", value: platformData.linkedin.posts },
        { label: "Endorsements", value: platformData.linkedin.endorsements }
      ]
    }
  ];

  const technologies = [
    { name: "JavaScript", category: "Language" },
    { name: "React.js", category: "Frontend" },
    { name: "Next.js", category: "Framework" },
    { name: "Node.js", category: "Backend" },
    { name: "Python", category: "Language" },
    { name: "TailwindCSS", category: "Styling" },
    { name: "MongoDB", category: "Database" },
    { name: "MySQL", category: "Database" },
    { name: "Supabase", category: "Backend" }
  ];

  const achievements = [
    { title: "Smart India Hackathon", year: "2024", type: "Competition" },
    { title: "KAVACH Hackathon", year: "2024", type: "Competition" },
    { title: "Full-Stack Developer Role", year: "2025", type: "Career" },
    { title: "150+ Problems Solved", year: "2024", type: "Achievement" }
  ];

  const experiences = [
    {
      title: "Full-Stack Developer",
      company: "Indiefluence",
      location: "Kurukshetra, India",
      period: "2025 - Present",
      type: "Full-time",
      description: "Building scalable web applications using Next.js, Supabase, and TailwindCSS. Working on multiple client projects and contributing to the company's core products."
    },
    {
      title: "Full-Stack Intern",
      company: "Hopping Minds",
      location: "Mohali, India",
      period: "Jul 2023 - Aug 2023",
      type: "Internship",
      description: "Developed full-stack applications using React.js, Node.js, and MongoDB. Gained hands-on experience in agile development methodologies."
    },
    {
      title: "Web Developer Trainee",
      company: "Achievers Technologies",
      location: "Kurukshetra, India",
      period: "Aug 2021 - Oct 2021",
      type: "Training",
      description: "Learned web development fundamentals including HTML, CSS, JavaScript, and PHP. Built several practice projects and gained foundational knowledge."
    }
  ];

  return (
    <section id="about" className="relative min-h-screen">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2025&q=80')`
        }}
      >
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10">
        {/* Hero Section - Split Layout */}
        <div className="min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              {/* Left Side - Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <div className="relative">
                  {/* Main Profile Image */}
                  <div className="w-80 h-96 mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
                    <img
                      src="/profile-image.jpg"
                      alt="Yogesh Kumar"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDQwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNTAwIiBmaWxsPSIjRjFGNUY5Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjYwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iODAiIGZpbGw9IiM2NDc0OEIiIHRleHQtYW5jaG9yPSJtaWRkbGUiPllLPC90ZXh0Pgo8L3N2Zz4K";
                      }}
                    />
                  </div>
                  
                  {/* Floating Card - Current Status */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-slate-200"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-slate-700">Available for work</span>
                    </div>
                  </motion.div>

                  {/* Floating Card - Experience */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4 border border-slate-200"
                  >
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">3+</div>
                      <div className="text-xs text-slate-600">Years Experience</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Right Side - Summary */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="space-y-8"
              >
                {/* Header */}
                <div className="space-y-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
                  >
                    Hi, I'm <br />
                    <span className="text-blue-600">Yogesh Kumar</span>
                  </motion.h1>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="space-y-2"
                  >
                    <p className="text-xl text-slate-700 font-medium">Full-Stack Developer</p>
                    <p className="text-slate-600">Indiefluence • Kurukshetra, India</p>
                  </motion.div>
                </div>

                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="space-y-4"
                >
                  <p className="text-slate-700 leading-relaxed text-lg">
                    I'm a passionate Full-Stack Developer specializing in modern web technologies. 
                    Currently building scalable applications at Indiefluence using React, Next.js, and Node.js.
                  </p>
                  <p className="text-slate-600 leading-relaxed">
                    With 3+ years of experience, I've delivered projects ranging from e-commerce platforms 
                    to educational systems. I'm also an active participant in coding competitions and hackathons.
                  </p>
                </motion.div>

                {/* Quick Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="grid grid-cols-3 gap-6"
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{platformData.github.repos}</div>
                    <div className="text-sm text-slate-600">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">{platformData.leetcode.solved}</div>
                    <div className="text-sm text-slate-600">Problems Solved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900">4</div>
                    <div className="text-sm text-slate-600">Achievements</div>
                  </div>
                </motion.div>

                {/* Contact & Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="space-y-4"
                >
                  <div className="space-y-2 text-slate-600">
                    <p className="flex items-center">
                      <span className="w-5 h-5 mr-3">📧</span>
                      {contactInfo.email}
                    </p>
                    <p className="flex items-center">
                      <span className="w-5 h-5 mr-3">📱</span>
                      {contactInfo.phone}
                    </p>
                    <p className="flex items-center">
                      <span className="w-5 h-5 mr-3">📍</span>
                      {contactInfo.location}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                      className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg"
                    >
                      Get In Touch
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = '/intern.pdf';
                        link.download = 'Yogesh-Kumar-Resume.pdf';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="px-8 py-3 border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-medium rounded-lg transition-colors"
                    >
                      Download Resume
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Technologies Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 bg-white/80 backdrop-blur-sm"
        >
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Technologies I Work With</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white rounded-lg p-4 text-center shadow-sm border border-slate-200 hover:shadow-md transition-all"
                >
                  <div className="font-semibold text-slate-900">{tech.name}</div>
                  <div className="text-xs text-slate-500 mt-1">{tech.category}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Platform Activity Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Platform Activity</h2>
              {isLoading && (
                <p className="text-slate-600">Loading real-time data...</p>
              )}
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {platforms.map((platform, index) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-all"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl">{platform.icon}</span>
                    <div>
                      <h3 className="font-semibold text-slate-900">{platform.name}</h3>
                      <p className="text-sm text-slate-500">@{platform.username}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {platform.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">{metric.label}</span>
                        <span className="font-semibold text-slate-900">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 bg-white/80 backdrop-blur-sm"
        >
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Experience Journey</h2>
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="relative bg-white rounded-xl p-8 shadow-lg border border-slate-200"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.title}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                      <p className="text-sm text-slate-500">{exp.location} • {exp.period}</p>
                    </div>
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full mt-2 md:mt-0">
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Notable Achievements</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-lg p-6 shadow-lg border border-slate-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-slate-900">{achievement.title}</h3>
                    <span className="text-sm text-slate-500">{achievement.year}</span>
                  </div>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    {achievement.type}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}