"use client";
import React from 'react';

const row1 = [
  {
    name: "Paityn Lipshutz",
    role: "CEO & Co-Founder, Lemonsqueezy",
    quote: "Excellent product—durable, intuitive, and exactly what I needed. Customer service was outstanding and very helpful.",
    initials: "PL"
  },
  {
    name: "Angel Lubin",
    role: "CEO & Co-Founder, Zipline",
    quote: "Top-notch quality—easy to set up and performs as promised. The support team was incredibly responsive and attentive.",
    initials: "AL"
  },
  {
    name: "Lincoln Stanton",
    role: "CEO & Co-Founder, Gumroad",
    quote: "Amazing product—well-built, user-friendly, and just as advertised. The service team exceeded my expectations.",
    initials: "LS"
  },
  {
    name: "Skylar Lipshutz",
    role: "Product Manager, Orbit",
    quote: "Outstanding product—well-crafted, user-friendly, and exactly what I expected. The team went above and beyond to help.",
    initials: "SL"
  }
];

const row2 = [
  {
    name: "Corey Franci",
    role: "Tech Lead, Indiefluence",
    quote: "Yogesh is an exceptionally skilled developer who consistently delivers high-quality code. His work on database integrations was seamless.",
    initials: "CF"
  },
  {
    name: "Anika Franci",
    role: "Founder, Zendesk",
    quote: "Working with Yogesh was a pleasure. He took our complex requirements and turned them into a smooth, performant user interface.",
    initials: "AF"
  },
  {
    name: "Skylar Rosser",
    role: "Product Manager, Orbit",
    quote: "Outstanding engineering and quick problem solving. His contribution to our hackathon was key to our runner-up finish.",
    initials: "SR"
  },
  {
    name: "Chance Baptista",
    role: "CEO & Co-Founder, ABC Company",
    quote: "Great product—reliable, easy to set up, and just as described. Service was excellent and ensured a smooth experience.",
    initials: "CB"
  }
];

export default function Testimonials() {
  return (
    <div className="bg-white relative overflow-hidden pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-32">
      {/* Minimal background pattern matching achievements */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #666 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto mb-16 sm:mb-20">
          {/* Header Section matching Achievements */}
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-gray-900"></div>
              <span className="text-gray-600 text-xs tracking-[0.3em] font-semibold uppercase">
                Endorsements
              </span>
            </div>
            
            <h1 className="text-gray-900 font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6">
              TESTIMONIALS
            </h1>
            
            <p className="text-gray-600 text-lg sm:text-xl max-w-2xl leading-relaxed font-light">
              Words of praise from others about my professional presence, collaborative spirit, and development capabilities.
            </p>
          </div>
        </div>

        {/* Marquee Outer Container */}
        <div className="relative w-full max-w-[100vw] overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          {/* Edge gradient overlays for smooth fading effect */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"></div>

          {/* Marquee Tracks Wrapper */}
          <div className="space-y-8 py-4">
            
            {/* Row 1: Right-to-Left */}
            <div className="pause-hover overflow-hidden flex">
              <div className="animate-marquee flex gap-6" style={{ '--marquee-duration': '35s' }}>
                {[...row1, ...row1].map((item, idx) => (
                  <div 
                    key={`row1-${idx}`}
                    className="w-[320px] sm:w-[400px] shrink-0 bg-white border-2 border-gray-200 p-8 sm:p-10 transition-all duration-300 hover:border-gray-900 hover:-translate-y-1 hover:shadow-xl relative flex flex-col justify-between"
                  >
                    {/* Big double quote icon */}
                    <span className="text-gray-100 font-serif text-8xl absolute top-2 right-6 select-none pointer-events-none">“</span>
                    
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light mb-8 relative z-10">
                      {item.quote}
                    </p>

                    <div className="flex items-center gap-4 border-t border-gray-100 pt-6 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs tracking-wider">
                        {item.initials}
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-semibold text-sm sm:text-base tracking-tight">{item.name}</h4>
                        <p className="text-gray-500 text-xs tracking-wider font-light uppercase">{item.role}</p>
                      </div>
                    </div>

                    {/* Bottom accent border matching design patterns */}
                    <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-gray-900"></div>
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gray-100 -mt-px -mr-px"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Left-to-Right (Reverse) */}
            <div className="pause-hover overflow-hidden flex">
              <div className="animate-marquee-reverse flex gap-6" style={{ '--marquee-duration': '35s' }}>
                {[...row2, ...row2].map((item, idx) => (
                  <div 
                    key={`row2-${idx}`}
                    className="w-[320px] sm:w-[400px] shrink-0 bg-white border-2 border-gray-200 p-8 sm:p-10 transition-all duration-300 hover:border-gray-900 hover:-translate-y-1 hover:shadow-xl relative flex flex-col justify-between"
                  >
                    <span className="text-gray-100 font-serif text-8xl absolute top-2 right-6 select-none pointer-events-none">“</span>
                    
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light mb-8 relative z-10">
                      {item.quote}
                    </p>

                    <div className="flex items-center gap-4 border-t border-gray-100 pt-6 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs tracking-wider">
                        {item.initials}
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-semibold text-sm sm:text-base tracking-tight">{item.name}</h4>
                        <p className="text-gray-500 text-xs tracking-wider font-light uppercase">{item.role}</p>
                      </div>
                    </div>

                    {/* Bottom accent border matching design patterns */}
                    <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-gray-900"></div>
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gray-100 -mt-px -mr-px"></div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Footer line for smooth visual separation */}
        <div className="max-w-7xl mx-auto mt-20 sm:mt-24 lg:mt-32 border-t-2 border-gray-200"></div>
      </div>
    </div>
  );
}
