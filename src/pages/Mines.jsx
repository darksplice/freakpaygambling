import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';

const Mines = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [bet, setBet] = useState(0);
  const [grid, setGrid] = useState(Array(25).fill(null));
  const [mineCount, setMineCount] = useState(3);
  const [revealedCount, setRevealedCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);

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
  };

  const handleReveal = (index) => {
    if (gameOver || grid[index] !== 'safe') return;

    const newGrid = [...grid];
    newGrid[index] = 'revealed';
    setGrid(newGrid);
    setRevealedCount(prev => prev + 1);

    if (grid[index] === 'mine') {
      handleLoss();
    } else if (revealedCount + 1 === 25 - mineCount) {
      handleWin();
    }
  };

  const handleCashOut = () => {
    const winnings = bet * (revealedCount + 1);
    setUser(prev => {
      const updatedUser = { ...prev, balance: prev.balance + winnings };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
    setGameOver(true);
  };

  const handleWin = () => {
    const winnings = bet * (25 - mineCount);
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
        <h1 className="text-4xl font-bold mb-8">Mines</h1>
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
              value={mineCount}
              onChange={(e) => setMineCount(Number(e.target.value))}
              className="bg-darkBlue text-white p-2 rounded mr-2"
            >
              {[1, 3, 5, 10, 15, 20].map(count => (
                <option key={count} value={count}>{count}</option>
              ))}
            </select>
            <Button onClick={handleStart} disabled={!gameOver}>Start Game</Button>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {grid.map((cell, index) => (
              <Button
                key={index}
                onClick={() => handleReveal(index)}
                disabled={gameOver || cell === 'revealed'}
                className={`w-12 h-12 ${cell === 'revealed' ? 'bg-green-500' : 'bg-gray-500'}`}
              >
                {cell === 'revealed' ? '✓' : ''}
              </Button>
            ))}
          </div>
        </div>
        {!gameOver && (
          <Button onClick={handleCashOut} className="mb-4">Cash Out</Button>
        )}
        <Link to="/">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default Mines;
