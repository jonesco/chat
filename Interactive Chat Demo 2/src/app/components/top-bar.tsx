import { HelpCircle, ExternalLink } from 'lucide-react';

interface TopBarProps {
  hasChatStarted: boolean;
}

export function TopBar({ hasChatStarted }: TopBarProps) {
  return (
    <div className="h-12 border-b border-[#262626] flex items-center justify-between px-4">
      {/* Left - Logo */}
      <div className="text-sm">IBM Network Intelligence</div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#262626] transition-colors">
          <HelpCircle className="w-5 h-5 text-gray-400" />
        </button>
        {!hasChatStarted && (
          <button className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors">
            <ExternalLink className="w-4 h-4 text-white" />
          </button>
        )}
      </div>
    </div>
  );
}