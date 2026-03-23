'use client';

import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Lock, Unlock, AlertTriangle, TrendingUp, Users, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

const COLORS = ['#8b5cf6', '#3b82f6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

export default function ResultsDashboard() {
  const { tr } = useTranslation();
  const [isLocked, setIsLocked] = useState(true);
  const [electionState, setElectionState] = useState('Upcoming');
  const [stats, setStats] = useState({ totalVoters: 0, votesCast: 0, remaining: 0 });
  const [candidateData, setCandidateData] = useState<any[]>([]);

  useEffect(() => {
    const eState = localStorage.getItem('electionState') || 'Upcoming';
    setElectionState(eState);
    if (eState === 'Ended') setIsLocked(false);

    // Calculate Results
    const voters = JSON.parse(localStorage.getItem('eligibleVoters') || '[]');
    const votes = JSON.parse(localStorage.getItem('castVotes') || '[]');
    const election = JSON.parse(localStorage.getItem('electionData') || '{}');
    const candidates = election.candidates || [];

    const totalVoters = voters.length;
    const votesCast = votes.length;
    
    setStats({
      totalVoters,
      votesCast,
      remaining: Math.max(0, totalVoters - votesCast)
    });

    const resultsMap: Record<string, number> = {};
    candidates.forEach((c: any) => resultsMap[c.id] = 0);
    votes.forEach((v: any) => {
      if (resultsMap[v.candidateId] !== undefined) {
        resultsMap[v.candidateId]++;
      }
    });

    const formatData = candidates.map((c: any) => ({
      name: c.name,
      party: c.party,
      votes: resultsMap[c.id] || 0
    })).sort((a: any, b: any) => b.votes - a.votes);

    setCandidateData(formatData);
  }, []);

  const handleOverride = () => {
    if (confirm('WARNING: Viewing results before election ends compromises ballot secrecy. Proceed?')) {
      setIsLocked(false);
      
      const logs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
      logs.unshift({ id: Date.now(), action: 'Admin forced results view before election end', time: new Date().toISOString() });
      localStorage.setItem('adminLogs', JSON.stringify(logs));
    }
  };

  const hasData = candidateData.some(d => d.votes > 0);

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            {tr.dashboard.results}
            {isLocked && <Lock className="w-5 h-5 text-red-500" />}
          </h1>
          <p className="text-gray-400">Comprehensive breakdown of election results and demographics</p>
        </div>
        
        {isLocked && electionState !== 'Ended' && (
          <button onClick={handleOverride} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Unlock className="w-4 h-4" /> Override Lock
          </button>
        )}
      </div>

      {isLocked ? (
        <div className="bg-black/40 border border-red-500/30 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-6 backdrop-blur-xl relative overflow-hidden h-[600px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center animate-pulse shadow-[0_0_50px_rgba(239,68,68,0.2)]">
            <Lock className="w-12 h-12 text-red-500" />
          </div>
          
          <h2 className="text-3xl font-bold text-red-400">Results Secured</h2>
          <p className="text-white max-w-lg text-lg">
            Live results are locked while the election is active to preserve voter anonymity and prevent bias.
          </p>
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-300 text-sm max-w-lg mt-8 flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" />
            <p className="text-left font-mono">SEC_POLICY_ENFORCED_0x4A: Pre-mature disclosure of electoral metrics is mechanically inhibited. Await definitive conclusion of the voting window.</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in slide-in-from-bottom-8 duration-700">
          
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 font-medium">Eligible Electorate</span>
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <p className="text-4xl font-bold font-mono text-white">{stats.totalVoters}</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 font-medium">Verified Ballots Cast</span>
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-4xl font-bold font-mono text-white">{stats.votesCast}</p>
              <div className="mt-2 text-sm text-gray-500 border-t border-white/5 pt-2">
                <span className="text-purple-400 font-semibold">{stats.totalVoters ? ((stats.votesCast / stats.totalVoters) * 100).toFixed(1) : 0}%</span> turnout rate
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl group-hover:bg-pink-500/20 transition-all" />
              <div className="flex justify-between items-start mb-4">
                <span className="text-gray-400 font-medium">Outstanding Votes</span>
                <TrendingUp className="w-6 h-6 text-pink-400 rotate-180" />
              </div>
              <p className="text-4xl font-bold font-mono text-white">{stats.remaining}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bar Chart */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl flex flex-col min-h-[400px]">
              <h2 className="text-lg font-semibold text-white mb-6">Vote Distribution</h2>
              
              {!hasData ? (
                <div className="flex-1 flex items-center justify-center text-gray-500 bg-black/20 rounded-2xl border border-white/5 border-dashed">
                  No voting data available yet
                </div>
              ) : (
                <div className="flex-1 w-full relative z-10 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={candidateData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <XAxis dataKey="name" stroke="#6b7280" tick={{fill: '#9ca3af', fontSize: 12}} />
                      <YAxis stroke="#6b7280" tick={{fill: '#9ca3af', fontSize: 12}} allowDecimals={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0a0a0f', borderColor: '#1e1e2d', borderRadius: '12px', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      />
                      <Bar dataKey="votes" radius={[6, 6, 0, 0]} animationDuration={1500}>
                        {candidateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>

            {/* Pie Chart */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl flex flex-col min-h-[400px]">
              <h2 className="text-lg font-semibold text-white mb-6">Percentage Breakdown</h2>
              
              {!hasData ? (
                <div className="flex-1 flex items-center justify-center text-gray-500 bg-black/20 rounded-2xl border border-white/5 border-dashed">
                  No voting data available yet
                </div>
              ) : (
                <div className="flex-1 w-full relative z-10 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={candidateData.filter(d => d.votes > 0)}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="votes"
                        animationDuration={1500}
                        stroke="rgba(0,0,0,0)"
                      >
                        {candidateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity outline-none" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0a0a0f', borderColor: '#1e1e2d', borderRadius: '12px', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                      />
                      <Legend 
                        layout="vertical" 
                        verticalAlign="middle" 
                        align="right"
                        wrapperStyle={{ color: '#9ca3af', fontSize: '14px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
