import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import StaffConsole from '../components/StaffConsole';
import { isStaff } from '../components/ProtectedRoute';

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

    const balanceInterval = setInterval(() => {
      setUser(prevUser => {
        const updatedUser = { ...prevUser, balance: prevUser.balance + 25 };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setStats(prevStats => {
          const updatedStats = { 
            ...prevStats, 
            lifetimeBalance: prevStats.lifetimeBalance + 25,
            amountGambled: prevStats.amountGambled + 25 // Update amount gambled
          };
          localStorage.setItem('userStats', JSON.stringify(updatedStats));
          return updatedStats;
        });
        return updatedUser;
      });
    }, 15000); // 15000 ms = 15 seconds

    return () => clearInterval(balanceInterval);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-darkBlue flex">
      <div className="flex-1">
        <Header username={user.username} balance={user.balance} />
        <div className="p-8">
          <div className="bg-darkBlue-lighter rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Your Balance</h2>
            <p className="text-3xl font-bold text-green-400">${user.balance.toFixed(2)} FreakPay</p>
          </div>
          <div className="bg-darkBlue-lighter rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Your Stats</h2>
            <p className="text-white">Amount Gambled: ${stats.amountGambled.toFixed(2)}</p>
            <p className="text-white">Account Created: {new Date(stats.accountCreated).toLocaleDateString()}</p>
            <p className="text-white">Lifetime Balance: ${stats.lifetimeBalance.toFixed(2)}</p>
          </div>
          {isStaff() && <StaffConsole />}
        </div>
      </div>
      <footer className="fixed bottom-0 left-0 right-0 bg-darkBlue-lighter p-4 text-center">
        <p className="text-white">
          Made by @darksplice on Discord - have fun freaky gambling
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
