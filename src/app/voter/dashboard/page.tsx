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

  const handleVote = (candidateId: string, candidateName: string) => {
    // In a real app, this would make an API call
    if (confirm(`Are you sure you want to vote for ${candidateName}?`)) {
      setHasVoted(true);
      setVotedFor(candidateName);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header Section */}
        <div className="bg-white dark:bg-primary-hover rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome, Arnab
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Election: <span className="font-semibold text-primary dark:text-white">Annual General Election</span>
          </p>
        </div>

        {/* Voting Status Message */}
        {hasVoted && (
          <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-accent p-6 rounded-r-2xl shadow-sm flex items-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-accent/20 dark:bg-accent/30 p-2 rounded-full text-accent">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300">
                Vote Successfully Cast
              </h3>
              <p className="text-green-700 dark:text-green-400">
                Your vote for <span className="font-semibold">{votedFor}</span> has been securely recorded. You cannot vote again.
              </p>
            </div>
          </div>
        )}

        {/* Candidates List */}
        {!hasVoted && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              Candidates
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  id={candidate.id}
                  name={candidate.name}
                  party={candidate.party}
                  photo={candidate.photo}
                  manifesto={candidate.manifesto}
                  onVote={() => handleVote(candidate.id, candidate.name)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
