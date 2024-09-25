import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Header = ({ username }) => {
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <header className="bg-darkBlue-lighter p-4 flex justify-between items-center">
      <Link to="/" className="flex items-center">
        <span className="text-3xl mr-2">👅</span>
        <h1 className="text-white text-xl font-bold">𝓯𝓻𝓮𝓪𝓴𝓮𝓭𝓖𝓪𝓶𝓫𝓵𝓮</h1>
      </Link>
      <div className="flex items-center">
        <Link to="/settings" className="text-white mr-4 hover:underline">Settings</Link>
        <span className="text-white mr-4">Welcome, {username}!</span>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
      </div>
    </header>
  );
};

export default Header;
