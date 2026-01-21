import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const StudentInformation: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    department: '',
    semester: 1,
    phone: '',
    address: '',
    dateOfBirth: '',
    bloodGroup: '',
    fatherName: '',
    motherName: '',
    guardianPhone: ''
  });

  useEffect(() => {
    const fetchStudentInfo = async () => {
      if (user?.email) {
        try {
          const response = await fetch('http://localhost:5000/api/flows/user-info', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: user.email })
          });
          
          const result = await response.json();
          const studentData = result?.data?.data;
          
          if (studentData) {
            setFormData({
              name: studentData['full name']?.[0] || '',
              rollNumber: studentData['roll num']?.[0] || '',
              email: studentData['email']?.[0] || user.email,
              department: studentData['department']?.[0] || '',
              semester: user?.semester || 1,
              phone: '',
              address: studentData['address']?.[0] || '',
              dateOfBirth: studentData['date of birth']?.[0]?.replace(/"/g, '').split('T')[0] || '',
              bloodGroup: studentData['blood group']?.[0] || '',
              fatherName: studentData['father name']?.[0] || '',
              motherName: studentData['mother name']?.[0] || '',
              guardianPhone: studentData['guardian num']?.[0] || ''
            });
          }
        } catch (error) {
          console.error('Error fetching student info:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    fetchStudentInfo();
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Mock save functionality
    setIsEditing(false);
    alert('Information updated successfully!');
  };

  const InfoField: React.FC<{ label: string; name: string; value: string | number; type?: string; required?: boolean }> = ({ 
    label, name, value, type = 'text', required = false 
  }) => (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
        {label} {required && <span style={{ color: '#e74c3c' }}>*</span>}
      </label>
      {isEditing ? (
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleInputChange}
          required={required}
          style={{
            width: '100%',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '14px'
          }}
        />
      ) : (
        <div style={{
          padding: '10px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #ecf0f1',
          borderRadius: '5px',
          minHeight: '20px'
        }}>
          {value}
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <div>Loading student information...</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ color: '#2c3e50', margin: 0 }}>Student Information</h2>
          <p style={{ color: '#7f8c8d', margin: '5px 0 0 0' }}>
            View and update your personal and academic information
          </p>
        </div>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          style={{
            padding: '10px 20px',
            backgroundColor: isEditing ? '#27ae60' : '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {isEditing ? 'Save Changes' : 'Edit Information'}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
        {/* Personal Information */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
            Personal Information
          </h3>
          
          <InfoField label="Full Name" name="name" value={formData.name} required />
          <InfoField label="Email Address" name="email" value={formData.email} type="email" required />
          <InfoField label="Phone Number" name="phone" value={formData.phone} type="tel" required />
          <InfoField label="Date of Birth" name="dateOfBirth" value={formData.dateOfBirth} type="date" />
          <InfoField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} />
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
              Address
            </label>
            {isEditing ? (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px',
                  resize: 'vertical'
                }}
              />
            ) : (
              <div style={{
                padding: '10px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #ecf0f1',
                borderRadius: '5px',
                minHeight: '60px'
              }}>
                {formData.address}
              </div>
            )}
          </div>
        </div>

        {/* Academic Information */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#2c3e50', borderBottom: '2px solid #27ae60', paddingBottom: '10px' }}>
            Academic Information
          </h3>
          
          <InfoField label="Roll Number" name="rollNumber" value={formData.rollNumber} required />
          <InfoField label="Department" name="department" value={formData.department} required />
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#2c3e50' }}>
              Current Semester <span style={{ color: '#e74c3c' }}>*</span>
            </label>
            {isEditing ? (
              <select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '14px'
                }}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            ) : (
              <div style={{
                padding: '10px',
                backgroundColor: '#f8f9fa',
                border: '1px solid #ecf0f1',
                borderRadius: '5px'
              }}>
                Semester {formData.semester}
              </div>
            )}
          </div>
        </div>

        {/* Guardian Information */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          gridColumn: 'span 2'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#2c3e50', borderBottom: '2px solid #e67e22', paddingBottom: '10px' }}>
            Guardian Information
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            <InfoField label="Father's Name" name="fatherName" value={formData.fatherName} />
            <InfoField label="Mother's Name" name="motherName" value={formData.motherName} />
            <InfoField label="Guardian Phone" name="guardianPhone" value={formData.guardianPhone} type="tel" />
          </div>
        </div>
      </div>

      {isEditing && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#fff3cd',
          border: '1px solid #ffeaa7',
          borderRadius: '5px',
          color: '#856404'
        }}>
          <strong>Note:</strong> Please ensure all information is accurate before saving. Changes may require verification.
        </div>
      )}
    </div>
  );
};

export default StudentInformation;