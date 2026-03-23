import Link from 'next/link';
import { useTranslation } from '@/context/LanguageContext';

export function Footer() {
  const { tr } = useTranslation();
  return (
    <footer className="w-full bg-primary-hover border-t border-white/5 py-10 text-gray-400 mt-auto">
      <div className="w-full px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        
        {/* Extreme Left: Copyright */}
        <div className="w-full md:w-1/3 text-center md:text-left flex-shrink-0">
          <p className="text-sm font-medium tracking-wide">
            {tr.footer.rights}
          </p>
        </div>

        {/* Center: Legal & Policies */}
        <div className="w-full md:w-1/3 flex justify-center flex-wrap gap-x-6 gap-y-2">
          <Link href="/privacy-policy" className="text-sm hover:text-accent transition-colors duration-200">
            {tr.footer.privacy}
          </Link>
          <Link href="/terms-of-use" className="text-sm hover:text-accent transition-colors duration-200">
            {tr.footer.terms}
          </Link>
          <Link href="/legal" className="text-sm hover:text-accent transition-colors duration-200">
            {tr.footer.legal}
          </Link>
          <Link href="/accessibility" className="text-sm hover:text-accent transition-colors duration-200">
            {tr.footer.accessibility}
          </Link>
          <Link href="/cookie-policy" className="text-sm hover:text-accent transition-colors duration-200">
            {tr.footer.cookies}
          </Link>
        </div>

        {/* Extreme Right: Contextual Links */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end flex-wrap gap-x-6 gap-y-2 flex-shrink-0">
          <Link href="/about" className="text-sm hover:text-white transition-colors duration-200">
            {tr.footer.about}
          </Link>
          <Link href="/election-rules" className="text-sm hover:text-white transition-colors duration-200">
            {tr.footer.rules}
          </Link>
          <Link href="/contact" className="text-sm hover:text-white transition-colors duration-200">
            {tr.footer.contact}
          </Link>
        </div>

      </div>
    </footer>
  );
}
