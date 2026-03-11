import Image from 'next/image';
import { Button } from './Button';

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
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 dark:bg-primary-hover dark:border-gray-800">
      <div className="flex flex-col sm:flex-row h-full">
        {/* Photo Section */}
        <div className="relative h-48 sm:h-auto sm:w-1/3 flex-shrink-0 bg-gray-100 dark:bg-gray-800 overflow-hidden">
          {photo ? (
            <img 
              src={photo} 
              alt={name} 
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-primary dark:bg-blue-900/30 dark:text-blue-300 mb-4">
              {party}
            </span>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
              "{manifesto}"
            </p>
          </div>
          
          {!hideVoteButton && (
            <div className="mt-6">
              <Button variant="success" fullWidth onClick={onVote}>
                Vote for {name}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
