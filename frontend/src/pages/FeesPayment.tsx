import React, { useState } from 'react';
import { mockFeeDetails } from '../data/mockData';

const FeesPayment: React.FC = () => {
  const [feeDetails, setFeeDetails] = useState(mockFeeDetails);
  const [paymentAmount, setPaymentAmount] = useState('');

  const handlePayment = () => {
    const amount = parseFloat(paymentAmount);
    if (amount > 0 && amount <= feeDetails.remaining) {
      setFeeDetails(prev => ({
        ...prev,
        paid: prev.paid + amount,
        remaining: prev.remaining - amount
      }));
      setPaymentAmount('');
      alert(`Payment of ₹${amount} successful!`);
    } else {
      alert('Invalid payment amount');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#2c3e50', margin: 0 }}>Fees Payment</h2>
        <p style={{ color: '#7f8c8d', margin: '5px 0 0 0' }}>
          Manage your fee payments and view payment history
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Fee Summary */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Fee Summary</h3>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '15px 0',
              borderBottom: '1px solid #ecf0f1'
            }}>
              <span style={{ fontWeight: 'bold' }}>Total Fees:</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2c3e50' }}>
                ₹{feeDetails.total.toLocaleString()}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '15px 0',
              borderBottom: '1px solid #ecf0f1'
            }}>
              <span style={{ fontWeight: 'bold' }}>Paid Fees:</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#27ae60' }}>
                ₹{feeDetails.paid.toLocaleString()}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '15px 0'
            }}>
              <span style={{ fontWeight: 'bold' }}>Remaining Fees:</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#e74c3c' }}>
                ₹{feeDetails.remaining.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '14px', marginBottom: '5px', color: '#7f8c8d' }}>
              Payment Progress: {Math.round((feeDetails.paid / feeDetails.total) * 100)}%
            </div>
            <div style={{
              width: '100%',
              height: '10px',
              backgroundColor: '#ecf0f1',
              borderRadius: '5px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${(feeDetails.paid / feeDetails.total) * 100}%`,
                height: '100%',
                backgroundColor: '#27ae60',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {feeDetails.remaining === 0 && (
            <div style={{
              padding: '15px',
              backgroundColor: '#d5f4e6',
              color: '#155724',
              borderRadius: '5px',
              textAlign: 'center',
              fontWeight: 'bold'
            }}>
              ✅ All fees paid successfully!
            </div>
          )}
        </div>

        {/* Payment Form */}
        {feeDetails.remaining > 0 && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '30px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#2c3e50' }}>Make Payment</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                Payment Amount (₹)
              </label>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                max={feeDetails.remaining}
                min="1"
                placeholder={`Max: ₹${feeDetails.remaining}`}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '5px',
                  fontSize: '16px'
                }}
              />
            </div>

            <button
              onClick={handlePayment}
              disabled={!paymentAmount || parseFloat(paymentAmount) <= 0}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: paymentAmount && parseFloat(paymentAmount) > 0 ? '#27ae60' : '#bdc3c7',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '16px',
                cursor: paymentAmount && parseFloat(paymentAmount) > 0 ? 'pointer' : 'not-allowed',
                fontWeight: 'bold'
              }}
            >
              Pay Now
            </button>

            <div style={{
              marginTop: '20px',
              padding: '15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '5px',
              fontSize: '14px',
              color: '#7f8c8d'
            }}>
              <strong>Note:</strong> This is a mock payment system. In production, integrate with actual payment gateways.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeesPayment;