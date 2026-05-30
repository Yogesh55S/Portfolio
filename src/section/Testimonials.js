"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useUser, useClerk } from "@clerk/nextjs";
import { Loader2, Plus, X, MessageSquare, Check } from 'lucide-react';


export default function Testimonials() {
  const { user, isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  // Data states — only from Supabase
  const [row1, setRow1] = useState([]);
  const [row2, setRow2] = useState([]);
  const [dbLoading, setDbLoading] = useState(true);
  const [hasTestimonials, setHasTestimonials] = useState(false);

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitName, setSubmitName] = useState('');
  const [submitRole, setSubmitRole] = useState('');
  const [submitQuote, setSubmitQuote] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Fetch only approved testimonials from Supabase
  const fetchTestimonials = async () => {
    try {
      setDbLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setHasTestimonials(true);
        const half = Math.ceil(data.length / 2);
        setRow1(data.slice(0, half));
        setRow2(data.slice(half));
      } else {
        // No approved testimonials — show empty state
        setHasTestimonials(false);
        setRow1([]);
        setRow2([]);
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setHasTestimonials(false);
      setRow1([]);
      setRow2([]);
    } finally {
      setDbLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleAddTestimonialClick = () => {
    if (!isSignedIn) {
      openSignIn();
    } else {
      setSubmitName(user?.fullName || '');
      setSubmitRole('');
      setSubmitQuote('');
      setIsFormOpen(true);
      setSubmitSuccess(false);
      setSubmitError(null);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);

    if (!submitName.trim() || !submitQuote.trim()) {
      setSubmitError('Name and quote are required.');
      setSubmitLoading(false);
      return;
    }

    try {
      // Calculate initials (e.g. Corey Franci -> CF)
      const names = submitName.trim().split(' ');
      const initials = names.length > 1 
        ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
        : submitName.slice(0, 2).toUpperCase();

      const { error } = await supabase
        .from('testimonials')
        .insert({
          name: submitName,
          role: submitRole || 'Client',
          quote: submitQuote,
          initials,
          approved: false, // Requires admin verification
          user_id: user.id
        });

      if (error) throw error;

      setSubmitSuccess(true);
      setTimeout(() => {
        setIsFormOpen(false);
        setSubmitSuccess(false);
      }, 3500);

    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Safe repetition helper to guarantee smooth marquee overflow
  const getRepeatedItems = (list) => {
    if (!list || list.length === 0) return [];
    if (list.length === 1) return [...list, ...list, ...list, ...list, ...list, ...list];
    if (list.length === 2) return [...list, ...list, ...list, ...list];
    if (list.length < 5) return [...list, ...list, ...list];
    return [...list, ...list];
  };

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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-7xl">
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-gray-900"></div>
                <span className="text-gray-600 text-xs tracking-[0.3em] font-semibold uppercase font-space-grotesk">
                  Endorsements
                </span>
              </div>
              
              <h1 className="text-gray-900 font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-6 font-montserrat">
                TESTIMONIALS
              </h1>
              
              <p className="text-gray-600 text-lg sm:text-xl max-w-2xl leading-relaxed font-light font-inter">
                Words of praise from others about my professional presence, collaborative spirit, and development capabilities.
              </p>
            </div>

            {/* Premium Add Testimonial Action */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddTestimonialClick}
              className="md:mb-4 px-8 py-4 bg-black text-white hover:bg-gray-900 transition-colors font-space-grotesk font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer self-start border border-black shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
            </motion.button>
          </div>
        </div>

        {/* Marquee Outer Container */}
        {dbLoading ? (
          <div className="flex items-center justify-center py-24 gap-3 text-gray-400">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-xs font-semibold tracking-widest uppercase font-space-grotesk">Loading testimonials...</span>
          </div>
        ) : !hasTestimonials ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="w-7 h-7 text-gray-400" />
            </div>
            <h3 className="text-gray-900 font-semibold text-lg tracking-tight mb-2 font-space-grotesk">No testimonials yet</h3>
            <p className="text-gray-500 text-sm font-light max-w-xs leading-relaxed font-inter">
              Be the first to share your experience working with Yogesh.
            </p>
          </div>
        ) : (
        <div className="relative w-full max-w-[100vw] overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
          {/* Edge gradient overlays for smooth fading effect */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"></div>

          {/* Marquee Tracks Wrapper */}
          <div className="space-y-8 py-4">
            
            {/* Row 1: Right-to-Left */}
            <div className="pause-hover overflow-hidden flex">
              <div className="animate-marquee flex gap-6" style={{ '--marquee-duration': '35s' }}>
                {getRepeatedItems(row1).map((item, idx) => (
                  <div 
                    key={`row1-${idx}`}
                    className="w-[320px] sm:w-[400px] shrink-0 bg-white border-2 border-gray-200 p-8 sm:p-10 transition-all duration-300 hover:border-gray-900 hover:-translate-y-1 hover:shadow-xl relative flex flex-col justify-between"
                  >
                    {/* Big double quote icon */}
                    <span className="text-gray-100 font-serif text-8xl absolute top-2 right-6 select-none pointer-events-none">“</span>
                    
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light mb-8 relative z-10 font-inter">
                      {item.quote}
                    </p>

                    <div className="flex items-center gap-4 border-t border-gray-100 pt-6 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs tracking-wider">
                        {item.initials}
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-semibold text-sm sm:text-base tracking-tight font-space-grotesk">{item.name}</h4>
                        <p className="text-gray-500 text-xs tracking-wider font-light uppercase font-space-grotesk">{item.role}</p>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-gray-900"></div>
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gray-100 -mt-px -mr-px"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Left-to-Right (Reverse) — only show if there are items */}
            {row2.length > 0 && (
            <div className="pause-hover overflow-hidden flex">
              <div className="animate-marquee-reverse flex gap-6" style={{ '--marquee-duration': '35s' }}>
                {getRepeatedItems(row2).map((item, idx) => (
                  <div 
                    key={`row2-${idx}`}
                    className="w-[320px] sm:w-[400px] shrink-0 bg-white border-2 border-gray-200 p-8 sm:p-10 transition-all duration-300 hover:border-gray-900 hover:-translate-y-1 hover:shadow-xl relative flex flex-col justify-between"
                  >
                    <span className="text-gray-100 font-serif text-8xl absolute top-2 right-6 select-none pointer-events-none">“</span>
                    
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light mb-8 relative z-10 font-inter">
                      {item.quote}
                    </p>

                    <div className="flex items-center gap-4 border-t border-gray-100 pt-6 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs tracking-wider">
                        {item.initials}
                      </div>
                      <div>
                        <h4 className="text-gray-900 font-semibold text-sm sm:text-base tracking-tight font-space-grotesk">{item.name}</h4>
                        <p className="text-gray-500 text-xs tracking-wider font-light uppercase font-space-grotesk">{item.role}</p>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-gray-900"></div>
                    <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gray-100 -mt-px -mr-px"></div>
                  </div>
                ))}
              </div>
            </div>
            )}

          </div>
        </div>
        )}

        {/* Footer line for smooth visual separation */}
        <div className="max-w-7xl mx-auto mt-20 sm:mt-24 lg:mt-32 border-t-2 border-gray-200"></div>
      </div>

      {/* Dynamic Testimonial Submission Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitLoading && setIsFormOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.45, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-white border border-gray-200 shadow-2xl p-8 sm:p-10 z-10 overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle blueprint grid overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.015] z-0">
                <div className="absolute inset-0" style={{
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px),
                                    linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)`,
                  backgroundSize: '24px 24px'
                }} />
              </div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-gray-900"></div>
                    <span className="text-gray-500 text-[10px] tracking-[0.3em] font-bold uppercase font-space-grotesk">
                      SUBMIT ENDORSEMENT
                    </span>
                  </div>
                  {!submitLoading && (
                    <button 
                      onClick={() => setIsFormOpen(false)}
                      className="text-gray-400 hover:text-gray-900 transition-colors p-1"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {submitSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-12 flex flex-col items-center justify-center text-center font-space-grotesk"
                  >
                    <div className="w-16 h-16 bg-gray-900 text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                      <Check className="w-8 h-8" />
                    </div>
                    <h3 className="text-gray-900 font-light text-2xl tracking-tight mb-3 font-montserrat uppercase">
                      SUBMISSION RECEIVED
                    </h3>
                    <p className="text-gray-600 text-sm font-light max-w-sm leading-relaxed font-inter">
                      Thank you! Your testimonial has been securely submitted and is pending verification by Yogesh. It will appear once approved.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="text-gray-900 font-light text-3xl sm:text-4xl tracking-tight mb-4 font-montserrat uppercase">
                      Write Endorsement
                    </h2>
                    <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 font-inter">
                      Share your experience working with Yogesh. Standardizing dynamic entries ensures and preserves authentic professional reviews.
                    </p>

                    {submitError && (
                      <div className="mb-4 p-4 text-xs font-semibold bg-red-50 text-red-700 border-l-2 border-red-600 rounded-sm font-space-grotesk">
                        {submitError}
                      </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="space-y-4 font-inter">
                      <div>
                        <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2 font-space-grotesk">
                          Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Corey Franci"
                          value={submitName}
                          onChange={(e) => setSubmitName(e.target.value)}
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-sm text-sm text-gray-900 font-light focus:outline-none focus:border-gray-900 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2 font-space-grotesk">
                          Your Role / Designation
                        </label>
                        <input
                          type="text"
                          placeholder="Tech Lead, Company"
                          value={submitRole}
                          onChange={(e) => setSubmitRole(e.target.value)}
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-sm text-sm text-gray-900 font-light focus:outline-none focus:border-gray-900 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2 font-space-grotesk">
                          Review Quote
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Working with Yogesh was an absolute pleasure..."
                          value={submitQuote}
                          onChange={(e) => setSubmitQuote(e.target.value)}
                          className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-sm text-sm text-gray-900 font-light focus:outline-none focus:border-gray-900 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitLoading}
                        className="w-full py-4 px-6 bg-black text-white hover:bg-gray-900 font-space-grotesk font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                      >
                        {submitLoading ? (
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                        ) : (
                          <>
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>SUBMIT FOR APPROVAL</span>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 w-24 h-1 bg-gray-900"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
