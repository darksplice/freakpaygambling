import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LiveFeed from '../components/LiveFeed';

const Crash = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [multiplier, setMultiplier] = useState(1);
  const [isCrashed, setIsCrashed] = useState(false);
  const [bet, setBet] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoCashout, setAutoCashout] = useState(null);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [gameState, setGameState] = useState('waiting');
  const canvasRef = useRef(null);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    const activePlayers = storedUsers.filter(u => u.username !== user.username).slice(0, 10);
    setPlayers(activePlayers.map(p => ({
      username: p.username,
      bet: Math.floor(Math.random() * 1000) + 10,
      multiplier: 1,
    })));
  }, [user.username]);

  useEffect(() => {
    let interval;
    if (gameState === 'playing') {
      interval = setInterval(() => {
        if (Math.random() < 0.02) {
          setIsCrashed(true);
          setGameState('crashed');
          clearInterval(interval);
        } else {
          setMultiplier(prev => {
            const newMultiplier = prev + 0.01;
            if (autoCashout && newMultiplier >= autoCashout) {
              handleCashOut();
            }
            return newMultiplier;
          });
        }
      }, 50);
    }

    return () => clearInterval(interval);
  }, [gameState, autoCashout]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const drawRocket = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#1a1b2e';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw grid lines
        ctx.strokeStyle = '#252640';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
          const y = canvas.height - (i / 5) * canvas.height;
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();

          // Draw multiplier labels
          ctx.fillStyle = '#ffffff';
          ctx.font = '12px Arial';
          ctx.fillText((1 + i).toFixed(2) + 'x', 5, y - 5);
        }

        // Draw rocket emoji
        const x = (multiplier - 1) / 5 * canvas.width;
        const y = canvas.height - (multiplier - 1) / 5 * canvas.height;
        ctx.font = '24px Arial';
        ctx.fillText('🚀', x, y);

        // Draw line behind rocket
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(x, y);
        ctx.stroke();

        if (gameState === 'crashed') {
          ctx.font = '48px Arial';
          ctx.fillStyle = 'red';
          ctx.fillText('💥 BOOM!', canvas.width / 2 - 100, canvas.height / 2);
        } else if (gameState !== 'playing') {
          requestAnimationFrame(drawRocket);
        }
      };

      drawRocket();
    }
  }, [multiplier, gameState]);

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
    setGameState('playing');
    setIsCrashed(false);
    setMultiplier(1);
    setTotalEarnings(0);
    updatePlayerBets();
  };

  const handleCashOut = () => {
    if (gameState !== 'playing') return;
    const winnings = bet * multiplier;
    setUser(prev => {
      const updatedUser = { ...prev, balance: prev.balance + winnings };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
    setTotalEarnings(winnings);
    setGameState('waiting');
    updateAmountGambled(bet);
  };

  const updatePlayerBets = () => {
    setPlayers(prev => prev.map(player => ({
      ...player,
      multiplier: player.multiplier * (Math.random() * 0.5 + 1),
    })));
  };

  const updateAmountGambled = (amount) => {
    const stats = JSON.parse(localStorage.getItem('userStats')) || {};
    stats.amountGambled = (stats.amountGambled || 0) + amount;
    localStorage.setItem('userStats', JSON.stringify(stats));
  };

  return (
    <div className="flex h-full bg-[#1a1b2e] text-white p-4">
      <div className="w-2/3 pr-4">
        <div className="bg-[#252640] rounded-lg p-6 mb-4">
          <canvas ref={canvasRef} width={600} height={400} className="w-full h-64 mb-4" />
          <div className="flex justify-between">
            {[1.27, 1.39, 1.37, 1.32, 2, 2.45, 1.54].map((mult, index) => (
              <div key={index} className="px-3 py-1 rounded bg-blue-500">
                {mult.toFixed(2)}x
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-4xl font-bold mb-2">{multiplier.toFixed(2)}x</h2>
            <p>Current payout</p>
          </div>
        </div>
        <LiveFeed players={players} />
      </div>
      <div className="w-1/3">
        <div className="bg-[#252640] rounded-lg p-6 mb-4">
          <div className="mb-4">
            <label className="block mb-2">Bet amount</label>
            <div className="flex items-center">
              <Input
                type="number"
                value={bet}
                onChange={(e) => setBet(Number(e.target.value))}
                className="bg-[#1a1b2e] text-white mr-2"
              />
              <Button onClick={() => setBet(bet / 2)} className="px-2 py-1">1/2</Button>
              <Button onClick={() => setBet(bet * 2)} className="px-2 py-1 ml-2">2x</Button>
              <Button onClick={() => setBet(user.balance)} className="px-2 py-1 ml-2">Max</Button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Auto cashout (multiplier)</label>
            <Input
              type="number"
              value={autoCashout || ''}
              onChange={(e) => setAutoCashout(Number(e.target.value) || null)}
              className="bg-[#1a1b2e] text-white w-full"
              placeholder="Disable"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Total earnings</label>
            <p className="text-2xl font-bold">${totalEarnings.toFixed(2)}</p>
          </div>
          <Button onClick={handleBet} disabled={gameState !== 'waiting'} className="w-full bg-blue-500 mb-2">
            {gameState === 'waiting' ? 'Place Bet' : 'Waiting for next round'}
          </Button>
          <Button onClick={handleCashOut} disabled={gameState !== 'playing'} className="w-full bg-green-500">
            Cash Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Crash;
