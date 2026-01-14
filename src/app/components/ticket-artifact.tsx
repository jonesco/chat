import { ExternalLink } from 'lucide-react';

interface TicketArtifactProps {
  title: string;
  ticketId: string;
  badge?: string;
  onViewMore?: () => void;
}

export function TicketArtifact({ 
  title, 
  ticketId, 
  badge = 'AI',
  onViewMore 
}: TicketArtifactProps) {
  return (
    <div className="bg-[#0d0d0d] border border-[#404040] rounded-xl p-6 hover:border-[#505050] transition-colors">
      {/* Header with title and badge */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-base font-normal text-white">{title}</h3>
        <div className="px-2 py-0.5 bg-white text-black text-xs font-semibold rounded">
          {badge}
        </div>
      </div>
      
      {/* Ticket ID */}
      <div className="text-sm text-gray-400 mb-8 font-mono">
        {ticketId}
      </div>
      
      {/* Divider line */}
      <div className="border-t border-[#404040] mb-6" />
      
      {/* View more button */}
      <button
        onClick={onViewMore}
        className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-400 transition-colors group"
      >
        <span>View more</span>
        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </div>
  );
}

// Made with Bob
