import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'teacher' | 'admin' | 'exam_department') => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string, role: 'student' | 'teacher') => Promise<boolean>;
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
    role: 'student' | 'teacher' | 'admin' | 'exam_department'
  ): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5000/api/flows/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      });

      const data = await response.json();
      console.log('FULL API RESPONSE:', data);

      const workflowResult = data?.data?.data || {};
      console.log('WORKFLOW RESULT:', workflowResult);

      if (data.success === true && data.data.success === true && data.data.statusCode === "200" && workflowResult.status !== "failed") {

        // Login successful, now call user-info API
        const response1 = await fetch('http://localhost:5000/api/flows/user-info', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });

        const userInfoData = await response1.json();
        console.log('USER INFO RESPONSE:', userInfoData);

        setUser({
          id: email,
          name: email.split('@')[0],
          email,
          role,
          rollNumber: role === 'student' ? 'CS2021001' : undefined,
          department: 'Computer Science',
          semester: role === 'student' ? 4 : undefined
        });
        return true;
      } else {
        console.warn('LOGIN FAILED:', workflowResult.message || 'Unknown error');
        return false;
      }

    } catch (error) {
      console.error('LOGIN EXCEPTION:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (name: string, email: string, password: string, role: 'student' | 'teacher'): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:5000/api/flows/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Name: name, Email: email, Password: password, Role: role })
      });

      const data = await response.json();
      console.log('REGISTRATION RESPONSE:', data);

      if (data.success === true && data.data.statusCode !== "400") {
        const mockUser: User = {
          id: email,
          name,
          email,
          role,
          rollNumber: role === 'student' ? 'CS2021001' : undefined,
          department: 'Computer Science',
          semester: role === 'student' ? 4 : undefined
        };
        setUser(mockUser);
        return true;
      } else {
        console.warn('REGISTRATION FAILED:', data);
        return false;
      }
    } catch (error) {
      console.error('REGISTRATION EXCEPTION:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};