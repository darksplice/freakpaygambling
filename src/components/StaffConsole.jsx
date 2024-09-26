import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StaffConsole = () => {
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [banUsername, setBanUsername] = useState('');
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  useEffect(() => {
    // Fetch current players and registered users
    const users = JSON.parse(localStorage.getItem('users')) || [];
    setCurrentPlayers(users.filter(user => user.isOnline));
    setRegisteredUsers(users);
  }, []);

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

  const handleBanPlayer = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(user => {
      if (user.username === banUsername) {
        user.isBanned = true;
      }
      return user;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    alert(`Banned player: ${banUsername}`);
    setBanUsername('');
  };

  return (
    <div className="bg-white rounded-lg p-4 mt-4 text-black">
      <h2 className="text-xl font-bold mb-4">Staff Console</h2>
      <Tabs defaultValue="balance">
        <TabsList>
          <TabsTrigger value="balance">Update Balance</TabsTrigger>
          <TabsTrigger value="ban">Ban Player</TabsTrigger>
          <TabsTrigger value="players">Current Players</TabsTrigger>
          <TabsTrigger value="accounts">Registered Accounts</TabsTrigger>
        </TabsList>
        <TabsContent value="balance">
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
        </TabsContent>
        <TabsContent value="ban">
          <Input
            type="text"
            placeholder="Username to ban"
            value={banUsername}
            onChange={(e) => setBanUsername(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handleBanPlayer}>Ban Player</Button>
        </TabsContent>
        <TabsContent value="players">
          <h3 className="font-bold mb-2">Current Players Online</h3>
          <ul>
            {currentPlayers.map((player, index) => (
              <li key={index}>{player.username}</li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="accounts">
          <h3 className="font-bold mb-2">Registered Accounts</h3>
          <ul>
            {registeredUsers.map((user, index) => (
              <li key={index}>
                Username: {user.username}, Password: {user.password}
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffConsole;
