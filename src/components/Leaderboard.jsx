import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const sortedUsers = users.sort((a, b) => b.balance - a.balance).slice(0, 10);
    setLeaderboard(sortedUsers);
  }, []);

  return (
    <div className="bg-[#252640] rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      <div className="overflow-y-auto max-h-60">
        {leaderboard.map((user, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-700">
            <span>{index + 1}. {user.username}</span>
            <span>${user.balance.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;