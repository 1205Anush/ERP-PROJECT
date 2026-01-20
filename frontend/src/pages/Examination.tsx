import React, { useState } from 'react';
import { mockCourses, mockExamResults, mockSubjectMarks } from '../data/mockData';

const Examination: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'registration' | 'results' | 'marks'>('registration');
  const [selectedExamCourses, setSelectedExamCourses] = useState<string[]>([]);
  const [registeredExamCourses, setRegisteredExamCourses] = useState<string[]>(['1', '2', '3']);

  const handleExamCourseSelection = (courseId: string) => {
    setSelectedExamCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleExamRegistration = () => {
    setRegisteredExamCourses(prev => [...prev, ...selectedExamCourses]);
    setSelectedExamCourses([]);
    alert('Exam registration successful!');
  };

  const TabButton: React.FC<{ id: string; label: string; icon: string }> = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      style={{
        padding: '12px 20px',
        border: 'none',
        backgroundColor: activeTab === id ? '#3498db' : '#ecf0f1',
        color: activeTab === id ? 'white' : '#2c3e50',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}
    >
      <span>{icon}</span>
      {label}
    </button>
  );

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>Examination</h2>
        <p style={{ color: '#7f8c8d', margin: '5px 0 0 0' }}>
          Manage exam registrations, view results and detailed marks
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <TabButton id="registration" label="Exam Registration" icon="📝" />
        <TabButton id="results" label="Exam Results" icon="📊" />
        <TabButton id="marks" label="Marks Details" icon="📋" />
      </div>

      {/* Tab Content */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {/* Exam Registration Tab */}
        {activeTab === 'registration' && (
          <div>
            <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Register for Examinations</h3>
            
            <div style={{ marginBottom: '30px' }}>
              {mockCourses.map(course => (
                <div key={course.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '15px',
                  border: '1px solid #ecf0f1',
                  borderRadius: '8px',
                  marginBottom: '10px',
                  backgroundColor: registeredExamCourses.includes(course.id) ? '#d5f4e6' : 'white'
                }}>
                  <input
                    type="checkbox"
                    checked={selectedExamCourses.includes(course.id) || registeredExamCourses.includes(course.id)}
                    onChange={() => handleExamCourseSelection(course.id)}
                    disabled={registeredExamCourses.includes(course.id)}
                    style={{ marginRight: '15px', transform: 'scale(1.2)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{course.name}</div>
                    <div style={{ color: '#7f8c8d', fontSize: '14px' }}>
                      Course Code: {course.code} | Credits: {course.credits}
                    </div>
                  </div>
                  {registeredExamCourses.includes(course.id) && (
                    <div style={{
                      padding: '4px 12px',
                      backgroundColor: '#27ae60',
                      color: 'white',
                      borderRadius: '15px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      Registered
                    </div>
                  )}
                </div>
              ))}
            </div>

            {selectedExamCourses.length > 0 && (
              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={handleExamRegistration}
                  style={{
                    padding: '12px 30px',
                    backgroundColor: '#e67e22',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Register for Exams ({selectedExamCourses.length})
                </button>
              </div>
            )}
          </div>
        )}

        {/* Exam Results Tab */}
        {activeTab === 'results' && (
          <div>
            <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Examination Results Summary</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              {mockExamResults.map(result => (
                <div key={result.semester} style={{
                  padding: '20px',
                  border: '1px solid #ecf0f1',
                  borderRadius: '10px',
                  textAlign: 'center',
                  backgroundColor: '#f8f9fa'
                }}>
                  <h4 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>
                    Semester {result.semester}
                  </h4>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#3498db', marginBottom: '10px' }}>
                    {result.cgpa}
                  </div>
                  <div style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '10px' }}>
                    CGPA
                  </div>
                  <div style={{
                    padding: '5px 15px',
                    backgroundColor: result.grade === 'A+' ? '#27ae60' : result.grade === 'A' ? '#3498db' : '#f39c12',
                    color: 'white',
                    borderRadius: '15px',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    display: 'inline-block'
                  }}>
                    Grade {result.grade}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '30px',
              padding: '20px',
              backgroundColor: '#e8f5e8',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#27ae60' }}>Overall Performance</h4>
              <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#27ae60' }}>
                Cumulative CGPA: {(mockExamResults.reduce((sum, r) => sum + r.cgpa, 0) / mockExamResults.length).toFixed(2)}
              </div>
            </div>
          </div>
        )}

        {/* Marks Details Tab */}
        {activeTab === 'marks' && (
          <div>
            <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Subject-wise Marks Details</h3>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '15px', textAlign: 'left', borderBottom: '2px solid #ecf0f1' }}>Subject</th>
                    <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #ecf0f1' }}>Internal (20)</th>
                    <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #ecf0f1' }}>External (80)</th>
                    <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #ecf0f1' }}>Total (100)</th>
                    <th style={{ padding: '15px', textAlign: 'center', borderBottom: '2px solid #ecf0f1' }}>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSubjectMarks.map((mark, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid #ecf0f1' }}>
                      <td style={{ padding: '15px', fontWeight: 'bold' }}>{mark.subject}</td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>{mark.internal}</td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>{mark.external}</td>
                      <td style={{ padding: '15px', textAlign: 'center', fontWeight: 'bold' }}>{mark.total}</td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 8px',
                          backgroundColor: mark.grade.includes('+') ? '#27ae60' : mark.grade === 'A' ? '#3498db' : '#f39c12',
                          color: 'white',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: 'bold'
                        }}>
                          {mark.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{
              marginTop: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '15px'
            }}>
              <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' }}>
                  {mockSubjectMarks.reduce((sum, m) => sum + m.total, 0)}
                </div>
                <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Total Marks</div>
              </div>
              <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#3498db' }}>
                  {(mockSubjectMarks.reduce((sum, m) => sum + m.total, 0) / (mockSubjectMarks.length * 100) * 100).toFixed(1)}%
                </div>
                <div style={{ fontSize: '12px', color: '#7f8c8d' }}>Percentage</div>
              </div>
              <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#27ae60' }}>
                  8.7
                </div>
                <div style={{ fontSize: '12px', color: '#7f8c8d' }}>SGPA</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Examination;