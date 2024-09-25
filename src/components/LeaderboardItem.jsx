import React from 'react';

const LeaderboardItem = ({ username, bet, cashout }) => {
  return (
    <div className="flex justify-between items-center bg-darkBlue-lighter p-2 rounded mb-2">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-blue-500 rounded-full mr-2 flex items-center justify-center">
          {username.charAt(0).toUpperCase()}
        </div>
        <span>{username}</span>
      </div>
      <div>
        <span className="mr-2">${bet}</span>
        <span className="text-green-400">${cashout}</span>
      </div>
    </div>
  );
};

export default LeaderboardItem;