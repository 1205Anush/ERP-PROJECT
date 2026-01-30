import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'course-registration', label: 'Course Registration', icon: '📚' },
    { id: 'student-info', label: 'Student Information', icon: '👤' },
    { id: 'examination', label: 'Examination', icon: '📝' }
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{
        width: '250px',
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '20px 0'
      }}>
        <div style={{ padding: '0 20px', marginBottom: '30px' }}>
          <h2 style={{ margin: 0, fontSize: '20px' }}>College ERP</h2>
        </div>
        <nav>
          {sidebarItems.map(item => (
            <div
              key={item.id}
              onClick={() => onTabChange(item.id)}
              style={{
                padding: '15px 20px',
                cursor: 'pointer',
                backgroundColor: activeTab === item.id ? '#34495e' : 'transparent',
                borderLeft: activeTab === item.id ? '4px solid #3498db' : '4px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{
          height: '60px',
          backgroundColor: '#ecf0f1',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px',
          borderBottom: '1px solid #bdc3c7'
        }}>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#2c3e50' }}>
            {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
          </h1>

          <div style={{ position: 'relative' }}>
            <div
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#3498db',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              {user?.name.charAt(0)}
            </div>

            {showProfileDropdown && (
              <div style={{
                position: 'absolute',
                top: '50px',
                right: '0',
                backgroundColor: 'white',
                border: '1px solid #bdc3c7',
                borderRadius: '5px',
                minWidth: '180px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                zIndex: 1000
              }}>
                <div style={{ padding: '10px 15px', borderBottom: '1px solid #ecf0f1' }}>
                  <div style={{ fontWeight: 'bold' }}>{user?.name}</div>
                  <div style={{ fontSize: '12px', color: '#7f8c8d' }}>{user?.email}</div>
                </div>
                <div
                  onClick={() => navigate('/change-password')}
                  style={{ padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid #ecf0f1' }}
                >
                  Change Password
                </div>
                <div
                  onClick={() => alert('Change Profile Picture functionality')}
                  style={{ padding: '10px 15px', cursor: 'pointer', borderBottom: '1px solid #ecf0f1' }}
                >
                  Change Profile Picture
                </div>
                <div
                  onClick={handleLogout}
                  style={{ padding: '10px 15px', cursor: 'pointer', color: '#e74c3c' }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <main style={{ flex: 1, padding: '20px', backgroundColor: '#f8f9fa', overflow: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;