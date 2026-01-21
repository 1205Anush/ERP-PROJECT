import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const TeacherDashboard: React.FC = () => {
  const { user } = useAuth();

  const teacherFeatures = [
    { title: 'Notices', description: 'Manage announcements and notices', icon: '📢', path: '/teacher/notices', color: '#3498db' },
    { title: 'Attendance', description: 'Track student attendance', icon: '📋', path: '/teacher/attendance', color: '#27ae60' },
    { title: 'Courses', description: 'Manage course information', icon: '📚', path: '/teacher/courses', color: '#f39c12' },
    { title: 'Exams', description: 'Schedule and manage exams', icon: '📝', path: '/teacher/exams', color: '#e74c3c' },
    { title: 'Fees Status', description: 'Monitor student fee payments', icon: '💰', path: '/teacher/fees-status', color: '#9b59b6' },
    { title: 'Student Marks', description: 'Add and manage student marks', icon: '📊', path: '/teacher/student-marks', color: '#1abc9c' },
    { title: 'Performance', description: 'View student performance analytics', icon: '📈', path: '/teacher/student-performance', color: '#34495e' }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>Welcome, {user?.name}! 👨🏫</h1>
        <p style={{ color: '#7f8c8d', fontSize: '16px' }}>Manage your classes and students efficiently</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {teacherFeatures.map((feature, index) => (
          <Link
            key={index}
            to={feature.path}
            style={{
              textDecoration: 'none',
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '25px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
              border: `3px solid ${feature.color}20`
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <div style={{ fontSize: '32px', marginRight: '15px' }}>{feature.icon}</div>
              <div>
                <h3 style={{ margin: 0, color: feature.color, fontSize: '20px' }}>{feature.title}</h3>
              </div>
            </div>
            <p style={{ margin: 0, color: '#7f8c8d', lineHeight: '1.5' }}>{feature.description}</p>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div style={{ marginTop: '40px' }}>
        <h3 style={{ color: '#2c3e50', marginBottom: '20px' }}>Quick Overview</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3498db' }}>4</div>
            <div style={{ color: '#7f8c8d' }}>Active Courses</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#27ae60' }}>156</div>
            <div style={{ color: '#7f8c8d' }}>Total Students</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f39c12' }}>3</div>
            <div style={{ color: '#7f8c8d' }}>Pending Exams</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }}>12</div>
            <div style={{ color: '#7f8c8d' }}>Ungraded Assignments</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;