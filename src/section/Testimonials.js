"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { useUser } from "@clerk/nextjs";
import { 
  Loader2, Plus, X, MessageSquare, Check, Quote, 
  ChevronLeft, ChevronRight 
} from 'lucide-react';
import { submitTestimonialAction } from '@/app/actions';

// Unified Luxury Testimonial Card Component
function TestimonialCard({ item, isMarquee = false }) {
  return (
    <div 
      className={`bg-white border-2 border-gray-200 p-6 sm:p-8 transition-all duration-300 hover:border-gray-900 hover:-translate-y-1 hover:shadow-xl relative flex flex-col justify-between h-[320px] sm:h-[340px] group select-none ${
        isMarquee ? 'w-[300px] sm:w-[380px] shrink-0' : 'w-full'
      }`}
    >
      {/* Decorative quote mark watermark */}
      <span className="text-gray-100 font-serif text-7xl sm:text-8xl absolute top-2 right-5 select-none pointer-events-none transition-colors group-hover:text-gray-200/80">
        “
      </span>

      {/* Top subtle quote icon tag */}
      <div className="flex items-center justify-between relative z-10 mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-400 group-hover:text-gray-900 group-hover:border-gray-300 transition-colors">
          <Quote className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Scrollable quote text area */}
      <div className="flex-1 overflow-y-auto pr-2 my-3 relative z-10 custom-scrollbar select-text">
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-light font-inter">
          {item.quote}
        </p>
      </div>

      {/* Author Details Footer */}
      <div className="flex items-center gap-3.5 border-t border-gray-100 pt-4 mt-auto relative z-10">
        <div className="w-11 h-11 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs tracking-wider shrink-0 font-space-grotesk shadow-sm group-hover:bg-black transition-colors">
          {item.initials || 'CL'}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-gray-900 font-semibold text-sm sm:text-base tracking-tight font-space-grotesk truncate">
            {item.name}
          </h4>
          <p className="text-gray-500 text-xs tracking-wider font-light uppercase font-space-grotesk truncate">
            {item.role || 'Client'}
          </p>
        </div>
      </div>

      {/* Modern architectural corner & bottom accents */}
      <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-20"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-gray-100 -mt-px -mr-px transition-colors group-hover:border-gray-300"></div>
    </div>
  );
}

