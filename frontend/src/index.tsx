import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Global CSS Reset and Base Styles
const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f8f9fa;
  }

  input, select, textarea, button {
    font-family: inherit;
  }

  button {
    transition: all 0.2s ease;
  }

  button:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  button:active {
    transform: translateY(0);
  }

  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }

  .card-hover {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  }

  @media (max-width: 768px) {
    .sidebar {
      width: 200px !important;
    }
    
    .main-content {
      padding: 15px !important;
    }
    
    .grid-responsive {
      grid-template-columns: 1fr !important;
    }
  }
`;

// Inject global styles
const styleSheet = document.createElement('style');
styleSheet.textContent = globalStyles;
document.head.appendChild(styleSheet);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);