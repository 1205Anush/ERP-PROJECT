import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'teacher') => boolean;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: 'student' | 'teacher') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: 'student' | 'teacher'): boolean => {
    // Mock authentication
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: role === 'student' ? 'John Doe' : 'Prof. Smith',
        email,
        role,
        rollNumber: role === 'student' ? 'CS2021001' : undefined,
        department: 'Computer Science',
        semester: role === 'student' ? 4 : undefined
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const signup = (name: string, email: string, password: string, role: 'student' | 'teacher'): boolean => {
    // Mock signup
    if (name && email && password) {
      const mockUser: User = {
        id: '1',
        name,
        email,
        role,
        rollNumber: role === 'student' ? 'CS2021001' : undefined,
        department: 'Computer Science',
        semester: role === 'student' ? 4 : undefined
      };
      setUser(mockUser);
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};