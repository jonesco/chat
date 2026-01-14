import { Message } from '@/app/App';
import { Sparkles, MoreVertical } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface ChatPanelProps {
  messages: Message[];
  width: number;
  onWidthChange: (width: number) => void;
}

export function ChatPanel({ messages, width, onWidthChange }: ChatPanelProps) {
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
      className="fixed right-0 top-0 h-screen bg-[#1a1a1a] border-l border-[#262626] flex flex-col"
      style={{ width: `${width}px` }}
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

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Initial system message */}
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

        {/* Example AI card */}
        {messages.length >= 2 && (
          <div className="bg-[#0d0d0d] border border-[#262626] rounded-lg p-4 mt-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-xs">Congestion prediction</span>
              </div>
              <button className="p-1 hover:bg-[#262626] rounded">
                <MoreVertical className="w-3 h-3 text-gray-500" />
              </button>
            </div>
            <div className="text-xs text-gray-400 mb-3">NEHON67250F9B2T</div>
            <button className="text-xs text-blue-500 hover:text-blue-400 flex items-center gap-1">
              View more
              <span className="text-xs">→</span>
            </button>
            <div className="mt-3 text-xs text-gray-300 leading-relaxed">
              Based on historical traffic patterns and current network load trends,
              the ongoing cell NEHON67250F9B2T congestion conditions are likely to
              reoccur within the next 24 hours.
            </div>
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