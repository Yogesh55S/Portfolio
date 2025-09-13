"use client";

import { useEffect, useState } from 'react';

export default function ConnectedNextSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [linesAnimated, setLinesAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setLinesAnimated(true), 500);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('connected-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Connection Bridge - connects from Hero Y to this section */}
      <div className="relative w-full h-32 bg-gray-200 overflow-hidden">
        {/* Connecting Lines from Hero */}
        <div 
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-1 bg-black transition-all duration-1500 ease-out ${
            isVisible ? 'h-32' : 'h-0'
          }`}
        ></div>
        
        {/* Branching Lines */}
        <div 
          className={`absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-0.5 bg-black transition-all duration-1000 ease-out delay-500 ${
            linesAnimated ? 'w-64' : 'w-0'
          }`}
        ></div>
        
        {/* Side Branches */}
        <div 
          className={`absolute top-16 left-1/4 w-0.5 bg-black transition-all duration-800 ease-out delay-700 ${
            linesAnimated ? 'h-16' : 'h-0'
          }`}
        ></div>
        <div 
          className={`absolute top-16 right-1/4 w-0.5 bg-black transition-all duration-800 ease-out delay-700 ${
            linesAnimated ? 'h-16' : 'h-0'
          }`}
        ></div>
      </div>

      {/* Desktop View */}
      <section id="connected-section" className="hidden lg:block relative w-full min-h-screen bg-gray-200 overflow-hidden">
        
        {/* Main Grid Lines */}
        <div 
          className={`absolute top-0 left-1/4 w-0.5 bg-black transition-all duration-1200 ease-out delay-1000 ${
            linesAnimated ? 'h-full' : 'h-0'
          }`}
        ></div>
        <div 
          className={`absolute top-0 right-1/4 w-0.5 bg-black transition-all duration-1200 ease-out delay-1200 ${
            linesAnimated ? 'h-full' : 'h-0'
          }`}
        ></div>
        
        {/* Horizontal Grid Lines */}
        <div 
          className={`absolute top-1/3 left-0 h-0.5 bg-black transition-all duration-1500 ease-out delay-1400 ${
            linesAnimated ? 'w-full' : 'w-0'
          }`}
        ></div>
        <div 
          className={`absolute top-2/3 left-0 h-0.5 bg-black transition-all duration-1500 ease-out delay-1600 ${
            linesAnimated ? 'w-full' : 'w-0'
          }`}
        ></div>

        {/* Accent Lines */}
        <div 
          className={`absolute top-20 left-20 w-24 h-0.5 bg-black transition-all duration-800 ease-out delay-1800 ${
            linesAnimated ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        <div 
          className={`absolute top-20 right-20 w-24 h-0.5 bg-black transition-all duration-800 ease-out delay-2000 ${
            linesAnimated ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        
        {/* Corner Elements */}
        <div 
          className={`absolute bottom-20 left-20 w-16 h-16 border-2 border-black transition-all duration-1000 ease-out delay-2200 ${
            linesAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        ></div>
        <div 
          className={`absolute bottom-20 right-20 w-16 h-16 border-2 border-black transition-all duration-1000 ease-out delay-2400 ${
            linesAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}
        ></div>

        {/* Content Areas */}
        <div className="absolute inset-0 flex items-center justify-center">
          
          {/* Left Content Block */}
          <div className="absolute left-32 top-1/2 transform -translate-y-1/2 max-w-sm">
            <div className={`transition-all duration-1000 ease-out delay-2600 ${
              linesAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <h2 className="text-4xl font-bold text-black mb-6 tracking-wide">ABOUT</h2>
              <div className="w-16 h-0.5 bg-black mb-6"></div>
              <p className="text-lg text-black leading-relaxed font-light">
                Passionate developer creating innovative digital experiences with modern technologies and clean design principles.
              </p>
            </div>
          </div>

          {/* Center Content */}
          <div className="text-center">
            <div className={`transition-all duration-1200 ease-out delay-2800 ${
              linesAnimated ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="text-8xl font-bold text-black tracking-wider mb-8">02</div>
              <p className="text-sm font-light tracking-[0.3em] uppercase text-black">Section</p>
            </div>
          </div>

          {/* Right Content Block */}
          <div className="absolute right-32 top-1/2 transform -translate-y-1/2 max-w-sm text-right">
            <div className={`transition-all duration-1000 ease-out delay-3000 ${
              linesAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <h3 className="text-2xl font-medium text-black mb-4">SKILLS</h3>
              <div className="w-16 h-0.5 bg-black mb-4 ml-auto"></div>
              <p className="text-base text-black font-light">
                Frontend • Backend • Full-Stack Development • UI/UX Design
              </p>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
            <div className={`flex items-center space-x-8 transition-all duration-1000 ease-out delay-3200 ${
              linesAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <button className="text-sm font-light tracking-[0.2em] uppercase text-black hover:text-gray-600 transition-colors">
                Previous
              </button>
              <div className="w-16 h-0.5 bg-black"></div>
              <button className="text-sm font-light tracking-[0.2em] uppercase text-black hover:text-gray-600 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tablet View */}
      <section className="hidden md:block lg:hidden relative w-full min-h-screen bg-gray-200 overflow-hidden px-8 py-16">
        
        {/* Tablet Grid Lines */}
        <div 
          className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 bg-black transition-all duration-1200 ease-out delay-1000 ${
            linesAnimated ? 'h-full' : 'h-0'
          }`}
        ></div>
        
        <div 
          className={`absolute top-1/3 left-8 right-8 h-0.5 bg-black transition-all duration-1000 ease-out delay-1200 ${
            linesAnimated ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>

        {/* Tablet Content */}
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ease-out delay-1400 ${
            linesAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}>
            <div className="text-6xl font-bold text-black mb-4">02</div>
            <h2 className="text-3xl font-bold text-black tracking-wide">ABOUT</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className={`transition-all duration-1000 ease-out delay-1600 ${
              linesAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <h3 className="text-xl font-medium text-black mb-4">PROFILE</h3>
              <div className="w-12 h-0.5 bg-black mb-4"></div>
              <p className="text-base text-black leading-relaxed font-light">
                Passionate developer creating innovative digital experiences with modern technologies and clean design principles.
              </p>
            </div>

            <div className={`transition-all duration-1000 ease-out delay-1800 ${
              linesAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
              <h3 className="text-xl font-medium text-black mb-4">EXPERTISE</h3>
              <div className="w-12 h-0.5 bg-black mb-4"></div>
              <p className="text-base text-black leading-relaxed font-light">
                Frontend • Backend • Full-Stack Development • UI/UX Design • Mobile Development
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile View */}
      <section className="block md:hidden relative w-full min-h-screen bg-gray-200 overflow-hidden px-6 py-12">
        
        {/* Mobile Lines */}
        <div 
          className={`absolute top-8 left-6 w-16 h-0.5 bg-black transition-all duration-1000 ease-out delay-1000 ${
            linesAnimated ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        <div 
          className={`absolute top-8 right-6 w-12 h-0.5 bg-black transition-all duration-1000 ease-out delay-1200 ${
            linesAnimated ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        
        <div 
          className={`absolute left-6 top-16 w-0.5 h-12 bg-black transition-all duration-1000 ease-out delay-1400 ${
            linesAnimated ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>
        <div 
          className={`absolute right-6 top-20 w-0.5 h-8 bg-black transition-all duration-1000 ease-out delay-1600 ${
            linesAnimated ? 'opacity-100' : 'opacity-0'
          }`}
        ></div>

        {/* Mobile Content */}
        <div className="flex flex-col justify-center min-h-screen space-y-12">
          
          <div className={`text-center transition-all duration-1000 ease-out delay-1800 ${
            linesAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
          }`}>
            <div className="text-4xl font-bold text-black mb-2">02</div>
            <p className="text-xs font-light tracking-[0.3em] uppercase text-black">Section</p>
          </div>

          <div className={`transition-all duration-1000 ease-out delay-2000 ${
            linesAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-2xl font-bold text-black mb-6 text-center">ABOUT</h2>
            <div className="w-12 h-0.5 bg-black mb-6 mx-auto"></div>
            <p className="text-sm text-black leading-relaxed font-light text-center">
              Passionate developer creating innovative digital experiences with modern technologies and clean design principles.
            </p>
          </div>

          <div className={`transition-all duration-1000 ease-out delay-2200 ${
            linesAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className="text-lg font-medium text-black mb-4 text-center">SKILLS</h3>
            <div className="w-8 h-0.5 bg-black mb-4 mx-auto"></div>
            <p className="text-sm text-black font-light text-center">
              Frontend • Backend • Full-Stack • UI/UX • Mobile
            </p>
          </div>

          {/* Bottom Lines */}
          <div className="mt-auto">
            <div 
              className={`absolute bottom-12 left-6 w-12 h-0.5 bg-black transition-all duration-1000 ease-out delay-2400 ${
                linesAnimated ? 'opacity-100' : 'opacity-0'
              }`}
            ></div>
            <div 
              className={`absolute bottom-8 right-6 w-16 h-0.5 bg-black transition-all duration-1000 ease-out delay-2600 ${
                linesAnimated ? 'opacity-100' : 'opacity-0'
              }`}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useEffect, useState } from 'react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Half-and-half background - horizontal split */}
      <div className="w-full h-full flex flex-col">
        {/* Top half - gray */}
        <div className="flex-1 bg-gray-200"></div>
        {/* Bottom half - same gray */}
        <div className="flex-1 bg-gray-300"></div>
      </div>

      {/* Horizontal black line in center - animates from left to right */}
      <div 
        className={`absolute top-60 transform -translate-x-1/2 -translate-y-1/4 h-3 bg-black transition-all duration-1000 ease-out ${
          isLoaded ? 'w-146' : 'w-0'
        }`}
        style={{ transformOrigin: 'left center' }}
      ></div>

      {/* Horizontal black line in center - animates from left to right */}
      <div 
        className={`absolute top-160 right-[-170px] transform -translate-x-1/2 -translate-y-1/4 h-3 bg-black transition-all duration-1000 ease-out delay-200 ${
          isLoaded ? 'w-86' : 'w-0'
        }`}
        style={{ transformOrigin: 'left center' }}
      ></div>

      {/* Vertical black line on right edge - animates from top to bottom */}
      <div 
        className={`absolute right-[741px] top-0 w-[14px] bg-black transition-all duration-1000 ease-out delay-400 ${
          isLoaded ? 'h-105' : 'h-0'
        }`}
        style={{ transformOrigin: 'top center' }}
      ></div>

      {/* Vertical black line on bottom edge - animates from top to bottom */}
      <div 
        className={`absolute left-[754px] top-[480px] w-[14px] bg-black transition-all duration-1000 ease-out delay-600 ${
          isLoaded ? 'h-105' : 'h-0'
        }`}
        style={{ transformOrigin: 'top center' }}
      ></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Left side text - fades in and slides from left */}
        <div className={`absolute left-29 top-54 transform -translate-y-1/2 transition-all duration-800 ease-out delay-800 ${
          isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
        }`}>
          <p className="text-3xl font-medium text-black origin-left">Hi, I Am</p>
        </div>

        {/* Center main name - fades in and scales up */}
        <div className={`text-center transition-all duration-1000 ease-out delay-1000 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <h1 className="text-8xl font-bold text-black tracking-wider">YOGESH</h1>
        </div>

        {/* Right side text - fades in and slides from right */}
        <div className={`absolute right-35 top-150 transform -translate-y-1/2 transition-all duration-800 ease-out delay-1200 ${
          isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}>
          <div className="mt-8">
            <p className="text-2xl text-black">Resume</p>
          </div>
        </div>

        {/* Vertical text - fades in and slides from bottom */}
        <div className={`absolute top-150 left-[740px] transform -translate-y-1/2 transition-all duration-800 ease-out delay-1400 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-[15px] text-black rotate-90 origin-center whitespace-nowrap">FullStack Developer</p>
        </div>

        {/* Bottom text - fades in and slides from bottom */}
        <div className={`absolute bottom-50 left-35 rotate-90 transform -translate-x-1/2 transition-all duration-800 ease-out delay-1600 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <p className="text-3xl text-black">ヨゲシュ</p>
        </div>
      </div>
    </section>
  );
}