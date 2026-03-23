'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '@/context/LanguageContext';

const mockResults = [
  { id: '1', name: 'Rahul Sharma', votes: 520, color: 'bg-primary dark:bg-blue-500' },
  { id: '2', name: 'Amit Das', votes: 310, color: 'bg-blue-400 dark:bg-blue-400' },
  { id: '3', name: 'Priya Singh', votes: 210, color: 'bg-accent dark:bg-green-400' },
];

export default function ResultDashboard() {
  const { tr } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const totalVotes = mockResults.reduce((acc, curr) => acc + curr.votes, 0);

  // We sort results by votes descending
  const sortedResults = [...mockResults].sort((a, b) => b.votes - a.votes);
  const winner = sortedResults[0];

  useEffect(() => {
    // Trigger animations after mount
    setMounted(true);
  }, []);

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Header Section */}
        <div className="bg-white dark:bg-primary-hover rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-800 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-accent opacity-10 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-blue-400 opacity-10 blur-3xl rounded-full" />
          
          <h1 className="relative z-10 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
            {tr.admin.electionResultsTitle}
          </h1>
          <p className="relative z-10 text-xl text-gray-600 dark:text-gray-300">
            {tr.admin.annualGeneralElection}
          </p>

          <div className="mt-8 relative z-10 inline-flex flex-col items-center bg-green-50 dark:bg-green-900/20 px-8 py-6 rounded-2xl border border-green-100 dark:border-green-800/30 w-full sm:w-auto">
            <span className="text-sm font-semibold uppercase tracking-wider text-green-600 dark:text-green-400 mb-2">
              {tr.admin.officialWinner}
            </span>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {winner.name}
              </span>
              <span className="text-lg text-green-700 dark:text-green-300 mt-1 font-medium bg-green-100 dark:bg-green-800/50 px-3 py-1 rounded-full">
                {winner.votes} {tr.admin.votes}
              </span>
            </div>
            <div className="mt-4 flex -space-x-2">
              <span className="text-2xl">🎉</span>
              <span className="text-2xl">🏆</span>
              <span className="text-2xl">🎉</span>
            </div>
          </div>
        </div>

        {/* Bar Charts Section */}
        <div className="bg-white dark:bg-primary-hover rounded-2xl p-8 sm:p-10 shadow-sm border border-gray-100 dark:border-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-100 dark:border-gray-800 pb-4">
            {tr.admin.voteDistribution}
          </h2>
          
          <div className="space-y-8">
            {sortedResults.map((candidate, index) => {
              const percentage = ((candidate.votes / totalVotes) * 100).toFixed(1);
              const width = mounted ? `${percentage}%` : '0%';
              
              return (
                <div key={candidate.id} className="relative">
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-bold text-sm border border-gray-200 dark:border-gray-700 shadow-sm shadow-black/5">
                        {index + 1}
                      </span>
                      <span className="font-semibold text-gray-900 dark:text-white text-lg">
                        {candidate.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="block text-xl font-bold text-gray-900 dark:text-white">
                        {candidate.votes}
                      </span>
                      <span className="block text-sm text-gray-500 dark:text-gray-400">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Progress bar background */}
                  <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-4 overflow-hidden shadow-inner">
                    {/* Progress bar fill */}
                    <div 
                      className={`h-4 rounded-full ${candidate.color} transition-all duration-1000 ease-out`}
                      style={{ width }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between text-sm text-gray-500 dark:text-gray-400 font-medium">
            <span>{tr.admin.resultsTotalVotes}: {totalVotes}</span>
            <span>100% {tr.admin.percentCounted}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
