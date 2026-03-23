import Link from 'next/link';
import { Settings, MousePointerClick, Maximize } from 'lucide-react';

export default function AccessibilityPage() {
  return (
    <div className="w-full bg-primary font-sans min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-gray-300">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-6 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <Settings className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Accessibility Features</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Ensuring an inclusive voting experience for all demographics.</p>
        </div>

        <div className="space-y-8">
          <section className="bg-gray-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-all hover:border-white/10 hover:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <MousePointerClick className="w-6 h-6 text-accent" />
              Keyboard Navigation
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>Every interactive element of the ballot casting UI can be controlled using standard keyboard navigation (Tab, Enter, Space). We follow W3C ARIA standards.</p>
            </div>
          </section>

          <section className="bg-gray-900/60 backdrop-blur-xl border border-white/5 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl transition-all hover:border-white/10 hover:bg-gray-900/80">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Maximize className="w-6 h-6 text-blue-400" />
              Screen Readers & High Contrast
            </h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <ul className="list-disc pl-6 space-y-2">
                <li>Compatible with major screen reading software including JAWS, NVDA, and VoiceOver.</li>
                <li>Design colors natively guarantee WCAG AAA contrast ratios.</li>
                <li>Font size scalability without breaking layout or overlapping candidate names.</li>
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
