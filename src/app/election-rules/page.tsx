import Link from 'next/link';
import { FileText, CalendarCheck, FileCheck } from 'lucide-react';

export default function ElectionRulesPage() {
  return (
    <div className="w-full bg-primary font-sans min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-gray-300">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-6 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Standard Election Rules</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Universal guidelines to preserve validity and fairness.</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-all hover:border-white/10 hover:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <CalendarCheck className="w-6 h-6 text-blue-400" />
              1. Voting Window Compliance
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>Votes must be submitted precisely between the designated opening and closing timestamps assigned to an active election.</p>
              <p>Network delay or local clock mismatches do not entitle a voter to a late ballot admission. Synchronize your internet and submit your choice 10 minutes prior to the physical system lockout window.</p>
            </div>
          </section>

          <section className="bg-gray-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-all hover:border-white/10 hover:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <FileCheck className="w-6 h-6 text-accent" />
              2. Ballot Irrevocability
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>Because your vote immediately gets mixed via cryptographic hashing to protect your anonymity against database administrators, <strong>you cannot undo or change your candidate once confirmed</strong>. Please double-check the manifesto prior to clicking.</p>
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
