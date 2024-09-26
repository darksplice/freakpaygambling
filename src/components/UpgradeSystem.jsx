import React from 'react';
import { Button } from "@/components/ui/button";

const UpgradeSystem = ({ user, setUser }) => {
  const upgradeCost = (user.moneyPerSecond || 1/3) * 100;

  const handleUpgrade = () => {
    if (user.balance >= upgradeCost) {
      const updatedUser = {
        ...user,
        balance: user.balance - upgradeCost,
        moneyPerSecond: (user.moneyPerSecond || 1/3) + 1/3
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } else {
      alert("Insufficient balance for upgrade!");
    }
  };

  return (
    <div className="bg-[#252640] rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Upgrade Money Generation</h2>
      <p>Current rate: ${(user.moneyPerSecond || 1/3).toFixed(2)} per second</p>
      <p>Upgrade cost: ${upgradeCost.toFixed(2)}</p>
      <Button onClick={handleUpgrade} className="mt-4">Upgrade</Button>
    </div>
  );
};

export default UpgradeSystem;