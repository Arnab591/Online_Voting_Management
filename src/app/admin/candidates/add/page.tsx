import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AddCandidate() {
  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50 dark:bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl bg-white dark:bg-primary-hover p-8 sm:p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
        
        <div className="mb-8 flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-gray-400 hover:text-primary dark:hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Candidate</h1>
        </div>

        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Candidate Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="relative block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-primary sm:text-sm sm:leading-6 transition-all"
              placeholder="Full Name"
            />
          </div>

          <div>
            <label htmlFor="party" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Party / Affiliation
            </label>
            <input
              type="text"
              id="party"
              name="party"
              required
              className="relative block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-primary sm:text-sm sm:leading-6 transition-all"
              placeholder="e.g. Community Unity"
            />
          </div>

          <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Upload Photo URL (or File)
            </label>
            <input
              type="text"
              id="photo"
              name="photo"
              className="relative block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-primary sm:text-sm sm:leading-6 transition-all"
              placeholder="https://..."
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">For mock purposes, just use an image URL.</p>
          </div>

          <div>
            <label htmlFor="manifesto" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Manifesto
            </label>
            <textarea
              id="manifesto"
              name="manifesto"
              rows={4}
              required
              className="relative block w-full rounded-lg border-0 py-2.5 px-3 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-primary dark:bg-primary sm:text-sm sm:leading-6 transition-all"
              placeholder="Candidate's promises and goals..."
            />
          </div>

          <div className="pt-4">
            <Link href="/admin/dashboard">
              <Button type="button" fullWidth size="lg">
                Add Candidate
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
