import { Home, LayoutGrid, FileText, Package, Settings } from 'lucide-react';

export function Sidebar() {
  return (
    <div className="fixed left-0 top-12 bottom-0 w-12 bg-[#0a0a0a] border-r border-[#262626] flex flex-col items-center py-3 gap-1 z-20">
      {/* Nav Items */}
      <NavItem icon={Home} active />
      <NavItem icon={LayoutGrid} />
      <NavItem icon={FileText} />
      <NavItem icon={Package} />
      <NavItem icon={Settings} />
    </div>
  );
}

interface NavItemProps {
  icon: React.ElementType;
  active?: boolean;
}

function NavItem({ icon: Icon, active }: NavItemProps) {
  return (
    <button
      className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
        active
          ? 'bg-[#262626] text-white'
          : 'text-gray-500 hover:text-gray-300 hover:bg-[#1a1a1a]'
      }`}
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

// Made with Bob
