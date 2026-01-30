import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
}

const CourseRegistration: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [registeringId, setRegisteringId] = useState<string | null>(null);
  const [registeredCourses, setRegisteredCourses] = useState<string[]>([]);
  const [semester, setSemester] = useState<number | null>(null);

  const fetchStudentSemester = useCallback(async () => {
    if (user?.email) {
      try {
        const response = await fetch('http://localhost:5000/api/flows/student-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            operation: 'fetch',
            email: user.email
          })
        });

        const result = await response.json();
        if (response.ok && result.data) {
          let data = result.data;
          if (data.data) data = data.data;
          if (data.data) data = data.data;

          const getVal = (field: string) => {
            const val = data[field];
            return Array.isArray(val) ? val[0] : val;
          };

          const sem = parseInt(getVal('semester')) || user.semester || 1;
          setSemester(sem);
          return sem;
        }
      } catch (error) {
        console.error('Error fetching student semester:', error);
      }
    }
    return null;
  }, [user]);

  const fetchAvailableCourses = useCallback(async (sem: number) => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/flows/course-fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation: 'fetch-course',
          semester: sem
        })
      });

      const result = await response.json();
      console.log('Available courses response:', result);

      if (response.ok && result.data) {
        let data = result.data;
        if (data.data) data = data.data;

        const names = data.course_name || data.name || [];
        const codes = data.course_code || data.code || [];
        const ids = data.courseid || data.course_id || data.id || [];
        const credits = data.credits || [];

        const maxLength = Math.max(names.length, codes.length, ids.length);
        const fetchedCourses: Course[] = [];

        for (let i = 0; i < maxLength; i++) {
          fetchedCourses.push({
            id: ids[i] || `course-${i}`,
            name: names[i] || 'Unnamed Course',
            code: codes[i] || 'N/A',
            credits: parseInt(credits[i]) || 3
          });
        }
        setCourses(fetchedCourses);
      }
    } catch (error) {
      console.error('Error fetching available courses:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const sem = await fetchStudentSemester();
      if (sem) {
        fetchAvailableCourses(sem);
      } else {
        setLoading(false);
      }
    };
    init();
  }, [fetchStudentSemester, fetchAvailableCourses]);

  const handleRegisterCourse = async (course: Course) => {
    if (!user) return;

    console.log('CourseRegistration: Current User State:', user);

    const getFirst = (val: any) => Array.isArray(val) ? val[0] : val;
    const studentId = getFirst(user.uid) || getFirst(user.rollNumber) || user.email;

    console.log('Registering course for Student ID:', studentId);

    try {
      setRegisteringId(course.id);
      const response = await fetch('http://localhost:5000/api/flows/course-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_id: studentId,
          course_id: course.id,
          course_name: course.name,
          credits: course.credits,
          operation: 'register'
        })
      });

      const result = await response.json();
      console.log('Registration response:', result);

      if (response.ok) {
        setRegisteredCourses(prev => [...prev, course.id]);
        alert(`Successfully registered for ${course.name}!`);
      } else {
        alert(`Registration failed: ${result.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred during registration. Please try again.');
    } finally {
      setRegisteringId(null);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', color: '#64748b' }}>
        Loading available courses...
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ color: '#1e293b', margin: 0, fontWeight: '600', fontSize: '28px' }}>Course Registration</h2>
          <p style={{ color: '#64748b', margin: '8px 0 0 0', fontSize: '15px' }}>
            Semester {semester} | Enroll in available courses for this session
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
          border: '1px solid #f1f5f9'
        }}>
          <h3 style={{ marginBottom: '24px', color: '#1e293b', fontSize: '18px', fontWeight: '600' }}>Available Courses</h3>

          <div style={{ marginBottom: '16px' }}>
            {courses.length > 0 ? (
              courses.map(course => {
                const isRegistered = registeredCourses.includes(course.id);
                const isRegistering = registeringId === course.id;

                return (
                  <div key={course.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '20px',
                    border: '1px solid #f1f5f9',
                    borderRadius: '10px',
                    marginBottom: '16px',
                    backgroundColor: isRegistered ? '#f0fdf4' : 'white',
                    transition: 'all 0.2s ease'
                  }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', fontSize: '16px', color: '#1e293b' }}>{course.name}</div>
                      <div style={{ color: '#64748b', fontSize: '14px', marginTop: '4px' }}>
                        {course.code} • {course.credits} Credits
                      </div>
                    </div>

                    <button
                      onClick={() => handleRegisterCourse(course)}
                      disabled={isRegistered || isRegistering}
                      style={{
                        padding: '10px 24px',
                        backgroundColor: isRegistered ? '#16a34a' : (isRegistering ? '#94a3b8' : '#334155'),
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: isRegistered || isRegistering ? 'default' : 'pointer',
                        fontWeight: '600',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                        minWidth: '120px'
                      }}
                    >
                      {isRegistered ? 'Registered' : (isRegistering ? 'Registering...' : 'Register')}
                    </button>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                No courses available for Semester {semester} at this time.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration;
