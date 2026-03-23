'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

function FeedbackForm() {
  const searchParams = useSearchParams();
  const receiptId = searchParams.get('receiptId') || '';
  
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, send this to backend
    console.log('Feedback submitted:', { receiptId, rating, comments });
  };

  if (submitted) {
    return (
      <div className="text-center py-8 animate-in fade-in zoom-in duration-500">
        <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] rounded-full" />
        <h2 className="text-3xl font-extrabold text-white mb-3">Thank You!</h2>
        <p className="text-gray-400 max-w-sm mx-auto">Your feedback helps us ensure a secure, smooth, and transparent voting experience.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">Voting Feedback</h2>
        <p className="text-accent/80 font-mono text-xs uppercase tracking-widest bg-accent/10 py-1.5 px-3 rounded-full inline-block border border-accent/20">
          Receipt: {receiptId || 'Not provided'}
        </p>
      </div>
      
      <div className="space-y-4">
        <label className="text-gray-300 text-sm font-semibold tracking-wide block text-center">
          How would you rate your voting experience?
        </label>
        <div className="flex justify-center gap-3 bg-black/40 p-5 rounded-2xl border border-white/5 shadow-inner">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setRating(num)}
              className={`w-12 h-12 rounded-xl font-bold transition-all flex items-center justify-center text-lg ${rating >= num ? 'bg-accent text-white scale-105 shadow-[0_0_15px_rgba(16,185,129,0.4)] border border-accent/50' : 'bg-white/5 text-gray-500 border border-white/10 hover:bg-white/10'}`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-gray-300 text-sm font-semibold tracking-wide block">
          Any additional comments?
        </label>
        <textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all resize-none shadow-inner"
          placeholder="Tell us about the UI, speed, clarity, etc..."
          rows={4}
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-gradient-to-r from-accent to-emerald-400 hover:from-accent-hover hover:to-emerald-500 text-white font-bold rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-all transform hover:-translate-y-1"
      >
        Submit Anonymous Feedback
      </button>
    </form>
  );
}

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 bg-gray-900/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 max-w-lg w-full shadow-2xl">
        <Suspense fallback={<div className="text-gray-400 text-center animate-pulse">Loading feedback form...</div>}>
          <FeedbackForm />
        </Suspense>
      </div>
    </div>
  );
}
