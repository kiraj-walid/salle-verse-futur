
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useToast } from '../contexts/ToastContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      navigate('/dashboard');
      showToast('Connexion réussie !', 'success');
    } catch (err) {
      // Error is already handled in the AuthContext
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
      <div className="login-card w-full max-w-md fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Salle<span className="text-primary">Verse</span>Futur</h1>
          <p className="text-muted-foreground">Système de réservation de salles universitaires</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="email@university.fr"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex justify-between mb-6">
            <div className="flex items-center">
              <input 
                id="remember" 
                type="checkbox" 
                className="h-4 w-4 text-primary border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Se souvenir de moi
              </label>
            </div>
            <a href="#" className="text-sm text-primary hover:underline">
              Mot de passe oublié ?
            </a>
          </div>
          
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Besoin d'aide ? <a href="#" className="text-primary hover:underline">Contactez-nous</a>
          </p>
        </div>
        
        <div className="mt-8 p-3 bg-muted rounded-md text-sm text-center">
          <p className="text-gray-600 mb-1">Démonstration</p>
          <p className="text-xs text-gray-500">
            Professeur: prof@university.fr / password<br />
            Admin: admin@university.fr / password
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
