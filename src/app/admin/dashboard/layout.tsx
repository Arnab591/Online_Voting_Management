'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, ShieldPlus, Users, BarChart3, ScrollText, LogOut, ShieldAlert } from 'lucide-react';

const navItems = [
  { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
  { name: 'Create Election', href: '/admin/dashboard/election', icon: ShieldPlus },
  { name: 'Eligible Voters', href: '/admin/dashboard/voters', icon: Users },
  { name: 'Live Results', href: '/admin/dashboard/results', icon: BarChart3 },
  { name: 'Activity Logs', href: '/admin/dashboard/logs', icon: ScrollText },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const adminState = localStorage.getItem('isAdmin');
    if (adminState !== 'true') {
      router.push('/admin');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    router.push('/admin');
  };

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
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-500'}`} />
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:border-red-500/20 border border-transparent transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex-shrink-0 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl flex items-center justify-between px-6 z-10 sticky top-0">
          <Link href="/" className="flex items-center gap-3 md:hidden group">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-900 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="font-bold text-lg text-white tracking-tight group-hover:text-gray-200 transition-colors">Voting System</span>
          </Link>
          
          <div className="hidden md:flex items-center justify-between w-full">
            <h2 className="text-xl font-semibold capitalize text-gray-200">
              {navItems.find(n => n.href === pathname)?.name || 'Dashboard'}
            </h2>
            <div className="flex items-center gap-4">
              <div className="text-right hidden lg:block">
                <div className="text-sm font-semibold text-white">System Admin</div>
                <div className="text-xs text-gray-500">Security Clearance Level 5</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[2px]">
                <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center">
                  <span className="font-bold text-sm text-white">SA</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content area */}
        <div className="flex-1 overflow-auto bg-[url('/bg-noise.png')] bg-repeat opacity-[0.99]">
             {children}
        </div>
      </main>
    </div>
  );
}
