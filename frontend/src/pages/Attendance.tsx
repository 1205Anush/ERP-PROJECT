import React, { useState } from 'react';

const Attendance: React.FC = () => {
  const [students] = useState([
    { id: 1, name: 'Alice Johnson', rollNumber: '101', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', rollNumber: '102', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', rollNumber: '103', email: 'charlie@example.com' },
    { id: 4, name: 'Diana Prince', rollNumber: '104', email: 'diana@example.com' }
  ]);

  const [attendance, setAttendance] = useState<{[key: number]: 'present' | 'absent' | 'late'}>({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCourse, setSelectedCourse] = useState('CS101');

  const courses = ['CS101', 'CS102', 'CS103', 'MATH101', 'PHY101'];

  const handleAttendanceChange = (studentId: number, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const saveAttendance = () => {
    console.log('Saving attendance:', { date: selectedDate, course: selectedCourse, attendance });
    alert('Attendance saved successfully!');
  };

  const markAllPresent = () => {
    const allPresent = students.reduce((acc, student) => ({
      ...acc,
      [student.id]: 'present' as const
    }), {});
    setAttendance(allPresent);
  };

  return (
    <div>
      <h2 style={{ color: '#2c3e50', marginBottom: '30px' }}>Attendance Management</h2>

      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
            >
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={markAllPresent}
            style={{ padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Mark All Present
          </button>
          <button
            onClick={saveAttendance}
            style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Save Attendance
          </button>
        </div>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Roll No.</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Student Name</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Email</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '15px' }}>{student.rollNumber}</td>
                <td style={{ padding: '15px' }}>{student.name}</td>
                <td style={{ padding: '15px' }}>{student.email}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    {(['present', 'absent', 'late'] as const).map(status => (
                      <label key={status} style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name={`attendance-${student.id}`}
                          value={status}
                          checked={attendance[student.id] === status}
                          onChange={() => handleAttendanceChange(student.id, status)}
                        />
                        <span style={{ 
                          color: status === 'present' ? '#27ae60' : status === 'absent' ? '#e74c3c' : '#f39c12',
                          fontWeight: 'bold',
                          textTransform: 'capitalize'
                        }}>
                          {status}
                        </span>
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;