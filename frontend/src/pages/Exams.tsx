import React, { useState } from 'react';

const Exams: React.FC = () => {
  const [exams, setExams] = useState([
    { id: 1, title: 'Mid-term Exam - CS101', course: 'CS101', date: '2024-03-15', time: '10:00', duration: 120, totalMarks: 100, status: 'scheduled' },
    { id: 2, title: 'Final Exam - MATH101', course: 'MATH101', date: '2024-04-20', time: '14:00', duration: 180, totalMarks: 150, status: 'scheduled' },
    { id: 3, title: 'Quiz - CS102', course: 'CS102', date: '2024-02-10', time: '11:00', duration: 60, totalMarks: 50, status: 'completed' }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    course: 'CS101',
    date: '',
    time: '',
    duration: 120,
    totalMarks: 100
  });

  const courses = ['CS101', 'CS102', 'MATH101', 'PHY101'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newExam = {
      id: Date.now(),
      ...formData,
      status: 'scheduled'
    };
    setExams([...exams, newExam]);
    setFormData({ title: '', course: 'CS101', date: '', time: '', duration: 120, totalMarks: 100 });
    setShowForm(false);
  };

  const deleteExam = (id: number) => {
    setExams(exams.filter(exam => exam.id !== id));
  };

  const updateStatus = (id: number, status: string) => {
    setExams(exams.map(exam => 
      exam.id === id ? { ...exam, status } : exam
    ));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>Exams Management</h2>
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
          {showForm ? 'Cancel' : 'Schedule Exam'}
        </button>
      </div>

      {showForm && (
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', marginBottom: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Schedule New Exam</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Exam Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Course</label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                >
                  {courses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Duration (minutes)</label>
                <input
                  type="number"
                  min="30"
                  max="300"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Total Marks</label>
                <input
                  type="number"
                  min="10"
                  max="200"
                  value={formData.totalMarks}
                  onChange={(e) => setFormData({...formData, totalMarks: parseInt(e.target.value)})}
                  required
                  style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
                />
              </div>
            </div>
            <button 
              type="submit" 
              style={{ padding: '10px 20px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Schedule Exam
            </button>
          </form>
        </div>
      )}

      <div style={{ backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa' }}>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Exam Title</th>
              <th style={{ padding: '15px', textAlign: 'left', borderBottom: '1px solid #dee2e6' }}>Course</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Date & Time</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Duration</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Total Marks</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Status</th>
              <th style={{ padding: '15px', textAlign: 'center', borderBottom: '1px solid #dee2e6' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map(exam => (
              <tr key={exam.id} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{exam.title}</td>
                <td style={{ padding: '15px', color: '#3498db' }}>{exam.course}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  {exam.date}<br/>
                  <small style={{ color: '#7f8c8d' }}>{exam.time}</small>
                </td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{exam.duration} min</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>{exam.totalMarks}</td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: exam.status === 'completed' ? '#d4edda' : exam.status === 'ongoing' ? '#fff3cd' : '#cce5ff',
                    color: exam.status === 'completed' ? '#155724' : exam.status === 'ongoing' ? '#856404' : '#004085'
                  }}>
                    {exam.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                    {exam.status === 'scheduled' && (
                      <button
                        onClick={() => updateStatus(exam.id, 'ongoing')}
                        style={{ padding: '5px 8px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Start
                      </button>
                    )}
                    {exam.status === 'ongoing' && (
                      <button
                        onClick={() => updateStatus(exam.id, 'completed')}
                        style={{ padding: '5px 8px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Complete
                      </button>
                    )}
                    <button
                      onClick={() => deleteExam(exam.id)}
                      style={{ padding: '5px 8px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Exams;