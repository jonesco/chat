import { useState, useRef, useEffect } from 'react';
import { Send, Mic, ArrowUp, Terminal, Link, Zap, FileText, BarChart, Paperclip, Wrench } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  hasChatStarted: boolean;
  chatPanelWidth: number;
}

export function ChatInput({ onSendMessage, hasChatStarted, chatPanelWidth }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [selectedMode, setSelectedMode] = useState('Ask');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isInputExpanded, setIsInputExpanded] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const modes = ['Ask', 'Plan', 'Analyze'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  return (
    <>
      {/* Gradient background overlay */}
      <div
        className="fixed bottom-0 left-12 h-80 pointer-events-none transition-all duration-300"
        style={{
          right: `${chatPanelWidth}px`,
          background: 'linear-gradient(to top, #161616 0%, rgba(22, 22, 22, 0.95) 20%, rgba(22, 22, 22, 0.8) 40%, rgba(22, 22, 22, 0.4) 70%, transparent 100%)'
        }}
      />
      
      <div
        className="fixed bottom-6 left-16 transition-all duration-300 px-2"
        style={{ right: `${chatPanelWidth + 16}px` }}
      >
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            {/* Animated border wrapper */}
            <div
              className={`relative p-[1px] animated-border group transition-all duration-300 ${isInputExpanded ? 'rounded-3xl' : 'rounded-full'}`}
              onMouseEnter={() => setIsInputExpanded(true)}
              onMouseLeave={() => setIsInputExpanded(false)}
              style={{ overflow: 'visible' }}
            >
              <div className={`bg-[#262626] shadow-lg relative z-10 transition-all duration-300 ${isInputExpanded ? 'rounded-3xl' : 'rounded-full'}`}>
                {/* First Row - Main Input */}
                <div className="flex items-center px-4 py-2.5 gap-3">
                  {/* Mode Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors text-xs"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span>{selectedMode}</span>
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute left-0 bottom-full mb-2 bg-[#262626] border border-[#393939] rounded-lg shadow-xl overflow-hidden min-w-[120px]">
                        {modes.map(mode => (
                          <button
                            key={mode}
                            type="button"
                            className="block w-full px-4 py-2 text-xs text-left text-gray-300 hover:bg-[#1a1a1a] transition-colors"
                            onClick={() => {
                              setSelectedMode(mode);
                              setIsDropdownOpen(false);
                            }}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Input */}
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="What can I help you find?"
                    className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-500"
                  />

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="p-2 hover:bg-[#1a1a1a] rounded-full transition-colors"
                      aria-label="Voice input"
                    >
                      <Mic className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      type="button"
                      className="p-2 hover:bg-[#1a1a1a] rounded-full transition-colors"
                      aria-label="Upload"
                    >
                      <ArrowUp className="w-4 h-4 text-gray-400" />
                    </button>
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className="p-2 hover:bg-[#1a1a1a] rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Send message"
                    >
                      <Send className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Second Row - Tools (shown when focused) */}
                <div className={`border-t border-[#393939] px-4 transition-all duration-500 ease-in-out ${isInputExpanded ? 'max-h-20 py-3 opacity-100 overflow-visible' : 'max-h-0 py-0 opacity-0 overflow-hidden'}`}>
                  <div className={`flex items-center gap-4 transition-opacity duration-300 ${isInputExpanded ? 'opacity-100 delay-150' : 'opacity-0'}`}>
                    <button
                      type="button"
                      className="relative group/tool p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors"
                      aria-label="Attachments"
                    >
                      <Paperclip className="w-4 h-4 text-gray-400" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#262626] border border-[#393939] rounded text-xs whitespace-nowrap opacity-0 group-hover/tool:opacity-100 transition-opacity pointer-events-none z-50">
                        Attachments
                      </span>
                    </button>
                    <button
                      type="button"
                      className="relative group/tool p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors"
                      aria-label="Commands"
                    >
                      <Terminal className="w-4 h-4 text-gray-400" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#262626] border border-[#393939] rounded text-xs whitespace-nowrap opacity-0 group-hover/tool:opacity-100 transition-opacity pointer-events-none z-50">
                        Commands
                      </span>
                    </button>
                    <button
                      type="button"
                      className="relative group/tool p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors"
                      aria-label="Tools"
                    >
                      <Wrench className="w-4 h-4 text-gray-400" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#262626] border border-[#393939] rounded text-xs whitespace-nowrap opacity-0 group-hover/tool:opacity-100 transition-opacity pointer-events-none z-50">
                        Tools
                      </span>
                    </button>
                    <button
                      type="button"
                      className="relative group/tool p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors"
                      aria-label="Documents"
                    >
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#262626] border border-[#393939] rounded text-xs whitespace-nowrap opacity-0 group-hover/tool:opacity-100 transition-opacity pointer-events-none z-50">
                        Documents
                      </span>
                    </button>
                    <button
                      type="button"
                      className="relative group/tool p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors"
                      aria-label="Analytics"
                    >
                      <BarChart className="w-4 h-4 text-gray-400" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#262626] border border-[#393939] rounded text-xs whitespace-nowrap opacity-0 group-hover/tool:opacity-100 transition-opacity pointer-events-none z-50">
                        Observation metrics
                      </span>
                    </button>
                    <button
                      type="button"
                      className="relative group/tool p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] transition-colors"
                      aria-label="Reasoning time"
                    >
                      <Zap className="w-4 h-4 text-gray-400" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-[#262626] border border-[#393939] rounded text-xs whitespace-nowrap opacity-0 group-hover/tool:opacity-100 transition-opacity pointer-events-none z-50">
                        Reasoning time
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <style>{`
        .animated-border {
          background: linear-gradient(
            90deg,
            #6f6f6f 0%,
            #6f6f6f 40%,
            #4589ff 48%,
            #4589ff 52%,
            #6f6f6f 60%,
            #6f6f6f 100%
          );
          background-size: 300% 100%;
          animation: borderWave 8s ease-in-out infinite;
          animation-delay: 2s;
        }
        
        .animated-border:hover {
          background: #4589ff;
          animation: none;
        }
        
        @keyframes borderWave {
          0% {
            background-position: -200% 0%;
          }
          100% {
            background-position: 100% 0%;
          }
        }
      `}</style>
    </>
  );
}

// Made with Bob
