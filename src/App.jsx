import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Crash from "./pages/Crash";
import Towers from "./pages/Towers";
import Mines from "./pages/Mines";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import LoadingScreen from "./components/LoadingScreen";
import StaffConsole from "./components/StaffConsole";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className="flex min-h-screen bg-darkBlue">
            <div className="fixed left-0 top-0 bottom-0 z-10">
              <Sidebar />
            </div>
            <div className="flex-1 ml-16">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/crash" element={<ProtectedRoute><Crash /></ProtectedRoute>} />
                <Route path="/towers" element={<ProtectedRoute><Towers /></ProtectedRoute>} />
                <Route path="/mines" element={<ProtectedRoute><Mines /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/staff-console" element={<ProtectedRoute><StaffConsole /></ProtectedRoute>} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
