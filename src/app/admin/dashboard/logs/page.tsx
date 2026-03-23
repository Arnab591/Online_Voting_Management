'use client';

import { useState, useEffect } from 'react';
import { ScrollText, Clock, User, ShieldAlert, Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from '@/context/LanguageContext';

interface LogEntry {
  id: number;
  action: string;
  time: string;
  type?: string;
}

type Category = { key: string; label: string; color: string; icon: React.ReactNode; bg: string; border: string };

const CATEGORIES: Category[] = [
  {
    key: 'auth',
    label: 'Admin Logins',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: <User className="w-4 h-4 text-blue-400" />,
  },
  {
    key: 'election',
    label: 'Election Changes',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
    icon: <ShieldAlert className="w-4 h-4 text-purple-400" />,
  },
  {
    key: 'voter',
    label: 'Voter Actions',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: <Activity className="w-4 h-4 text-emerald-400" />,
  },
  {
    key: 'system',
    label: 'System Events',
    color: 'text-gray-400',
    bg: 'bg-white/5',
    border: 'border-white/10',
    icon: <ScrollText className="w-4 h-4 text-gray-400" />,
  },
];

function classifyLog(action: string, type?: string): string {
  if (type) return type;
  const l = action.toLowerCase();
  if (l.includes('login') || l.includes('auth') || l.includes('admin login') || l.includes('registered:') && l.includes('admin')) return 'auth';
  if (l.includes('election') || l.includes('reset') || l.includes('status') || l.includes('created') || l.includes('updated') || l.includes('deleted')) return 'election';
  if (l.includes('voter') || l.includes('vote') || l.includes('verified') || l.includes('registered:')) return 'voter';
  return 'system';
}

export default function ActivityLogs() {
  const { tr } = useTranslation();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let adminLogs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
    if (adminLogs.length === 0) {
      adminLogs = [{ id: Date.now() - 3600000, action: 'System initialized', time: new Date(Date.now() - 3600000).toISOString(), type: 'system' }];
      localStorage.setItem('adminLogs', JSON.stringify(adminLogs));
    }
    // de-dupe ids
    const seen = new Set<number>();
    adminLogs = adminLogs.map((log: LogEntry, i: number) => {
      if (seen.has(log.id)) return { ...log, id: log.id + i };
      seen.add(log.id);
      return log;
    });
    setLogs(adminLogs);
  }, []);

  const clearLogs = () => {
    if (!confirm('Clear all system logs? This cannot be undone.')) return;
    localStorage.setItem('adminLogs', '[]');
    setLogs([]);
  };

  const toggle = (key: string) => setCollapsed(c => ({ ...c, [key]: !c[key] }));

  const categorised = CATEGORIES.map(cat => ({
    ...cat,
    entries: logs.filter(l => classifyLog(l.action, l.type) === cat.key),
  })).filter(cat => cat.entries.length > 0);

  const uncategorised = logs.filter(l => {
    const catKey = classifyLog(l.action, l.type);
    return !CATEGORIES.some(c => c.key === catKey);
  });

  return (
    <div className="p-6 md:p-8 space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">

      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{tr.dashboard.logs}</h1>
          <p className="text-gray-400">All administrative, voter, and system events — categorised for clarity</p>
        </div>
        <button onClick={clearLogs}
          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium transition-colors">
          {tr.admin.logsClear}
        </button>
      </div>

      {logs.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-16 flex flex-col items-center gap-4 opacity-60">
          <ScrollText className="w-12 h-12 text-gray-600" />
          <p className="text-gray-400">No activity recorded yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {categorised.map(cat => (
            <div key={cat.key} className={`rounded-2xl border overflow-hidden ${cat.border} bg-white/[0.03] backdrop-blur-xl`}>
              {/* Category header */}
              <button
                onClick={() => toggle(cat.key)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg ${cat.bg} border ${cat.border}`}>{cat.icon}</div>
                  <span className={`font-semibold ${cat.color}`}>{cat.key === 'auth' ? tr.admin.logsAdmin : cat.key === 'election' ? tr.admin.logsElection : cat.key === 'voter' ? tr.admin.logsVoter : cat.label}</span>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-xs text-gray-400 border border-white/10 font-mono">
                    {cat.entries.length}
                  </span>
                </div>
                {collapsed[cat.key] ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronUp className="w-4 h-4 text-gray-500" />}
              </button>

              {/* Log entries */}
              {!collapsed[cat.key] && (
                <div className="px-4 pb-4 space-y-2">
                  {cat.entries.map((log, i) => (
                    <div key={`${log.id}-${i}`}
                      className="flex items-start gap-4 px-4 py-3 bg-black/30 border border-white/5 rounded-xl hover:bg-black/50 transition-colors">
                      <div className={`mt-0.5 p-1.5 rounded-full ${cat.bg} border ${cat.border} flex-shrink-0`}>{cat.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-200 truncate">{log.action}</p>
                        <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 flex-shrink-0" />
                          {new Date(log.time).toLocaleString('en-US', {
                            year: 'numeric', month: 'short', day: 'numeric',
                            hour: '2-digit', minute: '2-digit', second: '2-digit'
                          })}
                        </p>
                      </div>
                      <span className="hidden sm:block text-xs font-mono text-gray-600 bg-white/5 px-1.5 py-0.5 rounded border border-white/5 flex-shrink-0">
                        #{log.id.toString().slice(-5)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {uncategorised.length > 0 && (
            <p className="text-xs text-gray-600 text-center">{uncategorised.length} uncategorised event(s) hidden</p>
          )}
        </div>
      )}
    </div>
  );
}
