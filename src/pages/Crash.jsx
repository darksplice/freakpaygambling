import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Crash = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [multiplier, setMultiplier] = useState(1);
  const [isCrashed, setIsCrashed] = useState(false);
  const [bet, setBet] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoCashout, setAutoCashout] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    let crashInterval;
    if (isPlaying) {
      crashInterval = setInterval(() => {
        if (Math.random() < 0.02) { // 2% chance to crash each interval
          setIsCrashed(true);
          setIsPlaying(false);
          clearInterval(crashInterval);
        } else {
          setMultiplier(prev => {
            const newMultiplier = prev + 0.01;
            if (autoCashout && newMultiplier >= autoCashout) {
              handleCashOut();
            }
            return newMultiplier;
          });
        }
      }, 100);
    }

    return () => clearInterval(crashInterval);
  }, [isPlaying, autoCashout]);

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
          ctx.fillText((1 + i * 0.5).toFixed(2) + 'x', 5, y - 5);
        }

        // Draw rocket emoji
        const x = (multiplier - 1) / 4 * canvas.width;
        const y = canvas.height - (multiplier - 1) / 4 * canvas.height;
        ctx.font = '24px Arial';
        ctx.fillText('🚀', x, y);

        // Draw line behind rocket
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(x, y);
        ctx.stroke();

        if (!isCrashed) {
          requestAnimationFrame(drawRocket);
        }
      };

      drawRocket();
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
                <label className="block mb-2">Auto cashout (multiplier)</label>
                <input
                  type="number"
                  value={autoCashout || ''}
                  onChange={(e) => setAutoCashout(Number(e.target.value) || null)}
                  className="bg-darkBlue text-white p-2 rounded w-full"
                  placeholder="Disable"
                />
              </div>
              <Button onClick={handleBet} disabled={isPlaying} className="w-full bg-blue-500 mb-2">
                {isPlaying ? 'In Game' : 'Place Bet'}
              </Button>
              <Button onClick={handleCashOut} disabled={!isPlaying || isCrashed} className="w-full bg-green-500">
                Cash Out
              </Button>
            </div>
          </div>
          <div className="w-2/3">
            <div className="bg-darkBlue-lighter rounded-lg p-6">
              <canvas ref={canvasRef} width={600} height={400} className="w-full h-64 mb-4" />
              <div className="flex justify-between">
                {[1.23, 1.46, 1.01, 1.2, 3.61, 1.78, 3.93].map((mult, index) => (
                  <div key={index} className={`px-3 py-1 rounded ${mult > 2 ? 'bg-yellow-500' : 'bg-blue-500'}`}>
                    {mult.toFixed(2)}x
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-4xl font-bold mb-2">{multiplier.toFixed(2)}x</h2>
                <p>Current payout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Crash;
