import Link from 'next/link';
import { Cookie, Info } from 'lucide-react';

export default function CookiePolicyPage() {
  return (
    <div className="w-full bg-primary font-sans min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-gray-300">
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-6 border border-white/10 shadow-[0_0_30px_rgba(236,72,153,0.15)]">
            <Cookie className="w-10 h-10 text-pink-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Cookie Policy</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Our transparent approach to localized session data management.</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-all hover:border-white/10 hover:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Info className="w-6 h-6 text-pink-400" />
              Essential Session State Only
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>Because privacy and security are paramount in voting, we <strong>do not use targeted advertising cookies</strong>. Third-party trackers (like Google Analytics, Facebook Pixel) are explicitly blocked.</p>
              <h3 className="text-white font-semibold mt-6 mb-2">Cookies & Storage used:</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><code className="text-pink-300 text-sm">preferredLanguage</code>: (localStorage) Remembers if you switched to Hindi or Bengali to save UI load lag next time.</li>
                <li><code className="text-pink-300 text-sm">auth_session_id</code>: (Secure HTTPS-only Cookie) To authorize your browser for exactly the duration of casting your ballot. It's wiped post-submission.</li>
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
