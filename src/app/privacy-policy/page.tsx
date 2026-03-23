import Link from 'next/link';
import { Shield, Lock, EyeOff } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-primary font-sans min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-gray-300">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-6 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <Shield className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">How we collect, use, and protect your personal information.</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-all hover:border-white/10 hover:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6 text-accent" />
              Information We Collect
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>We only collect the absolute minimum data required to verify your eligibility to vote. This includes your unique Identification Number, verified email address, and active election status.</p>
              <p>We <strong>do not</strong> track your IP location to a granular level, and we do not monitor your device footprint beyond basic compatibility checks for security.</p>
            </div>
          </section>

          <section className="bg-gray-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-all hover:border-white/10 hover:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <EyeOff className="w-6 h-6 text-purple-400" />
              How We Protect It
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>All transmitted data is encrypted via state-of-the-art TLS 1.3 tunnels. Your final vote is cryptographically separated from your PII (Personally Identifiable Information) rendering it permanently anonymous.</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-500 mt-4">
                <li>End-to-End Encryption on all database traffic.</li>
                <li>Zero-knowledge proof integrations.</li>
                <li>Automated daily wiping of temporary verification session logs.</li>
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
