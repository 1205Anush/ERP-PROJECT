import React, { useState, useEffect } from 'react';

interface Student {
  id: string; // Roll number
}

const Attendance: React.FC = () => {
  const [courses, setCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [studentIds, setStudentIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetchStudents(selectedCourse);
    } else {
      setStudentIds([]);
    }
  }, [selectedCourse]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/flows/attendance-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ operation: 'fetch' })
      });
      const result = await response.json();
      console.log('Courses fetch result:', result);

      if (response.ok && result.data) {
        let data = result.data;
        if (data.data) data = data.data;
        if (data.data) data = data.data;

        // Extract course codes/ids from the response
        // Assuming result.data.data contains the array
        const list = Array.isArray(data) ? data :
          Array.isArray(data.id) ? data.id :
            Array.isArray(data.courses) ? data.courses :
              Array.isArray(data.course_id) ? data.course_id :
                [];
        setCourses(list.map((c: any) => String(c)));
        if (list.length > 0) setSelectedCourse(String(list[0]));
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async (courseId: string) => {
    setLoadingStudents(true);
    try {
      const response = await fetch('http://localhost:5000/api/flows/attendance-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'fetch-student',
          course_id: courseId
        })
      });
      const result = await response.json();
      console.log('Students fetch result:', result);

      if (response.ok && result.data) {
        let data = result.data;
        if (data.data) data = data.data;
        if (data.data) data = data.data;

        const list = Array.isArray(data) ? data :
          Array.isArray(data.student_ids) ? data.student_ids :
            Array.isArray(data.student) ? data.student :
              [];
        setStudentIds(list.map((s: any) => String(s)));
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoadingStudents(false);
    }
  };

  const markAttendance = async (studentId: string, status: 'present' | 'absent') => {
    try {
      const response = await fetch('http://localhost:5000/api/flows/attendance-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'attendance',
          student_id: studentId,
          course_id: selectedCourse,
          attendance: status
        })
      });
      const result = await response.json();
      if (response.ok && (result.success || result.data?.success)) {
        alert(`${status.charAt(0).toUpperCase() + status.slice(1)} marked for ${studentId}`);
      } else {
        alert('Failed to mark attendance');
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Error marking attendance');
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#1e293b', marginBottom: '32px', fontWeight: '600', letterSpacing: '-0.025em' }}>Attendance Management</h2>

        {/* Selection Panel */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px',
          alignItems: 'end'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Select Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                backgroundColor: 'white',
                fontSize: '15px',
                color: '#1e293b',
                outline: 'none'
              }}
              disabled={loading}
            >
              <option value="">Choose a course</option>
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>
          <div style={{ color: '#94a3b8', fontSize: '14px', fontStyle: 'italic' }}>
            {loading ? 'Loading courses...' : ''}
          </div>
        </div>

        {/* Students List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '16px 24px',
            backgroundColor: '#f1f5f9',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#334155' }}>Enrolled Students</h3>
            <span style={{ fontSize: '14px', color: '#64748b' }}>
              {loadingStudents ? 'Loading...' : `${studentIds.length} found`}
            </span>
          </div>

          {loadingStudents ? (
            <div style={{ padding: '64px', textAlign: 'center', color: '#94a3b8' }}>Fetching students...</div>
          ) : studentIds.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: 'white' }}>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Student ID</th>
                    <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Mark Attendance</th>
                  </tr>
                </thead>
                <tbody>
                  {studentIds.map(id => (
                    <tr key={id} style={{ transition: 'background-color 0.2s', borderBottom: '1px solid #f1f5f9' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                      <td style={{ padding: '16px 24px', fontWeight: '500', color: '#1e293b' }}>{id}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button
                            onClick={() => markAttendance(id, 'present')}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: '#334155',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '13px',
                              fontWeight: '600',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                          >
                            Present
                          </button>
                          <button
                            onClick={() => markAttendance(id, 'absent')}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: 'white',
                              color: '#64748b',
                              border: '1px solid #e2e8f0',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '13px',
                              fontWeight: '600',
                              transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = '#f1f5f9';
                              e.currentTarget.style.borderColor = '#cbd5e1';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = 'white';
                              e.currentTarget.style.borderColor = '#e2e8f0';
                            }}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '80px 24px', textAlign: 'center', color: '#94a3b8', fontSize: '15px' }}>
              {selectedCourse ? 'No students found for this course.' : 'Please select a course to view students.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;