'use client';

import Link from 'next/link';

export default function SecurityAuditPage() {
  return (
    <div className="w-full bg-primary font-sans min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-gray-300">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">Security Audit & Transparency</h1>
          <p className="text-xl text-gray-400">Review our core security protocols, infrastructure compliance, and open transparency reports.</p>
        </div>

        <div className="space-y-12">
          
          {/* Section 1 */}
          <section className="bg-gray-900/60 backdrop-blur-lg border border-white/5 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-accent mb-6 flex items-center gap-3">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Cryptographic Integrity
            </h2>
            <div className="space-y-4">
              <p>
                Our voting system employs military-grade cryptographic hashing to secure every ballot. When a user casts a vote against a candidate, the system generates an immutable, unique hash signature based on the user's secure E-ID and a randomized cryptographic salt.
              </p>
              <p>
                This ensures that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li>Votes cannot be intercepted or modified in transit.</li>
                <li>The database administrator cannot link a specific vote back to a clear-text user identity without multiple fragmented decryption keys stored offline.</li>
                <li>The anonymity of the voter is preserved at all costs.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-gray-900/60 backdrop-blur-lg border border-white/5 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-3">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Infrastructure & Compliance
            </h2>
            <div className="space-y-4">
              <p>
                We run on a multi-layered infrastructure hosted in highly secure, physically guarded data centers. We comply with international standards for digital election platforms.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-400">
                <li><strong>ISO/IEC 27001 Certified:</strong> We maintain strict Information Security Management Protocols.</li>
                <li><strong>GDPR Compliant:</strong> We do not sell or harness your voter metadata. All unnecessary tracking telemetry is disabled by default.</li>
                <li><strong>DDoS Mitigation:</strong> Enterprise-grade web application firewalls (WAF) automatically filter malicious bot traffic.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-gray-900/60 backdrop-blur-lg border border-white/5 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
              </svg>
              Independent Third-Party Audits
            </h2>
            <div className="space-y-4">
              <p>
                To maintain public trust, the Secure Digital Voting System undergoes rigorous biometric and software logic tests conducted by independent, non-partisan cybersecurity groups.
              </p>
              <div className="bg-gray-800/50 p-4 rounded-xl border border-white/10 mt-4">
                <p className="text-sm font-mono text-gray-400 mb-1">Latest Audit: Q3 2026</p>
                <p className="font-semibold text-white">Result: PASSED seamlessly with 0 critical vulnerabilities.</p>
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
