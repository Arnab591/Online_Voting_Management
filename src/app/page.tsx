'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// --- Reusable Animated Components ---

function ScrollReveal({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
}

function StarryHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-block group cursor-default py-4 px-8">
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center relative z-10 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:text-accent drop-shadow-md">
        {children}
      </h2>
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
         <svg className="absolute -top-2 -left-2 w-5 h-5 text-yellow-300 animate-ping" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
         <svg className="absolute -bottom-4 right-10 w-6 h-6 text-accent animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
         <svg className="absolute top-1/3 -right-6 w-4 h-4 text-white animate-bounce" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
         <svg className="absolute bottom-2 left-1/4 w-3 h-3 text-blue-400 animate-ping" style={{ animationDuration: '2s' }} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
    </div>
  );
}

function FlipCard({ icon, title, description, colorClass }: { icon: React.ReactNode, title: string, description: string, colorClass: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (isHovered) {
      let current = "";
      let i = 0;
      const interval = setInterval(() => {
        if (i < description.length) {
          current += description.charAt(i);
          setTypedText(current);
          i++;
        } else {
          clearInterval(interval);
        }
      }, 25);
      return () => clearInterval(interval);
    } else {
      setTypedText("");
    }
  }, [isHovered, description]);

  return (
    <div 
      className="relative w-full h-[300px] [perspective:1000px] group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-full h-full transition-all duration-700 ease-in-out [transform-style:preserve-3d] ${isHovered ? '[transform:rotateY(180deg)] scale-105' : 'scale-100'}`}>
        
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-gray-900/40 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white/5 flex flex-col items-center justify-center text-center">
          <div className={`${colorClass} w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-Inner transform transition-transform duration-500 group-hover:-translate-y-2`}>
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-white tracking-wide">{title}</h3>
          <div className="mt-4 text-gray-400 text-sm opacity-60 flex items-center gap-2">
            <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
            Hover to reveal
          </div>
        </div>
        
        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-accent/20 flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent opacity-5 rounded-full blur-3xl -mr-10 -mt-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500 opacity-5 rounded-full blur-3xl -ml-10 -mb-10"></div>
          
          <h3 className="text-xl font-bold text-accent mb-4 border-b border-white/10 pb-3 w-full relative z-10">{title}</h3>
          <div className="text-gray-300 text-base leading-relaxed h-full flex items-center justify-center relative z-10">
            <p className="min-h-[80px]">
              {typedText}
              {isHovered && typedText.length < description.length && <span className="animate-pulse border-r-2 border-accent ml-1 h-[1em] inline-block"></span>}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}


