import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';

const Towers = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [bet, setBet] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [players, setPlayers] = useState([]);

  const levels = 10;

  useEffect(() => {
    // Simulate other players
    const playerInterval = setInterval(() => {
      setPlayers(prev => [
        ...prev,
        { name: `Player${Math.floor(Math.random() * 1000)}`, bet: Math.floor(Math.random() * 1000), level: Math.floor(Math.random() * levels) }
      ].slice(-10));
    }, 2000);

    return () => clearInterval(playerInterval);
  }, []);

  const handleStart = () => {
    if (bet > user.balance) {
      alert("Insufficient balance!");
      return;
    }
    setUser(prev => {
      const updatedUser = { ...prev, balance: prev.balance - bet };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
    setCurrentLevel(0);
    setGameOver(false);
  };

  const handleClimb = () => {
    if (Math.random() < 0.5) { // 50% chance to climb successfully
      setCurrentLevel(prev => prev + 1);
      if (currentLevel + 1 === levels) {
        handleWin();
      }
    } else {
      handleLoss();
    }
  };

  const handleCashOut = () => {
    const winnings = bet * (currentLevel + 1);
    setUser(prev => {
      const updatedUser = { ...prev, balance: prev.balance + winnings };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
    setGameOver(true);
  };

  const handleWin = () => {
    const winnings = bet * levels;
    setUser(prev => {
      const updatedUser = { ...prev, balance: prev.balance + winnings };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
    setGameOver(true);
  };

  const handleLoss = () => {
    setGameOver(true);
  };

  return (
    <div className="min-h-screen bg-darkBlue text-white">
      <Header username={user.username} />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Towers</h1>
        <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="bg-darkBlue text-white p-2 rounded mr-2"
            placeholder="Enter bet amount"
          />
          <Button onClick={handleStart} disabled={gameOver === false}>Start Game</Button>
        </div>
        {!gameOver && (
          <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
            <h2 className="text-2xl mb-4">Current Level: {currentLevel}</h2>
            <Button onClick={handleClimb} className="mr-2">Climb</Button>
            <Button onClick={handleCashOut}>Cash Out</Button>
          </div>
        )}
        {gameOver && (
          <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
            <h2 className="text-2xl mb-4">Game Over</h2>
            <p>You reached level {currentLevel}</p>
            {currentLevel > 0 ? (
              <p className="text-green-400">You won ${bet * currentLevel}!</p>
            ) : (
              <p className="text-red-400">You lost ${bet}.</p>
            )}
          </div>
        )}
        <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
          <h2 className="text-2xl mb-4">Other Players</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index}>{player.name}: ${player.bet} at level {player.level}</li>
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

export default Towers;
