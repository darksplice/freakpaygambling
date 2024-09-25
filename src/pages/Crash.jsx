import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';

const Crash = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [multiplier, setMultiplier] = useState(1);
  const [isCrashed, setIsCrashed] = useState(false);
  const [bet, setBet] = useState(0);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const crashInterval = setInterval(() => {
      if (Math.random() < 0.02) { // 2% chance to crash each interval
        setIsCrashed(true);
        clearInterval(crashInterval);
      } else {
        setMultiplier(prev => prev + 0.01);
      }
    }, 100);

    return () => clearInterval(crashInterval);
  }, []);

  useEffect(() => {
    // Simulate other players
    const playerInterval = setInterval(() => {
      setPlayers(prev => [
        ...prev,
        { name: `Player${Math.floor(Math.random() * 1000)}`, bet: Math.floor(Math.random() * 1000) }
      ].slice(-10));
    }, 2000);

    return () => clearInterval(playerInterval);
  }, []);

  const handleBet = () => {
    if (bet > user.balance) {
      alert("Insufficient balance!");
      return;
    }
    setUser(prev => {
      const updatedUser = { ...prev, balance: prev.balance - bet };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  const handleCashOut = () => {
    if (isCrashed) return;
    setUser(prev => {
      const winnings = bet * multiplier;
      const updatedUser = { ...prev, balance: prev.balance + winnings };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
    setIsCrashed(true);
  };

  return (
    <div className="min-h-screen bg-darkBlue text-white">
      <Header username={user.username} />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Crash Game</h1>
        <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
          <h2 className="text-2xl mb-4">Current Multiplier: {multiplier.toFixed(2)}x</h2>
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="bg-darkBlue text-white p-2 rounded mr-2"
            placeholder="Enter bet amount"
          />
          <Button onClick={handleBet} disabled={isCrashed}>Place Bet</Button>
          <Button onClick={handleCashOut} disabled={isCrashed} className="ml-2">Cash Out</Button>
        </div>
        <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
          <h2 className="text-2xl mb-4">Other Players</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index}>{player.name}: ${player.bet}</li>
            ))}
          </ul>
        </div>
        <Link to="/">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default Crash;
