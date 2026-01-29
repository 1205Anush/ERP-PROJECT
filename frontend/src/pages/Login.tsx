import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher' | 'admin' | 'exam_department'>('student');
  const [error, setError] = useState('');

  const { login, logout } = useAuth();
  const navigate = useNavigate();

  // Force fresh session on login page mount
  React.useEffect(() => {
    console.log('Login Page Mounted: Clearing session for fresh start');
    logout();
  }, [logout]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password, role);
    if (success) {
      if (role === 'student') {
        navigate('/student/dashboard');
      } else if (role === 'teacher') {
        navigate('/teacher/dashboard');
      } else if (role === 'admin') {
        navigate('/admin/dashboard');
      } else if (role === 'exam_department') {
        navigate('/exam/dashboard');
      }
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f8f9fa',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>
          College ERP Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'student' | 'teacher' | 'admin' | 'exam_department')}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                fontSize: '16px'
              }}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
              <option value="exam_department">Exam Department</option>
            </select>
          </div>

          {error && (
            <div style={{ color: '#e74c3c', marginBottom: '20px', textAlign: 'center' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            Login
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <Link to="/signup" style={{ color: '#3498db', textDecoration: 'none' }}>
            Don't have an account? Sign up
          </Link>
          <br />
          <Link to="/forgot-password" style={{ color: '#3498db', textDecoration: 'none', marginTop: '10px', display: 'inline-block' }}>
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;