import Link from 'next/link';
import { Scale, FileSignature } from 'lucide-react';

export default function LegalPage() {
  return (
    <div className="w-full bg-primary font-sans min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-gray-300">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-6 border border-white/10 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
            <Scale className="w-10 h-10 text-purple-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Legal Disclosures</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Copyright, intellectual property, and institutional guidelines.</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-all hover:border-white/10 hover:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FileSignature className="w-6 h-6 text-purple-400" />
              Platform Copyright & Ownership
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>The visual assets, cryptographic source logic, UI layouts, and branding of the Online Voting Management Platform are the exclusive property of its development group.</p>
              <p>No entity may scrape, reverse-engineer, or re-publish our web interfaces without express written authorization.</p>
              <div className="mt-8 bg-black/40 border border-white/5 p-6 rounded-2xl block text-sm font-mono text-gray-500">
                <span className="block text-white mb-2">Notice of Compliance Limit:</span>
                We are not liable for institutional voting laws applied by external entities that utilize this platform to count ballots artificially.
              </div>
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
