import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-primary-hover border-t border-white/5 py-10 text-gray-400 mt-auto">
      <div className="w-full px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        
        {/* Extreme Left: Copyright */}
        <div className="w-full md:w-1/3 text-center md:text-left flex-shrink-0">
          <p className="text-sm font-medium tracking-wide">
            &copy; 2026 Secure Digital Voting System. All rights reserved.
          </p>
        </div>

        {/* Center: Legal & Policies */}
        <div className="w-full md:w-1/3 flex justify-center flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacy" className="text-sm hover:text-accent transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link href="/terms" className="text-sm hover:text-accent transition-colors duration-200">
            Terms of Use
          </Link>
          <Link href="/legal" className="text-sm hover:text-accent transition-colors duration-200">
            Legal
          </Link>
          <Link href="/accessibility" className="text-sm hover:text-accent transition-colors duration-200">
            Accessibility
          </Link>
          <Link href="/cookies" className="text-sm hover:text-accent transition-colors duration-200">
            Cookie Policy
          </Link>
        </div>

        {/* Extreme Right: Contextual Links */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end flex-wrap gap-x-6 gap-y-2 flex-shrink-0">
          <Link href="#about" className="text-sm hover:text-white transition-colors duration-200">
            About
          </Link>
          <Link href="#rules" className="text-sm hover:text-white transition-colors duration-200">
            Election Rules
          </Link>
          <Link href="#contact" className="text-sm hover:text-white transition-colors duration-200">
            Contact
          </Link>
        </div>

      </div>
    </footer>
  );
}
