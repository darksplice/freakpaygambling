import React from 'react';
import { Link } from 'react-router-dom';
import { RocketIcon, CastleIcon, AnchorIcon, SettingsIcon } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-16 bg-darkBlue-lighter flex flex-col items-center py-4 space-y-6 rounded-r-lg mt-16">
      <Link to="/crash" className="text-white hover:text-blue-400">
        <RocketIcon size={24} />
      </Link>
      <Link to="/towers" className="text-white hover:text-blue-400">
        <CastleIcon size={24} />
      </Link>
      <Link to="/mines" className="text-white hover:text-blue-400">
        <AnchorIcon size={24} />
      </Link>
      <Link to="/settings" className="text-white hover:text-blue-400 mt-auto">
        <SettingsIcon size={24} />
      </Link>
    </div>
  );
};

export default Sidebar;
