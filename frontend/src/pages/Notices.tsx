import React, { useState } from 'react';
import { useNotices } from '../context/NoticesContext';
import { useAuth } from '../context/AuthContext';

const Notices: React.FC = () => {
  const { notices, addNotice, withdrawNotice } = useNotices();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: '', content: '', priority: 'medium' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const priorityMap = { high: 1, medium: 2, low: 3 };
      const payload = {
        operation: 'add',
        title: formData.title,
        content: formData.content,
        priority: priorityMap[formData.priority as keyof typeof priorityMap]
      };
      
      console.log('Sending notice payload:', payload);
      
      const response = await fetch('http://localhost:8080/api/flows/notice-add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      console.log('Notice add response:', result);
      
      if (response.ok) {
        addNotice({ ...formData, author: user?.name || 'Unknown' });
        setFormData({ title: '', content: '', priority: 'medium' });
        setShowForm(false);
        alert('Notice request submitted successfully!');
      } else {
        alert('Failed to submit notice request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting notice:', error);
      alert('Error submitting notice request. Please try again.');
    }
  };

  const teacherNotices = notices.filter(notice => notice.author === user?.name);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>My Notice Requests</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Cancel' : 'Request Notice'}
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Request New Notice</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                required
                rows={4}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Submit Request
            </button>
          </form>
        </div>
      )}

      <div style={{ display: 'grid', gap: '20px' }}>
        {teacherNotices.map(notice => (
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
                  <span style={{
                    color: notice.status === 'approved' ? '#27ae60' : notice.status === 'rejected' ? '#e74c3c' : '#f39c12',
                    fontWeight: 'bold'
                  }}>
                    Status: {notice.status.toUpperCase()}
                  </span>
                </div>
              </div>
              {notice.status === 'pending' && (
                <button
                  onClick={() => withdrawNotice(notice.id)}
                  style={{ padding: '5px 10px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Withdraw
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notices;