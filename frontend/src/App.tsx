import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Student from './pages/Student';
import TeacherDashboard from './pages/TeacherDashboard';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRole?: 'student' | 'teacher' }> = ({ 
  children, 
  allowedRole 
}) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to={user.role === 'student' ? '/student/dashboard' : '/teacher/dashboard'} replace />;
  }
  
  return <>{children}</>;
};

// App Routes Component
const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={user ? <Navigate to={user.role === 'student' ? '/student/dashboard' : '/teacher/dashboard'} replace /> : <Login />} 
      />
      <Route 
        path="/signup" 
        element={user ? <Navigate to={user.role === 'student' ? '/student/dashboard' : '/teacher/dashboard'} replace /> : <Signup />} 
      />
      <Route 
        path="/forgot-password" 
        element={user ? <Navigate to={user.role === 'student' ? '/student/dashboard' : '/teacher/dashboard'} replace /> : <ForgotPassword />} 
      />
      
      {/* Protected Student Routes */}
      <Route 
        path="/student/*" 
        element={
          <ProtectedRoute allowedRole="student">
            <Student />
          </ProtectedRoute>
        } 
      />
      
      {/* Protected Teacher Routes */}
      <Route 
        path="/teacher/dashboard" 
        element={
          <ProtectedRoute allowedRole="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Default Route */}
      <Route 
        path="/" 
        element={
          user ? (
            <Navigate to={user.role === 'student' ? '/student/dashboard' : '/teacher/dashboard'} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div style={{ 
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
          fontFamily: 'Arial, sans-serif'
        }}>
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;