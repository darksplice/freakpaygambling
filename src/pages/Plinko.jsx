import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

const Plinko = () => {
  const [mode, setMode] = useState('Manual');
  const [difficulty, setDifficulty] = useState('Easy');
  const [bet, setBet] = useState(10);
  const [rows, setRows] = useState(10);

  const handleStartGame = () => {
    // Implement game logic here
    console.log('Starting new game with:', { mode, difficulty, bet, rows });
  };

  return (
    <div className="flex h-full bg-[#1a1b2e] text-white p-4">
      <div className="w-1/3 pr-4">
        <div className="bg-[#252640] rounded-lg p-6 mb-4">
          <div className="flex justify-between mb-4">
            <Button
              onClick={() => setMode('Manual')}
              className={`${mode === 'Manual' ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              Manual
            </Button>
            <Button
              onClick={() => setMode('Auto')}
              className={`${mode === 'Auto' ? 'bg-blue-500' : 'bg-gray-700'}`}
            >
              Auto
            </Button>
          </div>
          <div className="mb-4">
            <p className="mb-2">Difficulty</p>
            <div className="flex justify-between">
              {['Easy', 'Normal', 'Hard'].map((diff) => (
                <Button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`${difficulty === diff ? 'bg-blue-500' : 'bg-gray-700'}`}
                >
                  {diff}
                </Button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-2">Bet amount</p>
            <div className="flex items-center">
              <input
                type="number"
                value={bet}
                onChange={(e) => setBet(Number(e.target.value))}
                className="bg-[#1a1b2e] text-white p-2 rounded mr-2 w-full"
              />
              <Button onClick={() => setBet(bet / 2)} className="px-2 py-1">1/2</Button>
              <Button onClick={() => setBet(bet * 2)} className="px-2 py-1 ml-2">2x</Button>
              <Button className="px-2 py-1 ml-2">Max</Button>
            </div>
          </div>
          <div className="mb-4">
            <p className="mb-2">Amount of rows</p>
            <div className="flex justify-between">
              {[8, 10, 12, 14, 16].map((rowCount) => (
                <Button
                  key={rowCount}
                  onClick={() => setRows(rowCount)}
                  className={`${rows === rowCount ? 'bg-blue-500' : 'bg-gray-700'}`}
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
        <div className="bg-[#252640] rounded-lg p-6 h-full">
          {/* Plinko board visualization would go here */}
          <div className="text-center">Plinko Board Visualization</div>
          <div className="flex justify-between mt-4">
            {['8.9x', '3x', '1.4x', '1.1x', '1x', '0.5x', '1x', '1.1x', '1.4x', '3x', '8.9x'].map((multiplier, index) => (
              <div key={index} className={`px-2 py-1 rounded ${index % 2 === 0 ? 'bg-purple-500' : 'bg-pink-500'}`}>
                {multiplier}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plinko;