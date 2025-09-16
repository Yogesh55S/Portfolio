"use client";
import React, { useEffect, useRef, useState } from "react";

export default function About() {
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasPlayedOnce && videoRef.current) {
          // Play video only once when section comes into view
          videoRef.current.play().catch(console.error);
          setHasPlayedOnce(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of section is visible
        rootMargin: "0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasPlayedOnce]);

  const handleVideoEnded = () => {
    // Pause video after it ends (no loop)
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Force video reload when switching between mobile/desktop
  useEffect(() => {
    if (videoRef.current && hasPlayedOnce) {
      videoRef.current.load(); // Reload video with new source
      setHasPlayedOnce(false); // Reset play state
    }
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full flex items-center justify-center text-white overflow-hidden"
    >
      {/* Responsive Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="metadata"
          onEnded={handleVideoEnded}
          className="absolute inset-0 w-full h-full object-cover"
          poster={isMobile ? "/ach.jpg" : "/ach.jpg"}
          key={isMobile ? 'mobile' : 'desktop'} // Force re-render on device change
        >
          {/* Conditional video sources based on device */}
          {isMobile ? (
            <>
              <source src="/About.mp4" type="video/mp4" />
            </>
          ) : (
            <>
              <source src="/abou.mp4" type="video/mp4" />
            </>
          )}
          
          Your browser does not support the video tag.
        </video>
        
        {/* Responsive overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t 
                        from-black/60 via-black/20 to-black/40
                        sm:from-black/50 sm:via-black/15 sm:to-black/30
                        md:from-black/40 md:via-black/10 md:to-black/20">
        </div>
      </div>

      {/* Enhanced fallback background */}
      <div className="absolute inset-0 bg-gradient-to-br 
                      from-gray-900 via-blue-900 to-purple-900 
                      opacity-90 z-[-1]">
      </div>
    </section>
  );
}