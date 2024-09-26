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
import Plinko from "./pages/Plinko";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [timeOnSite, setTimeOnSite] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      const moneyInterval = setInterval(() => {
        setUser(prevUser => {
          const updatedUser = {
            ...prevUser,
            balance: prevUser.balance + (prevUser.moneyPerSecond || 1/3)
          };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          return updatedUser;
        });
      }, 1000);

      const timeInterval = setInterval(() => {
        setTimeOnSite(prevTime => prevTime + 1);
      }, 1000);

      return () => {
        clearInterval(moneyInterval);
        clearInterval(timeInterval);
      };
    }
  }, [user]);

  useEffect(() => {
    if (user && timeOnSite % 60 === 0) {
      const updatedUser = {
        ...user,
        timeOnSite: (user.timeOnSite || 0) + 1
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    }
  }, [timeOnSite, user]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter basename="/freakpay-gambleverse">
          <div className="flex h-screen bg-[#1a1b2e]">
            {user && <Sidebar />}
            <div className="flex flex-col flex-1">
              <Header user={user} />
              <div className="flex-1 overflow-auto">
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/crash" element={<ProtectedRoute><Crash /></ProtectedRoute>} />
                  <Route path="/towers" element={<ProtectedRoute><Towers /></ProtectedRoute>} />
                  <Route path="/mines" element={<ProtectedRoute><Mines /></ProtectedRoute>} />
                  <Route path="/plinko" element={<ProtectedRoute><Plinko /></ProtectedRoute>} />
                  <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
