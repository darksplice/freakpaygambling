import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { SettingsIcon, LogOutIcon } from 'lucide-react';

const Header = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <header className="bg-[#252640] p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <span className="text-3xl mr-2">👅</span>
        <h1 className="text-white text-xl font-bold">𝓯𝓻𝓮𝓪𝓴𝓮𝓭𝓖𝓪𝓶𝓫𝓵𝓮</h1>
      </Link>
      <div className="flex items-center">
        <Link to="/settings" className="text-white mr-4 hover:text-blue-400">
          <SettingsIcon size={24} />
        </Link>
        <span className="text-white mr-4">Welcome, {user.username}!</span>
        <span className="text-green-400 mr-4">
          ${typeof user.balance === 'number' ? user.balance.toFixed(2) : '0.00'} FreakPay
        </span>
        <Button onClick={handleLogout} variant="ghost" className="text-white hover:text-red-400">
          <LogOutIcon size={24} />
        </Button>
      </div>
    </header>
  );
};

export default Header;
