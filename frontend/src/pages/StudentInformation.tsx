import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

interface InfoFieldProps {
  label: string;
  name: string;
  value: string | number;
  type?: string;
  required?: boolean;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const InfoField: React.FC<InfoFieldProps> = ({
  label, name, value, type = 'text', required = false, isEditing, onChange
}) => (
  <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#1e293b', fontSize: '14px' }}>
      {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
    </label>
    {isEditing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color 0.2s'
        }}
        onFocus={(e) => e.target.style.borderColor = '#334155'}
        onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
      />
    ) : (
      <div style={{
        padding: '10px 12px',
        backgroundColor: '#f8fafc',
        border: '1px solid #f1f5f9',
        borderRadius: '6px',
        minHeight: '20px',
        fontSize: '14px',
        color: '#334155'
      }}>
        {value || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Not provided</span>}
      </div>
    )}
  </div>
);

const StudentInformation: React.FC = () => {
  const { user, updateUserDetails } = useAuth();
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

  const fetchStudentInfo = React.useCallback(async () => {
    if (user?.email) {
      setLoading(true);
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
        console.log('Fetch student result:', result);

        if (response.ok && result.data) {
          let data = result.data;
          if (data.data) data = data.data;
          if (data.data) data = data.data;

          // Helper to extract first element of array or the value itself
          const getVal = (field: string) => {
            const val = data[field];
            return Array.isArray(val) ? val[0] : val;
          };

          const fetchedRollNumber = getVal('roll_no') || getVal('roll num') || getVal('rollNumber') || '';

          setFormData({
            name: getVal('full name') || getVal('name') || user.name || '',
            rollNumber: fetchedRollNumber,
            email: getVal('email') || user.email,
            department: getVal('department') || '',
            semester: parseInt(getVal('semester')) || user?.semester || 1,
            phone: getVal('phone') || '',
            address: getVal('address') || '',
            dateOfBirth: (getVal('date_of_birth') || getVal('date of birth') || '').replace(/"/g, '').split('T')[0],
            bloodGroup: getVal('blood_group') || getVal('blood group') || '',
            fatherName: getVal('father_name') || getVal('father name') || '',
            motherName: getVal('mother_name') || getVal('mother name') || '',
            guardianPhone: getVal('guardian_phone') || getVal('guardian num') || ''
          });

          // Sync UID/rollNumber to global context if it's missing or different
          if (fetchedRollNumber && user?.rollNumber !== fetchedRollNumber) {
            console.log('Syncing fetched Roll Number to global context:', fetchedRollNumber);
            updateUserDetails({ rollNumber: fetchedRollNumber, uid: fetchedRollNumber });
          }
        }
      } catch (error) {
        console.error('Error fetching student info:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [user, updateUserDetails]);

  useEffect(() => {
    fetchStudentInfo();
  }, [fetchStudentInfo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        operation: 'add',
        userid: user?.email,
        phone: formData.phone,
        date_of_birth: formData.dateOfBirth,
        blood_group: formData.bloodGroup,
        address: formData.address,
        father_name: formData.fatherName,
        mother_name: formData.motherName,
        guardian_phone: formData.guardianPhone
      };

      console.log('Saving profile payload:', payload);
      const response = await fetch('http://localhost:5000/api/flows/student-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (response.ok && (result.success || result.data?.success)) {
        setIsEditing(false);
        alert('Information updated successfully!');
        fetchStudentInfo(); // Refresh data
      } else {
        alert('Failed to update information.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error updating information.');
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', color: '#64748b', fontSize: '15px' }}>
        Loading student information...
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: '#1e293b', margin: 0, fontWeight: '600', fontSize: '28px' }}>Student Information</h2>
            <p style={{ color: '#64748b', margin: '8px 0 0 0', fontSize: '15px' }}>
              Manage your personal and academic record
            </p>
          </div>
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            style={{
              padding: '10px 24px',
              backgroundColor: isEditing ? '#334155' : 'white',
              color: isEditing ? 'white' : '#334155',
              border: isEditing ? 'none' : '1px solid #e2e8f0',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s ease',
              boxShadow: isEditing ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'
            }}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
          {/* Personal Information */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
            border: '1px solid #f1f5f9'
          }}>
            <h3 style={{ marginBottom: '24px', color: '#1e293b', fontSize: '18px', fontWeight: '600', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              Personal Details
            </h3>

            <InfoField label="Full Name" name="name" value={formData.name} required isEditing={isEditing} onChange={handleInputChange} />
            <InfoField label="Email Address" name="email" value={formData.email} type="email" required isEditing={false} onChange={handleInputChange} />
            <InfoField label="Phone Number" name="phone" value={formData.phone} type="tel" required isEditing={isEditing} onChange={handleInputChange} />
            <InfoField label="Date of Birth" name="dateOfBirth" value={formData.dateOfBirth} type="date" isEditing={isEditing} onChange={handleInputChange} />
            <InfoField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} isEditing={isEditing} onChange={handleInputChange} />

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>
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
                    padding: '10px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              ) : (
                <div style={{
                  padding: '10px 12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: '6px',
                  minHeight: '60px',
                  fontSize: '14px',
                  color: '#334155'
                }}>
                  {formData.address || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>Not provided</span>}
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'grid', gap: '32px', alignContent: 'start' }}>
            {/* Academic Information */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
              border: '1px solid #f1f5f9'
            }}>
              <h3 style={{ marginBottom: '24px', color: '#1e293b', fontSize: '18px', fontWeight: '600', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                Academic Record
              </h3>

              <InfoField label="Roll Number" name="rollNumber" value={user?.rollNumber || formData.rollNumber} required isEditing={false} onChange={handleInputChange} />
              <InfoField label="Department" name="department" value={formData.department} required isEditing={false} onChange={handleInputChange} />

              <div style={{ marginBottom: '0px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>
                  Current Semester
                </label>
                <div style={{
                  padding: '10px 12px',
                  backgroundColor: '#f8fafc',
                  border: '1px solid #f1f5f9',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: '#334155'
                }}>
                  Semester {formData.semester}
                </div>
              </div>
            </div>

            {/* Guardian Information */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)',
              border: '1px solid #f1f5f9'
            }}>
              <h3 style={{ marginBottom: '24px', color: '#1e293b', fontSize: '18px', fontWeight: '600', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
                Family Contact
              </h3>

              <InfoField label="Father's Name" name="fatherName" value={formData.fatherName} isEditing={isEditing} onChange={handleInputChange} />
              <InfoField label="Mother's Name" name="motherName" value={formData.motherName} isEditing={isEditing} onChange={handleInputChange} />
              <InfoField label="Guardian Phone" name="guardianPhone" value={formData.guardianPhone} type="tel" isEditing={isEditing} onChange={handleInputChange} />
            </div>
          </div>
        </div>

        {isEditing && (
          <div style={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: '#f1f5f9',
            borderRadius: '8px',
            color: '#475569',
            fontSize: '13px',
            textAlign: 'center'
          }}>
            Review all fields before saving to ensure your profile records are accurate.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentInformation;
