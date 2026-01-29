import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const ExamDashboard: React.FC = () => {
  const { user } = useAuth();

  const examFeatures = [
    { title: 'Exam Scheduling', description: 'Schedule and manage exams', path: '/exam/exams', color: '#1e293b' },
    { title: 'Student Marks', description: 'Add and manage student marks', path: '/exam/student-marks', color: '#334155' },
    { title: 'Result Management', description: 'Process and publish results', path: '/exam/results', color: '#475569' },
    { title: 'Grade Processing', description: 'Calculate grades and CGPA', path: '/exam/grades', color: '#64748b' }
  ];

  return (
    <div style={{ padding: '40px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ color: '#0f172a', marginBottom: '8px', fontSize: '32px', fontWeight: '700', letterSpacing: '-0.025em' }}>Welcome, {user?.name}</h1>
          <p style={{ color: '#64748b', fontSize: '16px', fontWeight: '400' }}>Exam Department Dashboard</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {examFeatures.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              style={{
                textDecoration: 'none',
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '32px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                border: '1px solid #f1f5f9',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.borderColor = feature.color + '40';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
                e.currentTarget.style.borderColor = '#f1f5f9';
              }}
            >
              <h3 style={{ margin: '0 0 12px 0', color: '#1e293b', fontSize: '20px', fontWeight: '600' }}>{feature.title}</h3>
              <p style={{ margin: 0, color: '#64748b', lineHeight: '1.6', fontSize: '15px' }}>{feature.description}</p>
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div style={{ marginTop: '64px' }}>
          <h3 style={{ color: '#334155', marginBottom: '24px', fontSize: '18px', fontWeight: '600' }}>System Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { label: 'Scheduled Exams', value: '5', color: '#334155' },
              { label: 'Total Students', value: '342', color: '#334155' },
              { label: 'Pending Results', value: '28', color: '#475569' },
              { label: 'Published Results', value: '12', color: '#475569' }
            ].map((stat, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                padding: '24px',
                borderRadius: '8px',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                border: '1px solid #f1f5f9',
                textAlign: 'left'
              }}>
                <div style={{ fontSize: '13px', fontWeight: '500', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{stat.label}</div>
                <div style={{ fontSize: '28px', fontWeight: '700', color: '#1e293b' }}>{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDashboard;