import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockCourses, mockExamResults } from '../data/mockData';

interface SubjectMark {
  subject: string;
  internal: string;
  midsem: string;
  endsem: string;
  total: number;
  grade: string;
}

const Examination: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'registration' | 'results' | 'marks'>('registration');
  const [selectedExamCourses, setSelectedExamCourses] = useState<string[]>([]);
  const [registeredExamCourses, setRegisteredExamCourses] = useState<string[]>(['1', '2', '3']);
  const [subjectMarks, setSubjectMarks] = useState<SubjectMark[]>([]);
  const [loadingMarks, setLoadingMarks] = useState(false);

  useEffect(() => {
    if (activeTab === 'marks' && user?.rollNumber) {
      fetchStudentMarks();
    }
  }, [activeTab, user?.rollNumber]);

  const fetchStudentMarks = async () => {
    setLoadingMarks(true);
    try {
      const response = await fetch('http://localhost:5000/api/flows/marks-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'fetch',
          student: user?.rollNumber
        })
      });

      const result = await response.json();
      console.log('Student marks fetch result:', result);

      if (response.ok && result.data) {
        let data = result.data;
        if (data.data) data = data.data; // Handle nesting
        if (data.data) data = data.data;

        // Assuming data contains: course_id[], midsem[], endsem[], internal[]
        const courseIds = data.course_id || [];
        const midsemMarks = data.midsem || [];
        const endsemMarks = data.endsem || [];
        const internalMarks = data.internal || [];

        const combined: SubjectMark[] = [];
        const maxLength = Math.max(courseIds.length, midsemMarks.length, endsemMarks.length, internalMarks.length);

        for (let i = 0; i < maxLength; i++) {
          const mid = parseFloat(midsemMarks[i]) || 0;
          const end = parseFloat(endsemMarks[i]) || 0;
          const int = parseFloat(internalMarks[i]) || 0;
          const total = mid + end + int;

          combined.push({
            subject: courseIds[i] || 'Unknown',
            midsem: midsemMarks[i] || '0',
            endsem: endsemMarks[i] || '0',
            internal: internalMarks[i] || '0',
            total: total,
            grade: calculateGrade(total)
          });
        }
        setSubjectMarks(combined);
      }
    } catch (error) {
      console.error('Error fetching student marks:', error);
    } finally {
      setLoadingMarks(false);
    }
  };

  const calculateGrade = (total: number) => {
    if (total >= 90) return 'A+';
    if (total >= 80) return 'A';
    if (total >= 70) return 'B+';
    if (total >= 60) return 'B';
    if (total >= 50) return 'C';
    return 'F';
  };

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

  const TabButton: React.FC<{ id: string; label: string }> = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      style={{
        padding: '12px 24px',
        border: 'none',
        backgroundColor: activeTab === id ? '#334155' : 'transparent',
        color: activeTab === id ? 'white' : '#64748b',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.2s ease',
        fontSize: '14px'
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#1e293b', margin: 0, fontWeight: '600', fontSize: '28px', letterSpacing: '-0.025em' }}>Examination</h2>
          <p style={{ color: '#64748b', margin: '8px 0 0 0', fontSize: '15px' }}>
            Manage registrations, results and marks details
          </p>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          gap: '4px',
          marginBottom: '32px',
          backgroundColor: '#f1f5f9',
          padding: '4px',
          borderRadius: '8px',
          width: 'fit-content'
        }}>
          <TabButton id="registration" label="Registration" />
          <TabButton id="results" label="Results Summary" />
          <TabButton id="marks" label="Detailed Marks" />
        </div>

        {/* Tab Content */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9'
        }}>
          {activeTab === 'registration' && (
            <div>
              <h3 style={{ marginBottom: '24px', color: '#1e293b', fontSize: '18px', fontWeight: '600' }}>Exam Registration</h3>

              <div style={{ marginBottom: '32px' }}>
                {mockCourses.map(course => (
                  <div key={course.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    border: '1px solid #f1f5f9',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    transition: 'all 0.2s ease',
                    backgroundColor: registeredExamCourses.includes(course.id) ? '#f8fafc' : 'white'
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedExamCourses.includes(course.id) || registeredExamCourses.includes(course.id)}
                      onChange={() => handleExamCourseSelection(course.id)}
                      disabled={registeredExamCourses.includes(course.id)}
                      style={{ marginRight: '16px', cursor: 'pointer', width: '18px', height: '18px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '16px', color: '#334155' }}>{course.name}</div>
                      <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '2px' }}>
                        {course.code} | Credits: {course.credits}
                      </div>
                    </div>
                    {registeredExamCourses.includes(course.id) && (
                      <div style={{
                        padding: '4px 12px',
                        backgroundColor: '#f1f5f9',
                        color: '#64748b',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '600'
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
                      padding: '12px 32px',
                      backgroundColor: '#334155',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '15px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                  >
                    Complete Registration ({selectedExamCourses.length})
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'results' && (
            <div>
              <h3 style={{ marginBottom: '24px', color: '#1e293b', fontSize: '18px', fontWeight: '600' }}>Results Summary</h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                {mockExamResults.map(result => (
                  <div key={result.semester} style={{
                    padding: '24px',
                    border: '1px solid #f1f5f9',
                    borderRadius: '10px',
                    textAlign: 'center',
                    backgroundColor: '#fafafa'
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>
                      Semester {result.semester}
                    </div>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>
                      {result.cgpa}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      CGPA
                    </div>
                    <div style={{
                      marginTop: '20px',
                      padding: '4px 16px',
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      color: '#475569',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: '600',
                      display: 'inline-block'
                    }}>
                      Grade {result.grade}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'marks' && (
            <div>
              <h3 style={{ marginBottom: '24px', color: '#1e293b', fontSize: '18px', fontWeight: '600' }}>Marks Details</h3>

              {loadingMarks ? (
                <div style={{ padding: '64px', textAlign: 'center', color: '#94a3b8' }}>Fetching data...</div>
              ) : subjectMarks.length > 0 ? (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ backgroundColor: 'white' }}>
                        <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Subject</th>
                        <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Internal</th>
                        <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Midsem</th>
                        <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Endsem</th>
                        <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Total</th>
                        <th style={{ padding: '16px 20px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subjectMarks.map((mark, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '16px 20px', fontWeight: '500', color: '#1e293b' }}>{mark.subject}</td>
                          <td style={{ padding: '16px 20px', textAlign: 'center', color: '#475569' }}>{mark.internal}</td>
                          <td style={{ padding: '16px 20px', textAlign: 'center', color: '#475569' }}>{mark.midsem}</td>
                          <td style={{ padding: '16px 20px', textAlign: 'center', color: '#475569' }}>{mark.endsem}</td>
                          <td style={{ padding: '16px 20px', textAlign: 'center', fontWeight: '600', color: '#1e293b' }}>{mark.total}</td>
                          <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                            <span style={{
                              padding: '2px 8px',
                              backgroundColor: '#f1f5f9',
                              color: '#475569',
                              borderRadius: '4px',
                              fontSize: '12px',
                              fontWeight: '600'
                            }}>
                              {mark.grade}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div style={{ padding: '64px', textAlign: 'center', color: '#94a3b8' }}>
                  No marks data available at the moment.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Examination;
