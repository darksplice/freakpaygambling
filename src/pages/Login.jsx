import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = existingUsers.find(u => u.username === username);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBlue">
      <div className="bg-darkBlue-lighter p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">Login to FreakPay Casino</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-darkBlue text-white"
            />
          </div>
          <div className="mb-6">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-darkBlue text-white"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">Login</Button>
        </form>
        <p className="mt-4 text-center text-white">
          Don't have an account? <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
