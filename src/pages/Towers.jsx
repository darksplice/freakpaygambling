import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Towers = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [bet, setBet] = useState(30);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('Easy');

  const levels = 8;

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

  const handleClimb = (choice) => {
    const successRate = difficulty === 'Easy' ? 0.7 : difficulty === 'Normal' ? 0.5 : 0.3;
    if (Math.random() < successRate) {
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
    <div className="min-h-screen bg-darkBlue text-white flex">
      <Sidebar />
      <div className="flex-1">
        <Header username={user.username} />
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
              <Button onClick={handleStart} className="w-full bg-blue-500">Start new game</Button>
            </div>
          </div>
          <div className="w-2/3">
            <div className="bg-darkBlue-lighter rounded-lg p-6">
              <div className="grid grid-cols-3 gap-4">
                {Array(levels).fill(null).map((_, index) => (
                  <div key={index} className="flex justify-center">
                    {index === currentLevel && !gameOver ? (
                      <div className="flex">
                        <Button onClick={() => handleClimb('left')} className="w-16 h-16 mr-2 bg-blue-500">Left</Button>
                        <Button onClick={() => handleClimb('right')} className="w-16 h-16 bg-blue-500">Right</Button>
                      </div>
                    ) : (
                      <div className={`w-36 h-16 ${index < currentLevel ? 'bg-green-500' : 'bg-gray-500'} flex items-center justify-center rounded-lg`}>
                        {index < currentLevel ? '🏆' : '🏰'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Towers;
