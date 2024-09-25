import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';

const Crash = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [multiplier, setMultiplier] = useState(1);
  const [isCrashed, setIsCrashed] = useState(false);
  const [bet, setBet] = useState(0);
  const [players, setPlayers] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const crashInterval = setInterval(() => {
      if (Math.random() < 0.02) { // 2% chance to crash each interval
        setIsCrashed(true);
        setIsPlaying(false);
        clearInterval(crashInterval);
      } else {
        setMultiplier(prev => prev + 0.01);
      }
    }, 100);

    return () => clearInterval(crashInterval);
  }, [isPlaying]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const rocket = new Image();
      rocket.src = '/rocket.png'; // Make sure to add a rocket image to your public folder

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1a1b2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const x = canvas.width / 2;
        const y = canvas.height - (multiplier - 1) * 50;

        ctx.drawImage(rocket, x - 25, y - 50, 50, 100);

        if (!isCrashed) {
          requestAnimationFrame(animate);
        }
      };

      rocket.onload = animate;
    }
  }, [multiplier, isCrashed]);

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
    setIsPlaying(true);
    setIsCrashed(false);
    setMultiplier(1);
  };

  const handleCashOut = () => {
    if (isCrashed) return;
    setUser(prev => {
      const winnings = bet * multiplier;
      const updatedUser = { ...prev, balance: prev.balance + winnings };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-darkBlue text-white">
      <Header username={user.username} />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Crash</h1>
        <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
          <canvas ref={canvasRef} width={400} height={300} className="mb-4" />
          <h2 className="text-2xl mb-4">Current Multiplier: {multiplier.toFixed(2)}x</h2>
          <input
            type="number"
            value={bet}
            onChange={(e) => setBet(Number(e.target.value))}
            className="bg-darkBlue text-white p-2 rounded mr-2"
            placeholder="Enter bet amount"
          />
          <Button onClick={handleBet} disabled={isPlaying}>Place Bet</Button>
          <Button onClick={handleCashOut} disabled={!isPlaying || isCrashed} className="ml-2">Cash Out</Button>
        </div>
        <Link to="/">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default Crash;
