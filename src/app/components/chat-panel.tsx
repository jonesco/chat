import { Message } from '@/app/App';
import { Sparkles, MoreVertical, X, Plus, History } from 'lucide-react';
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';
import { TicketArtifact } from './ticket-artifact';

interface ChatPanelProps {
  messages: Message[];
  width: number;
  onWidthChange: (width: number) => void;
  onClose: () => void;
  onOpenTearsheet: (title: string, ticketId: string) => void;
  onNewChat: () => void;
}

export function ChatPanel({ messages, width, onWidthChange, onClose, onOpenTearsheet, onNewChat }: ChatPanelProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const starterContentRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to show latest content when messages change
  useLayoutEffect(() => {
    if (messages.length > 0 && scrollContainerRef.current) {
      // Scroll to the bottom to show latest message
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaX = startXRef.current - e.clientX;
      const newWidth = Math.min(640, Math.max(320, startWidthRef.current + deltaX));
      onWidthChange(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'ew-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizing, onWidthChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
  };

  return (
    <div
      className="fixed right-0 top-12 bg-[#1a1a1a] border-l border-[#262626] flex flex-col"
      style={{ width: `${width}px`, height: 'calc(100vh - 3rem)' }}
    >
      {/* Resize handle */}
      <div
        className={`absolute left-0 top-0 h-full w-1 cursor-ew-resize transition-colors ${
          isHovering || isResizing ? 'bg-blue-500' : 'bg-transparent hover:bg-blue-500/50'
        }`}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      />

      {/* Header with new chat, history, and close buttons */}
      <div className="flex items-center justify-between p-3 border-b border-[#262626]">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onNewChat}
              className="p-1.5 hover:bg-[#262626] rounded transition-colors"
              aria-label="New chat"
            >
              <Plus className="w-4 h-4 text-gray-400 hover:text-white" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">New chat</TooltipContent>
        </Tooltip>
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="p-1.5 hover:bg-[#262626] rounded transition-colors"
                aria-label="History"
              >
                <History className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">History</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-[#262626] rounded transition-colors"
                aria-label="Hide chat"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">Hide chat</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Chat Messages and Widgets */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Metric cards - always visible */}
        <div ref={starterContentRef} className="space-y-3">
          {/* Header */}
          <div className="mb-4">
            <div className="text-sm text-white font-medium">At a glance</div>
            <div className="text-xs text-gray-500">
              {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}, {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
          {/* Row 1 - Availability and Error Budget */}
          <div className="grid grid-cols-2 gap-3">
            {/* Availability */}
            <div className="bg-[#0d0d0d] border border-[#262626] rounded-lg p-3 cursor-pointer hover:border-[#404040] transition-colors">
              <div className="text-xs text-gray-400 mb-2">Availability</div>
              <div className="flex items-baseline gap-2">
                <span className="text-yellow-500">&#9888;</span>
                <span className="text-2xl font-semibold text-white">99.21%</span>
              </div>
              <div className="text-xs text-red-400 mt-1">&#9660; 0.4%</div>
              <div className="text-xs text-gray-500 mt-1">Target: 99.94%</div>
            </div>

            {/* Error Budget */}
            <div className="bg-[#0d0d0d] border border-[#262626] rounded-lg p-3 cursor-pointer hover:border-[#404040] transition-colors">
              <div className="text-xs text-gray-400 mb-2">Error budget</div>
              <div className="flex items-baseline gap-2">
                <span className="text-red-500">&#9679;</span>
                <span className="text-2xl font-semibold text-white">4.3min</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Budget: 504min</div>
            </div>
          </div>

          {/* MTTR */}
          <div className="bg-[#0d0d0d] border border-[#262626] rounded-lg p-3 cursor-pointer hover:border-[#404040] transition-colors">
            <div className="text-xs text-gray-400 mb-2">MTTR</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-green-500">&#10003;</span>
                  <span className="text-2xl font-semibold text-white">38min</span>
                </div>
                <div className="text-xs text-green-400 mt-1">&#9660; 8</div>
                <div className="text-xs text-gray-500 mt-1">SLO: 54min</div>
              </div>
              <div className="h-8 w-24 flex items-end gap-px">
                {[40, 45, 42, 38, 44, 40, 36, 38, 35, 38, 40, 36].map((h, i) => (
                  <div key={i} className="flex-1 bg-green-500/60 rounded-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Cost */}
          <div className="bg-[#0d0d0d] border border-[#262626] rounded-lg p-3 cursor-pointer hover:border-[#404040] transition-colors">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-500">&#9672;</span>
              <span className="text-xs text-white font-medium">Cost</span>
            </div>
            <div className="text-xs text-gray-400 mb-1">Total cluster cost</div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-semibold text-white">$5,331</span>
                <div className="text-xs text-green-400 mt-1">&#9660; 4</div>
              </div>
              <div className="h-8 w-24 flex items-end gap-px">
                {[60, 55, 58, 52, 50, 54, 48, 52, 50, 48, 52, 50].map((h, i) => (
                  <div key={i} className="flex-1 bg-green-500/60 rounded-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat messages - shown below metric cards when conversation exists */}
        {messages.length > 0 && (
          <div className="pt-2">
            {messages.map((message, index) => (
              <div key={message.id}>
                {/* User message header */}
                {message.sender === 'user' && (
                  <div className="text-xs text-gray-500 text-right mb-2 mt-4 first:mt-0">
                    You 12:21
                  </div>
                )}

                {/* AI message header */}
                {message.sender === 'ai' && (
                  <div className="flex items-center gap-2 mb-2 mt-4">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-gray-400">
                      watsonx 12:21 | View reasoning
                    </span>
                  </div>
                )}

                <ChatMessage message={message} />

                {/* Ticket artifact after each AI response */}
                {message.sender === 'ai' && (
                  <div className="mt-4 mb-8">
                    <TicketArtifact
                      title="Congestion prediction"
                      ticketId="NEHON67250F982T"
                      badge="AI"
                      onViewMore={() => onOpenTearsheet('Congestion prediction', 'NEHON67250F982T')}
                    />
                  </div>
                )}
              </div>
            ))}

            {/* Scroll anchor for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
    </div>
  );
}

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div className="bg-[#0d0d0d] border border-[#262626] rounded-lg p-3">
        <p className="text-xs text-gray-300 leading-relaxed">{message.content}</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0d0d0d] border border-[#262626] rounded-lg p-3">
      <p className="text-xs text-gray-300 leading-relaxed">{message.content}</p>
    </div>
  );
}

// Made with Bob
