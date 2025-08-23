'use client';
import React, { useState } from 'react';

const skillsData = [
  { name: "JavaScript", percentage: 92, category: "Frontend" },
  { name: "React.js", percentage: 88, category: "Frontend" },
  { name: "Next.js", percentage: 82, category: "Frontend" },
  { name: "TailwindCSS", percentage: 95, category: "Frontend" },
  { name: "Node.js", percentage: 85, category: "Backend" },
  { name: "Python", percentage: 90, category: "Backend" },
  { name: "PHP", percentage: 75, category: "Backend" },
  { name: "MongoDB", percentage: 83, category: "Database" },
  { name: "MySQL", percentage: 87, category: "Database" },
  { name: "Supabase", percentage: 78, category: "Database" },
  { name: "C", percentage: 85, category: "Languages" },
  { name: "C++", percentage: 80, category: "Languages" }
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Languages'];

  const filteredSkills = activeCategory === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  const displayedSkills = activeCategory === 'All' && !showAll 
    ? filteredSkills.slice(0, 4)
    : filteredSkills;

  const shouldShowMoreButton = activeCategory === 'All' && !showAll && filteredSkills.length > 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 flex items-center justify-center px-4 py-8 sm:py-12 md:py-16 relative overflow-hidden">
      {/* Background texture overlay - matching home page */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-blue-500/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="w-full max-w-6xl mx-auto relative">
        
        {/* Header Section - matching home page style with better mobile spacing */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-widest mb-4 sm:mb-6 font-light">
            My Technical
          </div>
          <h1 className="text-white font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-wider mb-2 sm:mb-3">
            SKILLS
          </h1>
          <div className="text-gray-400 text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.2em] sm:tracking-widest font-light">
            & Technologies
          </div>
        </div>

        {/* Category Filter - better mobile layout */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12 px-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setShowAll(false);
              }}
              className={`
                px-3 sm:px-6 py-1.5 sm:py-2 text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-widest font-light
                transition-all duration-300 border border-gray-600
                ${activeCategory === category 
                  ? 'text-white bg-white/5 border-gray-400' 
                  : 'text-gray-400 hover:text-white hover:border-gray-400'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Skills Grid - better mobile spacing and text sizes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12 px-2 sm:px-0">
          {displayedSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="group"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Skill Header - better mobile text sizes */}
              <div className="flex justify-between items-end mb-3 sm:mb-4">
                <div>
                  <h3 className="text-white text-sm sm:text-lg md:text-xl font-light tracking-wide uppercase">
                    {skill.name}
                  </h3>
                  <div className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-wider font-light mt-1">
                    {skill.category}
                  </div>
                </div>
                <div className="text-gray-400 text-xs sm:text-sm font-light">
                  {skill.percentage}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                {/* Background line */}
                <div className="w-full h-px bg-gray-600"></div>
                
                {/* Progress line */}
                <div 
                  className="absolute top-0 left-0 h-px bg-white transition-all duration-1000 ease-out"
                  style={{
                    width: `${skill.percentage}%`,
                    animationDelay: `${index * 0.1 + 0.5}s`
                  }}
                ></div>

                {/* Progress indicator dot */}
                <div 
                  className="absolute top-0 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full transform -translate-y-1/2 transition-all duration-1000 ease-out"
                  style={{
                    left: `${skill.percentage}%`,
                    marginLeft: '-3px',
                    animationDelay: `${index * 0.1 + 0.8}s`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More Button - only for All section */}
        {shouldShowMoreButton && (
          <div className="text-center mb-8 sm:mb-12">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 sm:px-8 py-2 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-widest font-light text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 transition-all duration-300"
            >
              Show More Skills
            </button>
          </div>
        )}

        {/* Show Less Button - when all skills are shown */}
        {activeCategory === 'All' && showAll && (
          <div className="text-center mb-8 sm:mb-12">
            <button
              onClick={() => setShowAll(false)}
              className="px-6 sm:px-8 py-2 sm:py-3 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-widest font-light text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 transition-all duration-300"
            >
              Show Less
            </button>
          </div>
        )}

        {/* Stats Section - better mobile layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 border-t border-gray-600 pt-6 sm:pt-12 px-2 sm:px-0">
          <div className="text-center">
            <div className="text-white text-xl sm:text-2xl md:text-3xl font-light tracking-wider mb-1 sm:mb-2">
              12+
            </div>
            <div className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] sm:tracking-widest font-light">
              Technologies
            </div>
          </div>
          <div className="text-center">
            <div className="text-white text-xl sm:text-2xl md:text-3xl font-light tracking-wider mb-1 sm:mb-2">
              4
            </div>
            <div className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] sm:tracking-widest font-light">
              Categories
            </div>
          </div>
          <div className="text-center">
            <div className="text-white text-xl sm:text-2xl md:text-3xl font-light tracking-wider mb-1 sm:mb-2">
              3
            </div>
            <div className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] sm:tracking-widest font-light">
              Month Experience
            </div>
          </div>
          <div className="text-center">
            <div className="text-white text-xl sm:text-2xl md:text-3xl font-light tracking-wider mb-1 sm:mb-2">
              4
            </div>
            <div className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.15em] sm:tracking-widest font-light">
              Projects
            </div>
          </div>
        </div>

        {/* Bottom instruction - matching home page style */}
        <div className="text-center mt-8 sm:mt-12">
          <div className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-widest font-light">
            {activeCategory === 'All' ? 'Explore My Technical Skills' : `${activeCategory} Technologies`}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}