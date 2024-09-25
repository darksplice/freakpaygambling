import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  useEffect(() => {
    // Simulating incoming messages
    const interval = setInterval(() => {
      const randomMessage = {
        username: `User${Math.floor(Math.random() * 1000)}`,
        message: `Random message ${Math.floor(Math.random() * 100)}`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, randomMessage].slice(-50)); // Keep last 50 messages
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        username: user.username,
        message: newMessage,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages(prev => [...prev, message].slice(-50)); // Keep last 50 messages
      setNewMessage('');
    }
  };

  return (
    <div className="w-1/4 bg-darkBlue-lighter p-4 overflow-hidden flex flex-col h-screen">
      <h2 className="text-xl font-bold mb-4">Chat</h2>
      <div className="flex-grow overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">{msg.username}: </span>
            <span>{msg.message}</span>
            <span className="text-xs text-gray-400 ml-2">{msg.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-grow mr-2"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};

export default ChatBox;