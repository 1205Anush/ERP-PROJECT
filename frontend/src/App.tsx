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
import ChangePassword from './pages/ChangePassword';
import StudentPerformance from './pages/StudentPerformance';
import AdminDashboard from './pages/AdminDashboard';
import ExamDashboard from './pages/ExamDashboard';
import AdminNotices from './pages/AdminNotices';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRole?: 'student' | 'teacher' | 'admin' | 'exam_department' }> = ({ 
  children, 
  allowedRole 
}) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (allowedRole && user.role !== allowedRole) {
    const dashboardRoutes = {
      student: '/student/dashboard',
      teacher: '/teacher/dashboard',
      admin: '/admin/dashboard',
      exam_department: '/exam/dashboard'
    };
    return <Navigate to={dashboardRoutes[user.role]} replace />;
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
        element={user ? <Navigate to={{
          student: '/student/dashboard',
          teacher: '/teacher/dashboard',
          admin: '/admin/dashboard',
          exam_department: '/exam/dashboard'
        }[user.role]} replace /> : <Login />} 
      />
      <Route 
        path="/signup" 
        element={user ? <Navigate to={{
          student: '/student/dashboard',
          teacher: '/teacher/dashboard',
          admin: '/admin/dashboard',
          exam_department: '/exam/dashboard'
        }[user.role]} replace /> : <Signup />} 
      />
      <Route 
        path="/forgot-password" 
        element={user ? <Navigate to={{
          student: '/student/dashboard',
          teacher: '/teacher/dashboard',
          admin: '/admin/dashboard',
          exam_department: '/exam/dashboard'
        }[user.role]} replace /> : <ForgotPassword />} 
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
      
      {/* Protected Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/notices" 
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminNotices />
          </ProtectedRoute>
        } 
      />
      
      {/* Protected Exam Department Routes */}
      <Route 
        path="/exam/dashboard" 
        element={
          <ProtectedRoute allowedRole="exam_department">
            <ExamDashboard />
          </ProtectedRoute>
        } 
      />
      
      {/* Default Route */}
      <Route 
        path="/" 
        element={
          user ? (
            <Navigate to={{
              student: '/student/dashboard',
              teacher: '/teacher/dashboard',
              admin: '/admin/dashboard',
              exam_department: '/exam/dashboard'
            }[user.role]} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } 
      />
      
      <Route 
        path="/change-password" 
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
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