import React from 'react';
import { useAuth } from '../context/AuthContext';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '60px 40px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%'
      }}>
        <div style={{
          fontSize: '64px',
          marginBottom: '20px'
        }}>
          👨‍🏫
        </div>
        
        <h2 style={{
          color: '#2c3e50',
          marginBottom: '15px',
          fontSize: '28px'
        }}>
          Welcome, {user?.name}!
        </h2>
        
        <p style={{
          color: '#7f8c8d',
          fontSize: '18px',
          marginBottom: '30px',
          lineHeight: '1.6'
        }}>
          Teacher Dashboard Coming Soon
        </p>
        
        <div style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '10px',
          marginBottom: '20px'
        }}>
          <h4 style={{ color: '#2c3e50', marginBottom: '15px' }}>Upcoming Features:</h4>
          <ul style={{
            textAlign: 'left',
            color: '#7f8c8d',
            lineHeight: '1.8',
            paddingLeft: '20px'
          }}>
            <li>Course Management</li>
            <li>Student Attendance Tracking</li>
            <li>Grade Management</li>
            <li>Assignment Creation</li>
            <li>Student Performance Analytics</li>
            <li>Notice Board Management</li>
          </ul>
        </div>
        
        <div style={{
          padding: '15px',
          backgroundColor: '#e8f5e8',
          borderRadius: '8px',
          color: '#27ae60',
          fontSize: '14px'
        }}>
          <strong>Status:</strong> Teacher module is currently under development and will be available in the next release.
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;