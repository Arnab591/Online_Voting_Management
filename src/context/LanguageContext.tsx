'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import t, { LangCode, AnyTranslations } from '@/lib/translations';

interface LanguageContextType {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  tr: AnyTranslations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  tr: t['en'],
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>('en');

  useEffect(() => {
    const saved = localStorage.getItem('preferredLang') as LangCode | null;
    if (saved && ['en', 'hi', 'bn'].includes(saved)) {
      setLangState(saved);
    }
  }, []);

  // Keep data-lang on <html> in sync for font targeting
  useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang);
  }, [lang]);

  const setLang = (code: LangCode) => {
    setLangState(code);
    localStorage.setItem('preferredLang', code);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
