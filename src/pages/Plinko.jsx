import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

const Plinko = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [bet, setBet] = useState(10);
  const [rows, setRows] = useState(10);
  const canvasRef = useRef(null);

  const multipliers = [8.9, 3, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 3, 8.9];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    drawPlinkoBoard(ctx);
  }, [rows]);

  const drawPlinkoBoard = (ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = '#252640';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const dotRadius = 3;
    const startX = 50;
    const startY = 50;
    const endX = ctx.canvas.width - 50;
    const spacingX = (endX - startX) / (rows + 1);
    const spacingY = (ctx.canvas.height - 100) / rows;

    // Draw dots
    for (let i = 0; i <= rows; i++) {
      for (let j = 0; j <= i; j++) {
        const x = startX + spacingX * j + (spacingX / 2) * (rows - i);
        const y = startY + spacingY * i;
        ctx.beginPath();
        ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
      }
    }

    // Draw multipliers
    ctx.font = '16px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    multipliers.forEach((mult, index) => {
      const x = startX + spacingX * index;
      const y = ctx.canvas.height - 20;
      ctx.fillText(`${mult}x`, x, y);
    });
  };

  const handleStartGame = () => {
    if (bet > user.balance) {
      alert("Insufficient balance!");
      return;
    }
    setUser(prev => {
      const updatedUser = { ...prev, balance: prev.balance - bet };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    });
    // Implement game logic here
    console.log('Starting new game with:', { bet, rows });
  };

  return (
    <div className="min-h-screen bg-darkBlue text-white flex flex-col">
      <div className="flex-1 p-8 flex">
        <div className="w-1/3 pr-4">
          <div className="bg-darkBlue-lighter rounded-lg p-6 mb-4">
            <div className="mb-4">
              <p className="mb-2">Bet amount</p>
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
              <p className="mb-2">Amount of rows</p>
              <div className="flex justify-between">
                {[8, 10, 12, 14, 16].map((rowCount) => (
                  <Button
                    key={rowCount}
                    onClick={() => setRows(rowCount)}
                    className={`${rows === rowCount ? 'bg-blue-500' : 'bg-gray-500'}`}
                  >
                    {rowCount}
                  </Button>
                ))}
              </div>
            </div>
            <Button onClick={handleStartGame} className="w-full bg-blue-500">
              Start new game
            </Button>
          </div>
        </div>
        <div className="w-2/3">
          <div className="bg-darkBlue-lighter rounded-lg p-6 h-full">
            <canvas ref={canvasRef} width={600} height={400} className="w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plinko;
