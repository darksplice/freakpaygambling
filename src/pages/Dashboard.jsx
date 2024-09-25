import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }

    const balanceInterval = setInterval(() => {
      setUser(prevUser => {
        const updatedUser = { ...prevUser, balance: prevUser.balance + 20 };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      });
    }, 60000); // 60000 ms = 1 minute

    return () => clearInterval(balanceInterval);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-darkBlue">
      <Header username={user.username} />
      <div className="flex">
        <div className="w-1/4 bg-darkBlue-lighter p-4">
          <Link to="/crash" className="block mb-4">
            <Button className="w-full">🚀 Crash</Button>
          </Link>
          <Link to="/towers" className="block mb-4">
            <Button className="w-full">🏰 Towers</Button>
          </Link>
          <Link to="/mines" className="block mb-4">
            <Button className="w-full">🚢 Mines</Button>
          </Link>
        </div>
        <div className="w-3/4 p-8">
          <div className="bg-darkBlue-lighter rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">Your Balance</h2>
            <p className="text-3xl font-bold text-green-400">${user.balance.toFixed(2)} FreakPay</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
