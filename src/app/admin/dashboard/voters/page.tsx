'use client';

import { useState, useEffect } from 'react';
import { UserPlus, Shield, UserX, AlertCircle, Mail, CheckCircle, Clock } from 'lucide-react';

interface Voter {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
  hasVoted: boolean;
  emailVerified: boolean;
  verificationSent: boolean;
}

export default function EligibleVoters() {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sendingId, setSendingId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('eligibleVoters');
    if (saved) setVoters(JSON.parse(saved));
  }, []);

  const persist = (list: Voter[]) => {
    setVoters(list);
    localStorage.setItem('eligibleVoters', JSON.stringify(list));
  };

  const handleAddVoter = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const normalised = email.toLowerCase().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalised)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (voters.some(v => v.email === normalised)) {
      setError('This email is already registered.');
      return;
    }

    const newVoter: Voter = {
      id: Date.now().toString(),
      name, email: normalised,
      registeredAt: new Date().toISOString(),
      hasVoted: false,
      emailVerified: false,
      verificationSent: false,
    };
    persist([...voters, newVoter]);

    const logs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
    logs.unshift({ id: Date.now() + Math.random(), action: `Voter registered: ${name} (${normalised})`, time: new Date().toISOString(), type: 'voter' });
    localStorage.setItem('adminLogs', JSON.stringify(logs));

    setName(''); setEmail('');
  };

  const sendVerification = (voter: Voter) => {
    setSendingId(voter.id);
    // Mark as sent
    const updated = voters.map(v => v.id === voter.id ? { ...v, verificationSent: true } : v);
    persist(updated);

    // Simulate email link click after 2 seconds → mark verified
    setTimeout(() => {
      const verified = updated.map(v => v.id === voter.id ? { ...v, emailVerified: true } : v);
      persist(verified);
      setSendingId(null);

      const logs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
      logs.unshift({ id: Date.now() + Math.random(), action: `Email verified: ${voter.name} (${voter.email})`, time: new Date().toISOString(), type: 'voter' });
      localStorage.setItem('adminLogs', JSON.stringify(logs));
    }, 2000);
  };

  const handleRemoveVoter = (id: string) => {
    if (!confirm('Remove this voter from the eligible list?')) return;
    persist(voters.filter(v => v.id !== id));
  };

  const verified = voters.filter(v => v.emailVerified).length;
  const pending  = voters.filter(v => !v.emailVerified).length;

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Voter Registry</h1>
        <p className="text-gray-400">Register voters by email and send verification links to confirm eligibility.</p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total Registered', value: voters.length, color: 'blue' },
          { label: 'Email Verified', value: verified, color: 'green' },
          { label: 'Pending Verification', value: pending, color: 'amber' },
        ].map(s => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <p className={`text-2xl font-bold ${s.color === 'blue' ? 'text-blue-400' : s.color === 'green' ? 'text-green-400' : 'text-amber-400'}`}>{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registration Form */}
        <div className="lg:col-span-1">
          <form className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden" onSubmit={handleAddVoter}>
            <div className="absolute top-[-50%] right-[-10%] w-[80%] h-[100%] bg-blue-500/10 -rotate-45 blur-[60px] pointer-events-none" />
            <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-blue-400" /> Register New Voter
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>{error}</span>
              </div>
            )}

            <div className="space-y-4 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Full Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-600"
                  placeholder="John Doe" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Email Address <span className="text-xs text-gray-600">(Verification link sent here)</span></label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-600"
                    placeholder="voter@university.edu" />
                </div>
              </div>

              <button type="submit"
                className="w-full py-3 mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-semibold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" /> Authorize Voter
              </button>
            </div>
          </form>
        </div>

        {/* Voter List */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col" style={{ minHeight: 400 }}>
            <div className="p-5 border-b border-white/5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-gray-400" /> Eligible Roster
              </h2>
              <span className="px-3 py-1 bg-white/5 rounded-lg text-sm font-medium text-gray-300 border border-white/10">
                Total: <span className="text-white">{voters.length}</span>
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {voters.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60 min-h-[200px]">
                  <UserX className="w-12 h-12 text-gray-500 mb-4" />
                  <p className="text-gray-400 font-medium">No voters registered yet</p>
                  <p className="text-gray-500 text-sm mt-1">Add voters using the form to populate the registry.</p>
                </div>
              ) : voters.map((voter, idx) => (
                <div key={voter.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5 hover:bg-black/40 hover:border-white/10 transition-all gap-3">
                  <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center font-bold text-white text-sm flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 text-sm">{voter.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {voter.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:ml-auto">
                    {/* Verification status */}
                    {voter.emailVerified ? (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    ) : voter.verificationSent ? (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                        {sendingId === voter.id ? (
                          <><span className="w-3 h-3 border border-amber-400/40 border-t-amber-400 rounded-full animate-spin" /> Verifying...</>
                        ) : (
                          <><Clock className="w-3 h-3" /> Link Sent</>
                        )}
                      </span>
                    ) : (
                      <button onClick={() => sendVerification(voter)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-xs font-medium transition-all">
                        <Mail className="w-3 h-3" /> Send Verification
                      </button>
                    )}

                    {/* Voted badge */}
                    {voter.hasVoted && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs">Voted</span>
                    )}

                    <button onClick={() => handleRemoveVoter(voter.id)}
                      className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-500/20" title="Remove">
                      <UserX className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
