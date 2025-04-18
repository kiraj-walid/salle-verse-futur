
import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="login-card w-full max-w-md fade-in text-center">
        <div className="text-5xl mb-6">🤔</div>
        <h1 className="text-3xl font-bold text-foreground mb-4">Page introuvable</h1>
        <p className="text-muted-foreground mb-8">
          La page <span className="font-semibold">{location.pathname}</span> n'existe pas.
        </p>
        
        <Link 
          to="/dashboard" 
          className="btn btn-primary flex items-center justify-center mx-auto"
        >
          <Home size={18} className="mr-2" />
          Retour au tableau de bord
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
