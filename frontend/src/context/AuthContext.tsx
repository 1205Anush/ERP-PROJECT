import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'teacher') => Promise<boolean>;
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

const login = async (
  email: string,
  password: string,
  role: 'student' | 'teacher'
): Promise<boolean> => {
  try {
    const response = await fetch('http://localhost:5000/api/flows/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, Role: role })
    });

    const data = await response.json();
    console.log('API Response:', data);

    // The actual login result is nested inside data.data.data
    const workflowResult = data?.data?.data;

    if (workflowResult?.status === 'success') {
      // Use dynamic user data if your workflow sends it, otherwise create minimal object
      const loggedInUser: User = {
        id: workflowResult.user?.id || email, // fallback if no id
        name: workflowResult.user?.name || email, // fallback
        email,
        role,
        rollNumber: workflowResult.user?.rollNumber,
        department: workflowResult.user?.department,
        semester: workflowResult.user?.semester
      };
      setUser(loggedInUser);
      return true;
    } else {
      // Failed login
      console.warn('Login failed:', workflowResult?.message || 'Unknown error');
      return false;
    }
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
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