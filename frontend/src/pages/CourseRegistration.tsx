import React, { useState } from 'react';
import { mockCourses } from '../data/mockData';

const CourseRegistration: React.FC = () => {
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>(['1', '2', '3', '4']); // Mock enrolled courses

  const handleCourseSelection = (courseId: string) => {
    setSelectedCourses(prev => 
      prev.includes(courseId) 
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSubmit = () => {
    setEnrolledCourses(prev => [...prev, ...selectedCourses]);
    setSelectedCourses([]);
    alert('Course registration successful!');
  };

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>Course Registration</h2>
        <p style={{ color: '#7f8c8d', margin: '5px 0 0 0' }}>
          Select courses for the current semester
        </p>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Available Courses</h3>
        
        <div style={{ marginBottom: '30px' }}>
          {mockCourses.map(course => (
            <div key={course.id} style={{
              display: 'flex',
              alignItems: 'center',
              padding: '15px',
              border: '1px solid #ecf0f1',
              borderRadius: '8px',
              marginBottom: '10px',
              backgroundColor: enrolledCourses.includes(course.id) ? '#d5f4e6' : 'white'
            }}>
              <input
                type="checkbox"
                checked={selectedCourses.includes(course.id) || enrolledCourses.includes(course.id)}
                onChange={() => handleCourseSelection(course.id)}
                disabled={enrolledCourses.includes(course.id)}
                style={{ marginRight: '15px', transform: 'scale(1.2)' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{course.name}</div>
                <div style={{ color: '#7f8c8d', fontSize: '14px' }}>
                  Course Code: {course.code} | Credits: {course.credits}
                </div>
              </div>
              {enrolledCourses.includes(course.id) && (
                <div style={{
                  padding: '4px 12px',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  borderRadius: '15px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  Enrolled
                </div>
              )}
            </div>
          ))}
        </div>

        {selectedCourses.length > 0 && (
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={handleSubmit}
              style={{
                padding: '12px 30px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Register Selected Courses ({selectedCourses.length})
            </button>
          </div>
        )}

        <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>Registration Summary</h4>
          <p style={{ margin: 0, color: '#7f8c8d' }}>
            Total Enrolled Courses: {enrolledCourses.length} | 
            Total Credits: {mockCourses.filter(c => enrolledCourses.includes(c.id)).reduce((sum, c) => sum + c.credits, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration;