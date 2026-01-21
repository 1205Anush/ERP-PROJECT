import React, { useState } from 'react';

const StudentPerformance: React.FC = () => {
  const [students] = useState([
    {
      id: 1,
      name: 'Alice Johnson',
      rollNumber: '101',
      semester: 3,
      attendance: 92,
      marks: {
        'CS101': { quiz: 18, midterm: 85, final: 88, assignment: 45 },
        'MATH101': { quiz: 16, midterm: 78, final: 82, assignment: 42 },
        'PHY101': { quiz: 19, midterm: 90, final: 85, assignment: 48 }
      },
      gpa: 8.5
    },
    {
      id: 2,
      name: 'Bob Smith',
      rollNumber: '102',
      semester: 3,
      attendance: 78,
      marks: {
        'CS101': { quiz: 14, midterm: 65, final: 70, assignment: 38 },
        'MATH101': { quiz: 12, midterm: 60, final: 68, assignment: 35 },
        'PHY101': { quiz: 15, midterm: 72, final: 75, assignment: 40 }
      },
      gpa: 6.8
    },
    {
      id: 3,
      name: 'Charlie Brown',
      rollNumber: '103',
      semester: 3,
      attendance: 85,
      marks: {
        'CS101': { quiz: 16, midterm: 75, final: 78, assignment: 42 },
        'MATH101': { quiz: 14, midterm: 70, final: 74, assignment: 38 },
        'PHY101': { quiz: 17, midterm: 80, final: 82, assignment: 44 }
      },
      gpa: 7.6
    }
  ]);

  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed'>('overview');

  const getPerformanceColor = (value: number, type: 'attendance' | 'gpa' | 'marks') => {
    if (type === 'attendance') {
      if (value >= 90) return '#27ae60';
      if (value >= 75) return '#f39c12';
      return '#e74c3c';
    }
    if (type === 'gpa') {
      if (value >= 8) return '#27ae60';
      if (value >= 6) return '#f39c12';
      return '#e74c3c';
    }
    if (type === 'marks') {
      if (value >= 80) return '#27ae60';
      if (value >= 60) return '#f39c12';
      return '#e74c3c';
    }
    return '#95a5a6';
  };

  const calculateCourseAverage = (marks: any) => {
    const total = marks.quiz + marks.midterm + marks.final + marks.assignment;
    const maxTotal = 20 + 100 + 100 + 50; // Max marks for each component
    return ((total / maxTotal) * 100).toFixed(1);
  };

  const getClassStats = () => {
    const totalStudents = students.length;
    const avgAttendance = students.reduce((sum, s) => sum + s.attendance, 0) / totalStudents;
    const avgGPA = students.reduce((sum, s) => sum + s.gpa, 0) / totalStudents;
    const highPerformers = students.filter(s => s.gpa >= 8).length;
    const lowPerformers = students.filter(s => s.gpa < 6).length;

    return { totalStudents, avgAttendance, avgGPA, highPerformers, lowPerformers };
  };

  const classStats = getClassStats();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>Student Performance Analytics</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setViewMode('overview')}
            style={{
              padding: '8px 16px',
              backgroundColor: viewMode === 'overview' ? '#3498db' : '#ecf0f1',
              color: viewMode === 'overview' ? 'white' : '#2c3e50',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Overview
          </button>
          <button
            onClick={() => setViewMode('detailed')}
            style={{
              padding: '8px 16px',
              backgroundColor: viewMode === 'detailed' ? '#3498db' : '#ecf0f1',
              color: viewMode === 'detailed' ? 'white' : '#2c3e50',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Detailed
          </button>
        </div>
      </div>

      {/* Class Statistics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#3498db' }}>Total Students</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{classStats.totalStudents}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#27ae60' }}>Avg Attendance</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: getPerformanceColor(classStats.avgAttendance, 'attendance') }}>
            {classStats.avgAttendance.toFixed(1)}%
          </p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#f39c12' }}>Avg GPA</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0, color: getPerformanceColor(classStats.avgGPA, 'gpa') }}>
            {classStats.avgGPA.toFixed(1)}
          </p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#27ae60' }}>High Performers</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{classStats.highPerformers}</p>
        </div>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#e74c3c' }}>Need Attention</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{classStats.lowPerformers}</p>
        </div>
      </div>

      {viewMode === 'overview' ? (
        /* Overview Mode */
        <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Roll No.</th>
                <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Student Name</th>
                <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Attendance</th>
                <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>GPA</th>
                <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Performance</th>
                <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => {
                const performanceLevel = student.gpa >= 8 ? 'Excellent' : student.gpa >= 6 ? 'Good' : 'Needs Improvement';
                const performanceColor = getPerformanceColor(student.gpa, 'gpa');
                
                return (
                  <tr key={student.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{student.rollNumber}</td>
                    <td style={{ padding: '15px' }}>{student.name}</td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <span style={{ color: getPerformanceColor(student.attendance, 'attendance'), fontWeight: 'bold' }}>
                        {student.attendance}%
                      </span>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <span style={{ color: performanceColor, fontWeight: 'bold' }}>
                        {student.gpa}
                      </span>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: performanceColor + '20',
                        color: performanceColor
                      }}>
                        {performanceLevel}
                      </span>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <button
                        onClick={() => setSelectedStudent(student)}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#3498db',
                          color: 'white',
                          border: 'none',
                          borderRadius: '3px',
                          cursor: 'pointer'
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Detailed Mode */
        <div style={{ display: 'grid', gap: '20px' }}>
          {students.map(student => (
            <div key={student.id} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{student.name}</h3>
                  <p style={{ margin: 0, color: '#7f8c8d' }}>Roll No: {student.rollNumber} | Semester: {student.semester}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '14px', color: '#7f8c8d' }}>GPA</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: getPerformanceColor(student.gpa, 'gpa') }}>
                    {student.gpa}
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                {Object.entries(student.marks).map(([course, marks]: [string, any]) => (
                  <div key={course} style={{ border: '1px solid #ecf0f1', borderRadius: '8px', padding: '15px' }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#3498db' }}>{course}</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '14px' }}>
                      <div>Quiz: <strong>{marks.quiz}/20</strong></div>
                      <div>Assignment: <strong>{marks.assignment}/50</strong></div>
                      <div>Mid-term: <strong>{marks.midterm}/100</strong></div>
                      <div>Final: <strong>{marks.final}/100</strong></div>
                    </div>
                    <div style={{ marginTop: '10px', padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px', textAlign: 'center' }}>
                      <strong>Average: {calculateCourseAverage(marks)}%</strong>
                    </div>
                  </div>
                ))}
              </div>
              
              <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px', display: 'flex', justifyContent: 'space-between' }}>
                <span>Attendance: <strong style={{ color: getPerformanceColor(student.attendance, 'attendance') }}>{student.attendance}%</strong></span>
                <span>Overall GPA: <strong style={{ color: getPerformanceColor(student.gpa, 'gpa') }}>{student.gpa}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '30px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#2c3e50' }}>{selectedStudent.name} - Detailed Performance</h3>
              <button
                onClick={() => setSelectedStudent(null)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#e74c3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
            
            <div style={{ display: 'grid', gap: '15px' }}>
              {Object.entries(selectedStudent.marks).map(([course, marks]: [string, any]) => (
                <div key={course} style={{ border: '1px solid #ecf0f1', borderRadius: '8px', padding: '15px' }}>
                  <h4 style={{ margin: '0 0 15px 0', color: '#3498db' }}>{course}</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
                    <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                      <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Quiz</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{marks.quiz}/20</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                      <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Mid-term</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{marks.midterm}/100</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                      <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Final</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{marks.final}/100</div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                      <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Assignment</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{marks.assignment}/50</div>
                    </div>
                  </div>
                  <div style={{ marginTop: '10px', textAlign: 'center', padding: '8px', backgroundColor: '#3498db', color: 'white', borderRadius: '5px' }}>
                    Course Average: {calculateCourseAverage(marks)}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPerformance;