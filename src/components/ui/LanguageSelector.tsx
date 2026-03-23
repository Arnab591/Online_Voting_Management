'use client';

import { useState, useRef, useEffect } from 'react';
import { LANGUAGES } from '@/lib/translations';
import { useTranslation } from '@/context/LanguageContext';

export function LanguageSelector() {
  const { lang, setLang } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find(l => l.code === lang) ?? LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative z-50">
      {/* Trigger */}
      <button
        onClick={() => setOpen(p => !p)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-900/50 hover:bg-gray-900/70 backdrop-blur-lg border border-white/10 shadow-lg transition-all duration-300 group hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:border-emerald-500/30"
      >
        <span className="text-base leading-none select-none">{current.flag}</span>
        <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors hidden sm:block">
          {current.label}
        </span>
        <svg
          className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-[#0d0d1a]/90 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Glow */}
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative p-1.5 space-y-0.5">
            {LANGUAGES.map(l => {
              const active = l.code === lang;
              return (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    active
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <span className="text-lg leading-none">{l.flag}</span>
                  <span className="flex-1 text-left">{l.label}</span>
                  {active && (
                    <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
