"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { deleteTestimonialAction, approveTestimonialAction, updateTestimonialAction } from './actions';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, Trash2, Clock, CheckCircle, 
  MessageSquare, Loader2, RefreshCw, AlertCircle, Edit, X
} from 'lucide-react';

export default function AdminPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'approved'
  const [actionId, setActionId] = useState(null); // tracking loading for specific items
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Edit states
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editQuote, setEditQuote] = useState('');

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      if (!supabase) {
        setErrorMessage('Database not configured. Please check your .env.local file.');
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (err) {
      console.error('Error fetching admin data:', err);
      setErrorMessage('Could not load testimonials. Please check database permissions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleApprove = async (id) => {
    setActionId(id);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const res = await approveTestimonialAction(id);
      if (!res.success) throw new Error(res.error);

      setSuccessMessage('Testimonial approved successfully!');
      // Update local state
      setTestimonials(prev => 
        prev.map(t => t.id === id ? { ...t, approved: true } : t)
      );
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Approve error:', err);
      setErrorMessage(err.message || 'Failed to approve. Please try again.');
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete/reject this testimonial? This action cannot be undone.')) {
      return;
    }
    setActionId(id);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const res = await deleteTestimonialAction(id);
      if (!res.success) throw new Error(res.error);

      setSuccessMessage('Testimonial deleted successfully.');
      // Remove from local state
      setTestimonials(prev => prev.filter(t => t.id !== id));
      
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Delete error:', err);
      setErrorMessage(err.message || 'Failed to delete. Please try again.');
    } finally {
      setActionId(null);
    }
  };

  const handleStartEdit = (t) => {
    setEditingTestimonial(t);
    setEditName(t.name);
    setEditRole(t.role);
    setEditQuote(t.quote);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editName.trim() || !editQuote.trim()) {
      setErrorMessage('Name and quote are required.');
      return;
    }

    setActionId(editingTestimonial.id);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const names = editName.trim().split(' ');
      const initials = names.length > 1 
        ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
        : editName.slice(0, 2).toUpperCase();

      const res = await updateTestimonialAction(editingTestimonial.id, {
        name: editName,
        role: editRole,
        quote: editQuote,
        initials
      });

      if (!res.success) throw new Error(res.error);

      setSuccessMessage('Testimonial updated successfully!');
      
      // Update local state
      setTestimonials(prev => prev.map(t => t.id === editingTestimonial.id ? {
        ...t,
        name: editName,
        role: editRole,
        quote: editQuote,
        initials
      } : t));

      setEditingTestimonial(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error('Edit error:', err);
      setErrorMessage(err.message || 'Failed to update testimonial.');
    } finally {
      setActionId(null);
    }
  };

  // Stats calculation
  const totalSubmissions = testimonials.length;
  const pendingCount = testimonials.filter(t => !t.approved).length;
  const approvedCount = testimonials.filter(t => t.approved).length;

  // Filter list
  const filteredList = testimonials.filter(t => 
    activeTab === 'pending' ? !t.approved : t.approved
  );

  return (
    <div className="p-6 sm:p-10 font-space-grotesk max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-gray-200 pb-6">
        <div>
          <span className="text-gray-500 text-[10px] tracking-[0.3em] font-bold uppercase">Administrator</span>
          <h1 className="text-gray-900 font-light text-4xl sm:text-5xl tracking-tight mt-2 font-montserrat uppercase">
            Testimonials Queue
          </h1>
        </div>

        <button
          onClick={fetchTestimonials}
          disabled={loading}
          className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 hover:border-gray-900 bg-white text-gray-700 hover:text-black font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer rounded-sm"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          <span>Refresh Data</span>
        </button>
      </div>

      {/* Alert Banners */}
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-green-50 text-green-700 border-l-2 border-green-600 rounded-sm text-xs font-semibold flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}

        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-red-50 text-red-700 border-l-2 border-red-600 rounded-sm text-xs font-semibold flex items-center gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-sm shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Submissions</div>
          <span className="text-gray-900 text-4xl sm:text-5xl font-light font-montserrat">{totalSubmissions}</span>
          <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-gray-400"></div>
        </div>

        <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-sm shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="text-[10px] font-bold text-amber-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Pending Review</span>
          </div>
          <span className="text-gray-900 text-4xl sm:text-5xl font-light font-montserrat">{pendingCount}</span>
          <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-amber-500"></div>
        </div>

        <div className="bg-white border border-gray-200 p-6 sm:p-8 rounded-sm shadow-sm relative overflow-hidden flex flex-col justify-between">
          <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Live & Approved</span>
          </div>
          <span className="text-gray-900 text-4xl sm:text-5xl font-light font-montserrat">{approvedCount}</span>
          <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-emerald-600"></div>
        </div>
      </div>

      {/* 2. Tabs Selector */}
      <div className="flex border-b border-gray-200 mb-8 w-full font-semibold relative">
        <button
          onClick={() => setActiveTab('pending')}
          className={`px-6 py-4 text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer border-b-2 -mb-px z-10 ${
            activeTab === 'pending' 
              ? 'border-black text-black' 
              : 'border-transparent text-gray-400 hover:text-gray-950'
          }`}
        >
          Pending Approval ({pendingCount})
        </button>

        <button
          onClick={() => setActiveTab('approved')}
          className={`px-6 py-4 text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer border-b-2 -mb-px z-10 ${
            activeTab === 'approved' 
              ? 'border-black text-black' 
              : 'border-transparent text-gray-400 hover:text-gray-950'
          }`}
        >
          Active / Approved ({approvedCount})
        </button>
      </div>

      {/* 3. Items List / Table */}
      {loading ? (
        <div className="w-full py-20 flex flex-col items-center justify-center gap-4 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          <span className="text-xs font-semibold tracking-widest uppercase">Fetching entries...</span>
        </div>
      ) : filteredList.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border border-dashed border-gray-300 rounded-sm py-20 px-6 text-center bg-gray-50 flex flex-col items-center justify-center"
        >
          <div className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 mb-4 shadow-sm">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-gray-950 font-bold text-sm tracking-widest uppercase mb-1">No Testimonials</h3>
          <p className="text-gray-500 text-xs font-light font-inter max-w-xs leading-relaxed">
            There are currently no reviews in this queue status to display.
          </p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredList.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white border-2 border-gray-200 p-8 transition-all relative flex flex-col justify-between hover:shadow-md hover:border-gray-900 group"
              >
                {/* Big quote icon decoration */}
                <span className="text-gray-100 font-serif text-8xl absolute top-2 right-6 select-none pointer-events-none">“</span>

                {/* Date stamp */}
                <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-4 flex items-center gap-1.5 font-inter">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(item.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</span>
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-sm leading-relaxed font-light mb-8 relative z-10 font-inter">
                  {item.quote}
                </p>

                {/* Author profile & actions */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-gray-100 pt-6 mt-auto">
                  {/* Profile */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-[10px] tracking-wider shrink-0">
                      {item.initials}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-gray-950 font-bold text-sm tracking-tight truncate">{item.name}</h4>
                      <p className="text-gray-500 text-[10px] tracking-wider font-light uppercase truncate">{item.role}</p>
                    </div>
                  </div>

                  {/* Admin Actions */}
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {/* Edit button */}
                    <button
                      onClick={() => handleStartEdit(item)}
                      disabled={actionId !== null}
                      className="px-3 py-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-900 font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1 cursor-pointer rounded-sm disabled:opacity-40"
                      title="Edit Testimonial"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    {/* Approve button - only show on pending */}
                    {!item.approved && (
                      <button
                        onClick={() => handleApprove(item.id)}
                        disabled={actionId !== null}
                        className="px-3.5 py-2.5 bg-black hover:bg-gray-900 text-white hover:text-white border border-black hover:border-gray-900 font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1.5 cursor-pointer rounded-sm disabled:opacity-40"
                      >
                        {actionId === item.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Check className="w-3.5 h-3.5" />
                        )}
                        <span>Approve</span>
                      </button>
                    )}

                    {/* Delete / Reject button */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={actionId !== null}
                      className="px-3.5 py-2.5 bg-white hover:bg-red-50 text-gray-500 hover:text-red-600 border border-gray-200 hover:border-red-200 font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1.5 cursor-pointer rounded-sm disabled:opacity-40"
                    >
                      {actionId === item.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      <span>{item.approved ? 'Delete' : 'Reject'}</span>
                    </button>
                  </div>
                </div>

                {/* Decorative border matching portfolio designs */}
                <div className="absolute bottom-0 left-0 w-16 h-0.5 bg-gray-900"></div>
                <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-gray-100 -mt-px -mr-px transition-colors group-hover:border-gray-200"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Edit Testimonial Modal */}
      <AnimatePresence>
        {editingTestimonial && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => actionId === null && setEditingTestimonial(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.45, ease: "easeOut" }}
              className="relative w-full max-w-lg bg-white border border-gray-200 shadow-2xl p-8 sm:p-10 z-10 overflow-hidden flex flex-col justify-between font-space-grotesk"
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
                    <span className="text-gray-500 text-[10px] tracking-[0.3em] font-bold uppercase">
                      EDIT TESTIMONIAL
                    </span>
                  </div>
                  {actionId === null && (
                    <button 
                      onClick={() => setEditingTestimonial(null)}
                      className="text-gray-400 hover:text-gray-900 transition-colors p-1"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>

                <h2 className="text-gray-900 font-light text-3xl sm:text-4xl tracking-tight mb-4 font-montserrat uppercase">
                  Modify Review
                </h2>
                <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 font-inter">
                  Edit the content, name, or role of the testimonial. Changes will apply immediately across all dynamic marquee tracks once saved.
                </p>

                <form onSubmit={handleSaveEdit} className="space-y-4 font-inter">
                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2 font-space-grotesk">
                      Author Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Corey Franci"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-sm text-sm text-gray-900 font-light focus:outline-none focus:border-gray-900 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 text-[10px] font-bold uppercase tracking-wider mb-2 font-space-grotesk">
                      Author Role / Designation
                    </label>
                    <input
                      type="text"
                      placeholder="Tech Lead, Company"
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
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
                      placeholder="Review Quote content..."
                      value={editQuote}
                      onChange={(e) => setEditQuote(e.target.value)}
                      className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-sm text-sm text-gray-900 font-light focus:outline-none focus:border-gray-900 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={actionId !== null}
                    className="w-full py-4 px-6 bg-black text-white hover:bg-gray-900 font-space-grotesk font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {actionId === editingTestimonial.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>SAVE CHANGES</span>
                      </>
                    )}
                  </button>
                </form>
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
