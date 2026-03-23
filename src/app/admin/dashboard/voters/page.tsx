'use client';

import { useState, useEffect, useRef } from 'react';
import { UserPlus, Shield, UserX, AlertCircle, Mail, CheckCircle, Clock, Upload, ChevronDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useTranslation } from '@/context/LanguageContext';

interface Election { id: string; formData: { title: string } }
interface Voter {
  id: string; name: string; email: string;
  electionId: string;
  registeredAt: string; hasVoted: boolean;
  emailVerified: boolean; verificationSent: boolean;
}

export default function EligibleVoters() {
  const { tr } = useTranslation();
  const [elections, setElections]     = useState<Election[]>([]);
  const [selectedElId, setSelectedElId] = useState<string>('');
  const [voters, setVoters]           = useState<Voter[]>([]);
  const [name, setName]               = useState('');
  const [email, setEmail]             = useState('');
  const [error, setError]             = useState('');
  const [sendingId, setSendingId]     = useState<string | null>(null);
  const [importing, setImporting]     = useState(false);
  const [importResult, setImportResult] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Load elections
  useEffect(() => {
    const raw = localStorage.getItem('elections');
    if (raw) {
      const els: Election[] = JSON.parse(raw);
      setElections(els);
      if (els.length > 0) setSelectedElId(els[0].id);
    }
  }, []);

  // Load voters whenever election changes
  useEffect(() => {
    const raw = localStorage.getItem('eligibleVoters');
    if (raw) setVoters(JSON.parse(raw));
  }, []);

  const persist = (list: Voter[]) => {
    setVoters(list);
    localStorage.setItem('eligibleVoters', JSON.stringify(list));
  };

  const logVoterActivity = (action: string) => {
    const logs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
    logs.unshift({ id: Date.now() + Math.random(), action, time: new Date().toISOString(), type: 'voter' });
    localStorage.setItem('adminLogs', JSON.stringify(logs));
  };

  // Filtered to selected election
  const electionVoters = voters.filter(v => v.electionId === selectedElId);

  const handleAddVoter = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!selectedElId) { setError('Please select an election first.'); return; }
    const norm = email.toLowerCase().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(norm)) { setError('Invalid email address.'); return; }
    if (voters.some(v => v.email === norm && v.electionId === selectedElId)) {
      setError('This email is already registered for the selected election.'); return;
    }
    const newVoter: Voter = {
      id: Date.now().toString(), name, email: norm, electionId: selectedElId,
      registeredAt: new Date().toISOString(), hasVoted: false,
      emailVerified: false, verificationSent: false,
    };
    persist([...voters, newVoter]);
    logVoterActivity(`Voter registered: ${name} (${norm})`);
    setName(''); setEmail('');
  };

  const sendVerification = (voter: Voter) => {
    setSendingId(voter.id);
    const updated = voters.map(v => v.id === voter.id ? { ...v, verificationSent: true } : v);
    persist(updated);
    setTimeout(() => {
      const verified = updated.map(v => v.id === voter.id ? { ...v, emailVerified: true } : v);
      persist(verified);
      setSendingId(null);
      logVoterActivity(`Email verified: ${voter.name} (${voter.email})`);
    }, 2000);
  };

  const handleRemoveVoter = (id: string) => {
    if (!confirm('Remove this voter?')) return;
    persist(voters.filter(v => v.id !== id));
  };

  // ── Excel bulk upload ──────────────────────────────────────────────
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedElId) return;
    setImporting(true); setImportResult(null);

    try {
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data);
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows: Record<string, string>[] = XLSX.utils.sheet_to_json(ws, { defval: '' });

      let added = 0; let skipped = 0;
      const newVoters: Voter[] = [...voters];

      for (const row of rows) {
        // Accept "Name", "Full Name", "name" columns
        const rawName  = String(row['Full Name'] || row['Name'] || row['name'] || '').trim();
        const rawEmail = String(row['Email'] || row['email'] || row['Email Address'] || '').trim().toLowerCase();
        if (!rawName || !rawEmail) { skipped++; continue; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) { skipped++; continue; }
        if (newVoters.some(v => v.email === rawEmail && v.electionId === selectedElId)) { skipped++; continue; }

        newVoters.push({
          id: `${Date.now()}-${added}`,
          name: rawName, email: rawEmail,
          electionId: selectedElId,
          registeredAt: new Date().toISOString(),
          hasVoted: false, emailVerified: false, verificationSent: false,
        });
        added++;
      }

      persist(newVoters);
      logVoterActivity(`Bulk import: ${added} voters added to election`);
      setImportResult(`✓ ${added} voter${added !== 1 ? 's' : ''} imported${skipped ? `, ${skipped} skipped` : ''}.`);
    } catch {
      setImportResult('✗ Failed to parse file. Please check format.');
    } finally {
      setImporting(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const verified = electionVoters.filter(v => v.emailVerified).length;
  const pending  = electionVoters.filter(v => !v.emailVerified).length;
  const electionTitle = elections.find(e => e.id === selectedElId)?.formData.title || 'No election selected';

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{tr.admin.voterRegistry}</h1>
        <p className="text-gray-400">Register and verify voters per election. Use bulk upload for large lists.</p>
      </div>

      {/* Election Selector */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-300 flex-shrink-0">
          <Shield className="w-4 h-4 text-blue-400" /> {tr.admin.selectElection}:
        </div>
        {elections.length === 0 ? (
          <p className="text-amber-400 text-sm">{tr.admin.noElections} <a href="/admin/dashboard/election" className="underline">{tr.admin.createFirstElection} →</a></p>
        ) : (
          <div className="relative w-full sm:w-80">
            <select
              value={selectedElId}
              onChange={e => setSelectedElId(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none pr-8"
            >
              {elections.map(el => (
                <option key={el.id} value={el.id}>{el.formData.title}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Stats strip */}
      {selectedElId && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Registered', value: electionVoters.length, color: 'text-blue-400' },
            { label: 'Verified',   value: verified,               color: 'text-green-400' },
            { label: 'Pending',    value: pending,                color: 'text-amber-400' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Column — Forms */}
        <div className="lg:col-span-1 space-y-4">

          {/* Single Voter Form */}
          <form className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden" onSubmit={handleAddVoter}>
            <div className="absolute top-[-50%] right-[-10%] w-[80%] h-[100%] bg-blue-500/10 -rotate-45 blur-[60px] pointer-events-none" />
            <h2 className="text-base font-semibold text-white mb-5 flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-blue-400" /> {tr.admin.addVoter}
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" /><span>{error}</span>
              </div>
            )}

            <div className="space-y-3 relative z-10">
              <input type="text" required value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-600"
                placeholder={tr.admin.fullName} />
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-600"
                  placeholder={tr.admin.emailAddress} />
              </div>
              <button type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl font-semibold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all flex items-center justify-center gap-2 text-sm">
                <Shield className="w-4 h-4" /> Authorize Voter
              </button>
            </div>
          </form>

          {/* Bulk Upload */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-[-50%] left-[-10%] w-[80%] h-[100%] bg-purple-500/10 rotate-45 blur-[60px] pointer-events-none" />
            <h2 className="text-base font-semibold text-white mb-2 flex items-center gap-2">
              <Upload className="w-4 h-4 text-purple-400" /> {tr.admin.uploadExcel}
            </h2>
            <p className="text-xs text-gray-500 mb-4 relative z-10">
              Upload an <span className="text-gray-300">.xlsx / .xls / .csv</span> file with columns:<br />
              <code className="text-purple-300">Full Name</code> and <code className="text-purple-300">Email</code>
            </p>

            <div className="relative z-10 space-y-3">
              <label
                className={`flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${importing ? 'border-purple-500/40 bg-purple-500/5' : 'border-white/10 hover:border-purple-500/40 hover:bg-purple-500/5'}`}
              >
                <Upload className={`w-6 h-6 ${importing ? 'text-purple-400 animate-bounce' : 'text-gray-500'}`} />
                <span className="text-xs text-gray-400">{importing ? 'Importing…' : tr.admin.uploadExcel}</span>
                <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={handleFileUpload} disabled={importing || !selectedElId} />
              </label>

              {importResult && (
                <p className={`text-sm font-medium text-center ${importResult.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>
                  {importResult}
                </p>
              )}

              {!selectedElId && (
                <p className="text-xs text-amber-400 text-center">Select an election above before uploading.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column — Voter List */}
        <div className="lg:col-span-2">
          <div className="bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col" style={{ minHeight: 420 }}>
            <div className="p-5 border-b border-white/5 flex items-center justify-between gap-2 flex-wrap">
              <div>
                <h2 className="text-base font-semibold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" /> Eligible Roster
                </h2>
                <p className="text-xs text-gray-500 mt-0.5 truncate max-w-[220px]">{electionTitle}</p>
              </div>
              <span className="px-3 py-1 bg-white/5 rounded-lg text-sm font-medium text-gray-300 border border-white/10">
                {electionVoters.length} voter{electionVoters.length !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
              {!selectedElId ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60 min-h-[200px]">
                  <Shield className="w-10 h-10 text-gray-600 mb-3" />
                  <p className="text-gray-400 text-sm">Select an election to view its voter list.</p>
                </div>
              ) : electionVoters.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-60 min-h-[200px]">
                  <UserX className="w-10 h-10 text-gray-500 mb-3" />
                  <p className="text-gray-400 text-sm font-medium">No voters registered for this election yet.</p>
                  <p className="text-gray-500 text-xs mt-1">Add individually or bulk-upload an Excel sheet.</p>
                </div>
              ) : electionVoters.map((voter, idx) => (
                <div key={voter.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5 hover:bg-black/40 hover:border-white/10 transition-all gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center font-bold text-white text-xs flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200 text-sm">{voter.name}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Mail className="w-3 h-3" /> {voter.email}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:ml-auto flex-wrap">
                    {voter.emailVerified ? (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                        <CheckCircle className="w-3 h-3" /> {tr.admin.verified}
                      </span>
                    ) : voter.verificationSent ? (
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-medium">
                        {sendingId === voter.id
                          ? <><span className="w-3 h-3 border border-amber-400/40 border-t-amber-400 rounded-full animate-spin" /> ...</>
                          : <><Clock className="w-3 h-3" /> ...</>}
                      </span>
                    ) : (
                      <button onClick={() => sendVerification(voter)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-xs font-medium transition-all">
                        <Mail className="w-3 h-3" /> {tr.admin.sendVerificationEmail}
                      </button>
                    )}
                    {voter.hasVoted && (
                      <span className="px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs">Voted</span>
                    )}
                    <button onClick={() => handleRemoveVoter(voter.id)}
                      className="p-1.5 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all border border-red-500/20">
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
