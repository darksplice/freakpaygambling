import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon } from 'lucide-react';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isHidden, setIsHidden] = useState(false);
  const [onlineUsers] = useState(Math.floor(Math.random() * 100) + 50); // Random number between 50 and 150

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
    <div className={`fixed right-0 top-0 bottom-0 bg-darkBlue-lighter p-4 overflow-hidden flex flex-col transition-all duration-300 ease-in-out ${isHidden ? 'w-12' : 'w-1/4'}`}>
      <Button 
        onClick={() => setIsHidden(!isHidden)} 
        className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-darkBlue-lighter"
      >
        {isHidden ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </Button>
      {!isHidden && (
        <>
          <h2 className="text-xl font-bold mb-4 text-white">Chat ({onlineUsers} online)</h2>
          <div className="flex-grow overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2 text-white">
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
              className="flex-grow mr-2 bg-darkBlue text-white"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBox;
