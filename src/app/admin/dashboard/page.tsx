'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AdminDashboard() {
  const [electionStatus, setElectionStatus] = useState<'Upcoming' | 'Open' | 'Closed'>('Open');

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Header & Status */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-primary-hover rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Admin Panel
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
            <Link href="/results" className="w-full sm:w-auto">
              <Button variant="outline" fullWidth>View Results</Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-primary-hover rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-6">
            <div className="bg-blue-50 dark:bg-primary/50 text-primary dark:text-blue-400 p-4 rounded-xl">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Voters</p>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">1,200</p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-primary-hover rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-6">
            <div className="bg-green-50 dark:bg-primary/50 text-accent dark:text-green-400 p-4 rounded-xl">
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

        {/* Management Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Candidates */}
          <div className="bg-white dark:bg-primary-hover rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Candidates</h2>
              <Link href="/admin/candidates/add">
                <Button variant="outline" size="sm">Add New</Button>
              </Link>
            </div>
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {['Rahul Sharma', 'Amit Das', 'Priya Singh'].map((name, i) => (
                <li key={i} className="py-4 flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">{name}</span>
                  <button className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors">Remove</button>
                </li>
              ))}
            </ul>
          </div>

          {/* Voters */}
          <div className="bg-white dark:bg-primary-hover rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Voters</h2>
              <Button variant="outline" size="sm">Import</Button>
            </div>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl">
              <p>Voter list imported successfully.</p>
              <p className="text-sm mt-1">1,200 eligible voters registered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
