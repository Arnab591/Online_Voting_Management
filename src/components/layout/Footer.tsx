import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-primary-hover py-8 mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center sm:flex-row sm:justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center sm:text-left">
          &copy; {new Date().getFullYear()} Secure Digital Voting System. All rights reserved.
        </p>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <Link href="#about" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
            About Election
          </Link>
          <Link href="#contact" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
            Contact
          </Link>
          <Link href="#rules" className="text-sm text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-white transition-colors">
            Rules
          </Link>
        </div>
      </div>
    </footer>
  );
}
