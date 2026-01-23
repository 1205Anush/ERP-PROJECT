import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ExamDashboard: React.FC = () => {
  const { user } = useAuth();

  const examFeatures = [
    { title: 'Exam Scheduling', description: 'Schedule and manage exams', icon: '📝', path: '/exam/exams', color: '#e74c3c' },
    { title: 'Student Marks', description: 'Add and manage student marks', icon: '📊', path: '/exam/student-marks', color: '#1abc9c' },
    { title: 'Result Management', description: 'Process and publish results', icon: '📈', path: '/exam/results', color: '#3498db' },
    { title: 'Grade Processing', description: 'Calculate grades and CGPA', icon: '🎓', path: '/exam/grades', color: '#9b59b6' }
  ];

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '10px' }}>Welcome, {user?.name}! 📋</h1>
        <p style={{ color: '#7f8c8d', fontSize: '16px' }}>Exam Department - Manage examinations and results</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {examFeatures.map((feature, index) => (
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
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e74c3c' }}>5</div>
            <div style={{ color: '#7f8c8d' }}>Scheduled Exams</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1abc9c' }}>342</div>
            <div style={{ color: '#7f8c8d' }}>Total Students</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3498db' }}>28</div>
            <div style={{ color: '#7f8c8d' }}>Pending Results</div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#9b59b6' }}>12</div>
            <div style={{ color: '#7f8c8d' }}>Published Results</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDashboard;