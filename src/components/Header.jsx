import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Header = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-darkBlue-lighter p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/logo.png" alt="FreakPay Logo" className="h-10 w-10 mr-2" />
        <h1 className="text-white text-xl font-bold">FreakPay Casino</h1>
      </div>
      <div className="flex items-center">
        <span className="text-white mr-4">Welcome, {username}!</span>
        <Button onClick={handleLogout} variant="outline">Logout</Button>
      </div>
    </header>
  );
};

export default Header;