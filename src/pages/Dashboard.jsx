import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome, {user.username}!</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Balance</h2>
          <p className="text-3xl font-bold text-green-600">${user.balance.toFixed(2)} FreakPay</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/crash">
            <Button className="w-full h-32 text-xl">Crash</Button>
          </Link>
          <Link to="/roulette">
            <Button className="w-full h-32 text-xl">Roulette</Button>
          </Link>
          <Link to="/towers">
            <Button className="w-full h-32 text-xl">Towers</Button>
          </Link>
          <Link to="/mines">
            <Button className="w-full h-32 text-xl">Mines</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;