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
      console.log('Display students full result:', JSON.stringify(result, null, 2));

      if (response.ok && result.data) {
        // Try all possible nesting levels based on common WorqHat responses
        let data = result.data;
        if (data.data) data = data.data; // Handle result.data.data
        if (data.data) data = data.data; // Handle result.data.data.data

        console.log('Extracted data for students:', data);

        // Look for the student id array
        const ids = Array.isArray(data) ? data :
          Array.isArray(data.student_ids) ? data.student_ids :
            Array.isArray(data.student) ? data.student :
              [];

        setStudentIds(ids.map((id: any) => String(id)));
      } else {
        console.warn('Response not OK or no data:', response.status, result);
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

      console.log('Saving marks payload:', payload);
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
    <div style={{ padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '30px', fontWeight: 'bold' }}>Examination Marks Entry</h2>

      {/* Selection Panel */}
      <div style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        alignItems: 'end'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#34495e' }}>Select Course</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ced4da',
              borderRadius: '8px',
              backgroundColor: '#fff',
              fontSize: '15px'
            }}
          >
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#34495e' }}>Select Exam Type</label>
          <select
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ced4da',
              borderRadius: '8px',
              backgroundColor: '#fff',
              fontSize: '15px'
            }}
          >
            {examTypes.map(exam => (
              <option key={exam} value={exam}>{exam}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#34495e' }}>Max Marks</label>
          <input
            type="number"
            value={maxMarks}
            onChange={(e) => setMaxMarks(parseInt(e.target.value) || 0)}
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ced4da',
              borderRadius: '8px',
              fontSize: '15px'
            }}
          />
        </div>
      </div>

      {/* Students List */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px',
          backgroundColor: '#3498db',
          color: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h3 style={{ margin: 0 }}>Student IDs for {selectedCourse}</h3>
          <span style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '5px 12px', borderRadius: '20px', fontSize: '14px' }}>
            {studentIds.length} Students Found
          </span>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>Loading student IDs...</div>
        ) : studentIds.length > 0 ? (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #edf2f7' }}>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#718096' }}>Student ID</th>
                  <th style={{ padding: '15px', textAlign: 'center', color: '#718096' }}>Marks</th>
                  <th style={{ padding: '15px', textAlign: 'right', color: '#718096' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentIds.map(id => {
                  const m = getMarksValue(id);

                  return (
                    <tr key={id} style={{ borderBottom: '1px solid #edf2f7' }}>
                      <td style={{ padding: '15px', fontWeight: 'bold', color: '#2d3748' }}>{id}</td>
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          <input
                            type="number"
                            value={m}
                            onChange={(e) => handleMarksChange(id, e.target.value)}
                            placeholder="0.0"
                            style={{
                              width: '80px',
                              padding: '8px',
                              border: '1px solid #cbd5e0',
                              borderRadius: '6px',
                              textAlign: 'center'
                            }}
                          />
                          <span style={{ color: '#a0aec0' }}>/ {maxMarks}</span>
                        </div>
                      </td>
                      <td style={{ padding: '15px', textAlign: 'right' }}>
                        <button
                          onClick={() => handleSaveIndividual(id)}
                          style={{
                            padding: '8px 16px',
                            backgroundColor: '#2ecc71',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '600',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#27ae60'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2ecc71'}
                        >
                          Save Marks
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ padding: '40px', textAlign: 'center', color: '#718096' }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🔍</div>
            No students found for this course.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMarks;