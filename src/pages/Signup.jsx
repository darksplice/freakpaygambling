import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUsers.some(user => user.username === username)) {
      alert('Username already taken. Please choose a different one.');
      return;
    }
    const newUser = { username, balance: 0, amountGambled: 0, accountCreated: new Date().toISOString(), lifetimeBalance: 0 };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));
    localStorage.setItem('user', JSON.stringify(newUser));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1b2e]">
      <div className="bg-[#252640] p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Sign Up for FreakPay Casino</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-[#1a1b2e] text-white"
            />
          </div>
          <div className="mb-6">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#1a1b2e] text-white"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">Sign Up</Button>
        </form>
        <p className="mt-4 text-center text-white">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
