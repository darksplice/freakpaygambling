import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';

const Towers = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [bet, setBet] = useState(0);
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
    <div className="min-h-screen bg-darkBlue text-white">
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
          <h1 className="text-4xl font-bold mb-8">Towers</h1>
          <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
            <div className="flex mb-4">
              <input
                type="number"
                value={bet}
                onChange={(e) => setBet(Number(e.target.value))}
                className="bg-darkBlue text-white p-2 rounded mr-2"
                placeholder="Enter bet amount"
              />
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="bg-darkBlue text-white p-2 rounded mr-2"
              >
                <option value="Easy">Easy</option>
                <option value="Normal">Normal</option>
                <option value="Hard">Hard</option>
              </select>
              <Button onClick={handleStart} disabled={gameOver === false}>Start Game</Button>
            </div>
            {!gameOver && (
              <div className="grid grid-cols-3 gap-2">
                {Array(levels).fill(null).map((_, index) => (
                  <div key={index} className="flex justify-center">
                    {index === currentLevel ? (
                      <>
                        <Button onClick={() => handleClimb('left')} className="w-16 h-16 mr-2">Left</Button>
                        <Button onClick={() => handleClimb('right')} className="w-16 h-16">Right</Button>
                      </>
                    ) : (
                      <div className={`w-36 h-16 ${index < currentLevel ? 'bg-green-500' : 'bg-gray-500'} flex items-center justify-center`}>
                        {index < currentLevel ? '🏆' : '🏰'}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {!gameOver && (
            <Button onClick={handleCashOut} className="mb-4">Cash Out</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Towers;
