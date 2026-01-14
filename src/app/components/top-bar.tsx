import { HelpCircle, MessageSquare } from 'lucide-react';

interface TopBarProps {
  hasChatStarted: boolean;
  isChatPanelOpen: boolean;
  onToggleChat: () => void;
}

export function TopBar({ hasChatStarted, isChatPanelOpen, onToggleChat }: TopBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-[#161616] border-b border-[#262626] flex items-center justify-between px-4 z-30">
      {/* Left - Logo */}
      <div className="text-sm">IBM Network Intelligence</div>

      {/* Right - Actions */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#262626] transition-colors">
          <HelpCircle className="w-5 h-5 text-gray-400" />
        </button>
        <button
          onClick={onToggleChat}
          className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
            isChatPanelOpen
              ? 'bg-[#262626]'
              : 'hover:bg-[#262626]'
          }`}
          aria-label={isChatPanelOpen ? "Close chat" : "Open chat"}
        >
          <MessageSquare className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}

// Made with Bob
