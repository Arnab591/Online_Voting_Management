'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Save, Users, Calendar, ChevronDown, ChevronUp, Pencil, X } from 'lucide-react';

interface Candidate { id: number; name: string; party: string; imageUrl: string; }
interface ElectionConfig {
  id: string;
  formData: { title: string; description: string; startDate: string; endDate: string };
  candidates: Candidate[];
  createdAt: string;
}

const emptyForm = { title: '', description: '', startDate: '', endDate: '' };
const emptyCandidate = (): Candidate => ({ id: Date.now(), name: '', party: '', imageUrl: '' });

export default function CreateElection() {
  const [elections, setElections] = useState<ElectionConfig[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [formData, setFormData] = useState(emptyForm);
  const [candidates, setCandidates] = useState<Candidate[]>([emptyCandidate()]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('elections');
    if (raw) setElections(JSON.parse(raw));
    else {
      // migrate legacy single election
      const legacy = localStorage.getItem('electionData');
      if (legacy) {
        const p = JSON.parse(legacy);
        const migrated: ElectionConfig = {
          id: 'legacy',
          formData: p.formData || emptyForm,
          candidates: p.candidates || [],
          createdAt: new Date().toISOString(),
        };
        const list = [migrated];
        setElections(list);
        localStorage.setItem('elections', JSON.stringify(list));
      }
    }
  }, []);

  const persist = (list: ElectionConfig[]) => {
    setElections(list);
    localStorage.setItem('elections', JSON.stringify(list));
    // keep legacy key in sync for results page
    if (list.length > 0) localStorage.setItem('electionData', JSON.stringify(list[0]));
  };

  const logActivity = (action: string) => {
    const logs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
    logs.unshift({ id: Date.now() + Math.random(), action, time: new Date().toISOString(), type: 'election' });
    localStorage.setItem('adminLogs', JSON.stringify(logs));
  };

  const openNew = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setCandidates([emptyCandidate()]);
    setShowForm(true);
  };

  const openEdit = (el: ElectionConfig) => {
    setEditingId(el.id);
    setFormData(el.formData);
    setCandidates(el.candidates.length ? el.candidates : [emptyCandidate()]);
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      const updated = elections.map(el =>
        el.id === editingId ? { ...el, formData, candidates } : el
      );
      persist(updated);
      logActivity(`Election updated: ${formData.title}`);
    } else {
      const newEl: ElectionConfig = {
        id: Date.now().toString(),
        formData,
        candidates,
        createdAt: new Date().toISOString(),
      };
      persist([...elections, newEl]);
      logActivity(`New election created: ${formData.title}`);
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); setShowForm(false); setEditingId(null); }, 1200);
  };

  const deleteElection = (id: string) => {
    if (!confirm('Delete this election configuration?')) return;
    const updated = elections.filter(e => e.id !== id);
    persist(updated);
    logActivity('Election configuration deleted');
  };

  const handleCandidateChange = (i: number, field: string, val: string) => {
    const updated = [...candidates];
    updated[i] = { ...updated[i], [field]: val };
    setCandidates(updated);
  };

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Election Configurations</h1>
          <p className="text-gray-400">Create and manage election setups. Each configuration is saved as a list entry.</p>
        </div>
        {!showForm && (
          <button
            onClick={openNew}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all"
          >
            <Plus className="w-4 h-4" /> New Election
          </button>
        )}
      </div>

      {/* Inline Form */}
      {showForm && (
        <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl space-y-8 relative overflow-hidden">
          <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[100%] bg-blue-500/10 rotate-45 blur-[80px] pointer-events-none" />

          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              {editingId ? 'Edit Election' : 'New Election'}
            </h2>
            <button type="button" onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* General Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-300">Election Title</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-600"
                placeholder="e.g. Student Council Election 2026" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-300">Description</label>
              <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all min-h-[80px] placeholder-gray-600 resize-none"
                placeholder="Election guidelines and details." />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Start Date</label>
              <input type="datetime-local" required value={formData.startDate} onChange={e => setFormData({...formData, startDate: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 transition-all [color-scheme:dark]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">End Date</label>
              <input type="datetime-local" required value={formData.endDate} onChange={e => setFormData({...formData, endDate: e.target.value})}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 transition-all [color-scheme:dark]" />
            </div>
          </div>

          {/* Candidates */}
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white flex items-center gap-2 text-lg">
                <Users className="w-4 h-4 text-purple-400" /> Candidates
              </h3>
              <button type="button" onClick={() => setCandidates([...candidates, emptyCandidate()])}
                className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors border border-purple-500/30">
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>
            {candidates.map((c, i) => (
              <div key={c.id} className="bg-black/20 border border-white/5 rounded-2xl p-5 relative group hover:border-purple-500/30 transition-all">
                <span className="absolute -top-2.5 -left-2.5 w-6 h-6 bg-[#0a0a0f] border border-white/10 rounded-full flex items-center justify-center text-xs font-bold text-gray-400">{i + 1}</span>
                {candidates.length > 1 && (
                  <button type="button" onClick={() => setCandidates(candidates.filter((_, idx) => idx !== i))}
                    className="absolute -top-2.5 -right-2.5 w-6 h-6 bg-[#0a0a0f] border border-white/10 rounded-full flex items-center justify-center text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
                    <X className="w-3 h-3" />
                  </button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(['name', 'party', 'imageUrl'] as const).map(field => (
                    <div key={field} className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-400 capitalize">{field === 'imageUrl' ? 'Image URL' : field === 'party' ? 'Party / Affiliation' : 'Full Name'}</label>
                      <input type={field === 'imageUrl' ? 'url' : 'text'} required value={c[field]}
                        onChange={e => handleCandidateChange(i, field, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder-gray-600"
                        placeholder={field === 'imageUrl' ? 'https://...' : field === 'party' ? 'Independent' : 'Jane Doe'} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/5">
            {saved && <span className="text-green-400 text-sm font-medium">✓ Saved!</span>}
            <button type="button" onClick={() => setShowForm(false)}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm transition-all">
              Cancel
            </button>
            <button type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all flex items-center gap-2 text-sm">
              <Save className="w-4 h-4" />
              {editingId ? 'Update Election' : 'Save Election'}
            </button>
          </div>
        </form>
      )}

      {/* Elections List */}
      {elections.length === 0 && !showForm ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center gap-4 text-center">
          <Calendar className="w-12 h-12 text-gray-600" />
          <p className="text-gray-400 font-medium">No elections configured yet</p>
          <button onClick={openNew} className="px-5 py-2.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-xl text-sm font-medium transition-colors">
            Create First Election
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {elections.map(el => (
            <div key={el.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl transition-all hover:border-white/20">
              {/* List entry header */}
              <div
                className="flex items-center justify-between px-6 py-4 cursor-pointer"
                onClick={() => setExpandedId(expandedId === el.id ? null : el.id)}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{el.formData.title}</p>
                    <p className="text-xs text-gray-500">
                      {el.candidates.length} candidate{el.candidates.length !== 1 ? 's' : ''} ·{' '}
                      {el.formData.startDate ? new Date(el.formData.startDate).toLocaleDateString() : 'No start date'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                  <button onClick={e => { e.stopPropagation(); openEdit(el); }}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all border border-white/10">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={e => { e.stopPropagation(); deleteElection(el.id); }}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all border border-red-500/20">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {expandedId === el.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </div>
              </div>

              {/* Expanded detail */}
              {expandedId === el.id && (
                <div className="px-6 pb-6 border-t border-white/5 pt-4 space-y-4">
                  <p className="text-sm text-gray-400">{el.formData.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span>Start: <span className="text-white">{el.formData.startDate ? new Date(el.formData.startDate).toLocaleString() : '—'}</span></span>
                    <span>End: <span className="text-white">{el.formData.endDate ? new Date(el.formData.endDate).toLocaleString() : '—'}</span></span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {el.candidates.map((c, i) => (
                      <div key={c.id} className="bg-black/30 border border-white/5 rounded-xl p-3 text-sm">
                        <p className="font-medium text-white truncate">{c.name || `Candidate ${i + 1}`}</p>
                        <p className="text-gray-500 text-xs truncate">{c.party || 'No party'}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
