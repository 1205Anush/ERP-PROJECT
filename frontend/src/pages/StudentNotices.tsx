import React, { useState, useEffect } from 'react';
import { useNotices } from '../context/NoticesContext';

interface ApiNotice {
  title: string;
  content: string;
  priority: number;
}

const StudentNotices: React.FC = () => {
  const [apiNotices, setApiNotices] = useState<ApiNotice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      console.log('Making API call to fetch notices...');
      const response = await fetch('http://localhost:5000/api/flows/notice-fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      
      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Full API response:', JSON.stringify(result, null, 2));
      console.log('result.data:', result.data);
      console.log('Is result.data an array?', Array.isArray(result.data));
      
      if (response.ok) {
        if (result.data) {
          const notices = Array.isArray(result.data) ? result.data : [];
          console.log('Extracted notices array:', notices);
          const extractedNotices = notices.map((notice: any) => ({
            title: notice.title || 'No Title',
            content: notice.content || 'No Content',
            priority: notice.priority || 2
          }));
          console.log('Final extracted notices:', extractedNotices);
          setApiNotices(extractedNotices);
        } else {
          console.log('No data field in response');
        }
      } else {
        console.log('Response not ok:', response.status);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 1: return 'HIGH';
      case 2: return 'MEDIUM';
      case 3: return 'LOW';
      default: return 'MEDIUM';
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return '#e74c3c';
      case 2: return '#f39c12';
      case 3: return '#27ae60';
      default: return '#f39c12';
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
        Loading notices...
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ color: '#2c3e50', marginBottom: '30px' }}>Notices & Announcements</h2>

      <div style={{ display: 'grid', gap: '20px' }}>
        {apiNotices.map((notice, index) => (
          <div key={index} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{notice.title}</h3>
                <p style={{ margin: '0 0 10px 0', color: '#7f8c8d' }}>{notice.content}</p>
                <div style={{ display: 'flex', gap: '15px', fontSize: '14px', color: '#95a5a6' }}>
                  <span style={{ 
                    color: getPriorityColor(notice.priority),
                    fontWeight: 'bold'
                  }}>
                    Priority: {getPriorityText(notice.priority)}
                  </span>
                </div>
              </div>
              {notice.priority === 1 && (
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

      {apiNotices.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
          No notices available at the moment.
        </div>
      )}
    </div>
  );
};

export default StudentNotices;