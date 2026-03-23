'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, StopCircle, RotateCcw, Activity, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardOverview() {
  const [electionState, setElectionState] = useState<'Upcoming' | 'Active' | 'Ended'>('Upcoming');
  const [stats, setStats] = useState({ voters: 0, candidates: 0 });

  useEffect(() => {
    // Load state from localStorage
    const savedState = localStorage.getItem('electionState') as 'Upcoming' | 'Active' | 'Ended' | null;
    if (savedState) setElectionState(savedState);

    const voters = JSON.parse(localStorage.getItem('eligibleVoters') || '[]');
    const election = JSON.parse(localStorage.getItem('electionData') || '{}');
    const candidates = election.candidates || [];

    setStats({
      voters: voters.length,
      candidates: candidates.length,
    });
  }, []);

  const updateElectionState = (newState: 'Upcoming' | 'Active' | 'Ended') => {
    setElectionState(newState);
    localStorage.setItem('electionState', newState);
    
    // Log activity
    const logs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
    logs.unshift({
      id: Date.now(),
      action: `Election status changed to ${newState}`,
      time: new Date().toISOString()
    });
    localStorage.setItem('adminLogs', JSON.stringify(logs));
  };

  const handleReset = () => {
    if (confirm('Are you absolutely sure? This will delete all cast votes, but keep voters and candidates.')) {
      localStorage.removeItem('castVotes');
      updateElectionState('Upcoming');
      
      const logs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
      logs.unshift({ id: Date.now(), action: 'Election votes reset', time: new Date().toISOString() });
      localStorage.setItem('adminLogs', JSON.stringify(logs));
      
      alert('Votes reset successfully.');
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            System Overview
            <span className={`px-3 py-1 text-xs rounded-full font-semibold uppercase tracking-wider ${
              electionState === 'Active' ? 'bg-green-500/20 text-green-400 border border-green-500/30 shadow-[0_0_10px_rgba(74,222,128,0.2)]' :
              electionState === 'Ended' ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(248,113,113,0.2)]' :
              'bg-blue-500/20 text-blue-400 border border-blue-500/30'
            }`}>
              {electionState}
            </span>
          </h1>
          <p className="text-gray-400">Manage the core functionality of the digital voting system</p>
        </div>
      </div>

      {electionState !== 'Active' && electionState !== 'Ended' && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex items-start gap-4 animate-pulse duration-2000">
          <AlertTriangle className="w-6 h-6 text-yellow-500 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-500">Election Not Active</h3>
            <p className="text-yellow-500/70 text-sm mt-1">Voting is currently disabled. Start the election when ready to accept votes.</p>
          </div>
        </div>
      )}

      {/* Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls */}
        <div className="col-span-1 lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px] -z-10 group-hover:bg-blue-500/10 transition-colors" />
          
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Control Center
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => updateElectionState('Active')}
              disabled={electionState === 'Active'}
              className="px-4 py-4 rounded-xl flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-green-500/10 border border-white/5 hover:border-green-500/30 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed group focus:outline-none focus:ring-2 focus:ring-green-500/50"
            >
              <div className="p-3 bg-green-500/20 rounded-full group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                <ShieldCheck className="w-6 h-6 text-green-400" />
              </div>
              <span className="font-medium text-sm">Start Election</span>
            </button>

            <button
              onClick={() => updateElectionState('Ended')}
              disabled={electionState === 'Ended' || electionState === 'Upcoming'}
              className="px-4 py-4 rounded-xl flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed group focus:outline-none focus:ring-2 focus:ring-red-500/50"
            >
              <div className="p-3 bg-red-500/20 rounded-full group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(248,113,113,0.2)]">
                <StopCircle className="w-6 h-6 text-red-400" />
              </div>
              <span className="font-medium text-sm">End Election</span>
            </button>

            <button
              onClick={handleReset}
              className="px-4 py-4 rounded-xl flex flex-col items-center justify-center gap-3 bg-white/5 hover:bg-orange-500/10 border border-white/5 hover:border-orange-500/30 transition-all text-white group focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              <div className="p-3 bg-orange-500/20 rounded-full group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(251,146,60,0.2)]">
                <RotateCcw className="w-6 h-6 text-orange-400" />
              </div>
              <span className="font-medium text-sm">Reset Votes</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="col-span-1 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-6 text-gray-200">System Ready State</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-white/10">
              <span className="text-gray-400">Registered Voters</span>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">{stats.voters}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Candidates Listed</span>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">{stats.candidates}</span>
            </div>
            
            <Link href="/admin/dashboard/election" className="block w-full text-center mt-6 py-2 px-4 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-blue-400 border border-blue-500/20 hover:border-blue-500/40 transition-all">
              Manage Election Data
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
