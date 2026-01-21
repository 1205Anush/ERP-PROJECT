import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NoticesProvider } from './context/NoticesContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Student from './pages/Student';
import TeacherDashboard from './pages/TeacherDashboard';
import Notices from './pages/Notices';
import StudentNotices from './pages/StudentNotices';
import Attendance from './pages/Attendance';
import Courses from './pages/Courses';
import Exams from './pages/Exams';
import FeesStatus from './pages/FeesStatus';
import StudentMarks from './pages/StudentMarks';
import StudentPerformance from './pages/StudentPerformance';

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
      <Route 
        path="/student/notices" 
        element={
          <ProtectedRoute allowedRole="student">
            <StudentNotices />
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
      <Route 
        path="/teacher/notices" 
        element={
          <ProtectedRoute allowedRole="teacher">
            <Notices />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/teacher/attendance" 
        element={
          <ProtectedRoute allowedRole="teacher">
            <Attendance />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/teacher/courses" 
        element={
          <ProtectedRoute allowedRole="teacher">
            <Courses />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/teacher/exams" 
        element={
          <ProtectedRoute allowedRole="teacher">
            <Exams />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/teacher/fees-status" 
        element={
          <ProtectedRoute allowedRole="teacher">
            <FeesStatus />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/teacher/student-marks" 
        element={
          <ProtectedRoute allowedRole="teacher">
            <StudentMarks />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/teacher/student-performance" 
        element={
          <ProtectedRoute allowedRole="teacher">
            <StudentPerformance />
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
      <NoticesProvider>
        <Router>
          <div style={{ 
            minHeight: '100vh',
            backgroundColor: '#f8f9fa',
            fontFamily: 'Arial, sans-serif'
          }}>
            <AppRoutes />
          </div>
        </Router>
      </NoticesProvider>
    </AuthProvider>
  );
};

export default App;