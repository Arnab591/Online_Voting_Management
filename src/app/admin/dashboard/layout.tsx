'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, ShieldPlus, Users, BarChart3, ScrollText,
  LogOut, ShieldAlert, X, Building2, GraduationCap, Landmark, Mail, Calendar
} from 'lucide-react';

import { useTranslation } from '@/context/LanguageContext';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

// Note: navItems is moved inside the component to access translations

const categoryMeta: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  organization: { label: 'Organisation Vote', icon: <Building2 className="w-4 h-4" />, color: 'text-blue-400' },
  college:      { label: 'College / School',  icon: <GraduationCap className="w-4 h-4" />, color: 'text-emerald-400' },
  government:   { label: 'Government Vote',   icon: <Landmark className="w-4 h-4" />, color: 'text-amber-400' },
};

interface AdminProfile {
  name?: string;
  email?: string;
  designation?: string;
  category?: string;
  registeredAt?: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { tr } = useTranslation();
  const [isAuthorized, setIsAuthorized]   = useState(false);
  const [profileOpen, setProfileOpen]      = useState(false);
  const [profile, setProfile]              = useState<AdminProfile>({});
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      router.push('/login');
    } else {
      setIsAuthorized(true);
      const raw = localStorage.getItem('adminProfile');
      if (raw) setProfile(JSON.parse(raw));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin');
  };

  const initials = profile.name
    ? profile.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'SA';

  const catMeta = profile.category ? categoryMeta[profile.category] : null;

  const navItems = [
    { name: tr.dashboard.overview,        href: '/admin/dashboard',            icon: LayoutDashboard },
    { name: tr.dashboard.createElection,  href: '/admin/dashboard/election',   icon: ShieldPlus },
    { name: tr.dashboard.voters,          href: '/admin/dashboard/voters',     icon: Users },
    { name: tr.dashboard.results,         href: '/admin/dashboard/results',    icon: BarChart3 },
    { name: tr.dashboard.logs,            href: '/admin/dashboard/logs',       icon: ScrollText },
  ];

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/30">
            <ShieldAlert className="w-10 h-10 text-red-500 animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-white mt-4">Unauthorized Access</h1>
          <p className="text-gray-400">Verifying credentials... redirecting to secure login.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-hidden">

      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link href="/" className="flex items-center gap-3 group rounded-xl hover:bg-white/5 px-2 py-1.5 -mx-2 transition-colors">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-white tracking-tight group-hover:text-gray-200 transition-colors">Voting System</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
          {navItems.map(({ name, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <Icon className={`w-5 h-5 ${active ? 'text-blue-400' : 'text-gray-500'}`} />
                <span className="font-medium text-sm">{name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-3">
          <div className="flex justify-center mb-4">
            <LanguageSelector />
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">{tr.dashboard.signOut}</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

        {/* Topbar */}
        <header className="h-16 flex-shrink-0 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl flex items-center justify-between px-6 z-20 sticky top-0">
          <Link href="/" className="flex items-center gap-3 md:hidden group">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-white tracking-tight">Voting System</span>
          </Link>

          <div className="hidden md:flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold capitalize text-gray-200">
                {navItems.find(n => n.href === pathname)?.name || 'Dashboard'}
              </h2>
            </div>

            {/* Clickable profile */}
            <button
              onClick={() => setProfileOpen(p => !p)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all group"
            >
              <div className="text-right hidden lg:block">
                <div className="text-sm font-semibold text-white leading-tight">{profile.name || 'System Admin'}</div>
                <div className="text-xs text-gray-500">{profile.designation || 'Security Clearance Level 5'}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[2px] group-hover:scale-105 transition-transform flex-shrink-0">
                <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center">
                  <span className="font-bold text-sm text-white">{initials}</span>
                </div>
              </div>
            </button>
          </div>
        </header>

        {/* Profile slide-over panel */}
        {profileOpen && (
          <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm" onClick={() => setProfileOpen(false)} />

            {/* Panel */}
            <div className="absolute top-0 right-0 h-full w-80 z-40 bg-[#0d0d1a] border-l border-white/10 shadow-2xl flex flex-col">
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                <h3 className="font-bold text-white text-lg">Admin Profile</h3>
                <button onClick={() => setProfileOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Avatar */}
              <div className="flex flex-col items-center pt-8 pb-6 border-b border-white/5 px-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[2px] mb-4 shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                  <div className="w-full h-full rounded-full bg-[#0d0d1a] flex items-center justify-center">
                    <span className="font-bold text-2xl text-white">{initials}</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-white">{profile.name || 'System Admin'}</h4>
                {profile.email && (
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> {profile.email}
                  </p>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                {/* Role / Designation */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Role</p>
                  <p className="text-white font-semibold">{profile.designation || 'System Administrator'}</p>
                </div>

                {/* Security clearance */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 space-y-1">
                  <p className="text-xs text-blue-400 uppercase tracking-widest">Security Clearance</p>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className="w-4 h-1.5 rounded-full bg-blue-500" />
                      ))}
                    </div>
                    <span className="text-white font-semibold text-sm">Level 5 — Full Access</span>
                  </div>
                </div>

                {/* Organisation category */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-widest">Organisation Type</p>
                  {catMeta ? (
                    <p className={`font-semibold flex items-center gap-2 ${catMeta.color}`}>
                      {catMeta.icon} {catMeta.label}
                    </p>
                  ) : (
                    <p className="text-gray-400 text-sm">Not specified</p>
                  )}
                </div>

                {/* Registered at */}
                {profile.registeredAt && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-1">
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Account Created</p>
                    <p className="text-white text-sm flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-500" />
                      {new Date(profile.registeredAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  </div>
                )}
              </div>

              {/* Sign out */}
              <div className="p-6 border-t border-white/5">
                <button onClick={handleLogout}
                  className="w-full py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center justify-center gap-2 font-semibold text-sm transition-all">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            </div>
          </>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
