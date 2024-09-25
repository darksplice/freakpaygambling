import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';

const Towers = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [bet, setBet] = useState(30);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy');
  const [totalEarnings, setTotalEarnings] = useState(0);

  const levels = 10;

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
    setTotalEarnings(0);
  };

  const handleClimb = (choice) => {
    const successRate = difficulty === 'Easy' ? 0.7 : difficulty === 'Normal' ? 0.5 : 0.3;
    if (Math.random() < successRate) {
      setCurrentLevel(prev => prev + 1);
      const newEarnings = calculateEarnings(currentLevel + 1);
      setTotalEarnings(newEarnings);
      if (currentLevel + 1 === levels) {
        handleWin();
      }
    } else {
      handleLoss();
    }
  };

  const calculateEarnings = (level) => {
    return bet * (1 + (level * 0.5));
  };

  const handleCashOut = () => {
    setUser(prev => {
      const updatedUser = { ...prev, balance: prev.balance + totalEarnings };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
    setGameOver(true);
  };

  const handleWin = () => {
    handleCashOut();
  };

  const handleLoss = () => {
    setGameOver(true);
    setTotalEarnings(0);
  };

  return (
    <div className="min-h-screen bg-darkBlue text-white">
      <Header username={user.username} balance={user.balance} />
      <div className="p-8 flex">
        <div className="w-1/3 pr-4">
          <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
            <div className="mb-4">
              <label className="block mb-2">Bet amount</label>
              <div className="flex items-center">
                <input
                  type="number"
                  value={bet}
                  onChange={(e) => setBet(Number(e.target.value))}
                  className="bg-darkBlue text-white p-2 rounded mr-2 w-full"
                />
                <Button onClick={() => setBet(bet / 2)} className="px-2 py-1">1/2</Button>
                <Button onClick={() => setBet(bet * 2)} className="px-2 py-1 ml-2">2x</Button>
                <Button onClick={() => setBet(user.balance)} className="px-2 py-1 ml-2">Max</Button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Difficulty</label>
              <div className="flex">
                <Button
                  onClick={() => setDifficulty('Easy')}
                  className={`mr-2 ${difficulty === 'Easy' ? 'bg-blue-500' : 'bg-gray-500'}`}
                >
                  Easy
                </Button>
                <Button
                  onClick={() => setDifficulty('Normal')}
                  className={`mr-2 ${difficulty === 'Normal' ? 'bg-blue-500' : 'bg-gray-500'}`}
                >
                  Normal
                </Button>
                <Button
                  onClick={() => setDifficulty('Hard')}
                  className={`${difficulty === 'Hard' ? 'bg-blue-500' : 'bg-gray-500'}`}
                >
                  Hard
                </Button>
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2">Total earnings</label>
              <p className="text-2xl font-bold">${totalEarnings.toFixed(2)}</p>
            </div>
            <Button onClick={handleStart} className="w-full bg-blue-500">Start new game</Button>
          </div>
        </div>
        <div className="w-2/3">
          <div className="bg-darkBlue-lighter rounded-lg p-6">
            <div className="grid grid-cols-3 gap-4">
              {Array(levels).fill(null).map((_, index) => (
                <div key={index} className="bg-darkBlue-lighter p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold">{((levels - index) * 42.74).toFixed(2)}</p>
                  {index === currentLevel && !gameOver ? (
                    <div className="flex justify-center mt-2">
                      <Button onClick={() => handleClimb('left')} className="mr-2">Left</Button>
                      <Button onClick={() => handleClimb('right')}>Right</Button>
                    </div>
                  ) : (
                    <div className={`mt-2 ${index < currentLevel ? 'text-green-500' : 'text-gray-500'}`}>
                      {index < currentLevel ? '⭐' : index === currentLevel && gameOver ? '❌' : '🏰'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Towers;
