import Link from 'next/link';
import { BookOpen, UserCheck, AlertTriangle } from 'lucide-react';

export default function TermsOfUsePage() {
  return (
    <div className="w-full bg-primary font-sans min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-gray-300">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-6 border border-white/10 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
            <BookOpen className="w-10 h-10 text-accent" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Terms of Use</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Rules and regulations governing the use of our electoral platform.</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-all hover:border-white/10 hover:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <UserCheck className="w-6 h-6 text-blue-400" />
              User Eligibility & Registration
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>By registering on this platform, you legally swear that all provided credentials are authentic and represent your true identity. You may only possess one (1) voting account.</p>
              <p>Fraudulent registration attempts may result in legal investigation under digital election tampering statutes in your resident jurisdiction.</p>
            </div>
          </section>

          <section className="bg-gray-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-all hover:border-white/10 hover:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Prohibited Activities
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>Attempting to vote multiple times via alternative IDs.</li>
                <li>Executing Denial of Service (DoS) attacks on the reporting or casting endpoints.</li>
                <li>Distributing malicious links or malware disguised as election information.</li>
                <li>Selling or transferring your verified account credentials to a third party.</li>
              </ul>
            </div>
          </section>
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/" className="inline-block border border-white/10 hover:border-accent hover:bg-accent/10 px-8 py-3 rounded-full text-white font-semibold transition-all">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
