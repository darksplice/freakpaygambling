import React from 'react';
import { Link } from 'react-router-dom';
import { RocketIcon, BoxIcon, Dice, AnchorIcon, CastleIcon, CupSodaIcon, CircleDotIcon, HeadphonesIcon, MessageSquareIcon } from 'lucide-react';
import { isStaff } from './ProtectedRoute';

const Sidebar = () => {
  return (
    <div className="w-16 bg-darkBlue-lighter flex flex-col items-center py-4 space-y-6 rounded-r-lg mt-24">
      <Link to="/crash" className="text-white hover:text-blue-400">
        <RocketIcon size={24} />
      </Link>
      <Link to="/cases" className="text-white hover:text-blue-400">
        <BoxIcon size={24} />
      </Link>
      <Link to="/dice" className="text-white hover:text-blue-400">
        <Dice size={24} />
      </Link>
      <Link to="/mines" className="text-white hover:text-blue-400">
        <AnchorIcon size={24} />
      </Link>
      <Link to="/towers" className="text-white hover:text-blue-400">
        <CastleIcon size={24} />
      </Link>
      <Link to="/cups" className="text-white hover:text-blue-400">
        <CupSodaIcon size={24} />
      </Link>
      <Link to="/plinko" className="text-white hover:text-blue-400">
        <CircleDotIcon size={24} />
      </Link>
      <div className="flex-grow"></div>
      <Link to="/music" className="text-white hover:text-blue-400">
        <HeadphonesIcon size={24} />
      </Link>
      <Link to="/chat" className="text-white hover:text-blue-400">
        <MessageSquareIcon size={24} />
      </Link>
      {isStaff() && (
        <Link to="/staff-console" className="text-white hover:text-blue-400">
          <span className="text-xs">Staff</span>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
