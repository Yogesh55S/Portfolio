"use client";
import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    alert('Message functionality would be implemented with a backend service');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image - Replace the URL with your own image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/cont.jpg")',
          // You can also use a URL like:
          // backgroundImage: 'url("https://your-image-url.com/image.jpg")'
        }}
      ></div>
      
  

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-8 pb-12 md:pt-16 md:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-4">
              <span className="text-gray-400 text-xs md:text-sm uppercase tracking-widest font-medium">
                Get In Touch
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
              Contact<span className="text-white">.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Let's discuss your next project and bring your ideas to life
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight">
                    Let's Connect
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Email */}
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Email</h3>
                        <a 
                          href="mailto:Yogeshama914@gmail.com" 
                          className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                        >
                          Yogeshama914@gmail.com
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Phone</h3>
                        <a 
                          href="tel:+919350161043" 
                          className="text-gray-300 hover:text-emerald-400 transition-colors duration-200"
                        >
                          +91-9350161043
                        </a>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">Location</h3>
                        <p className="text-gray-300">
                          Sonipat, Haryana, India
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-8">
                  <h3 className="text-white font-semibold text-lg mb-4">Follow Me</h3>
                  <div className="flex space-x-4">
                    <a 
                      href="https://github.com/Yogesh55S" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-gray-700/80 transition-colors duration-200 group"
                    >
                      <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    
                    <a 
                      href="https://www.linkedin.com/in/yogesh-kumar-983840226/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-blue-600/80 transition-colors duration-200 group"
                    >
                      <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    
                    <a 
                      href="https://leetcode.com/u/Yogeshkumar55/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-orange-600/80 transition-colors duration-200 group"
                    >
                      <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.623 2.133 7.823-.074l.089-.098.301-.322c1.98-2.108 2.018-5.281.061-7.429l-2.02-2.217L17.173 3.54A1.374 1.374 0 0 0 16.21 3.023L13.483 0z"/>
                      </svg>
                    </a>
                    
                    <a 
                      href="https://www.geeksforgeeks.org/user/yogesha6ghc/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-green-600/80 transition-colors duration-200 group"
                    >
                      <svg className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.441 16.892c-2.102.144-6.784.144-8.883 0C5.282 16.736 5.017 15.622 5.017 12c0-3.629.265-4.736 2.541-4.892 2.099-.144 6.784-.144 8.883 0C18.718 7.264 18.983 8.378 18.983 12c0 3.629-.265 4.736-2.542 4.892z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50">
                <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">
                  Send Message
                </h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-200"
                    />
                  </div>
                  
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors duration-200 resize-none"
                      rows={6}
                    ></textarea>
                  </div>
                  
                  <button
                    onClick={handleSubmit}
                    className="w-full py-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-transparent"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-16 pt-8 border-t border-gray-700/50 text-center">
              <p className="text-gray-300 text-sm md:text-base">
                Ready to turn ideas into reality. Let's build something amazing together.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}