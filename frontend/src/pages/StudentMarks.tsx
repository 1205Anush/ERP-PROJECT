import React, { useState } from 'react';

const StudentMarks: React.FC = () => {
  const [students] = useState([
    { id: 1, name: 'Alice Johnson', rollNumber: '101', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', rollNumber: '102', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Brown', rollNumber: '103', email: 'charlie@example.com' },
    { id: 4, name: 'Diana Prince', rollNumber: '104', email: 'diana@example.com' }
  ]);

  const [marks, setMarks] = useState<{[key: string]: number}>({});
  const [selectedCourse, setSelectedCourse] = useState('CS101');
  const [selectedExam, setSelectedExam] = useState('Mid-term');
  const [maxMarks, setMaxMarks] = useState(100);

  const courses = ['CS101', 'CS102', 'MATH101', 'PHY101'];
  const examTypes = ['Quiz', 'Mid-term', 'Final', 'Assignment'];

  const handleMarksChange = (studentId: number, value: string) => {
    const key = `${studentId}-${selectedCourse}-${selectedExam}`;
    const numValue = parseFloat(value) || 0;
    if (numValue >= 0 && numValue <= maxMarks) {
      setMarks(prev => ({
        ...prev,
        [key]: numValue
      }));
    }
  };

  const getMarks = (studentId: number) => {
    const key = `${studentId}-${selectedCourse}-${selectedExam}`;
    return marks[key] || '';
  };

  const saveMarks = () => {
    console.log('Saving marks:', { course: selectedCourse, exam: selectedExam, marks });
    alert('Marks saved successfully!');
  };

  const getGrade = (marks: number, maxMarks: number) => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 90) return { grade: 'A+', color: '#27ae60' };
    if (percentage >= 80) return { grade: 'A', color: '#2ecc71' };
    if (percentage >= 70) return { grade: 'B+', color: '#f39c12' };
    if (percentage >= 60) return { grade: 'B', color: '#e67e22' };
    if (percentage >= 50) return { grade: 'C', color: '#e74c3c' };
    return { grade: 'F', color: '#c0392b' };
  };

  const calculateStats = () => {
    const currentMarks = students.map(student => {
      const key = `${student.id}-${selectedCourse}-${selectedExam}`;
      return marks[key] || 0;
    }).filter(mark => mark > 0);

    if (currentMarks.length === 0) return null;

    const total = currentMarks.reduce((sum, mark) => sum + mark, 0);
    const average = total / currentMarks.length;
    const highest = Math.max(...currentMarks);
    const lowest = Math.min(...currentMarks);

    return { average, highest, lowest, submitted: currentMarks.length };
  };

  const stats = calculateStats();

  return (
    <div>
      <h2 style={{ color: '#2c3e50', marginBottom: '30px' }}>Student Marks Management</h2>

      {/* Selection Controls */}
      <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '20px' }}>
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
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Exam Type</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
            >
              {examTypes.map(exam => (
                <option key={exam} value={exam}>{exam}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Maximum Marks</label>
            <input
              type="number"
              min="10"
              max="200"
              value={maxMarks}
              onChange={(e) => setMaxMarks(parseInt(e.target.value) || 100)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
        </div>
        
        <button
          onClick={saveMarks}
          style={{ padding: '10px 20px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Save All Marks
        </button>
      </div>

      {/* Statistics */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '20px' }}>
          <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#3498db' }}>Average</h4>
            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{stats.average.toFixed(1)}</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#27ae60' }}>Highest</h4>
            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{stats.highest}</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#e74c3c' }}>Lowest</h4>
            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{stats.lowest}</p>
          </div>
          <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#f39c12' }}>Submitted</h4>
            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{stats.submitted}/{students.length}</p>
          </div>
        </div>
      )}

      {/* Marks Entry Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #dee2e6', backgroundColor: '#f8f9fa' }}>
          <h3 style={{ margin: 0, color: '#2c3e50' }}>
            {selectedExam} Marks - {selectedCourse} (Max: {maxMarks})
          </h3>
        </div>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Roll No.</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Student Name</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Marks</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Percentage</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Grade</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => {
              const studentMarks = getMarks(student.id);
              const numMarks = parseFloat(studentMarks.toString()) || 0;
              const percentage = numMarks > 0 ? ((numMarks / maxMarks) * 100).toFixed(1) : '0';
              const gradeInfo = numMarks > 0 ? getGrade(numMarks, maxMarks) : { grade: '-', color: '#95a5a6' };
              
              return (
                <tr key={student.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold' }}>{student.rollNumber}</td>
                  <td style={{ padding: '15px' }}>{student.name}</td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <input
                      type="number"
                      min="0"
                      max={maxMarks}
                      step="0.5"
                      value={studentMarks}
                      onChange={(e) => handleMarksChange(student.id, e.target.value)}
                      placeholder="0"
                      style={{
                        width: '80px',
                        padding: '8px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        textAlign: 'center'
                      }}
                    />
                    <span style={{ marginLeft: '5px', color: '#7f8c8d' }}>/ {maxMarks}</span>
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>
                    {percentage}%
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: gradeInfo.color + '20',
                      color: gradeInfo.color
                    }}>
                      {gradeInfo.grade}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentMarks;