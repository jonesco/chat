import { HelpCircle, MessageSquare } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

interface TopBarProps {
  hasChatStarted: boolean;
  isChatPanelOpen: boolean;
  onToggleChat: () => void;
}

export function TopBar({ hasChatStarted, isChatPanelOpen, onToggleChat }: TopBarProps) {
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-12 bg-[#161616] border-b border-[#262626] flex items-center justify-between px-4 z-30">
        {/* Left - Logo */}
        <div className="text-sm">IBM Network Intelligence</div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#262626] transition-colors">
            <HelpCircle className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Open chat button - positioned where close button would be */}
      {!isChatPanelOpen && (
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onToggleChat}
              className="fixed top-[60px] right-3 z-40 p-1.5 hover:bg-[#262626] rounded transition-colors bg-[#1a1a1a] border border-[#262626]"
              aria-label="Open chat"
            >
              <MessageSquare className="w-4 h-4 text-gray-400 hover:text-white" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="left">Open chat</TooltipContent>
        </Tooltip>
      )}
    </>
  );
}

// Made with Bob