export default function Testimonials() {
  const { user } = useUser();

  // Testimonial raw list
  const [testimonials, setTestimonials] = useState([]);
  const [row1, setRow1] = useState([]);
  const [row2, setRow2] = useState([]);
  const [dbLoading, setDbLoading] = useState(true);

  // Mobile slider state
  const sliderRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  // Form modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitName, setSubmitName] = useState('');
  const [submitRole, setSubmitRole] = useState('');
  const [submitQuote, setSubmitQuote] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Fetch only approved testimonials from Supabase
  const fetchTestimonials = async () => {
    if (!supabase) {
      setDbLoading(false);
      setTestimonials([]);
      return;
    }
    try {
      setDbLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const items = data || [];
      setTestimonials(items);

      if (items.length > 4) {
        const half = Math.ceil(items.length / 2);
        setRow1(items.slice(0, half));
        setRow2(items.slice(half));
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setTestimonials([]);
    } finally {
      setDbLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle mobile slider scroll tracking
  const handleSliderScroll = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.offsetWidth * 0.85;
    const newIndex = Math.round(scrollLeft / (itemWidth || 1));
    setActiveSlide(Math.min(testimonials.length - 1, Math.max(0, newIndex)));
  };

  const scrollToSlide = (index) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const children = container.children;
    if (children && children[index]) {
      children[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      setActiveSlide(index);
    }
  };

  const openTestimonialForm = () => {
    setSubmitName(user?.fullName || '');
    setSubmitRole('');
    setSubmitQuote('');
    setIsFormOpen(true);
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);

    if (!submitName.trim() || !submitQuote.trim()) {
      setSubmitError('Name and review quote are required.');
      setSubmitLoading(false);
      return;
    }

    try {
      // Calculate initials (e.g. Corey Franci -> CF)
      const names = submitName.trim().split(' ');
      const initials = names.length > 1 
        ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
        : submitName.slice(0, 2).toUpperCase();

      const res = await submitTestimonialAction({
        name: submitName.trim(),
        role: submitRole.trim() || 'Client',
        quote: submitQuote.trim(),
        initials,
        user_id: user?.id || null
      });

      if (!res.success) throw new Error(res.error);

      setSubmitSuccess(true);
      setTimeout(() => {
        setIsFormOpen(false);
        setSubmitSuccess(false);
      }, 3000);

    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(err.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Safe repetition helper for smooth continuous marquee when items > 4
  const getRepeatedItems = (list) => {
    if (!list || list.length === 0) return [];
    if (list.length < 5) return [...list, ...list, ...list, ...list];
    return [...list, ...list];
  };

  return (
    <div className="bg-white relative overflow-hidden pt-10 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-32">
      {/* Minimal subtle background dot grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-px bg-gray-900"></div>
                <span className="text-gray-600 text-xs tracking-[0.3em] font-semibold uppercase font-space-grotesk">
                  Endorsements
                </span>
              </div>
              
              <h2 className="text-gray-900 font-light text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight mb-4 sm:mb-6 font-montserrat uppercase">
                TESTIMONIALS
              </h2>
              
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed font-light font-inter">
                Real words from collaborators, clients, and team members regarding engineering quality and professional presence.
              </p>
            </div>

            {/* Add Testimonial Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openTestimonialForm}
              className="px-6 sm:px-8 py-3.5 sm:py-4 bg-black text-white hover:bg-gray-900 transition-all font-space-grotesk font-bold text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer self-start md:self-auto border border-black shadow-md hover:shadow-lg rounded-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Write Review</span>
            </motion.button>
          </div>
        </div>

        {/* Content Area */}
        {dbLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-xs font-semibold tracking-widest uppercase font-space-grotesk">Loading testimonials...</span>
          </div>
        ) : testimonials.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-gray-200 rounded-sm bg-gray-50/50">
            <div className="w-14 h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center mb-5 shadow-sm text-gray-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-gray-900 font-semibold text-lg tracking-tight mb-2 font-space-grotesk">No testimonials yet</h3>
            <p className="text-gray-500 text-sm font-light max-w-sm leading-relaxed font-inter mb-6">
              Be the first to share your experience working with Yogesh.
            </p>
            <button
              onClick={openTestimonialForm}
              className="px-6 py-3 bg-black text-white hover:bg-gray-900 text-xs font-bold font-space-grotesk tracking-widest uppercase rounded-sm transition-colors cursor-pointer"
            >
              Write First Review
            </button>
          </div>
        ) : testimonials.length <= 4 ? (
          /* When <= 4 items: Mobile Slider + Desktop Responsive Grid */
          <div className="w-full">
            {/* 1. Mobile Slider View (< md) */}
            <div className="block md:hidden">
              <div 
                ref={sliderRef}
                onScroll={handleSliderScroll}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2 -mx-4 px-4"
              >
                {testimonials.map((item, index) => (
                  <div key={item.id || index} className="w-[85vw] max-w-[340px] shrink-0 snap-center">
                    <TestimonialCard item={item} isMarquee={false} />
                  </div>
                ))}
              </div>

              {/* Slider Pagination & Arrow Controls (if multiple) */}
              {testimonials.length > 1 && (
                <div className="flex items-center justify-between mt-6 px-1">
                  {/* Dot Indicators */}
                  <div className="flex items-center gap-1.5">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => scrollToSlide(idx)}
                        aria-label={`Go to review ${idx + 1}`}
                        className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                          activeSlide === idx ? 'w-6 bg-gray-900' : 'w-2 bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
                      disabled={activeSlide === 0}
                      className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center text-gray-700 hover:border-gray-900 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Previous testimonial"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => scrollToSlide(Math.min(testimonials.length - 1, activeSlide + 1))}
                      disabled={activeSlide === testimonials.length - 1}
                      className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center text-gray-700 hover:border-gray-900 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Desktop Grid View (>= md) */}
            <div className="hidden md:block w-full">
              <div className={`grid gap-6 sm:gap-8 ${
                testimonials.length === 1 
                  ? 'grid-cols-1 max-w-md mx-auto'
                  : testimonials.length === 2
                  ? 'grid-cols-2 max-w-4xl mx-auto'
                  : testimonials.length === 3
                  ? 'grid-cols-3 max-w-6xl mx-auto'
                  : 'grid-cols-2 max-w-5xl mx-auto'
              }`}>
                {testimonials.map((item, index) => (
                  <TestimonialCard key={item.id || index} item={item} isMarquee={false} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* When > 4 items: Continuous Infinite Marquee across all devices */
          <div className="relative w-full max-w-[100vw] overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            {/* Smooth Edge gradient overlays */}
            <div className="absolute inset-y-0 left-0 w-12 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-12 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none"></div>

            <div className="space-y-6 sm:space-y-8 py-2">
              {/* Row 1: Right-to-Left (Flowing left) */}
              <div className="pause-hover overflow-hidden flex">
                <div className="animate-marquee flex gap-6" style={{ '--marquee-duration': '35s' }}>
                  {getRepeatedItems(row1).map((item, idx) => (
                    <TestimonialCard key={`r1-${idx}`} item={item} isMarquee={true} />
                  ))}
                </div>
              </div>

              {/* Row 2: Left-to-Right (Flowing right) */}
              {row2.length > 0 && (
                <div className="pause-hover overflow-hidden flex">
                  <div className="animate-marquee-reverse flex gap-6" style={{ '--marquee-duration': '35s' }}>
                    {getRepeatedItems(row2).map((item, idx) => (
                      <TestimonialCard key={`r2-${idx}`} item={item} isMarquee={true} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section bottom accent divider */}
        <div className="max-w-7xl mx-auto mt-16 sm:mt-20 lg:mt-28 border-t-2 border-gray-200"></div>
      </div>

      {/* Dynamic Testimonial Submission Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !submitLoading && setIsFormOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-white border border-gray-200 shadow-2xl p-6 sm:p-10 z-10 overflow-hidden flex flex-col my-auto max-h-[90vh] overflow-y-auto custom-scrollbar rounded-sm"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-px bg-gray-900"></div>
                  <span className="text-gray-500 text-[10px] tracking-[0.3em] font-bold uppercase font-space-grotesk">
                    SUBMIT ENDORSEMENT
                  </span>
                </div>
                {!submitLoading && (
                  <button 
                    onClick={() => setIsFormOpen(false)}
                    className="text-gray-400 hover:text-gray-900 transition-colors p-1.5 rounded-sm hover:bg-gray-100"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {submitSuccess ? (
                /* Success State */
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 flex flex-col items-center justify-center text-center font-space-grotesk"
                >
                  <div className="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center mb-5 shadow-md">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-gray-900 font-light text-2xl tracking-tight mb-2 font-montserrat uppercase">
                    REVIEW SUBMITTED
                  </h3>
                  <p className="text-gray-600 text-sm font-light max-w-sm leading-relaxed font-inter">
                    Thank you! Your testimonial has been sent to Yogesh for verification. It will appear on the website once approved.
                  </p>
                </motion.div>
              ) : (
                /* Form Fields */
                <>
                  <h3 className="text-gray-900 font-light text-2xl sm:text-3xl tracking-tight mb-2 font-montserrat uppercase">
                    Write Testimonial
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed mb-6 font-inter">
                    Share your candid feedback and experience working with Yogesh. Anyone can submit a review.
                  </p>

                  {submitError && (
                    <div className="mb-4 p-3.5 text-xs font-semibold bg-red-50 text-red-700 border-l-2 border-red-600 rounded-sm font-space-grotesk">
                      {submitError}
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4 font-inter">
                    <div>
                      <label className="block text-gray-700 text-[11px] font-bold uppercase tracking-wider mb-1.5 font-space-grotesk">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe"
                        value={submitName}
                        onChange={(e) => setSubmitName(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm text-sm text-gray-900 font-light focus:outline-none focus:border-gray-900 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-[11px] font-bold uppercase tracking-wider mb-1.5 font-space-grotesk">
                        Your Role / Company <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Senior Tech Lead, Google / Freelance Client"
                        value={submitRole}
                        onChange={(e) => setSubmitRole(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm text-sm text-gray-900 font-light focus:outline-none focus:border-gray-900 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-[11px] font-bold uppercase tracking-wider mb-1.5 font-space-grotesk">
                        Review / Endorsement <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Write about the project experience, engineering delivery, communication, or teamwork..."
                        value={submitQuote}
                        onChange={(e) => setSubmitQuote(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm text-sm text-gray-900 font-light focus:outline-none focus:border-gray-900 focus:bg-white transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitLoading}
                      className="w-full py-3.5 px-6 bg-black text-white hover:bg-gray-900 font-space-grotesk font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer mt-3 shadow-md hover:shadow-lg disabled:opacity-50 rounded-sm"
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

              {/* Accent Line */}
              <div className="absolute bottom-0 left-0 w-20 h-1 bg-gray-900"></div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
