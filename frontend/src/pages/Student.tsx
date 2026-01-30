import React, { useState } from 'react';
import Layout from '../layouts/Layout';
import StudentDashboard from './StudentDashboard';
import CourseRegistration from './CourseRegistration';
import StudentInformation from './StudentInformation';
import Examination from './Examination';

const Student: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'course-registration':
        return <CourseRegistration />;
      case 'student-info':
        return <StudentInformation />;
      case 'examination':
        return <Examination />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
};

export default Student;