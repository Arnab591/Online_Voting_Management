import Link from 'next/link';
import { Mail, GraduationCap } from 'lucide-react';

export default function ContactPage() {
  const developers = [
    {
      name: "Raaz Ghosh",
      email: "RaazGhosh@gmail.com"
    },
    {
      name: "Arnab",
      email: "barnalichakrabarty8@gmail.com"
    },
    {
      name: "Srija",
      email: "srijagohs306@gmail.com"
    }
  ];

  return (
    <div className="w-full bg-primary font-sans min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-gray-300">
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-full mb-6 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.15)]">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">Contact Us</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Get in touch with the development team behind this secure infrastructure.</p>
        </div>

        <div className="space-y-8 mt-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {developers.map((dev, idx) => (
              <div 
                key={idx} 
                className="bg-gray-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center text-center transition-all duration-300 hover:-translate-y-2 hover:bg-gray-800/80 hover:border-white/20 group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-accent/20 border border-white/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-8 h-8 text-gray-300 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{dev.name}</h3>
                <a 
                  href={`mailto:${dev.email}`} 
                  className="text-sm text-gray-400 hover:text-accent flex items-center gap-2 mt-2 transition-colors break-all"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  {dev.email}
                </a>
              </div>
            ))}
          </div>

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
