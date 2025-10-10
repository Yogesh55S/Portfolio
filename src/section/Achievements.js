"use client";
import React from 'react';

const achievements = [
  {
    title: "Smart India Hackathon",
    description: "Participated in the national level Smart India Hackathon, showcasing innovative solutions for real-world problems.",
    highlight: true,
    category: "Competition",
    year: "2024"
  },
  {
    title: "KAVACH Hackathon",
    description: "Represented my college team in KAVACH Hackathon, focusing on cybersecurity solutions.",
    highlight: false,
    category: "Competition",
    year: "2023"
  },
  {
    title: "Jaipur Hackathon - Runner Up",
    description: "Secured Runner-up position at Jaipur Hackathon with innovative web application solutions.",
    highlight: true,
    category: "Award",
    year: "2023"
  },
  {
    title: "College Club Convener",
    description: "Organized and managed multiple technical & cultural events, leading teams of 50+ members.",
    highlight: false,
    category: "Leadership",
    year: "2022"
  },
];

export default function Achievements() {
  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Minimal background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #666 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="mb-20 sm:mb-28 lg:mb-36">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-gray-900"></div>
                <span className="text-gray-600 text-xs tracking-[0.3em] font-semibold uppercase">
                  Recognition
                </span>
              </div>
              
              <h1 className="text-gray-900 font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6">
                ACHIEVEMENTS
              </h1>
              
              <p className="text-gray-600 text-lg sm:text-xl max-w-2xl leading-relaxed font-light">
                Milestones that reflect dedication, innovation, and continuous growth in technology and leadership.
              </p>
            </div>
          </div>

          {/* Desktop Grid Layout */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 xl:gap-12">
            {achievements.map((achievement, index) => (
              <div key={index} className="group relative">
                <div className="bg-white border-2 border-gray-200 p-10 transition-all duration-300 hover:border-gray-900 hover:-translate-y-1 hover:shadow-xl relative">
                  
                  {/* Highlight indicator */}
                  {achievement.highlight && (
                    <div className="absolute -top-3 -right-3 w-6 h-6 bg-gray-900"></div>
                  )}

                  {/* Category and Year */}
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <span className="text-gray-500 text-xs tracking-[0.2em] font-semibold uppercase">
                      {achievement.category}
                    </span>
                    <span className="text-gray-400 text-sm font-light tracking-wider">{achievement.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-gray-900 font-medium text-2xl mb-4 tracking-tight leading-tight">
                    {achievement.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-base leading-relaxed mb-6 font-light">
                    {achievement.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 w-20 h-0.5 bg-gray-900"></div>

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gray-100 -mt-px -mr-px"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="group relative">
                <div className="bg-white border-2 border-gray-200 p-6 sm:p-8 transition-all duration-300 hover:border-gray-900 hover:shadow-lg relative">
                  
                  {/* Highlight indicator */}
                  {achievement.highlight && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-gray-900"></div>
                  )}

                  {/* Category and Year */}
                  <div className="flex items-center justify-between mb-5 pb-4 border-b border-gray-100">
                    <span className="text-gray-500 text-xs tracking-[0.2em] font-semibold uppercase">
                      {achievement.category}
                    </span>
                    <span className="text-gray-400 text-sm font-light tracking-wider">{achievement.year}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-gray-900 font-medium text-xl sm:text-2xl mb-4 tracking-tight leading-tight">
                    {achievement.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6 font-light">
                    {achievement.description}
                  </p>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-gray-900"></div>

                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gray-100 -mt-px -mr-px"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 sm:mt-24 lg:mt-32 grid grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-2">04</div>
              <div className="text-xs tracking-[0.2em] uppercase text-gray-500 font-semibold">Total</div>
            </div>
            <div className="text-center border-l border-r border-gray-200">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-2">02</div>
              <div className="text-xs tracking-[0.2em] uppercase text-gray-500 font-semibold">Featured</div>
            </div>
            <div className="text-center">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900 mb-2">03</div>
              <div className="text-xs tracking-[0.2em] uppercase text-gray-500 font-semibold">Categories</div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="mt-28 sm:mt-36 lg:mt-44 border-t-2 border-gray-200 pt-12">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold tracking-[0.3em] uppercase text-gray-400 mb-4">
                Continuous Growth
              </div>
              <p className="text-gray-700 text-lg sm:text-xl font-light leading-relaxed">
                Each achievement represents a step forward in the journey of innovation, learning, and making a meaningful impact through technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}