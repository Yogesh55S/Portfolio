"use client";

import { useEffect, useState } from 'react';
import { useUser, useClerk, RedirectToSignIn } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { Shield, Home, LogOut, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function AdminLayout({ children }) {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  // Wait for Clerk to fully load
  if (!isLoaded) {
    return (
      <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        <span className="text-[10px] tracking-[0.3em] font-bold text-gray-500 uppercase font-mono">
          Verifying Authorization...
        </span>
      </div>
    );
  }

  // Not signed in — redirect to Clerk sign-in, return to /admin after
  if (!isSignedIn) {
    return <RedirectToSignIn signInForceRedirectUrl="/admin" signUpForceRedirectUrl="/admin" />;
  }

  // Get all emails from this Clerk account
  const allEmails = (user?.emailAddresses || []).map(e => e.emailAddress?.toLowerCase?.() || '');
  const primaryEmail = user?.primaryEmailAddress?.emailAddress?.toLowerCase?.() || '';
  const isAdmin = allEmails.includes(ADMIN_EMAIL) || primaryEmail === ADMIN_EMAIL;

  // Not admin — show who is logged in so we can debug
  if (!isAdmin) {
    return (
      <div className="w-full min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-red-950 border border-red-800 flex items-center justify-center mb-6 text-red-500">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-white text-2xl font-bold mb-3">Access Denied</h1>
        <p className="text-gray-400 text-sm max-w-sm mb-2">
          You are signed in as:
        </p>
        <p className="text-yellow-400 text-sm font-mono mb-4 border border-yellow-800 bg-yellow-950/30 px-4 py-2 rounded">
          {primaryEmail || allEmails[0] || 'No email found'}
        </p>
        <p className="text-gray-500 text-xs max-w-xs mb-6">
          Admin access requires: <span className="text-white">{ADMIN_EMAIL}</span>
        </p>
        <div className="flex gap-3">
          <button
            onClick={async () => { await signOut(); router.push('/'); }}
            className="px-4 py-2 bg-red-900 text-red-200 text-xs font-bold rounded hover:bg-red-800 transition-colors"
          >
            Sign Out & Try Again
          </button>
          <Link href="/" className="px-4 py-2 bg-white text-black text-xs font-bold rounded hover:bg-gray-100 transition-colors">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Admin verified — render the admin shell
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row font-inter">
      {/* Sidebar */}
      <aside className="w-full lg:w-72 bg-gray-950 text-white shrink-0 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-gray-900 z-30 p-8">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-sm bg-white text-black flex items-center justify-center shadow-md">
              <Shield className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-sm font-bold tracking-widest uppercase">Admin Panel</h2>
              <span className="text-[9px] font-bold text-gray-500 tracking-wider">YOGESH KUMAR PORTFOLIO</span>
            </div>
          </div>

          <div className="h-[1px] bg-gray-900 w-full" />

          {/* Nav Links */}
          <nav className="flex flex-col gap-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-3 text-xs font-semibold text-white bg-gray-900 border border-gray-800 rounded-sm"
            >
              <Shield className="w-4 h-4 text-white" />
              <span>TESTIMONIALS QUEUE</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-xs font-semibold text-gray-400 hover:text-white hover:bg-gray-900 border border-transparent hover:border-gray-900 rounded-sm transition-all"
            >
              <Home className="w-4 h-4" />
              <span>BACK TO WEBSITE</span>
            </Link>
          </nav>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 mt-8 lg:mt-0">
          <div className="h-[1px] bg-gray-900 w-full" />
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs shadow-md">
              YK
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">Yogesh Kumar</p>
              <p className="text-[10px] text-gray-500 truncate font-light">Administrator</p>
            </div>
          </div>
          <button
            onClick={async () => { await signOut(); router.push('/'); }}
            className="w-full flex items-center justify-center gap-2 py-3 border border-red-950 text-red-500 hover:bg-red-950/20 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer rounded-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
