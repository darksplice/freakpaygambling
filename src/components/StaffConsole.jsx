import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const StaffConsole = () => {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');

  const handleUpdateBalance = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
      if (user.username === username) {
        user.balance = parseFloat(amount);
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert(`Updated balance for ${username} to $${amount}`);
  };

  return (
    <div className="bg-darkBlue-lighter rounded-lg p-4 mt-4">
      <h2 className="text-xl font-bold mb-4">Staff Console</h2>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-2"
      />
      <Input
        type="number"
        placeholder="New Balance"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-2"
      />
      <Button onClick={handleUpdateBalance}>Update Balance</Button>
    </div>
  );
};

export default StaffConsole;