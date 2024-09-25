import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';

const Mines = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [bet, setBet] = useState(0);
  const [grid, setGrid] = useState(Array(25).fill(null));
  const [revealedCount, setRevealedCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [players, setPlayers] = useState([]);

  const mineCount = 5;

  useEffect(() => {
    // Simulate other players
    const playerInterval = setInterval(() => {
      setPlayers(prev => [
        ...prev,
        { name: `Player${Math.floor(Math.random() * 1000)}`, bet: Math.floor(Math.random() * 1000), revealed: Math.floor(Math.random() * 20) }
      ].slice(-10));
    }, 2000);

    return () => clearInterval(playerInterval);
  }, []);

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
    } else if (revealedCount + 1 === 20) {
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
    const winnings = bet * 20;
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
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="bg-darkBlue text-white p-2 rounded mr-2"
            placeholder="Enter bet amount"
          />
          <Button onClick={handleStart} disabled={!gameOver}>Start Game</Button>
        </div>
        <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
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
        {gameOver && (
          <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
            <h2 className="text-2xl mb-4">Game Over</h2>
            <p>You revealed {revealedCount} safe tiles</p>
            {revealedCount > 0 ? (
              <p className="text-green-400">You won ${bet * revealedCount}!</p>
            ) : (
              <p className="text-red-400">You lost ${bet}.</p>
            )}
          </div>
        )}
        <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
          <h2 className="text-2xl mb-4">Other Players</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index}>{player.name}: ${player.bet} with {player.revealed} revealed</li>
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

export default Mines;
