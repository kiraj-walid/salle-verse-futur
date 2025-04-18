
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const Layout: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <Sidebar 
        isMobileSidebarOpen={isMobileSidebarOpen} 
        setIsMobileSidebarOpen={setIsMobileSidebarOpen} 
      />

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${isMobileSidebarOpen ? '' : 'lg:ml-[260px]'}`}>
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
