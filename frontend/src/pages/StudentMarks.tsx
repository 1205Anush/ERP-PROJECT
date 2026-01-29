import React, { useState, useEffect } from 'react';

const StudentMarks: React.FC = () => {
  const courses = ['C101', 'C102', 'C103', 'C104', 'C105'];
  const examTypes = ['midsem', 'endsem', 'internal'];

  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [selectedExam, setSelectedExam] = useState(examTypes[0]);
  const [studentIds, setStudentIds] = useState<string[]>([]);
  const [marks, setMarks] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [maxMarks, setMaxMarks] = useState(100);

  // Fetch students when course changes
  useEffect(() => {
    fetchStudents();
  }, [selectedCourse]);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      console.log('Fetching students for course:', selectedCourse);
      const response = await fetch('http://localhost:5000/api/flows/marks-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'display',
          course: selectedCourse
        })
      });

      const result = await response.json();

      if (response.ok && result.data) {
        // Try all possible nesting levels based on common WorqHat responses
        let data = result.data;
        if (data.data) data = data.data; // Handle result.data.data
        if (data.data) data = data.data; // Handle result.data.data.data

        // Look for the student id array
        const ids = Array.isArray(data) ? data :
          Array.isArray(data.student_ids) ? data.student_ids :
            Array.isArray(data.student) ? data.student :
              [];

        setStudentIds(ids.map((id: any) => String(id)));
      } else {
        setStudentIds([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudentIds([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarksChange = (studentId: string, value: string) => {
    const key = `${studentId}-${selectedCourse}-${selectedExam}`;
    if (value === '' || (parseFloat(value) >= 0 && parseFloat(value) <= maxMarks)) {
      setMarks(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const getMarksValue = (studentId: string) => {
    const key = `${studentId}-${selectedCourse}-${selectedExam}`;
    return marks[key] || '';
  };

  const handleSaveIndividual = async (studentId: string) => {
    const value = getMarksValue(studentId);
    if (value === '') {
      alert(`Please enter marks for student ${studentId}`);
      return;
    }

    try {
      const payload = {
        operation: 'add',
        course: selectedCourse,
        exam: selectedExam,
        marks: value,
        student: studentId
      };

      const response = await fetch('http://localhost:5000/api/flows/marks-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok && result.success) {
        alert(`Marks for student ${studentId} saved successfully!`);
      } else {
        alert('Failed to save marks.');
      }
    } catch (error) {
      console.error('Error saving marks:', error);
      alert('Error saving marks.');
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", "Segoe UI", sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#1e293b', marginBottom: '32px', fontWeight: '600', letterSpacing: '-0.025em' }}>Marks Entry</h2>

        {/* Selection Panel */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '32px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          alignItems: 'end'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Course</label>
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
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            >
              {courses.map(course => (
                <option key={course} value={course}>{course}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Exam Type</label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                backgroundColor: 'white',
                fontSize: '15px',
                color: '#1e293b',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
            >
              {examTypes.map(exam => (
                <option key={exam} value={exam}>{exam.charAt(0).toUpperCase() + exam.slice(1)}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Maximum Marks</label>
            <input
              type="number"
              value={maxMarks}
              onChange={(e) => setMaxMarks(parseInt(e.target.value) || 0)}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '15px',
                color: '#1e293b',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Students List */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
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
              {studentIds.length} found
            </span>
          </div>

          {loading ? (
            <div style={{ padding: '64px', textAlign: 'center', color: '#94a3b8', fontSize: '15px' }}>Loading...</div>
          ) : studentIds.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: 'white' }}>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Student ID</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Marks</th>
                    <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studentIds.map(id => {
                    const m = getMarksValue(id);

                    return (
                      <tr key={id} style={{ transition: 'background-color 0.2s', borderBottom: '1px solid #f1f5f9' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <td style={{ padding: '16px 24px', fontWeight: '500', color: '#1e293b' }}>{id}</td>
                        <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            <input
                              type="number"
                              value={m}
                              onChange={(e) => handleMarksChange(id, e.target.value)}
                              placeholder="0"
                              style={{
                                width: '64px',
                                padding: '8px',
                                border: '1px solid #e2e8f0',
                                borderRadius: '4px',
                                textAlign: 'center',
                                outline: 'none',
                                fontSize: '14px'
                              }}
                            />
                            <span style={{ color: '#94a3b8', fontSize: '14px' }}>/ {maxMarks}</span>
                          </div>
                        </td>
                        <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                          <button
                            onClick={() => handleSaveIndividual(id)}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: '#334155',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: '500',
                              transition: 'background-color 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e293b'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '80px 24px', textAlign: 'center', color: '#94a3b8', fontSize: '15px' }}>
              No students found for this selection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentMarks;