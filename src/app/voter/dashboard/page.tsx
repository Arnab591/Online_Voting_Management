'use client';

import { useState } from 'react';
import { CandidateCard } from '@/components/ui/CandidateCard';
import { useTranslation } from '@/context/LanguageContext';
import { QRCodeSVG } from 'qrcode.react';
import { FileText, Link as LinkIcon, Download } from 'lucide-react';

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
  const { tr } = useTranslation();
  const [hasVoted, setHasVoted] = useState(false);
  const [votedFor, setVotedFor] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [receiptData, setReceiptData] = useState<{ id: string; time: string; election: string; candidate: string } | null>(null);
  
  // Custom Confirmation Modal State
  const [confirmCandidate, setConfirmCandidate] = useState<{id: string, name: string} | null>(null);

  const requestVote = (candidateId: string, candidateName: string) => {
    setConfirmCandidate({ id: candidateId, name: candidateName });
  };

  const executeVote = () => {
    if (confirmCandidate) {
      setHasVoted(true);
      setVotedFor(confirmCandidate.name);
      
      const receiptId = `VOTE-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      setReceiptData({
        id: receiptId,
        time: new Date().toLocaleString(),
        election: tr.voter.electionName,
        candidate: confirmCandidate.name
      });
      
      setConfirmCandidate(null);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
      
      // In a real application, trigger backend email service here
      console.log(`Sending email receipt to voter. Receipt ID: ${receiptId}`);
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
            <h3 className="text-2xl font-bold text-white mb-4">{tr.voter.confirmModalTitle}</h3>
            <p className="text-gray-300 mb-8">
              {tr.voter.confirmModalDesc.replace('{name}', confirmCandidate.name)}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={cancelVote}
                className="flex-1 py-3 px-4 rounded-full border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
              >
                {tr.voter.cancel}
              </button>
              <button 
                onClick={executeVote}
                className="flex-1 py-3 px-4 rounded-full bg-accent hover:bg-accent-hover text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all"
              >
                {tr.voter.confirmBtn}
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
              {tr.voter.welcome}
            </h1>
            <p className="mt-2 text-lg text-gray-400">
              {tr.voter.electionName}
            </p>
          </div>
          <div className="bg-white/5 px-6 py-3 rounded-2xl border border-white/10 flex items-center gap-3">
             <div className="w-3 h-3 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
             <span className="text-gray-200 font-medium">{tr.voter.statusEligible}</span>
          </div>
        </div>

        {/* Voting Status Message */}
        {hasVoted && receiptData && (
          <div className="bg-gray-900/80 backdrop-blur-2xl border border-accent/30 p-10 rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col md:flex-row items-center gap-12 transform transition-all duration-700 scale-100 opacity-100">
            
            <div className="flex-1 text-center md:text-left">
              <div className="bg-accent/20 p-4 rounded-full text-accent mb-6 inline-flex animate-pulse shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                {tr.voter.voteSuccess}
              </h3>
              <p className="text-xl text-gray-300 max-w-2xl leading-relaxed mb-6">
                {tr.voter.voteSuccessDesc.replace('{name}', votedFor || '')}
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left max-w-sm w-full mx-auto md:mx-0">
                <h4 className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" /> Digital Receipt
                </h4>
                <div className="space-y-3 text-sm text-gray-300">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Receipt ID</span>
                    <span className="font-mono text-white">{receiptData.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Date/Time</span>
                    <span className="text-right">{receiptData.time}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-500">Election</span>
                    <span className="text-right truncate ml-4 font-medium text-white">{receiptData.election}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-gray-500">Candidate</span>
                    <span className="font-medium text-white">{receiptData.candidate}</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs text-gray-400 bg-gray-800/80 p-3 rounded-xl border border-white/5">
                  <span className="flex-1 pr-4">An email copy of this receipt has been automatically sent to your registered address.</span>
                  <div title="Download PDF">
                    <Download className="w-5 h-5 text-gray-500 hover:text-white cursor-pointer transition-colors" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center p-8 bg-black/40 border border-white/10 rounded-3xl shadow-inner w-full md:w-auto">
              <div className="p-4 bg-white rounded-2xl shadow-xl">
                <QRCodeSVG
                  value={`${typeof window !== 'undefined' ? window.location.origin : ''}/feedback?receiptId=${receiptData.id}`}
                  size={160}
                  level="H"
                  includeMargin={false}
                  bgColor="#ffffff"
                  fgColor="#0f172a"
                />
              </div>
              <p className="mt-6 text-gray-400 text-sm font-medium flex items-center gap-2 text-center max-w-[200px]">
                <LinkIcon className="w-4 h-4 text-accent flex-shrink-0" /> 
                Scan to verify receipt & provide feedback
              </p>
            </div>

          </div>
        )}

        {/* Candidates List */}
        {!hasVoted && (
          <div className="space-y-8 animate-[fadeIn_0.5s_ease-in]">
            <div className="text-center">
               <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                 {tr.voter.officialBallot}
               </h2>
               <p className="text-gray-400">{tr.voter.reviewCandidates}</p>
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
