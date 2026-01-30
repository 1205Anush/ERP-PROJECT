import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockCourses, mockAttendance, mockTimetable } from '../data/mockData';

interface ApiNotice {
  title: string;
  content: string;
  priority: number;
}

interface ApiCourse {
  id: string;
  name: string;
  credits?: string | number;
}

const StudentDashboard: React.FC = () => {
  const { user, updateUserDetails } = useAuth();
  const [apiNotices, setApiNotices] = useState<ApiNotice[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<ApiCourse[]>([]);
  const [studentInfo, setStudentInfo] = useState({
    rollNumber: '',
    department: '',
    semester: 1
  });

  const fetchEnrolledCourses = React.useCallback(async (studentId: string) => {
    try {
      console.log('Fetching enrolled courses for:', studentId);
      const response = await fetch('http://localhost:5000/api/flows/enrolled-courses-fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ student_id: studentId })
      });

      const result = await response.json();
      console.log('Enrolled courses response:', result);

      if (response.ok && result.data) {
        let apiData = result.data;
        if (apiData.data) apiData = apiData.data;

        // Extract arrays (e.g., course_ids, courseid, course_id, course_name)
        const ids = apiData.course_ids || apiData.courseid || apiData.course_id || apiData.id || [];
        const names = apiData.course_name || apiData.name || [];
        const credits = apiData.credits || [];

        const courses: ApiCourse[] = [];
        const maxLength = Math.max(ids.length, names.length);

        for (let i = 0; i < maxLength; i++) {
          courses.push({
            id: ids[i] || `course-${i}`,
            name: names[i] || 'Unnamed Course',
            credits: credits[i] || '3'
          });
        }
        setEnrolledCourses(courses);
      }
    } catch (error) {
      console.error('Error fetching enrolled courses:', error);
    }
  }, []);

  const fetchStudentProfile = React.useCallback(async () => {
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

          const fetchedRollNum = getVal('roll_no') || getVal('roll num') || getVal('rollNumber') || '';

          setStudentInfo({
            rollNumber: fetchedRollNum,
            department: getVal('department') || '',
            semester: parseInt(getVal('semester')) || user?.semester || 1
          });

          // Sync UID/rollNumber to global context if it's missing or different
          if (fetchedRollNum && user?.rollNumber !== fetchedRollNum) {
            console.log('Dashboard: Syncing fetched Roll Number to global context:', fetchedRollNum);
            updateUserDetails({ rollNumber: fetchedRollNum, uid: fetchedRollNum });
          }

          // Fetch enrolled courses once we have the ID
          const finalId = fetchedRollNum || user.uid || user.rollNumber || user.email;
          fetchEnrolledCourses(finalId);
        }
      } catch (error) {
        console.error('Error fetching dashboard profile:', error);
      }
    }
  }, [user, updateUserDetails, fetchEnrolledCourses]);

  const fetchNotices = React.useCallback(async () => {
    try {
      console.log('Fetching approved notices for dashboard...');
      const response = await fetch('http://localhost:5000/api/flows/notice-fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      console.log('Dashboard notices response:', result);

      if (response.ok && result.data && result.data.data) {
        const apiData = result.data.data;

        const titleArray = apiData.title || [];
        const contentArray = apiData.content || [];
        const priorityArray = apiData.priority ? apiData.priority.map((p: string | number) => typeof p === 'string' ? parseInt(p) : p) : [];

        const notices: ApiNotice[] = [];
        const maxLength = Math.max(titleArray.length, contentArray.length, priorityArray.length);

        for (let i = 0; i < maxLength; i++) {
          notices.push({
            title: titleArray[i] || 'No Title',
            content: (contentArray[i] || 'No Content').trim(),
            priority: priorityArray[i] || 2
          });
        }
        setApiNotices(notices);
      }
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  }, []);

  useEffect(() => {
    fetchNotices();
    fetchStudentProfile();
  }, [fetchNotices, fetchStudentProfile]);

  return (
    <div style={{ fontFamily: '"Inter", sans-serif' }}>
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#1e293b', margin: 0, fontWeight: '600', fontSize: '28px', letterSpacing: '-0.025em' }}>Welcome back, {user?.name}</h2>
        <p style={{ color: '#64748b', margin: '8px 0 0 0', fontSize: '15px' }}>
          Roll No: {user?.rollNumber || studentInfo.rollNumber || '---'} | Department: {studentInfo.department || '---'} | Semester: {studentInfo.semester}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <Card title="📚 Enrolled Courses">
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map(course => (
              <div key={course.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                <div>
                  <div style={{ fontWeight: '600', color: '#1e293b' }}>{course.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{course.id}</div>
                </div>
                <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '13px' }}>{course.credits} Credits</div>
              </div>
            ))
          ) : (
            <div style={{ color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', padding: '20px 0' }}>No courses enrolled yet</div>
          )}
        </Card>

        <Card title="📊 Attendance Summary">
          {mockAttendance.map((attendance, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #ecf0f1' }}>
              <span>{attendance.subject}</span>
              <div style={{ padding: '4px 8px', borderRadius: '15px', backgroundColor: attendance.percentage >= 85 ? '#d5f4e6' : attendance.percentage >= 75 ? '#fff3cd' : '#f8d7da', color: attendance.percentage >= 85 ? '#155724' : attendance.percentage >= 75 ? '#856404' : '#721c24', fontSize: '12px', fontWeight: 'bold' }}>
                {attendance.percentage}%
              </div>
            </div>
          ))}
        </Card>

        <Card title="📢 Recent Notices">
          <div style={{ maxHeight: '300px', overflowY: 'auto', paddingRight: '5px' }}>
            {apiNotices.map((notice, index) => (
              <div key={index} style={{ padding: '10px 0', borderBottom: '1px solid #ecf0f1' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '5px' }}>
                  <div style={{ fontWeight: 'bold' }}>{notice.title}</div>
                  {notice.priority === 1 && (
                    <div style={{ padding: '2px 6px', backgroundColor: '#e74c3c', color: 'white', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold' }}>URGENT</div>
                  )}
                </div>
                <div style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '5px' }}>{notice.content}</div>
              </div>
            ))}
            {apiNotices.length === 0 && <div style={{ color: '#7f8c8d', fontStyle: 'italic' }}>No notices available</div>}
          </div>
        </Card>

        <Card title="🗓️ Weekly Timetable">
          {mockTimetable.map((entry, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #ecf0f1' }}>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{entry.day}</div>
                <div style={{ fontSize: '12px', color: '#7f8c8d' }}>{entry.time}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px' }}>{entry.subject}</div>
                <div style={{ fontSize: '12px', color: '#7f8c8d' }}>{entry.room}</div>
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

const Card: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    marginBottom: '24px',
    border: '1px solid #f1f5f9'
  }}>
    <h3 style={{ margin: '0 0 16px 0', color: '#1e293b', fontSize: '16px', fontWeight: '600' }}>{title}</h3>
    {children}
  </div>
);

export default StudentDashboard;
