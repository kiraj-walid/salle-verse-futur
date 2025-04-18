
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

// Import icons from Lucide React
import { Menu, X, LayoutDashboard, Users, Calendar, LogOut, Settings, BookOpen, Clock } from 'lucide-react';

interface SidebarProps {
  isMobileSidebarOpen: boolean;
  setIsMobileSidebarOpen: (value: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobileSidebarOpen, setIsMobileSidebarOpen }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<string>('dashboard');

  useEffect(() => {
    // Set active item based on current path
    const path = window.location.pathname;
    if (path.includes('dashboard')) setActiveItem('dashboard');
    else if (path.includes('rooms')) setActiveItem('rooms');
    else if (path.includes('reservations')) setActiveItem('reservations');
    else if (path.includes('users')) setActiveItem('users');
    else if (path.includes('settings')) setActiveItem('settings');
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Close sidebar on mobile when a link is clicked
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setIsMobileSidebarOpen(false);
    }
  };

  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className={`sidebar ${isMobileSidebarOpen ? 'sidebar-visible' : ''}`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-primary">SalleVerseFutur</h2>
        <button
          className="lg:hidden text-gray-500 hover:text-primary focus:outline-none"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <X size={24} />
        </button>
      </div>
      
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
            {user?.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-sm text-gray-500">{isAdmin ? 'Administrateur' : 'Professeur'}</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeItem === 'dashboard' 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveItem('dashboard');
                handleLinkClick();
              }}
            >
              <LayoutDashboard size={20} />
              <span>Tableau de bord</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/rooms"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeItem === 'rooms' 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveItem('rooms');
                handleLinkClick();
              }}
            >
              <BookOpen size={20} />
              <span>Salles</span>
            </Link>
          </li>
          
          <li>
            <Link
              to="/reservations"
              className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                activeItem === 'reservations' 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveItem('reservations');
                handleLinkClick();
              }}
            >
              <Calendar size={20} />
              <span>Mes réservations</span>
            </Link>
          </li>
          
          {isAdmin && (
            <>
              <li>
                <Link
                  to="/users"
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeItem === 'users' 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setActiveItem('users');
                    handleLinkClick();
                  }}
                >
                  <Users size={20} />
                  <span>Utilisateurs</span>
                </Link>
              </li>
              
              <li>
                <Link
                  to="/settings"
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    activeItem === 'settings' 
                      ? 'bg-primary text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => {
                    setActiveItem('settings');
                    handleLinkClick();
                  }}
                >
                  <Settings size={20} />
                  <span>Paramètres</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      
      <div className="mt-auto p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <LogOut size={20} />
          <span>Se déconnecter</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