export default function Home() {
  const fullText = "Secure Digital Voting System";
  const [typedText, setTypedText] = useState("");
  const [showSub1, setShowSub1] = useState(false);
  const [showSub2, setShowSub2] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    let currentText = "";
    let i = 0;
    
    // Add a small delay robustly before typing starts
    const initialDelay = setTimeout(() => {
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          currentText += fullText.charAt(i);
          setTypedText(currentText);
          i++;
        } else {
          clearInterval(typingInterval);
          // Kick off the sequential fade-ins once typing finishes
          setTimeout(() => setShowSub1(true), 300);
          setTimeout(() => setShowSub2(true), 1200);
          setTimeout(() => setShowButtons(true), 2000);
        }
      }, 70); 
    }, 400);

    return () => clearTimeout(initialDelay);
  }, [fullText]);

  // Handle the logic of splitting the styled "Voting System" accent color during typing
  const renderTypedTitle = () => {
    if (typedText.length === 0) {
      return <span className="animate-pulse border-r-4 border-white/50 h-[1em] inline-block"></span>;
    }
    if (typedText.length <= 15) { // Up to "Secure Digital "
      return (
        <>
          {typedText}
          <span className="animate-pulse border-r-4 border-white ml-1"></span>
        </>
      );
    }
    const base = typedText.slice(0, 15);
    const highlighted = typedText.slice(15);
    const isDone = typedText.length === fullText.length;
    return (
      <>
        {base}
        <span className="text-accent">{highlighted}</span>
        {!isDone && <span className="animate-pulse border-r-4 border-accent ml-1"></span>}
      </>
    );
  };

  return (
    <div className="w-full bg-primary font-sans selection:bg-accent/30 selection:text-white">
      {/* Hero Section */}
      <section className="relative w-full py-24 lg:py-32 xl:py-48 overflow-hidden bg-primary text-white flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 min-h-screen justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-hover to-primary opacity-90" />
          <div className="absolute top-1/4 -left-48 h-96 w-96 rounded-full bg-accent/20 blur-[100px]" />
          <div className="absolute top-1/2 -right-48 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-64 w-[800px] rounded-full bg-indigo-500/10 blur-[100px]" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center">
          {/* Main Typed Title */}
          <div className="min-h-[120px] sm:min-h-[140px] lg:min-h-[160px] flex items-center justify-center w-full">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl w-full drop-shadow-xl">
              {renderTypedTitle()}
            </h1>
          </div>
          
          <div className="space-y-4 mt-8 flex flex-col items-center justify-center min-h-[90px]">
            <div className={`transition-all duration-1000 ease-out transform ${showSub1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 absolute'}`}>
              <p className="mx-auto max-w-2xl text-xl sm:text-2xl font-medium text-gray-300 drop-shadow-md">
                Vote Safety, Transparency, and Security
              </p>
            </div>
            
            <div className={`transition-all duration-1000 ease-out transform ${showSub2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 absolute'} mt-2`}>
              <p className="mx-auto max-w-2xl text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-lg">
                Your Voice Matters.
              </p>
            </div>
          </div>
          
          <div className={`flex flex-col sm:flex-row flex-wrap items-center justify-center gap-5 pt-16 transition-all duration-1000 ease-out transform ${showButtons ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <Link href="/login">
              <button className="px-8 py-3.5 rounded-full bg-accent hover:bg-min-h-accent-hover text-white font-semibold backdrop-blur-lg border border-accent-hover shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] hover:-translate-y-1 transition-all duration-300 min-w-[200px]">
                Voter Login
              </button>
            </Link>
            <Link href="/login?role=admin">
              <button className="px-8 py-3.5 rounded-full bg-gray-900/50 hover:bg-gray-800/80 text-white font-semibold backdrop-blur-lg border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all duration-300 min-w-[200px]">
                Admin Login
              </button>
            </Link>
            <Link href="/register">
              <button className="px-8 py-3.5 rounded-full bg-gray-900/50 hover:bg-gray-800/80 text-white font-semibold backdrop-blur-lg border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:-translate-y-1 transition-all duration-300 min-w-[200px]">
                Register for Voter
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-1000 ${showButtons ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-3 bg-white/70 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Live Election Results Section */}
      <section id="live-results" className="py-20 lg:py-28 bg-gray-900 border-t border-b border-white/5 relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"></div>
        <ScrollReveal>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
              <StarryHeading>Live Early Results</StarryHeading>
              <div className="flex items-center gap-2 mt-4 sm:mt-0 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                <span className="text-sm font-medium text-gray-300 uppercase tracking-widest">Live Updates</span>
              </div>
            </div>

            <div className="bg-primary/80 backdrop-blur-xl rounded-3xl p-6 md:p-10 border border-white/5 shadow-2xl space-y-8">
              {/* Candidate 1 */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-lg font-bold text-white">Alexander Chen</span>
                  <span className="text-sm font-medium text-accent">45% (12,450 votes)</span>
                </div>
                <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full animate-[pulse_3s_ease-in-out_infinite] transition-all duration-1000 w-[45%]"></div>
                </div>
              </div>

              {/* Candidate 2 */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-lg font-bold text-white">Maria Rodriguez</span>
                  <span className="text-sm font-medium text-blue-400">38% (10,512 votes)</span>
                </div>
                <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full animate-[pulse_3.5s_ease-in-out_infinite] transition-all duration-1000 w-[38%]"></div>
                </div>
              </div>

              {/* Candidate 3 */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-lg font-bold text-white">James Wilson</span>
                  <span className="text-sm font-medium text-purple-400">17% (4,703 votes)</span>
                </div>
                <div className="h-4 w-full bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full animate-[pulse_4s_ease-in-out_infinite] transition-all duration-1000 w-[17%]"></div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-primary-hover relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="flex justify-center">
              <StarryHeading>About the Election</StarryHeading>
            </div>
            <div className="bg-gray-900/30 backdrop-blur-sm p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl relative">
              <div className="absolute -top-6 -left-6 text-accent opacity-20 text-9xl">"</div>
              <p className="text-xl md:text-2xl leading-relaxed text-gray-300 text-center relative z-10 font-medium">
                Welcome to the Annual General Election. This digital platform ensures every eligible voter has a secure, anonymous, and verifiable way to cast their vote. We aim to modernize the democratic process and increase participation through accessible technology.
              </p>
              <div className="absolute -bottom-16 -right-6 text-accent opacity-20 text-9xl rotate-180">"</div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Security Features */}
      <section id="security" className="py-24 lg:py-32 bg-primary-hover relative overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="mb-20 text-center flex flex-col items-center">
              <StarryHeading>Enterprise-Grade Security</StarryHeading>
              <p className="mt-6 text-xl text-gray-400 max-w-2xl">
                We employ advanced cryptography and state-of-the-art architectures to guarantee the integrity of your vote.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <ScrollReveal delay={100}>
              <FlipCard 
                title="One Vote Per User"
                description="Strict one-user, one-vote enforcement using strong identity verification and state management. Duplicate attempts are mathematically blocked."
                colorClass="bg-blue-500/20 text-blue-400 border border-blue-500/30"
                icon={
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                }
              />
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <FlipCard 
                title="Tamper-Proof"
                description="Once cast, votes are stored permanently in a secure database structure, preventing any unauthorized edits. Your vote is immutable."
                colorClass="bg-accent/20 text-accent border border-accent/30"
                icon={
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
              />
            </ScrollReveal>

            <ScrollReveal delay={500}>
              <FlipCard 
                title="Secure Auth"
                description="NextAuth verification processes employing military-grade JWT tokens ensures only eligible, verified users gain access to the ballots."
                colorClass="bg-purple-500/20 text-purple-400 border border-purple-500/30"
                icon={
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                }
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Bottom Spacing to flow into global Footer */}
      <div className="h-6 bg-primary-hover"></div>
    </div>
  );
}
