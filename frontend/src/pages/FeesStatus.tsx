import React, { useState } from 'react';

const FeesStatus: React.FC = () => {
  const [students] = useState([
    { id: 1, name: 'Alice Johnson', rollNumber: '101', semester: 3, totalFees: 50000, paidAmount: 50000, dueAmount: 0, status: 'paid', lastPayment: '2024-01-15' },
    { id: 2, name: 'Bob Smith', rollNumber: '102', semester: 3, totalFees: 50000, paidAmount: 30000, dueAmount: 20000, status: 'partial', lastPayment: '2023-12-20' },
    { id: 3, name: 'Charlie Brown', rollNumber: '103', semester: 3, totalFees: 50000, paidAmount: 0, dueAmount: 50000, status: 'unpaid', lastPayment: null },
    { id: 4, name: 'Diana Prince', rollNumber: '104', semester: 3, totalFees: 50000, paidAmount: 45000, dueAmount: 5000, status: 'partial', lastPayment: '2024-01-10' }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.rollNumber.includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return { bg: '#d4edda', color: '#155724' };
      case 'partial': return { bg: '#fff3cd', color: '#856404' };
      case 'unpaid': return { bg: '#f8d7da', color: '#721c24' };
      default: return { bg: '#e2e3e5', color: '#383d41' };
    }
  };

  const totalStudents = students.length;
  const paidStudents = students.filter(s => s.status === 'paid').length;
  const partialStudents = students.filter(s => s.status === 'partial').length;
  const unpaidStudents = students.filter(s => s.status === 'unpaid').length;
  const totalCollected = students.reduce((sum, s) => sum + s.paidAmount, 0);
  const totalDue = students.reduce((sum, s) => sum + s.dueAmount, 0);

  return (
    <div>
      <h2 style={{ color: '#2c3e50', marginBottom: '30px' }}>Fees Status Monitor</h2>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#3498db' }}>Total Students</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>{totalStudents}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#27ae60' }}>Paid</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>{paidStudents}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f39c12' }}>Partial</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>{partialStudents}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#e74c3c' }}>Unpaid</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>{unpaidStudents}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#27ae60' }}>Collected</h3>
          <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>₹{totalCollected.toLocaleString()}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#e74c3c' }}>Due</h3>
          <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#2c3e50' }}>₹{totalDue.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Search Student</label>
            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
            >
              <option value="all">All Students</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial Payment</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Roll No.</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Student Name</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Semester</th>
              <th style={{ padding: '15px', textAlign: 'right', borderBottom: '1px solid #dee2e6' }}>Total Fees</th>
              <th style={{ padding: '15px', textAlign: 'right', borderBottom: '1px solid #dee2e6' }}>Paid Amount</th>
              <th style={{ padding: '15px', textAlign: 'right', borderBottom: '1px solid #dee2e6' }}>Due Amount</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Last Payment</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => {
              const statusStyle = getStatusColor(student.status);
              return (
                <tr key={student.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>{student.rollNumber}</td>
                  <td style={{ padding: '15px' }}>{student.name}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>{student.semester}</td>
                  <td style={{ padding: '15px', textAlign: 'right' }}>₹{student.totalFees.toLocaleString()}</td>
                  <td style={{ padding: '15px', textAlign: 'right', color: '#27ae60', fontWeight: 'bold' }}>
                    ₹{student.paidAmount.toLocaleString()}
                  </td>
                  <td style={{ padding: '15px', textAlign: 'right', color: student.dueAmount > 0 ? '#e74c3c' : '#27ae60', fontWeight: 'bold' }}>
                    ₹{student.dueAmount.toLocaleString()}
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: statusStyle.bg,
                      color: statusStyle.color
                    }}>
                      {student.status.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center', fontSize: '14px', color: '#7f8c8d' }}>
                    {student.lastPayment || 'No payment'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {filteredStudents.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
          No students found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default FeesStatus;