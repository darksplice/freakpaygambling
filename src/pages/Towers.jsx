import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Towers = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Towers Game</h1>
        <p className="mb-8">Towers game implementation goes here.</p>
        <Link to="/">
          <Button>Back to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default Towers;