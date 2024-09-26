import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          onLoadingComplete();
          return 100;
        }
        return prevProgress + (100 / 80); // 80 steps for 8 seconds
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-darkBlue flex items-center justify-center z-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Loading Data, Please Wait</h2>
        <div className="w-64 h-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
