import React, { useState } from 'react';
import { useNotices } from '../context/NoticesContext';

const StudentNotices: React.FC = () => {
  const { notices } = useNotices();

  return (
    <div>
      <h2 style={{ color: '#2c3e50', marginBottom: '30px' }}>Notices & Announcements</h2>

      <div style={{ display: 'grid', gap: '20px' }}>
        {notices.map(notice => (
          <div key={notice.id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{notice.title}</h3>
                <p style={{ margin: '0 0 10px 0', color: '#7f8c8d' }}>{notice.content}</p>
                <div style={{ display: 'flex', gap: '15px', fontSize: '14px', color: '#95a5a6' }}>
                  <span>Date: {notice.date}</span>
                  <span style={{ 
                    color: notice.priority === 'high' ? '#e74c3c' : notice.priority === 'medium' ? '#f39c12' : '#27ae60',
                    fontWeight: 'bold'
                  }}>
                    Priority: {notice.priority.toUpperCase()}
                  </span>
                </div>
              </div>
              {notice.priority === 'high' && (
                <div style={{
                  padding: '4px 8px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  URGENT
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {notices.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
          No notices available at the moment.
        </div>
      )}
    </div>
  );
};

export default StudentNotices;