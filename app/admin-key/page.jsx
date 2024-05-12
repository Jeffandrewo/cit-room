'use client'
import React, { useState, useEffect } from 'react';
import { db } from "@/firebase";
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AdminKey = () => {
  const [adminKeyInput, setAdminKeyInput] = useState('');
  const [adminKeyDisplay, setAdminKeyDisplay] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Function to fetch admin key value from Firestore
  const fetchAdminKey = async () => {
    try {
      const keyRef = doc(db, 'admin', 'adminKey');
      const keySnap = await getDoc(keyRef);
      if (keySnap.exists()) {
        const keyData = keySnap.data();
        setAdminKeyDisplay(keyData.key);
      } else {
        setError("Admin key not found in database");
      }
    } catch (error) {
      setError("Failed to fetch admin key. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch admin key value when component mounts
  useEffect(() => {
    fetchAdminKey();
  }, []);

  const handleAdminKeyChange = (e) => {
    const key = e.target.value;
    setAdminKeyInput(key);
  };

  const handleAdminKeySubmit = async () => {
    if (!adminKeyInput) {
      setError("Please enter a new admin key.");
      return;
    }

    try {
      setLoading(true);
      console.log('Submitting admin key:', adminKeyInput);
      // Update admin key in Firestore
      const keyRef = doc(db, 'admin', 'adminKey');
      await setDoc(keyRef, { key: adminKeyInput });

      // Update adminKeyDisplay to show the latest admin key
      setAdminKeyDisplay(adminKeyInput);
      console.log('Admin key updated successfully:', adminKeyInput);
    } catch (error) {
      setError("Failed to update admin key. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'center', backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ color: '#333', marginBottom: '20px', fontFamily: 'Arial, sans-serif' }}>Admin Key Management</h2>
      {loading ? (
        <p style={{ fontStyle: 'italic', color: '#666' }}>Loading...</p>
      ) : (
        <>
          {error && <p style={{ color: 'red', marginBottom: '10px', fontSize: '14px', fontFamily: 'Arial, sans-serif' }}>{error}</p>}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="adminKeyInput" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontFamily: 'Arial, sans-serif' , color: 'black'}} >Current Admin Key:</label>
            <strong style={{ fontSize: '16px', fontFamily: 'Arial, sans-serif', color: 'black' }}>{adminKeyDisplay}</strong>
          </div>
          <input
            id="adminKeyInput"
            type="text"
            placeholder="Enter New Admin Key"
            value={adminKeyInput}
            onChange={handleAdminKeyChange}
            style={{ marginBottom: '20px', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', width: '100%', boxSizing: 'border-box', fontFamily: 'Arial, sans-serif' }}
          />
          <button onClick={handleAdminKeySubmit} style={{ cursor: 'pointer', padding: '10px 20px', borderRadius: '4px', backgroundColor: '#007bff', color: '#fff', border: 'none', fontSize: '16px', fontFamily: 'Arial, sans-serif' }}>Update Admin Key</button>
        </>
      )}
    </div>
  );
  
  
};

export default AdminKey;