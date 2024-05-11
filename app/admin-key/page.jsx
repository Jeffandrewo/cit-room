'use client'
import React, { useState, useEffect } from 'react';
import { db } from "@/firebase";
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AdminKey = () => {
  const [adminKeyInput, setAdminKeyInput] = useState('');
  const [adminKeyDisplay, setAdminKeyDisplay] = useState('');

  // Function to fetch admin key value from Firestore
  const fetchAdminKey = async () => {
    const keyRef = doc(db, 'admin', 'adminKey');
    const keySnap = await getDoc(keyRef);
    if (keySnap.exists()) {
      const keyData = keySnap.data();
      setAdminKeyDisplay(keyData.key);
    } else {
      console.log("Admin key not found in database");
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
    console.log('Submitting admin key:', adminKeyInput);
    // Update admin key in Firestore
    const keyRef = doc(db, 'admin', 'adminKey');
    await setDoc(keyRef, { key: adminKeyInput });

    // Update adminKeyDisplay to show the latest admin key
    setAdminKeyDisplay(adminKeyInput);
    console.log('Admin key updated successfully:', adminKeyInput);
  };

  return (
    <div>
      <p>Current Admin Key: {adminKeyDisplay}</p>
      <input type="text" placeholder="Enter New Admin Key" value={adminKeyInput} onChange={handleAdminKeyChange} />
      <button onClick={handleAdminKeySubmit}>Update Admin Key</button>
    </div>
  );
};

export default AdminKey;