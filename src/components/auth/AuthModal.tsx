'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, X, Building2, GraduationCap, Landmark, User, ShieldCheck } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */
type Role = 'voter' | 'admin' | null;
type VoteCategory = 'organization' | 'college' | 'government' | null;
type AuthMode = 'login' | 'register';

interface AuthModalProps {
  initialMode: AuthMode;
  onClose: () => void;
  embeddedMode?: boolean;  // when true: no backdrop, card is page-centered
}

/* ------------------------------------------------------------------ */
/*  Slide variants                                                      */
/* ------------------------------------------------------------------ */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

/* ------------------------------------------------------------------ */
/*  3D Tilt card wrapper                                               */
/* ------------------------------------------------------------------ */
function TiltCard({ children, className = '', onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    el.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${y}deg) scale(1.04)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)';
  };

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 cursor-pointer ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Ripple button                                                       */
/* ------------------------------------------------------------------ */
function RippleButton({ children, onClick, className = '', disabled = false, type = 'button' }: {
  children: React.ReactNode; onClick?: () => void; className?: string; disabled?: boolean; type?: 'button' | 'submit';
}) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const addRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    setRipples(r => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples(r => r.filter(rp => rp.id !== id)), 700);
    onClick?.();
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={addRipple}
      className={`relative overflow-hidden ${className}`}
    >
      {ripples.map(rp => (
        <span
          key={rp.id}
          className="absolute rounded-full bg-white/30 animate-ping pointer-events-none"
          style={{ left: rp.x - 12, top: rp.y - 12, width: 24, height: 24, animationDuration: '0.7s', animationIterationCount: 1 }}
        />
      ))}
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 1 — Role selection                                            */
/* ------------------------------------------------------------------ */
function StepRole({ onSelect }: { onSelect: (r: Role) => void }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white">Choose Your Access</h2>
        <p className="text-gray-400 mt-2 text-sm">Select the portal that matches your role</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Voter */}
        <TiltCard onClick={() => onSelect('voter')} className="group">
          <div className="border border-white/10 bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/40 rounded-2xl p-6 flex flex-col items-center gap-4 transition-colors shadow-lg hover:shadow-cyan-500/20">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center group-hover:bg-cyan-500/20 transition-all shadow-[0_0_0px_rgba(6,182,212,0)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <User className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="text-center">
              <p className="font-bold text-white text-lg">Voter Access</p>
              <p className="text-gray-400 text-xs mt-1">Cast your vote securely</p>
            </div>
          </div>
        </TiltCard>

        {/* Admin */}
        <TiltCard onClick={() => onSelect('admin')} className="group">
          <div className="border border-white/10 bg-white/5 hover:bg-purple-500/10 hover:border-purple-500/40 rounded-2xl p-6 flex flex-col items-center gap-4 transition-colors shadow-lg hover:shadow-purple-500/20">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/20 transition-all shadow-[0_0_0px_rgba(168,85,247,0)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]">
              <ShieldCheck className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-center">
              <p className="font-bold text-white text-lg">Admin Access</p>
              <p className="text-gray-400 text-xs mt-1">Manage the system</p>
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 2 — Vote category (admin only)                               */
/* ------------------------------------------------------------------ */
const categories = [
  { id: 'organization', label: 'Organization Vote', icon: Building2, color: 'blue' },
  { id: 'college',      label: 'College / School',  icon: GraduationCap, color: 'emerald' },
  { id: 'government',   label: 'Government Vote',   icon: Landmark, color: 'amber' },
] as const;

const colorMap: Record<string, string> = {
  blue:    'border-blue-500/40 bg-blue-500/10 shadow-[0_0_20px_rgba(59,130,246,0.4)]',
  emerald: 'border-emerald-500/40 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.4)]',
  amber:   'border-amber-500/40 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.4)]',
};
const iconColorMap: Record<string, string> = {
  blue: 'text-blue-400', emerald: 'text-emerald-400', amber: 'text-amber-400',
};

function StepCategory({ onSelect }: { onSelect: (c: VoteCategory) => void }) {
  const [selected, setSelected] = useState<VoteCategory>(null);

  const pick = (id: VoteCategory) => {
    setSelected(id);
    setTimeout(() => onSelect(id), 400);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-purple-400 font-semibold mb-2">Step 2 of 3</p>
        <h2 className="text-3xl font-bold text-white">Select Voting Category</h2>
        <p className="text-gray-400 mt-2 text-sm">Choose the type of election you manage</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {categories.map(({ id, label, icon: Icon, color }) => {
          const isSelected = selected === id;
          return (
            <TiltCard key={id} onClick={() => pick(id as VoteCategory)}>
              <motion.div
                animate={isSelected ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 0.35 }}
                className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected ? colorMap[color] : 'border-white/10 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isSelected ? 'bg-white/10' : 'bg-white/5'}`}>
                  <Icon className={`w-6 h-6 ${isSelected ? iconColorMap[color] : 'text-gray-400'}`} />
                </div>
                <span className={`font-semibold text-base ${isSelected ? 'text-white' : 'text-gray-300'}`}>{label}</span>
                {isSelected && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </motion.div>
                )}
              </motion.div>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 3 — Auth form                                                 */
/* ------------------------------------------------------------------ */
function FloatingInput({ id, label, type = 'text', value, onChange, placeholder = '' }: {
  id: string; label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const isPassword = type === 'password';
  const floated = focused || value.length > 0;

  return (
    <div className="relative group">
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          floated ? '-top-2.5 text-xs text-cyan-400 bg-[#0d0d1a] px-1' : 'top-3.5 text-sm text-gray-500'
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={isPassword && showPw ? 'text' : type}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={focused ? placeholder : ''}
        className="w-full bg-white/5 border border-white/10 focus:border-cyan-500/60 rounded-xl px-4 pt-4 pb-2 text-white text-sm outline-none transition-all focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)] pr-10"
      />
      {isPassword && (
        <button type="button" onClick={() => setShowPw(p => !p)} className="absolute right-3 top-3.5 text-gray-500 hover:text-white transition-colors">
          {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
}

function StepAuthForm({ role, mode, onSuccess }: { role: Role; mode: AuthMode; onSuccess: () => void }) {
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState(role === 'admin' && mode === 'login' ? 'admin@college.com' : '');
  const [designation, setDesig]   = useState('');
  const [password, setPassword]   = useState('');
  const [confirm, setConfirm]     = useState('');
  const [aadhaar, setAadhaar]     = useState('');
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);

  const isAdminRegister = role === 'admin' && mode === 'register';
  const stepLabel = role === 'admin' ? '3 of 3' : '2 of 2';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Confirm password check for register flows
    if (mode === 'register' && password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (role === 'admin') {
        if (mode === 'login') {
          if (email === 'admin@college.com' && password === 'admin123') {
            localStorage.setItem('isAdmin', 'true');
            const logs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
            logs.unshift({ id: Date.now(), action: 'Admin login via Auth Modal', time: new Date().toISOString() });
            localStorage.setItem('adminLogs', JSON.stringify(logs));
            setLoading(false);
            onSuccess();
          } else {
            setError('Invalid admin credentials.');
            setLoading(false);
          }
        } else {
          // Admin register — simulate success (frontend only)
          localStorage.setItem('isAdmin', 'true');
          const logs = JSON.parse(localStorage.getItem('adminLogs') || '[]');
          logs.unshift({ id: Date.now(), action: `Admin registered: ${name}`, time: new Date().toISOString() });
          localStorage.setItem('adminLogs', JSON.stringify(logs));
          setLoading(false);
          onSuccess();
        }
      } else {
        // Voter — any credentials work (frontend only)
        setLoading(false);
        onSuccess();
      }
    }, 1200);
  };

  const heading = isAdminRegister
    ? 'Register Admin Account'
    : role === 'admin'
    ? 'Admin Control Panel'
    : mode === 'login'
    ? 'Voter Access Portal'
    : 'Create Voter Account';

  const subtitle = isAdminRegister
    ? 'Fill in your details to create an admin account'
    : role === 'admin'
    ? 'Enter your credentials to proceed'
    : mode === 'login'
    ? 'Sign in to cast your vote'
    : 'Register to participate in the election';

  const accentColor = role === 'admin' ? '#a78bfa' : '#22d3ee';
  const btnGradient = role === 'admin'
    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-[0_0_20px_rgba(168,85,247,0.4)]'
    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]';

  return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-2" style={{ color: accentColor }}>
          Step {stepLabel}
        </p>
        <h2 className="text-2xl font-bold text-white">{heading}</h2>
        <p className="text-gray-400 mt-1 text-sm">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* ── Full name: voter register + admin register ── */}
        {(mode === 'register') && (
          <FloatingInput id="auth-name" label="Full Name" value={name} onChange={setName} placeholder="John Doe" />
        )}

        {/* ── Designation: admin register only ── */}
        {isAdminRegister && (
          <FloatingInput id="auth-desig" label="Designation / Role" value={designation} onChange={setDesig} placeholder="e.g. Election Officer" />
        )}

        {/* ── Email ── */}
        <FloatingInput
          id="auth-email"
          label={role === 'admin' ? 'Admin Email' : 'Email / Voter ID'}
          type="email"
          value={email}
          onChange={setEmail}
          placeholder={role === 'admin' ? 'admin@college.com' : 'you@university.edu'}
        />

        {/* ── Aadhaar: voter register only ── */}
        {role === 'voter' && mode === 'register' && (
          <FloatingInput id="auth-aadhaar" label="Aadhaar (optional)" value={aadhaar} onChange={setAadhaar} placeholder="XXXX XXXX XXXX" />
        )}

        {/* ── Password ── */}
        <FloatingInput id="auth-password" label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />

        {/* ── Confirm password: all register flows ── */}
        {mode === 'register' && (
          <FloatingInput id="auth-confirm" label="Confirm Password" type="password" value={confirm} onChange={setConfirm} placeholder="••••••••" />
        )}

        {/* ── Demo hint for admin login only ── */}
        {role === 'admin' && mode === 'login' && (
          <p className="text-center text-xs text-gray-600 font-mono pt-1">Demo: admin@college.com / admin123</p>
        )}

        {error && (
          <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            {error}
          </motion.div>
        )}

        <RippleButton
          type="submit"
          disabled={loading}
          className={`w-full py-3.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60 ${btnGradient}`}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              {mode === 'register' ? 'Creating Account...' : 'Authenticating...'}
            </>
          ) : isAdminRegister ? 'Create Admin Account' :
            role === 'admin' ? 'Access Admin Dashboard' :
            mode === 'login' ? 'Sign In & Vote' : 'Create Account'
          }
        </RippleButton>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Access Granted overlay                                             */
/* ------------------------------------------------------------------ */
function AccessGranted({ role }: { role: Role }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{ boxShadow: ['0 0 0px rgba(6,182,212,0.6)', '0 0 60px rgba(6,182,212,0.9)', '0 0 0px rgba(6,182,212,0.6)'] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-28 h-28 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center mx-auto"
        >
          <span className="text-5xl">✅</span>
        </motion.div>
        <div>
          <h2 className="text-4xl font-bold text-white">Access Granted</h2>
          <p className="text-gray-400 mt-2">Redirecting to {role === 'admin' ? 'Admin Dashboard' : 'Voter Dashboard'}...</p>
        </div>
        <div className="flex justify-center gap-1">
          {[0, 1, 2].map(i => (
            <motion.div key={i} className="w-2 h-2 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress dots                                                       */
/* ------------------------------------------------------------------ */
function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex justify-center gap-2 mb-6">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ width: i === current ? 24 : 8, background: i <= current ? '#22d3ee' : 'rgba(255,255,255,0.15)' }}
          transition={{ duration: 0.3 }}
          className="h-2 rounded-full"
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main AuthModal                                                      */
/* ------------------------------------------------------------------ */
export function AuthModal({ initialMode, onClose, embeddedMode = false }: AuthModalProps) {
  const [step, setStep]       = useState(0);
  const [dir, setDir]         = useState(1);
  const [role, setRole]       = useState<Role>(null);
  const [, setCategory]       = useState<VoteCategory>(null);
  const [mode]                = useState<AuthMode>(initialMode);
  const [granted, setGranted] = useState(false);
  const router                = useRouter();

  const go = useCallback((nextStep: number) => {
    setDir(nextStep > step ? 1 : -1);
    setStep(nextStep);
  }, [step]);

  const handleRoleSelect = (r: Role) => {
    setRole(r);
    if (r === 'admin') go(1);
    else go(2);
  };

  const handleCategorySelect = (c: VoteCategory) => {
    setCategory(c);
    go(2);
  };

  const handleSuccess = () => {
    setGranted(true);
    setTimeout(() => {
      router.push(role === 'admin' ? '/admin/dashboard' : '/voter/dashboard');
    }, 2000);
  };

  const totalDots = role === 'admin' ? 3 : 2;
  const currentDot = role === 'admin' ? step : step === 2 ? 1 : 0;

  const stepContent = (
    step === 0 ? <StepRole onSelect={handleRoleSelect} /> :
    step === 1 ? <StepCategory onSelect={handleCategorySelect} /> :
    <StepAuthForm role={role} mode={mode} onSuccess={handleSuccess} />
  );

  /* ---------- The glass card (shared between both modes) ---------- */
  const card = (
    <div className="relative w-full max-w-md rounded-3xl overflow-hidden">
      {/* Glow rings */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Glass card body */}
      <div className="relative bg-[#0d0d1a]/80 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Progress — hidden until a role is chosen */}
        {role === null ? (
          <p className="text-center text-xs uppercase tracking-[0.25em] text-gray-500 font-medium mb-6">
            Choose your access type
          </p>
        ) : (
          <ProgressDots total={totalDots} current={currentDot} />
        )}

        {/* Back button — voter goes to step 0, admin goes to step 1 */}
        {step > 0 && (
          <button
            onClick={() => go(role === 'voter' ? 0 : step - 1)}
            className="absolute top-5 left-5 text-xs text-gray-500 hover:text-white transition-colors flex items-center gap-1"
          >
            ← Back
          </button>
        )}

        {/* Step content with slide transition */}
        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {stepContent}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  /* ---------- Embedded mode: no fixed overlay, fills the page ---------- */
  if (embeddedMode) {
    return (
      <>
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.88, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.88, opacity: 0, y: 30 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="w-full max-w-md"
          >
            {card}
          </motion.div>
        </div>
        {granted && <AccessGranted role={role} />}
      </>
    );
  }

  /* ---------- Popup mode: dark backdrop + card overlay ---------- */
  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md"
      />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 30 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          className="pointer-events-auto relative w-full max-w-md"
          onClick={e => e.stopPropagation()}
        >
          {card}
        </div>
      </motion.div>

      {/* Access Granted overlay */}
      {granted && <AccessGranted role={role} />}
    </>
  );
}
