import Link from 'next/link';
import { Sparkles, Library, HeartHandshake } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="w-full bg-primary font-sans min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-gray-300">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-6 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <Library className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">About Us</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Digitizing democracy efficiently with robust technology.</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-all hover:border-white/10 hover:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-yellow-400" />
              Our Mission
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>We created the Online Voting Management Platform out of a necessity to streamline complex college, local tier, and institutional level elections.</p>
              <p>Old paper-based votes carry risks of illegitimacy, massive printing costs, human counting errors, and geographical blocks.</p>
              <p>Our solution provides 100% remote voting verification securely across devices in English, Hindi, and Bengali.</p>
            </div>
          </section>

          <section className="bg-gray-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-all hover:border-white/10 hover:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <HeartHandshake className="w-6 h-6 text-pink-400" />
              Open Community
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>As strong believers in open-source infrastructure for civil infrastructure, a modified core version of this project codebase is designed for transparency. Our goal is not just building software, but nurturing trust within the entire electoral process dynamically.</p>
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
