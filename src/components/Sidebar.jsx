import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RocketIcon, AnchorIcon, CastleIcon, CircleDotIcon } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const sidebarItems = [
    { icon: RocketIcon, path: '/crash', label: 'Crash' },
    { icon: AnchorIcon, path: '/mines', label: 'Mines' },
    { icon: CastleIcon, path: '/towers', label: 'Towers' },
    { icon: CircleDotIcon, path: '/plinko', label: 'Plinko' },
  ];

  return (
    <div className="w-16 bg-[#252640] flex flex-col items-center py-4 space-y-6">
      {sidebarItems.map(({ icon: Icon, path, label }) => (
        <Link
          key={path}
          to={path}
          className={`text-white hover:text-blue-400 ${isActive(path) ? 'text-blue-400' : ''}`}
          title={label}
        >
          <Icon size={24} />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
