import Image from 'next/image';

interface CandidateCardProps {
  id: string;
  name: string;
  party: string;
  photo: string;
  manifesto: string;
  onVote?: () => void;
  hideVoteButton?: boolean;
}

export function CandidateCard({ id, name, party, photo, manifesto, onVote, hideVoteButton = false }: CandidateCardProps) {
  return (
    <div className="group h-full flex flex-col overflow-hidden rounded-3xl bg-gray-900/40 backdrop-blur-md shadow-lg border border-white/5 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:-translate-y-2 transition-all duration-300">
      
      {/* Top Section / Photo */}
      <div className="flex flex-col items-center pt-8 pb-4 relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent"></div>
        <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-gray-800 group-hover:border-accent transition-colors duration-300 shadow-xl z-10">
          {photo ? (
            <img 
              src={photo} 
              alt={name} 
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-800 text-gray-400">
              <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>
      </div>
      
      {/* Content Section */}
      <div className="flex flex-1 flex-col px-8 pb-8 text-center relative z-10">
        <div className="flex-1 flex flex-col items-center">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
            {name}
          </h3>
          <span className="inline-block rounded-full bg-blue-900/30 px-3 py-1 text-xs font-semibold text-blue-300 mb-4 border border-blue-500/20">
            {party}
          </span>
          <p className="text-sm text-gray-400 line-clamp-4 leading-relaxed mb-6 italic">
            "{manifesto}"
          </p>
        </div>
        
        {!hideVoteButton && (
          <div className="mt-auto w-full">
            <button 
              onClick={onVote}
              className="w-full py-3.5 rounded-full bg-accent/10 hover:bg-accent text-accent hover:text-white font-bold border border-accent/20 hover:border-accent transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.0)] hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              Vote for {name}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
