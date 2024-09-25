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
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-darkBlue-lighter rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-white">Your Balance</h2>
          <p className="text-3xl font-bold text-green-400">${user.balance.toFixed(2)} FreakPay</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/crash">
            <Button className="w-full h-32 text-xl bg-blue-600 hover:bg-blue-700">Crash</Button>
          </Link>
          <Link to="/roulette">
            <Button className="w-full h-32 text-xl bg-red-600 hover:bg-red-700">Roulette</Button>
          </Link>
          <Link to="/towers">
            <Button className="w-full h-32 text-xl bg-purple-600 hover:bg-purple-700">Towers</Button>
          </Link>
          <Link to="/mines">
            <Button className="w-full h-32 text-xl bg-green-600 hover:bg-green-700">Mines</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
