import React, { useState } from 'react';

const Courses: React.FC = () => {
  const [courses, setCourses] = useState([
    { id: 1, code: 'CS101', name: 'Introduction to Programming', credits: 3, semester: 1, seats: 45, department: 'Computer Science' },
    { id: 2, code: 'CS102', name: 'Data Structures', credits: 4, semester: 2, seats: 38, department: 'Computer Science' },
    { id: 3, code: 'MATH101', name: 'Calculus I', credits: 3, semester: 1, seats: 52, department: 'Mathematics' },
    { id: 4, code: 'PHY101', name: 'Physics I', credits: 3, semester: 1, seats: 41, department: 'Physics' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    credits: 3,
    semester: 1,
    seats: 30,
    department: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Format data exactly as your API expects
      const payload = {
        course_code: formData.code,
        course_name: formData.name,
        credits: formData.credits,
        semester: formData.semester,
        department: formData.department,
        seats: formData.seats,
        operation: "add"
      };
      
      console.log('Sending payload:', payload);
      
      const response = await fetch('http://localhost:5000/api/flows/course-add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const result = await response.json();
      console.log('Course add response:', result);
      
      if (response.ok) {
        // Add course to local state for immediate UI update
        const newCourse = {
          id: Date.now(),
          code: formData.code,
          name: formData.name,
          credits: formData.credits,
          semester: formData.semester,
          seats: formData.seats,
          department: formData.department
        };
        setCourses([...courses, newCourse]);
        setFormData({ code: '', name: '', credits: 3, semester: 1, seats: 30, department: '' });
        setShowForm(false);
        alert('Course added successfully!');
      } else {
        alert('Failed to add course. Please try again.');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Error adding course. Please try again.');
    }
  };

  const deleteCourse = async (id: number) => {
    const courseToDelete = courses.find(course => course.id === id);
    if (!courseToDelete) return;

    try {
      const payload = {
        course_code: courseToDelete.code,
        operation: "delete"
      };

      const response = await fetch('http://localhost:5000/api/flows/course-add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setCourses(courses.filter(course => course.id !== id));
        alert('Course deleted successfully!');
      } else {
        alert('Failed to delete course. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Error deleting course. Please try again.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>Courses Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {showForm ? 'Cancel' : 'Add Course'}
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Add New Course</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Course Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Credits</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={formData.credits}
                  onChange={(e) => setFormData({...formData, credits: parseInt(e.target.value)})}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Semester</label>
                <select
                  value={formData.semester}
                  onChange={(e) => setFormData({...formData, semester: parseInt(e.target.value)})}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                >
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Seats</label>
                <input
                  type="number"
                  min="10"
                  max="100"
                  value={formData.seats}
                  onChange={(e) => setFormData({...formData, seats: parseInt(e.target.value)})}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Course Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
            </div>
            <button 
              type="submit" 
              style={{ padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Add Course
            </button>
          </form>
        </div>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Course Code</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Course Name</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Credits</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Semester</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Seats</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Department</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '15px', fontWeight: 'bold', color: '#3498db' }}>{course.code}</td>
                <td style={{ padding: '15px' }}>{course.name}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{course.credits}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{course.semester}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{course.seats}</td>
                <td style={{ padding: '15px' }}>{course.department}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    style={{ padding: '5px 10px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;