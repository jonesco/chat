import { useState } from 'react';
import { Sidebar } from '@/app/components/sidebar';
import { TopBar } from '@/app/components/top-bar';
import { Dashboard } from '@/app/components/dashboard';
import { ChatPanel } from '@/app/components/chat-panel';
import { ChatInput } from '@/app/components/chat-input';

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatPanelWidth, setChatPanelWidth] = useState(320); // Default 320px

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const hasChatStarted = messages.length > 0;

  return (
    <div className="h-screen w-screen bg-[#161616] text-white flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <TopBar hasChatStarted={hasChatStarted} />

        {/* Dashboard */}
        <div 
          className="flex-1 overflow-auto transition-all duration-300"
          style={{ marginRight: hasChatStarted ? `${chatPanelWidth}px` : '0px' }}
        >
          <Dashboard />
        </div>

        {/* Chat Input */}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          hasChatStarted={hasChatStarted}
          chatPanelWidth={chatPanelWidth}
        />
      </div>

      {/* Chat Panel - Only visible when chat has started */}
      {hasChatStarted && (
        <ChatPanel 
          messages={messages} 
          width={chatPanelWidth}
          onWidthChange={setChatPanelWidth}
        />
      )}
    </div>
  );
}

// Generate simulated AI responses for network anomaly detection
function generateAIResponse(userInput: string): string {
  const lowerInput = userInput.toLowerCase();

  if (lowerInput.includes('spike') || lowerInput.includes('traffic')) {
    return 'I detected a traffic spike in the Atlantic City area. Analysis shows a 28% increase from baseline over the last 24 hours. Priority 1 - investigating potential DDoS activity on subnet 192.168.1.0/24.';
  }

  if (lowerInput.includes('anomaly') || lowerInput.includes('anomalies')) {
    return 'Current anomaly count: 645 total anomalies detected in the last 24 hours. Priority breakdown: 4 P1 events, 200 P2 events, and 443 P3 events. The Atlantic City region shows unusual activity patterns.';
  }

  if (lowerInput.includes('remediation') || lowerInput.includes('fix')) {
    return 'Recommended remediation steps: 1) Implement rate limiting on affected endpoints, 2) Update firewall rules to block suspicious IP ranges, 3) Enable enhanced monitoring on critical infrastructure. Estimated impact: 15-30 minutes downtime.';
  }

  if (lowerInput.includes('ticket') || lowerInput.includes('incident')) {
    return 'I found 3 related incidents: #3455633 (NRDC2B250F97AT - degraded), #3455632 (ongoing congestion), #3455631 (remediated). Would you like me to create a new ticket or update an existing one?';
  }

  if (lowerInput.includes('congestion')) {
    return 'Show me ongoing congestion in cell NEHON67250F9B2T predicted to continue.';
  }

  if (lowerInput.includes('status') || lowerInput.includes('network')) {
    return 'Network status overview: 645 total anomalies active. Priority 1: Atlantic City traffic spike (4 events). Priority 2: Cell congestion in NRDC region (200 events). Priority 3: Minor route fluctuations (443 events). All systems operational with degraded performance in 2 zones.';
  }

  return 'Based on historical traffic patterns and current network load trends, the ongoing cell NEHON67250F9B2T congestion conditions are likely to reoccur within the next 24 hours.';
}