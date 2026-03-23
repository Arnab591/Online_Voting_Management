'use client';

import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthModal } from '@/components/auth/AuthModal';
import { ParticleBackground } from '@/components/ui/ParticleBackground';

type Role = 'voter' | 'admin' | null;

interface AuthPageShellProps {
  mode: 'login' | 'register';
  initialRole?: Role;
  startAtForm?: boolean;
}

export function AuthPageShell({ mode, initialRole, startAtForm }: AuthPageShellProps) {
  const router = useRouter();
  const handleClose = () => router.push('/');

  return (
    <div className="fixed inset-0 z-0 bg-[#08080f]">
      <ParticleBackground />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 -left-48 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 h-96 w-96 rounded-full bg-purple-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[600px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      <AnimatePresence>
        <motion.div key="auth-shell-modal">
          <AuthModal
            key={`${mode}-${initialRole ?? 'none'}`}
            initialMode={mode}
            onClose={handleClose}
            embeddedMode
            initialRole={initialRole}
            startAtForm={startAtForm}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
