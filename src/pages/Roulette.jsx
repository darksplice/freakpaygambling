import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';

const Roulette = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [bet, setBet] = useState(0);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [result, setResult] = useState(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    // Simulate other players
    const playerInterval = setInterval(() => {
      setPlayers(prev => [
        ...prev,
        { name: `Player${Math.floor(Math.random() * 1000)}`, bet: Math.floor(Math.random() * 1000), number: Math.floor(Math.random() * 37) }
      ].slice(-10));
    }, 2000);

    return () => clearInterval(playerInterval);
  }, []);

  const handleSpin = () => {
    if (bet > user.balance) {
      alert("Insufficient balance!");
      return;
    }
    if (selectedNumber === null) {
      alert("Please select a number!");
      return;
    }
    setUser(prev => {
      const updatedUser = { ...prev, balance: prev.balance - bet };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
    const spinResult = Math.floor(Math.random() * 37);
    setResult(spinResult);
    if (spinResult === selectedNumber) {
      setUser(prev => {
        const winnings = bet * 35;
        const updatedUser = { ...prev, balance: prev.balance + winnings };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
      });
    }
  };

  return (
    <div className="min-h-screen bg-darkBlue text-white">
      <Header username={user.username} />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Roulette</h1>
        <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="bg-darkBlue text-white p-2 rounded mr-2"
            placeholder="Enter bet amount"
          />
          <input
            type="number"
            value={selectedNumber}
            onChange={(e) => setSelectedNumber(Number(e.target.value))}
            className="bg-darkBlue text-white p-2 rounded mr-2"
            placeholder="Select number (0-36)"
            min="0"
            max="36"
          />
          <Button onClick={handleSpin}>Spin</Button>
        </div>
        {result !== null && (
          <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
            <h2 className="text-2xl mb-4">Result: {result}</h2>
            {result === selectedNumber ? (
              <p className="text-green-400">You won ${bet * 35}!</p>
            ) : (
              <p className="text-red-400">You lost ${bet}.</p>
            )}
          </div>
        )}
        <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
          <h2 className="text-2xl mb-4">Other Players</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index}>{player.name}: ${player.bet} on {player.number}</li>
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

export default Roulette;
