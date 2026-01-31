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
      console.log('Fetching approved notices...');
      const response = await fetch('http://localhost:8080/api/flows/notice-fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      console.log('Approved notices response:', result);

      if (response.ok && result.data && result.data.data) {
        const apiData = result.data.data;

        // Extract arrays
        const titleArray = apiData.title || [];
        const contentArray = apiData.content || [];
        const priorityArray = apiData.priority ? apiData.priority.map((p: string | number) => typeof p === 'string' ? parseInt(p) : p) : [];

        // Combine arrays into notice objects
        const notices: ApiNotice[] = [];
        const maxLength = Math.max(titleArray.length, contentArray.length, priorityArray.length);

        for (let i = 0; i < maxLength; i++) {
          notices.push({
            title: titleArray[i] || 'No Title',
            content: (contentArray[i] || 'No Content').trim(),
            priority: priorityArray[i] || 2
          });
        }

        console.log('Student notices:', notices);
        setApiNotices(notices);
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

      <div style={{
        maxHeight: '500px',
        overflowY: 'auto',
        paddingRight: '10px'
      }}>
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