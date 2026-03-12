'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const [showNotification, setShowNotification] = useState(true);
  
  // Mock logged-in state: we are logged in if we are not on the public landing/auth pages
  const isPublicPage = pathname === '/' || pathname === '/login' || pathname === '/register';
  const isLoggedIn = !isPublicPage;

  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent pointer-events-none flex flex-col items-center">
      {/* Top Banner Notification */}
      {showNotification && (
        <div className="w-full bg-accent/90 backdrop-blur-md border-b border-accent-hover text-white py-2 px-4 flex justify-between items-center pointer-events-auto shadow-md transition-all duration-300 z-50">
           <div className="flex-1 flex justify-center items-center gap-3">
             <span className="flex h-2 w-2 rounded-full bg-white animate-pulse"></span>
             <span className="text-sm font-medium">LIVE: General Election 2026 early voting is now open. View Live Results below!</span>
           </div>
           <button onClick={() => setShowNotification(false)} className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/20">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
           </button>
        </div>
      )}

      <div className={`w-full transition-all duration-300 ${isLoggedIn ? 'px-3 mt-3' : 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-4 sm:mt-6'}`}>
        <div className="flex items-center justify-between h-14 w-full relative">
          
          {isLoggedIn ? (
            <>
              {/* Logged-In State: Left Aligned Branding (Reduced Size) */}
              <div className="flex-shrink-0 pointer-events-auto transition-all duration-500 ease-in-out">
                <Link href="/" className="flex items-center gap-2 group px-2 py-1.5 rounded-full bg-gray-900/40 hover:bg-gray-900/60 backdrop-blur-lg transition-colors border border-white/5 shadow-lg">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm group-hover:scale-105 transition-transform">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-sm font-bold font-sans tracking-tight text-white/90 group-hover:text-white pr-3 transition-colors">
                    Voting System
                  </span>
                </Link>
              </div>

              {/* Logged-In State: Right Aligned Actions */}
              <div className="flex items-center gap-3 pointer-events-auto">
                <Link href="/security" className="hidden sm:flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors mr-2 group">
                  <svg className="w-4 h-4 mr-1.5 opacity-70 group-hover:opacity-100 group-hover:text-accent transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Security Audit
                </Link>

                <Link href="/profile" className="group flex items-center justify-start h-12 w-12 hover:w-32 rounded-full bg-gray-900/50 hover:bg-gray-900/70 backdrop-blur-lg border border-white/10 shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="w-12 h-12 flex items-center justify-center shrink-0">
                    <svg className="h-5 w-5 text-white/90 group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-4">
                    Profile
                  </span>
                </Link>

                <Link href="/" className="group flex items-center justify-start h-12 w-12 hover:w-32 rounded-full bg-gray-900/50 hover:bg-gray-900/70 backdrop-blur-lg border border-white/10 shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="w-12 h-12 flex items-center justify-center shrink-0">
                    <svg className="h-5 w-5 text-white/90 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pr-4">
                    Logout
                  </span>
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* Logged-Out State: Left Aligned Branding */}
              <div className="flex-shrink-0 pointer-events-auto transition-all duration-500 ease-in-out">
                <Link href="/" className="flex items-center gap-3 group px-2 py-2 rounded-full bg-gray-900/50 hover:bg-gray-900/70 backdrop-blur-lg transition-colors border border-white/10 shadow-xl">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm group-hover:scale-105 transition-transform">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="text-lg font-bold font-sans tracking-tight text-white pr-5">
                    Voting System
                  </span>
                </Link>
              </div>

              {/* Logged-Out State: Right Aligned Controls */}
              <div className="flex items-center gap-4 pointer-events-auto">
                <Link href="/security" className="hidden sm:flex items-center text-sm font-medium text-gray-300 hover:text-white transition-colors mr-2 group">
                  <svg className="w-4 h-4 mr-1.5 opacity-70 group-hover:opacity-100 group-hover:text-accent transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Security Audit
                </Link>
                <Link href="/login" className="px-6 py-3 text-sm font-semibold text-white rounded-full bg-gray-900/50 hover:bg-gray-900/70 backdrop-blur-lg border border-white/10 shadow-xl transition-all duration-300">
                  Login
                </Link>
                <Link href="/register" className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-accent/20 hover:shadow-2xl hover:shadow-accent/40 hover:-translate-y-0.5 hover:bg-accent-hover transition-all duration-300">
                  Register
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
