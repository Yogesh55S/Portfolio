"use client";
import React, { useState } from 'react';

// --- SVG Icon Components (No Changes) ---
const FaGithub = ({ className }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3.3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
    </svg>
);
const FaLinkedin = ({ className }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"></path>
    </svg>
);
const FaWhatsapp = ({ className }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-67.6-9.5-97.2-26.7l-7-4.1-72.5 19 19.3-70.6-4.5-7.4c-18.4-30.2-28.2-65.7-28.2-101.7 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
    </svg>
);
const FaDownload = ({ className }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
    </svg>
);

export default function About() {
    const [activeSection, setActiveSection] = useState('about');

    const socialLinks = {
        github: "https://github.com/Yogesh55S",
        linkedin: "https://www.linkedin.com/in/yogesh-kumar-983840226/",
        whatsapp: "https://wa.me/919350161043"
    };
    
    return (
        <section 
            id="about" 
            className="relative min-h-screen w-full bg-white flex items-center justify-center font-sans px-4 py-16 sm:py-20 overflow-hidden"
        >
            {/* --- Vertical "ABOUT ME" Button (No Changes) --- */}
            <aside 
                className={`absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out z-20
                            ${activeSection === 'education' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full'}
                            hidden md:flex`} 
            >
                <button
                    onClick={() => setActiveSection('about')}
                    className="font-bold text-lg tracking-widest text-gray-800 hover:text-gray-500 [writing-mode:vertical-lr] transform rotate-180 p-4"
                >
                    ABOUT ME
                </button>
            </aside>

            {/* --- Vertical "EDUCATION" Button (No Changes) --- */}
            <aside 
                className={`absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out z-20
                            ${activeSection === 'about' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
                            hidden md:flex`} 
            >
                <button
                    onClick={() => setActiveSection('education')}
                    className="font-bold text-lg tracking-widest text-gray-800 hover:text-gray-500 [writing-mode:vertical-rl] p-4"
                >
                    EDUCATION
                </button>
            </aside>
            
            {/* --- Mobile Tabs (No Changes) --- */}
            <nav className="flex md:hidden w-full justify-center items-center mb-6 absolute top-16 left-1/2 -translate-x-1/2 z-10">
                <button
                    onClick={() => setActiveSection('about')}
                    className={`py-2 px-4 font-semibold ${activeSection === 'about' ? 'gray-600 border-b-2 border-gray-600' : 'text-gray-500'}`}
                >
                    ABOUT ME
                </button>
                <button
                    onClick={() => setActiveSection('education')}
                    className={`py-2 px-4 font-semibold ${activeSection === 'education' ? 'text-gray-600 border-b-2 border-gray-600' : 'text-gray-500'}`}
                >
                    EDUCATION
                </button>
            </nav>

            {/* --- Content Panel Wrapper (No Changes) --- */}
            <div className="max-w-6xl w-full mx-auto relative min-h-[550px] mt-16 md:mt-0 flex items-center justify-center"> 

                {/* ===== Panel 1: About Me (No Changes) ===== */}
                <article 
                    className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-all duration-700 ease-in-out
                                ${activeSection === 'about' 
                                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                                    : 'opacity-0 -translate-y-10 pointer-events-none'}`}
                >
                    {/* 2-Column Grid Container */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-16 items-center w-full px-4">
                        
                        {/* --- Column 1: YK Icon (Left) --- */}
                        <div className="md:col-span-1 flex justify-center mt-3">
                            <img 
                                src="/logo.png" 
                                alt="Yogesh" 
                                className="w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover border-8 border-white shadow-xl"
                            />
                        </div>
                        
                        {/* --- Column 2: Content with Accent Border (Right) --- */}
                        <div className="md:col-span-2">
                            <div className="border-l-4 border-gray-600 pl-6 lg:pl-8">
                                <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest">About Me</p>
                                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mt-2">
                                    Hello, I'm Yogesh.
                                </h2>
                                <p className="text-base sm:text-lg text-slate-600 leading-relaxed my-6">
                                    A passionate Developer with a love for building web applications. My journey started with a critical mindset, a curiosity which quickly grew into the work to drive to create seamless creativity where we meet user-friendly digital experiences.
                                </p>
                                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <a 
                                        href="/Yogesh_Resume.pdf" 
                                        download
                                        className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold py-3 px-8 rounded-full hover:bg-slate-700 transition-all duration-300 ease-in-out hover:-translate-y-0.5 shadow-lg text-sm uppercase tracking-widest"
                                    >
                                        <FaDownload className="w-4 h-4" />
                                        Download CV
                                    </a>
                                    <div className="flex items-center gap-2">
                                        <a href={socialLinks.github} aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-slate-100 rounded-full text-slate-600 hover:text-white hover:bg-slate-800 transition-all duration-300">
                                            <FaGithub className="w-5 h-5" />
                                        </a>
                                        <a href={socialLinks.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-slate-100 rounded-full text-slate-600 hover:text-white hover:bg-blue-600 transition-all duration-300">
                                            <FaLinkedin className="w-5 h-5" />
                                        </a>
                                        <a href={socialLinks.whatsapp} aria-label="WhatsApp" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-slate-100 rounded-full text-slate-600 hover:text-white hover:bg-green-500 transition-all duration-300">
                                            <FaWhatsapp className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>

                {/* ===== Panel 2: Education (NEW UNIFIED DESIGN) ===== */}
                <article 
                    className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center transition-all duration-700 ease-in-out
                                ${activeSection === 'education' 
                                    ? 'opacity-100 translate-y-0 pointer-events-auto' 
                                    : 'opacity-0 translate-y-10 pointer-events-none'}`}
                >
                    <div className="max-w-2xl w-full mx-auto p-4 md:p-8">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 text-center mt-2 mb-12">
                            EDUCATION
                        </h2>
                        
                        {/* --- Start Unified List --- */}
                        <div className="space-y-10">

                            {/* --- Education Item 1 --- */}
                            <div className="border-l-4 border-gray-600 pl-6">
                                <p className="text-sm text-slate-500 font-medium">(2021 - 2025)</p>
                                <p className="text-lg font-semibold text-slate-800 mt-1">SETH JAI PARKASH MUKAND LAL INSTITUTE</p>
                                <p className="text-base text-slate-600">B.TECH IN INFORMATION TECHNOLOGY</p>
                            </div>

                            {/* --- Education Item 2 --- */}
                            <div className="border-l-4 border-gray-600 pl-6">
                                <p className="text-sm text-slate-500 font-medium">(2021) - 83%</p>
                                <p className="text-lg font-semibold text-slate-800 mt-1">GOVT SENIOR SECONDARY SCHOOL</p>
                                <p className="text-base text-slate-600">12TH NON-MEDICAL</p>
                            </div>

                        </div>
                        {/* --- End Unified List --- */}

                    </div>
                </article>
                {/* ===== End Panel 2 ===== */}
            </div>
        </section>
    );
}