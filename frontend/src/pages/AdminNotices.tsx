import React, { useState, useEffect } from 'react';
import { useNotices } from '../context/NoticesContext';

interface PendingNotice {
  title: string;
  content: string;
  priority: number;
  index: number;
}

interface ApprovedNotice {
  title: string;
  content: string;
  priority: number;
  index: number;
}

const AdminNotices: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<PendingNotice[]>([]);
  const [approvedNotices, setApprovedNotices] = useState<ApprovedNotice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingRequests();
    fetchApprovedNotices();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      console.log('Fetching pending notice requests...');
      const response = await fetch('http://localhost:5000/api/flows/notice-fetch-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      console.log('Admin fetch response:', result);

      if (response.ok && result.data && result.data.data) {
        const apiData = result.data.data;

        // Extract arrays directly
        const titleArray = apiData.title || [];
        const contentArray = apiData.content || [];
        const priorityArray = apiData.priority ? apiData.priority.map((p: string | number) => typeof p === 'string' ? parseInt(p) : p) : [];

        console.log('Title array:', titleArray);
        console.log('Content array:', contentArray);
        console.log('Priority array:', priorityArray);

        // Combine arrays into notice objects
        const notices: PendingNotice[] = [];
        const maxLength = Math.max(titleArray.length, contentArray.length, priorityArray.length);

        for (let i = 0; i < maxLength; i++) {
          notices.push({
            title: titleArray[i] || 'No Title',
            content: (contentArray[i] || 'No Content').trim(),
            priority: priorityArray[i] || 2,
            index: i
          });
        }

        console.log('Combined notices:', notices);
        setPendingRequests(notices);
      }
    } catch (error) {
      console.error('Error fetching pending requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovedNotices = async () => {
    try {
      console.log('Fetching approved notices...');
      const response = await fetch('http://localhost:5000/api/flows/notice-fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      console.log('Approved notices response:', result);

      if (response.ok && result.data && result.data.data) {
        const apiData = result.data.data;

        const titleArray = apiData.title || [];
        const contentArray = apiData.content || [];
        const priorityArray = apiData.priority ? apiData.priority.map((p: string | number) => typeof p === 'string' ? parseInt(p) : p) : [];

        const notices: ApprovedNotice[] = [];
        const maxLength = Math.max(titleArray.length, contentArray.length, priorityArray.length);

        for (let i = 0; i < maxLength; i++) {
          notices.push({
            title: titleArray[i] || 'No Title',
            content: (contentArray[i] || 'No Content').trim(),
            priority: priorityArray[i] || 2,
            index: i
          });
        }

        setApprovedNotices(notices);
      }
    } catch (error) {
      console.error('Error fetching approved notices:', error);
    }
  };

  const handleApprove = async (noticeIndex: number) => {
    try {
      const notice = pendingRequests[noticeIndex];
      console.log('Approving notice:', notice.title);

      const response = await fetch('http://localhost:5000/api/flows/notice-approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: notice.title })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Notice approved successfully!');
        fetchPendingRequests();
        fetchApprovedNotices();
      } else {
        alert('Failed to approve notice.');
      }
    } catch (error) {
      console.error('Error approving notice:', error);
      alert('Error approving notice.');
    }
  };

  const handleDelete = async (noticeIndex: number) => {
    try {
      const notice = approvedNotices[noticeIndex];
      console.log('Deleting notice:', notice.title);

      const response = await fetch('http://localhost:5000/api/flows/notice-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: notice.title })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert('Notice deleted successfully!');
        fetchApprovedNotices();
      } else {
        alert('Failed to delete notice.');
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
      alert('Error deleting notice.');
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
        Loading notice requests...
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ color: '#2c3e50', marginBottom: '30px' }}>Notice Management</h2>

      {/* Pending Notices Section */}
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ color: '#e67e22', marginBottom: '20px' }}>Pending Requests ({pendingRequests.length})</h3>
        <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
          <div style={{ display: 'grid', gap: '20px' }}>
            {pendingRequests.map((notice) => (
              <div key={notice.index} style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '10px', border: '1px solid #ffeaa7' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{notice.title}</h4>
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
                  <button
                    onClick={() => handleApprove(notice.index)}
                    style={{ padding: '8px 16px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
          {pendingRequests.length === 0 && (
            <div style={{ textAlign: 'center', padding: '20px', color: '#7f8c8d', backgroundColor: 'white', borderRadius: '10px' }}>
              No pending notice requests.
            </div>
          )}
        </div>
      </div>

      {/* Approved Notices Section */}
      <div>
        <h3 style={{ color: '#27ae60', marginBottom: '20px' }}>Approved Notices ({approvedNotices.length})</h3>
        <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '10px' }}>
          <div style={{ display: 'grid', gap: '20px' }}>
            {approvedNotices.map((notice) => (
              <div key={notice.index} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>{notice.title}</h4>
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
                  <button
                    onClick={() => handleDelete(notice.index)}
                    style={{ padding: '8px 16px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {approvedNotices.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#7f8c8d', backgroundColor: 'white', borderRadius: '10px' }}>
            No approved notices.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotices;