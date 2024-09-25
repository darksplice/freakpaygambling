import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Header from '../components/Header';

const Settings = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [nickname, setNickname] = useState(user.username);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || '');

  const handleSave = () => {
    const updatedUser = { ...user, username: nickname, profilePicture };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-darkBlue text-white">
      <Header username={user.username} />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>
        <div className="bg-darkBlue-lighter rounded-lg p-6 mb-8">
          <div className="mb-4">
            <label className="block mb-2">Nickname</label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="bg-darkBlue text-white p-2 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Profile Picture URL</label>
            <input
              type="text"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              className="bg-darkBlue text-white p-2 rounded w-full"
            />
          </div>
          <Button onClick={handleSave}>Save Settings</Button>
        </div>
        <Link to="/">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default Settings;