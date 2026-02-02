import React from 'react';

const DashboardLoader: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#fafbfc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      <div style={{
        width: 40,
        height: 40,
        border: '3px solid #e2e8f0',
        borderTop: '3px solid #3498db',
        borderRadius: '50%',
        animation: 'dashboardSpin 1s linear infinite',
        marginBottom: 24
      }} />
      
      <p style={{
        margin: 0,
        color: '#64748b',
        fontSize: 14,
        fontWeight: 500,
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        Loading dashboard…
      </p>

      <style>
        {`
          @keyframes dashboardSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default DashboardLoader;