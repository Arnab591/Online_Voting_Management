'use client';

import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthModal } from '@/components/auth/AuthModal';
import { ParticleBackground } from '@/components/ui/ParticleBackground';

interface AuthPageShellProps {
  mode: 'login' | 'register';
}

export function AuthPageShell({ mode }: AuthPageShellProps) {
  const router = useRouter();

  const handleClose = () => {
    // Going back to homepage when the modal is closed
    router.push('/');
  };

  return (
    <div className="fixed inset-0 z-0 bg-[#08080f]">
      {/* Animated particle background */}
      <ParticleBackground />

      {/* Gradient blobs */}
      <div className="absolute top-1/4 -left-48 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 h-96 w-96 rounded-full bg-purple-500/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-[600px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />

      {/* Auth Modal rendered directly on the page */}
      <AnimatePresence>
        <motion.div key="auth-shell-modal">
          <AuthModal
            key={mode}
            initialMode={mode}
            onClose={handleClose}
            embeddedMode
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
