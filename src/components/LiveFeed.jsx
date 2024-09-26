import React from 'react';

const LiveFeed = ({ players }) => {
  return (
    <div className="bg-[#252640] rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Live Feed</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">Username</th>
            <th className="text-left">Bet</th>
            <th className="text-left">Multiplier</th>
            <th className="text-left">Payout</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index}>
              <td>{player.username}</td>
              <td>${player.bet.toFixed(2)}</td>
              <td>{player.multiplier}x</td>
              <td>${(player.bet * player.multiplier).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveFeed;