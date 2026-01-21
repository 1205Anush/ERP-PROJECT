import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotices } from '../context/NoticesContext';
import { mockCourses, mockAttendance, mockTimetable } from '../data/mockData';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { notices } = useNotices();

  const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>{title}</h3>
      {children}
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>Welcome back, {user?.name}!</h2>
        <p style={{ color: '#7f8c8d', margin: '5px 0 0 0' }}>
          Roll No: {user?.rollNumber} | Department: {user?.department} | Semester: {user?.semester}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Enrolled Courses */}
        <Card title="📚 Enrolled Courses">
          {mockCourses.slice(0, 4).map(course => (
            <div key={course.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid #ecf0f1'
            }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{course.name}</div>
                <div style={{ fontSize: '12px', color: '#7f8c8d' }}>{course.code}</div>
              </div>
              <div style={{ color: '#27ae60', fontWeight: 'bold' }}>
                {course.credits} Credits
              </div>
            </div>
          ))}
        </Card>

        {/* Attendance Summary */}
        <Card title="📊 Attendance Summary">
          {mockAttendance.map((attendance, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 0',
              borderBottom: '1px solid #ecf0f1'
            }}>
              <span>{attendance.subject}</span>
              <div style={{
                padding: '4px 8px',
                borderRadius: '15px',
                backgroundColor: attendance.percentage >= 85 ? '#d5f4e6' : attendance.percentage >= 75 ? '#fff3cd' : '#f8d7da',
                color: attendance.percentage >= 85 ? '#155724' : attendance.percentage >= 75 ? '#856404' : '#721c24',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {attendance.percentage}%
              </div>
            </div>
          ))}
        </Card>

        {/* Notices */}
        <Card title="📢 Recent Notices">
          {notices.slice(0, 3).map(notice => (
            <div key={notice.id} style={{
              padding: '10px 0',
              borderBottom: '1px solid #ecf0f1'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
                <div style={{ fontWeight: 'bold' }}>{notice.title}</div>
                {notice.priority === 'high' && (
                  <div style={{
                    padding: '2px 6px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    borderRadius: '8px',
                    fontSize: '10px',
                    fontWeight: 'bold'
                  }}>
                    URGENT
                  </div>
                )}
              </div>
              <div style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '5px' }}>
                {notice.content}
              </div>
              <div style={{ fontSize: '12px', color: '#95a5a6' }}>
                {new Date(notice.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </Card>

        {/* Weekly Timetable */}
        <Card title="🗓️ Weekly Timetable">
          {mockTimetable.map((entry, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px 0',
              borderBottom: '1px solid #ecf0f1'
            }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{entry.day}</div>
                <div style={{ fontSize: '12px', color: '#7f8c8d' }}>{entry.time}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px' }}>{entry.subject}</div>
                <div style={{ fontSize: '12px', color: '#7f8c8d' }}>{entry.room}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;