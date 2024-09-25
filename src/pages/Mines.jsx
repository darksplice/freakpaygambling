import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Mines = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [bet, setBet] = useState(30);
  const [mineCount, setMineCount] = useState(3);
  const [grid, setGrid] = useState(Array(25).fill(null));
  const [revealedCount, setRevealedCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(0);

  const initializeGrid = () => {
    const newGrid = Array(25).fill('safe');
    let minesPlaced = 0;
    while (minesPlaced < mineCount) {
      const randomIndex = Math.floor(Math.random() * 25);
      if (newGrid[randomIndex] === 'safe') {
        newGrid[randomIndex] = 'mine';
        minesPlaced++;
      }
    }
    setGrid(newGrid);
  };

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
    initializeGrid();
    setRevealedCount(0);
    setGameOver(false);
    setTotalEarnings(0);
  };

  const handleReveal = (index) => {
    if (gameOver || grid[index] !== 'safe') return;

    const newGrid = [...grid];
    newGrid[index] = 'revealed';
    setGrid(newGrid);
    setRevealedCount(prev => prev + 1);

    if (grid[index] === 'mine') {
      handleLoss();
    } else {
      const newEarnings = calculateEarnings(revealedCount + 1);
      setTotalEarnings(newEarnings);
      if (revealedCount + 1 === 25 - mineCount) {
        handleWin();
      }
    }
  };

  const calculateEarnings = (revealed) => {
    // This is a simple calculation, you might want to use a more complex formula
    return bet * (1 + (revealed * 0.1));
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
                <label className="block mb-2">Mines</label>
                <div className="flex flex-wrap">
                  {[1, 3, 5, 10, 15, 20].map(count => (
                    <Button
                      key={count}
                      onClick={() => setMineCount(count)}
                      className={`mr-2 mb-2 ${mineCount === count ? 'bg-blue-500' : 'bg-gray-500'}`}
                    >
                      {count}
                    </Button>
                  ))}
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
              <div className="grid grid-cols-5 gap-2">
                {grid.map((cell, index) => (
                  <Button
                    key={index}
                    onClick={() => handleReveal(index)}
                    disabled={gameOver || cell === 'revealed'}
                    className={`w-16 h-16 ${cell === 'revealed' ? 'bg-green-500' : 'bg-gray-500'}`}
                  >
                    {cell === 'revealed' ? '⚓' : ''}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mines;
