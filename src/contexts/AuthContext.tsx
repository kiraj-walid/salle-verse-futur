
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define types for our user and context
type User = {
  id: number;
  name: string;
  email: string;
  role: 'PROFESSOR' | 'ADMIN';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is stored in localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function - Would normally connect to your Spring Boot API
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // This is a mock login - in a real app, you'd call your API
      // await api.post('/auth/login', { email, password })
      
      // For demo purposes, we'll create mock users
      if (email === 'prof@university.fr' && password === 'password') {
        const mockProfessor = {
          id: 1,
          name: 'Dr. Dupont',
          email: 'prof@university.fr',
          role: 'PROFESSOR' as const,
        };
        setUser(mockProfessor);
        localStorage.setItem('user', JSON.stringify(mockProfessor));
      } else if (email === 'admin@university.fr' && password === 'password') {
        const mockAdmin = {
          id: 2,
          name: 'Admin Martin',
          email: 'admin@university.fr',
          role: 'ADMIN' as const,
        };
        setUser(mockAdmin);
        localStorage.setItem('user', JSON.stringify(mockAdmin));
      } else {
        throw new Error('Identifiants invalides');
      }
    } catch (err) {
      setError((err as Error).message || 'Une erreur est survenue lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Value object to be provided to consumers
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
