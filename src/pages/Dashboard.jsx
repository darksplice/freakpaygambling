import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    amountGambled: 0,
    accountCreated: '',
    lifetimeBalance: 0,
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      const storedStats = JSON.parse(localStorage.getItem('userStats')) || {
        amountGambled: 0,
        accountCreated: new Date().toISOString(),
        lifetimeBalance: storedUser.balance,
      };
      setStats(storedStats);
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-[#1a1b2e] text-white">
      <h1 className="text-3xl font-bold mb-8">Welcome to FreakPay Casino</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-[#252640] rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Balance</h2>
          <p className="text-3xl font-bold text-green-400">${user.balance.toFixed(2)} FreakPay</p>
        </div>
        <div className="bg-[#252640] rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Stats</h2>
          <p>Amount Gambled: ${stats.amountGambled.toFixed(2)}</p>
          <p>Account Created: {new Date(stats.accountCreated).toLocaleDateString()}</p>
          <p>Lifetime Balance: ${stats.lifetimeBalance.toFixed(2)}</p>
        </div>
        <div className="bg-[#252640] rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Quick Links</h2>
          <div className="flex flex-col space-y-2">
            <Link to="/crash">
              <Button className="w-full">Play Crash</Button>
            </Link>
            <Link to="/mines">
              <Button className="w-full">Play Mines</Button>
            </Link>
            <Link to="/towers">
              <Button className="w-full">Play Towers</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
