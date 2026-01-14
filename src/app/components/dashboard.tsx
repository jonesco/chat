import { TrendingUp, ArrowDown } from 'lucide-react';

export function Dashboard() {
  return (
    <div className="p-8 pb-96">
      {/* Welcome */}
      <h1 className="text-2xl mb-10">Welcome, Hazel</h1>

      {/* Top Priorities */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base">Your top priorities</h2>
          <button className="text-blue-500 text-xs hover:text-blue-400 flex items-center gap-1">
            View all recommendations
            <span>→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
          <PriorityCard title="Unusual spike in anomalies detected in the Atlantic City area." />
          <PriorityCard title="Ongoing congestion in cell NEHON67250F9B2T predicted to continue." />
          <PriorityCard title="New remediation options added to ticket #3455633." />
          <PriorityCard title="RRC Success Rate in cell NEHON67250F9B2T has degraded over the past four days." />
        </div>
      </div>

      {/* Anomaly Detection */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base">Anomaly detection</h2>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Timeframe</span>
            <select className="bg-transparent border border-[#393939] rounded px-3 py-1 text-xs">
              <option>Last 24 hrs</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Map Section */}
          <div className="lg:col-span-2 space-y-4">
            {/* Map Visualization */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
              <div className="h-64 bg-[#0d0d0d] rounded relative overflow-hidden">
                {/* Dot pattern background */}
                <div className="absolute inset-0">
                  <svg className="w-full h-full" viewBox="0 0 800 256">
                    {/* Generate dot pattern */}
                    {Array.from({ length: 30 }).map((_, row) =>
                      Array.from({ length: 80 }).map((_, col) => (
                        <circle
                          key={`${row}-${col}`}
                          cx={col * 10 + 5}
                          cy={row * 8.5 + 5}
                          r="0.8"
                          fill="#1e3a8a"
                          opacity={Math.random() * 0.6 + 0.2}
                        />
                      ))
                    )}
                    
                    {/* Priority markers */}
                    <circle cx="500" cy="60" r="4" fill="#ef4444">
                      <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx="550" cy="120" r="3" fill="#f97316" />
                    <circle cx="600" cy="100" r="3" fill="#f97316" />
                    <circle cx="450" cy="140" r="2.5" fill="#fbbf24" />
                  </svg>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end">
                <button className="text-blue-500 text-xs hover:text-blue-400 flex items-center gap-1">
                  View all anomalies
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* Total Anomalies */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
              <div className="text-xs text-gray-400 mb-2">Total anomalies</div>
              <div className="flex items-end gap-2 mb-2">
                <div className="text-5xl font-light">645</div>
                <div className="text-xs text-gray-400 pb-2">in the last 24 hrs</div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowDown className="w-3 h-3 text-green-500" />
                <span className="text-xs text-green-500">28%</span>
                <span className="text-xs text-gray-400">decrease from previous 24 hrs</span>
              </div>
            </div>
          </div>

          {/* Priority Stats */}
          <div className="space-y-3">
            <PriorityStatCard priority="Priority 1" count={4} color="bg-red-500" />
            <PriorityStatCard priority="Priority 2" count={200} color="bg-orange-500" />
            <PriorityStatCard priority="Priority 3" count={443} color="bg-yellow-500" />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-8 border-b border-[#262626]">
          <TabItem label="Root cause analysis" active />
          <TabItem label="Remediation" />
          <TabItem label="Validation" />
        </div>

        {/* Tab Content - Root Cause Analysis */}
        <div className="mt-6 space-y-4">
          {/* Analysis Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnalysisCard
              title="Traffic Pattern Analysis"
              status="Completed"
              timestamp="2 hours ago"
              details="Unusual traffic spike detected in Atlantic City region. Patterns indicate potential DDoS activity originating from external sources."
            />
            <AnalysisCard
              title="Network Topology Review"
              status="In Progress"
              timestamp="30 minutes ago"
              details="Analyzing routing tables and network configuration for cells NEHON67250F9B2T and NRDC2B250F97AT."
            />
            <AnalysisCard
              title="Resource Utilization"
              status="Completed"
              timestamp="4 hours ago"
              details="CPU and memory utilization within normal ranges. Bandwidth saturation detected on subnet 192.168.1.0/24."
            />
            <AnalysisCard
              title="Historical Comparison"
              status="Pending"
              timestamp="5 minutes ago"
              details="Comparing current anomaly patterns with similar incidents from the past 90 days."
            />
          </div>

          {/* Incident Timeline */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
            <h3 className="text-sm mb-4">Incident Timeline</h3>
            <div className="space-y-4">
              <TimelineItem
                time="12:45 PM"
                title="Initial anomaly detected"
                description="Automated monitoring system flagged unusual traffic patterns in Atlantic City area."
                status="detected"
              />
              <TimelineItem
                time="12:52 PM"
                title="Alert escalated to Priority 1"
                description="Traffic spike exceeded 150% of normal baseline. Automatic escalation triggered."
                status="escalated"
              />
              <TimelineItem
                time="1:05 PM"
                title="Root cause identified"
                description="Analysis indicates potential DDoS attack from compromised devices in subnet range."
                status="identified"
              />
              <TimelineItem
                time="1:15 PM"
                title="Remediation initiated"
                description="Firewall rules updated. Rate limiting applied to affected endpoints."
                status="remediation"
              />
              <TimelineItem
                time="Ongoing"
                title="Monitoring recovery"
                description="Network performance returning to baseline. Continued observation required."
                status="monitoring"
              />
            </div>
          </div>

          {/* Affected Resources */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
            <h3 className="text-sm mb-4">Affected Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ResourceCard
                name="Cell NEHON67250F9B2T"
                type="Network Cell"
                status="Degraded"
                impact="High"
              />
              <ResourceCard
                name="Subnet 192.168.1.0/24"
                type="IP Range"
                status="Critical"
                impact="High"
              />
              <ResourceCard
                name="Gateway ATL-GW-01"
                type="Network Gateway"
                status="Operational"
                impact="Medium"
              />
              <ResourceCard
                name="Cell NRDC2B250F97AT"
                type="Network Cell"
                status="Degraded"
                impact="Medium"
              />
              <ResourceCard
                name="Load Balancer ATL-LB-03"
                type="Load Balancer"
                status="Operational"
                impact="Low"
              />
              <ResourceCard
                name="Router ATL-RTR-05"
                type="Router"
                status="Operational"
                impact="Low"
              />
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#262626]">
            <h3 className="text-sm mb-4">AI-Generated Recommendations</h3>
            <div className="space-y-3">
              <RecommendationItem
                priority="High"
                text="Implement additional rate limiting on ingress traffic to prevent future DDoS attacks"
              />
              <RecommendationItem
                priority="High"
                text="Review and update firewall rules to block identified malicious IP ranges"
              />
              <RecommendationItem
                priority="Medium"
                text="Increase monitoring frequency for Atlantic City region over the next 48 hours"
              />
              <RecommendationItem
                priority="Medium"
                text="Schedule capacity planning review for affected network cells"
              />
              <RecommendationItem
                priority="Low"
                text="Document incident response process for future reference and training"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PriorityCardProps {
  title: string;
}

function PriorityCard({ title }: PriorityCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-4 hover:border-[#393939] transition-colors cursor-pointer group relative">
      <p className="text-xs text-gray-300 leading-relaxed pr-6">{title}</p>
      <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity">
        <TrendingUp className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

interface PriorityStatCardProps {
  priority: string;
  count: number;
  color: string;
}

function PriorityStatCard({ priority, count, color }: PriorityStatCardProps) {
  return (
    <div className="bg-[#1a1a1a] border border-[#262626] rounded-lg p-5">
      <div className="text-xs text-gray-400 mb-3">{priority}</div>
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${color}`} />
        <div className="text-3xl font-light">{count}</div>
      </div>
    </div>
  );
}

interface TabItemProps {
  label: string;
  active?: boolean;
}

function TabItem({ label, active }: TabItemProps) {
  return (
    <button
      className={`pb-3 text-xs transition-colors border-b-2 ${
        active
          ? 'border-white text-white'
          : 'border-transparent text-gray-500 hover:text-gray-300'
      }`}
    >
      {label}
    </button>
  );
}

interface AnalysisCardProps {
  title: string;
  status: string;
  timestamp: string;
  details: string;
}

function AnalysisCard({ title, status, timestamp, details }: AnalysisCardProps) {
  const statusColor = 
    status === 'Completed' ? 'text-green-500' :
    status === 'In Progress' ? 'text-blue-500' : 'text-gray-500';

  return (
    <div className="bg-[#0d0d0d] border border-[#262626] rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm">{title}</h4>
        <span className={`text-xs ${statusColor}`}>{status}</span>
      </div>
      <p className="text-xs text-gray-500 mb-3">{timestamp}</p>
      <p className="text-xs text-gray-400 leading-relaxed">{details}</p>
    </div>
  );
}

interface TimelineItemProps {
  time: string;
  title: string;
  description: string;
  status: string;
}

function TimelineItem({ time, title, description, status }: TimelineItemProps) {
  const statusColors: { [key: string]: string } = {
    detected: 'bg-yellow-500',
    escalated: 'bg-red-500',
    identified: 'bg-orange-500',
    remediation: 'bg-blue-500',
    monitoring: 'bg-green-500',
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-2 h-2 rounded-full ${statusColors[status] || 'bg-gray-500'}`} />
        <div className="w-px h-full bg-[#262626] mt-2" />
      </div>
      <div className="flex-1 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-gray-500">{time}</span>
          <span className="text-xs">•</span>
          <span className="text-xs">{title}</span>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

interface ResourceCardProps {
  name: string;
  type: string;
  status: string;
  impact: string;
}

function ResourceCard({ name, type, status, impact }: ResourceCardProps) {
  const statusColor =
    status === 'Critical' ? 'text-red-500' :
    status === 'Degraded' ? 'text-orange-500' : 'text-green-500';

  const impactColor =
    impact === 'High' ? 'bg-red-500' :
    impact === 'Medium' ? 'bg-orange-500' : 'bg-yellow-500';

  return (
    <div className="bg-[#0d0d0d] border border-[#262626] rounded-lg p-4">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="text-xs mb-1">{name}</h4>
          <p className="text-xs text-gray-500">{type}</p>
        </div>
        <div className={`w-2 h-2 rounded-full ${impactColor}`} />
      </div>
      <div className="mt-3">
        <span className={`text-xs ${statusColor}`}>{status}</span>
      </div>
    </div>
  );
}

interface RecommendationItemProps {
  priority: string;
  text: string;
}

function RecommendationItem({ priority, text }: RecommendationItemProps) {
  const priorityColor =
    priority === 'High' ? 'bg-red-500' :
    priority === 'Medium' ? 'bg-orange-500' : 'bg-yellow-500';

  return (
    <div className="flex gap-3 items-start">
      <div className={`w-1.5 h-1.5 rounded-full ${priorityColor} mt-1.5 flex-shrink-0`} />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs text-gray-500">{priority} Priority</span>
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

// Made with Bob
