import { X } from 'lucide-react';
import { useEffect } from 'react';

interface TearsheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Tearsheet({ isOpen, onClose, title, children }: TearsheetProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - only covers left side, not chat panel, below header */}
      <div
        className="fixed top-12 bottom-0 left-0 bg-black/50 z-40 transition-opacity"
        style={{ right: 'var(--chat-panel-width, 320px)' }}
        onClick={onClose}
      />
      
      {/* Tearsheet - positioned to not cover chat panel or header */}
      <div
        className="fixed top-12 bottom-0 left-0 z-50 flex"
        style={{ right: 'var(--chat-panel-width, 320px)' }}
      >
        <div className="w-full bg-[#161616] shadow-2xl flex flex-col animate-slide-in">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#262626]">
            <h2 className="text-lg font-medium text-white">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#262626] rounded transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {children}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#262626]">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-white hover:bg-[#262626] rounded transition-colors"
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// Made with Bob
