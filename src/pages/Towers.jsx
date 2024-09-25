import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';
import ChatBox from '../components/ChatBox';

const Towers = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [bet, setBet] = useState(30);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('Normal');
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [towerState, setTowerState] = useState(Array(10).fill().map(() => Array(3).fill('default')));

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
    setTowerState(Array(10).fill().map(() => Array(3).fill('default')));
  };

  const handleClimb = (level, choice) => {
    if (gameOver || level !== currentLevel) return;

    const successRate = 0.487; // 48.7% win rate
    const isSuccess = Math.random() < successRate;

    const newTowerState = [...towerState];
    newTowerState[level][choice] = isSuccess ? 'success' : 'failure';
    setTowerState(newTowerState);

    if (isSuccess) {
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
    <div className="min-h-screen bg-darkBlue text-white flex">
      <div className="flex-1 p-8">
        <Header username={user.username} balance={user.balance} />
        <div className="mt-8 flex">
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
                <label className="block mb-2">Total earnings</label>
                <p className="text-2xl font-bold">${totalEarnings.toFixed(2)}</p>
              </div>
              <Button onClick={handleStart} className="w-full bg-blue-500">Start new game</Button>
              {!gameOver && currentLevel > 0 && (
                <Button onClick={handleCashOut} className="w-full bg-green-500 mt-2">Cash Out</Button>
              )}
            </div>
          </div>
          <div className="w-2/3">
            <div className="bg-darkBlue-lighter rounded-lg p-6">
              <div className="flex flex-col-reverse">
                {towerState.map((row, level) => (
                  <div key={level} className="flex justify-between mb-2">
                    {row.map((state, choice) => (
                      <Button
                        key={choice}
                        onClick={() => handleClimb(level, choice)}
                        disabled={gameOver || level !== currentLevel}
                        className={`w-24 h-12 ${
                          state === 'success' ? 'bg-green-500' :
                          state === 'failure' ? 'bg-red-500' :
                          'bg-blue-300'
                        }`}
                      >
                        {state === 'default' ? `$${calculateEarnings(level).toFixed(2)}` : ''}
                      </Button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatBox />
      <footer className="fixed bottom-0 left-0 right-0 bg-darkBlue-lighter p-4 text-center">
        <p className="text-white">
          Made by @darksplice on Discord - have fun freaky gambling 
          <img src="/discord-icon.svg" alt="Discord" className="inline-block ml-2 w-6 h-6" />
        </p>
      </footer>
    </div>
  );
};

export default Towers;
