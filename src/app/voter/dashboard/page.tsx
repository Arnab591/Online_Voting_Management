'use client';

import { useState } from 'react';
import { CandidateCard } from '@/components/ui/CandidateCard';

// Dummy candidates for UI development
const candidates = [
  {
    id: "1",
    name: "Rahul Sharma",
    party: "Tech Party",
    photo: "https://i.pravatar.cc/150?u=rahul",
    manifesto: "I promise to bring high-speed Wi-Fi to all campus areas and establish a 24/7 coding lab for tech enthusiasts.",
  },
  {
    id: "2",
    name: "Amit Das",
    party: "Innovation Front",
    photo: "https://i.pravatar.cc/150?u=amit",
    manifesto: "My focus will be on organizing more startup incubation programs and providing seed funding for local projects.",
  },
  {
    id: "3",
    name: "Priya Singh",
    party: "Community Unity",
    photo: "https://i.pravatar.cc/150?u=priya",
    manifesto: "I will work towards better infrastructure, more public events, and a stronger community grievance cell.",
  }
];

export default function VoterDashboard() {
  const [hasVoted, setHasVoted] = useState(false);
  const [votedFor, setVotedFor] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Custom Confirmation Modal State
  const [confirmCandidate, setConfirmCandidate] = useState<{id: string, name: string} | null>(null);

  const requestVote = (candidateId: string, candidateName: string) => {
    setConfirmCandidate({ id: candidateId, name: candidateName });
  };

  const executeVote = () => {
    if (confirmCandidate) {
      setHasVoted(true);
      setVotedFor(confirmCandidate.name);
      setConfirmCandidate(null);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const cancelVote = () => {
    setConfirmCandidate(null);
  };

  return (
    <div className="min-h-screen bg-primary font-sans py-24 px-4 sm:px-6 lg:px-8 relative">
      {/* Confetti Overlay */}
      {showConfetti && (
         <div className="fixed inset-0 pointer-events-none z-[60] flex items-center justify-center">
            <div className="absolute inset-0 bg-accent/20 animate-pulse mix-blend-overlay"></div>
         </div>
      )}

      {/* Custom Confirmation Modal */}
      {confirmCandidate && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm">
          <div className="bg-gray-800 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl animate-[scaleIn_0.3s_ease-out]">
            <h3 className="text-2xl font-bold text-white mb-4">Confirm Your Vote</h3>
            <p className="text-gray-300 mb-8">
              Are you sure you want to cast your official vote for <strong className="text-accent">{confirmCandidate.name}</strong>? This action is permanent and cannot be undone.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={cancelVote}
                className="flex-1 py-3 px-4 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={executeVote}
                className="flex-1 py-3 px-4 rounded-full bg-accent hover:bg-accent-hover text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all"
              >
                Confirm Vote
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl space-y-12">
        {/* Header Section */}
        <div className="bg-gray-900/50 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Welcome, Voter
            </h1>
            <p className="mt-2 text-lg text-gray-400">
              Election: <span className="font-semibold text-white">Annual General Election 2026</span>
            </p>
          </div>
          <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
             <span className="text-gray-200 font-medium">Status: Eligible to Vote</span>
          </div>
        </div>

        {/* Voting Status Message */}
        {hasVoted && (
          <div className="bg-gray-900/80 backdrop-blur-2xl border border-accent/30 p-10 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col items-center justify-center text-center transform transition-all duration-700 scale-100 opacity-100">
            <div className="bg-accent/20 p-4 rounded-full text-accent mb-6 animate-pulse shadow-[0_0_30px_rgba(16,185,129,0.5)]">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Vote Successfully Cast!
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              Your official, cryptographically secure vote for <span className="font-bold text-accent">{votedFor}</span> has been permanently recorded on the ledger. Thank you for participating.
            </p>
            <div className="mt-8 px-6 py-2 bg-gray-900 rounded-full border border-white/10 text-sm font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              TX Hash: 0x{Math.random().toString(16).slice(2,10)}...{Math.random().toString(16).slice(2,6)}
            </div>
          </div>
        )}

        {/* Candidates List */}
        {!hasVoted && (
          <div className="space-y-8 animate-[fadeIn_0.5s_ease-in]">
            <div className="text-center">
               <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                 Official Ballot
               </h2>
               <p className="text-gray-400">Please review the candidates below carefully before making your selection.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch pt-4">
              {candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  id={candidate.id}
                  name={candidate.name}
                  party={candidate.party}
                  photo={candidate.photo}
                  manifesto={candidate.manifesto}
                  onVote={() => requestVote(candidate.id, candidate.name)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
