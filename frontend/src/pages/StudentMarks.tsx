import React, { useState, useEffect } from 'react';

interface Course {
  id: string;
  name: string;
}

interface Student {
  id: string;
  name: string;
}

const StudentMarks: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [marks, setMarks] = useState<{ [key: string]: { [exam: string]: string } }>({});
  const [loading, setLoading] = useState(false);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const examColumns = ['IA', 'CA', 'MSE', 'ESE', 'Practical', 'Fees status'];

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      // Mock courses for now - replace with actual API call
      const mockCourses = [
        { id: 'C101', name: 'Data Structures' },
        { id: 'C102', name: 'Database Management' },
        { id: 'C103', name: 'Computer Networks' },
        { id: 'C104', name: 'Operating Systems' },
        { id: 'C105', name: 'Software Engineering' }
      ];
      setCourses(mockCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch students when course is selected
  useEffect(() => {
    if (selectedCourse) {
      fetchStudents();
    }
  }, [selectedCourse]);

  const fetchStudents = async () => {
    if (!selectedCourse) return;
    
    setLoadingStudents(true);
    try {
      console.log('Fetching students for course:', selectedCourse.id);
      const response = await fetch('http://localhost:8080/api/flows/marks-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'display',
          course: selectedCourse.id
        })
      });

      const result = await response.json();

      if (response.ok && result.data) {
        let data = result.data;
        if (data.data) data = data.data;
        if (data.data) data = data.data;

        const ids = Array.isArray(data) ? data :
          Array.isArray(data.student_ids) ? data.student_ids :
            Array.isArray(data.student) ? data.student :
              [];

        // Mock student names for now - replace with actual API call
        const studentsWithNames = ids.map((id: any) => ({
          id: String(id),
          name: `Student ${String(id).slice(-3)}` // Mock name based on ID
        }));
        
        setStudents(studentsWithNames);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleMarksChange = (studentId: string, examType: string, value: string) => {
    setMarks(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [examType]: value
      }
    }));
  };

  const getMarksValue = (studentId: string, examType: string) => {
    return marks[studentId]?.[examType] || '';
  };

  const handleSaveStudent = async (student: Student) => {
    if (!selectedCourse) return;
    
    const studentMarks = marks[student.id];
    if (!studentMarks || Object.keys(studentMarks).length === 0) {
      alert(`Please enter marks for ${student.name}`);
      return;
    }

    try {
      // Save marks for each exam type
      for (const [examType, mark] of Object.entries(studentMarks)) {
        if (mark && examType !== 'Fees status') {
          const payload = {
            operation: 'add',
            course: selectedCourse.id,
            exam: examType.toLowerCase(),
            marks: mark,
            student: student.id
          };

          await fetch('http://localhost:8080/api/flows/marks-management', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        }
      }
      
      alert(`Marks for ${student.name} saved successfully!`);
    } catch (error) {
      console.error('Error saving marks:', error);
      alert('Error saving marks.');
    }
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", "Segoe UI", sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2 style={{ color: '#1e293b', marginBottom: '32px', fontWeight: '600', letterSpacing: '-0.025em' }}>Marks Entry</h2>

        {/* Course Selection */}
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '8px',
          marginBottom: '32px',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#64748b' }}>Select Course</label>
            <select
              value={selectedCourse?.id || ''}
              onChange={(e) => {
                const course = courses.find(c => c.id === e.target.value);
                setSelectedCourse(course || null);
              }}
              style={{
                width: '100%',
                maxWidth: '400px',
                padding: '10px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                backgroundColor: 'white',
                fontSize: '15px',
                color: '#1e293b',
                outline: 'none'
              }}
            >
              <option value="">Choose a course...</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.id} - {course.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Students List */}
        {selectedCourse && (
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
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#334155' }}>
                {selectedCourse.name} - Students
              </h3>
              <span style={{ fontSize: '14px', color: '#64748b' }}>
                {students.length} found
              </span>
            </div>

            {loadingStudents ? (
              <div style={{ padding: '64px', textAlign: 'center', color: '#94a3b8', fontSize: '15px' }}>Loading students...</div>
            ) : students.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'white' }}>
                      <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0', minWidth: '120px' }}>Student ID</th>
                      <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0', minWidth: '150px' }}>Name</th>
                      {examColumns.map(exam => (
                        <th key={exam} style={{ padding: '16px 12px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0', minWidth: '100px' }}>{exam}</th>
                      ))}
                      <th style={{ padding: '16px 24px', textAlign: 'right', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0', minWidth: '80px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '16px 24px', fontWeight: '500', color: '#1e293b' }}>{student.id}</td>
                        <td style={{ padding: '16px 24px', fontWeight: '500', color: '#1e293b' }}>{student.name}</td>
                        {examColumns.map(exam => (
                          <td key={exam} style={{ padding: '16px 12px', textAlign: 'center' }}>
                            {exam === 'Fees status' ? (
                              <select
                                value={getMarksValue(student.id, exam)}
                                onChange={(e) => handleMarksChange(student.id, exam, e.target.value)}
                                style={{
                                  width: '90px',
                                  padding: '6px',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '4px',
                                  fontSize: '14px',
                                  outline: 'none'
                                }}
                              >
                                <option value="">-</option>
                                <option value="Paid">Paid</option>
                                <option value="Pending">Pending</option>
                                <option value="Overdue">Overdue</option>
                              </select>
                            ) : (
                              <input
                                type="number"
                                value={getMarksValue(student.id, exam)}
                                onChange={(e) => handleMarksChange(student.id, exam, e.target.value)}
                                placeholder="0"
                                style={{
                                  width: '60px',
                                  padding: '6px',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '4px',
                                  textAlign: 'center',
                                  outline: 'none',
                                  fontSize: '14px'
                                }}
                              />
                            )}
                          </td>
                        ))}
                        <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                          <button
                            onClick={() => handleSaveStudent(student)}
                            style={{
                              padding: '8px 16px',
                              backgroundColor: '#334155',
                              color: 'white',
                              border: 'none',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '14px',
                              fontWeight: '500'
                            }}
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ padding: '80px 24px', textAlign: 'center', color: '#94a3b8', fontSize: '15px' }}>
                No students found for this course.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMarks;