import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full py-24 lg:py-32 xl:py-48 overflow-hidden bg-primary dark:bg-primary text-white flex flex-col items-center text-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-hover to-primary opacity-80" />
          <div className="absolute -top-48 -left-48 h-96 w-96 rounded-full bg-accent opacity-20 blur-3xl" />
          <div className="absolute top-1/2 -right-48 h-96 w-96 rounded-full bg-blue-400 opacity-20 blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto space-y-8 mt-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Secure Digital <span className="text-accent">Voting System</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl font-medium text-gray-200 sm:text-2xl">
            Vote safely, transparently, and securely from anywhere. Your voice matters.
          </p>
          
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 pt-8">
            <Link href="/login">
              <Button size="lg" variant="success" className="font-bold min-w-[200px] shadow-lg">
                Voter Login
              </Button>
            </Link>
            <Link href="/login?role=admin">
              <Button size="lg" className="bg-white/10 text-white hover:bg-white/20 border border-white/20 font-bold min-w-[200px] backdrop-blur-sm">
                Admin Login
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 dark:hover:bg-white/10 min-w-[200px]">
                Register as Voter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-28 bg-white dark:bg-primary/95 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl text-center">
            About the Election
          </h2>
          <p className="text-lg leading-8 text-gray-600 dark:text-gray-300 text-center">
            Welcome to the Annual General Election. This digital platform ensures every eligible voter has a secure, anonymous, and verifiable way to cast their vote. We aim to modernize the democratic process and increase participation through accessible technology.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section id="security" className="py-20 lg:py-28 bg-gray-50 dark:bg-primary-hover px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Enterprise-Grade Security Features
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              We employ advanced cryptography to guarantee the integrity of your vote.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-primary p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
              <div className="bg-blue-100 dark:bg-blue-900/40 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-primary dark:text-blue-400">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">One Vote Per User</h3>
              <p className="text-gray-600 dark:text-gray-400">Strict one-user, one-vote enforcement using strong identity verification and state management.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white dark:bg-primary p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
              <div className="bg-green-100 dark:bg-green-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-accent dark:text-green-400">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Tamper-Proof</h3>
              <p className="text-gray-600 dark:text-gray-400">Once cast, votes are stored permanently in a secure database structure, preventing any unauthorized edits.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white dark:bg-primary p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow">
              <div className="bg-purple-100 dark:bg-purple-900/30 w-14 h-14 rounded-xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Secure Auth</h3>
              <p className="text-gray-600 dark:text-gray-400">NextAuth verification processes employing JWT tokens ensures only eligible users gain access.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
