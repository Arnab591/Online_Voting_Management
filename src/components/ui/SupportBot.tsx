'use client';

import { useState } from 'react';

export function SupportBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div 
        className={`bg-gray-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform origin-bottom-right mb-4 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
        }`}
        style={{ width: '320px', height: '400px' }}
      >
        <div className="bg-gradient-to-r from-primary-hover to-primary p-4 border-b border-white/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <h3 className="text-white font-semibold flex items-center gap-2">
              Election Support
            </h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 h-[280px] overflow-y-auto bg-gray-900/50 flex flex-col gap-3">
          <div className="bg-gray-800 text-gray-200 text-sm p-3 rounded-2xl rounded-tl-sm self-start max-w-[85%]">
            Hello! I'm your digital election assistant. How can I help you today?
          </div>
          <div className="bg-accent text-white text-sm p-3 rounded-2xl rounded-tr-sm self-end max-w-[85%]">
            How do I verify my identity?
          </div>
          <div className="bg-gray-800 text-gray-200 text-sm p-3 rounded-2xl rounded-tl-sm self-start max-w-[85%]">
            You can verify your identity by navigating to your profile after logging in. You'll need your state-issued E-ID.
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-3 bg-gray-900 border-t border-white/10">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Type your question..." 
              className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm text-white focus:outline-none focus:border-accent pr-10"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-accent hover:text-accent-hover p-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-accent hover:bg-accent-hover text-white rounded-full shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center transition-transform hover:scale-105"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
