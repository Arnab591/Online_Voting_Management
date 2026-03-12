'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

// Dummy data for aggregated results
const aggregatedResults = [
  { candidateId: '1', name: 'Candidate A', votes: 450, percentage: 53 },
  { candidateId: '2', name: 'Candidate B', votes: 300, percentage: 35 },
  { candidateId: '3', name: 'Candidate C', votes: 100, percentage: 12 },
];

export default function AdminDashboard() {
  const [electionStatus, setElectionStatus] = useState<'Upcoming' | 'Open' | 'Closed'>('Closed');
  
  const handleViewLogs = () => {
    alert("System Logs:\n- Admin logged in\n- Election status updated to Closed\n- Data anonymization active")
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Header & Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-primary-hover rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-gray-600 dark:text-gray-400">Election Status:</span>
              <span className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold
                ${electionStatus === 'Open' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                  electionStatus === 'Closed' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                }`}>
                {electionStatus}
              </span>
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Admin access level. Voting functionality strictly disabled here.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row gap-3">
            {electionStatus !== 'Open' ? (
              <Button variant="success" onClick={() => setElectionStatus('Open')}>
                Start Election
              </Button>
            ) : (
              <Button variant="danger" onClick={() => setElectionStatus('Closed')}>
                End Election
              </Button>
            )}
            <Button variant="outline" onClick={handleViewLogs}>View Logs</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-primary-hover rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-6 group hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
            <div className="bg-blue-50 dark:bg-primary/50 text-primary dark:text-blue-400 p-4 rounded-xl group-hover:scale-105 transition-transform">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Eligible Voters</p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">1,200</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-primary-hover rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-6 group hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
            <div className="bg-green-50 dark:bg-primary/50 text-accent dark:text-green-400 p-4 rounded-xl group-hover:scale-105 transition-transform">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Votes Cast</p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">850</p>
            </div>
          </div>
        </div>

        {/* Aggregated Results Section */}
        <div className="bg-white dark:bg-primary-hover rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Anonymized Live Results</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Real-time aggregate totals. Individual votes are secured and hidden.</p>
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-pulse"></span>
              Live Tracking Mode
            </div>
          </div>

          <div className="space-y-6">
            {aggregatedResults.map((result, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <span className="font-semibold text-gray-900 dark:text-white text-lg">{result.name}</span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    <span className="text-lg font-bold text-gray-900 dark:text-white mr-1">{result.votes}</span> 
                    votes ({result.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${result.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}
