import { Message } from '@/app/App';
import { Sparkles, MoreVertical, X, Plus, History } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
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
        <button
          onClick={onNewChat}
          className="p-1.5 hover:bg-[#262626] rounded transition-colors"
          aria-label="New chat"
        >
          <Plus className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>
        <div className="flex items-center gap-1">
          <button
            className="p-1.5 hover:bg-[#262626] rounded transition-colors"
            aria-label="History"
          >
            <History className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#262626] rounded transition-colors"
            aria-label="Close chat"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-white" />
          </button>
        </div>
      </div>

      {/* Chat Messages or Widgets */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          /* Widgets when no conversation */
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400 mb-4">Explore</h3>
            
            {/* Widget 1 - Network Metrics */}
            <div className="bg-[#0d0d0d] border border-[#262626] rounded-lg p-4 hover:border-[#404040] transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-white">Network Metrics</span>
              </div>
              <p className="text-xs text-gray-400">View real-time network performance and health indicators</p>
            </div>

            {/* Widget 2 - Anomaly Detection */}
            <div className="bg-[#0d0d0d] border border-[#262626] rounded-lg p-4 hover:border-[#404040] transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-white">Anomaly Detection</span>
              </div>
              <p className="text-xs text-gray-400">AI-powered detection of network irregularities</p>
            </div>

            {/* Widget 3 - Traffic Analysis */}
            <div className="bg-[#0d0d0d] border border-[#262626] rounded-lg p-4 hover:border-[#404040] transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-white">Traffic Analysis</span>
              </div>
              <p className="text-xs text-gray-400">Analyze traffic patterns and congestion trends</p>
            </div>

            {/* Widget 4 - Incident Management */}
            <div className="bg-[#0d0d0d] border border-[#262626] rounded-lg p-4 hover:border-[#404040] transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-white">Incident Management</span>
              </div>
              <p className="text-xs text-gray-400">Track and manage network incidents and tickets</p>
            </div>
          </div>
        ) : (
          /* Chat messages when conversation exists */
          <>
            <div className="text-xs text-gray-500 text-right mb-2">
              You 12:21
            </div>

            {messages.map((message, index) => (
              <div key={message.id}>
                {index > 0 && message.sender === 'ai' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs text-gray-400">
                      watsonx 12:21 | View reasoning
                    </span>
                  </div>
                )}
                <ChatMessage message={message} />
              </div>
            ))}

            {/* Example ticket artifact */}
            {messages.length >= 2 && (
              <TicketArtifact
                title="Congestion prediction"
                ticketId="NEHON67250F982T"
                badge="AI"
                onViewMore={() => onOpenTearsheet('Congestion prediction', 'NEHON67250F982T')}
              />
            )}
          </>
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
