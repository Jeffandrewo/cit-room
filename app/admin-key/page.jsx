'use client'
import React, { useState } from 'react';

const AdminKey = () => {
  const [adminKeyInput, setAdminKeyInput] = useState('');
  const [adminKeyDisplay, setAdminKeyDisplay] = useState('');

  const handleAdminKeyChange = (e) => {
    const key = e.target.value;
    setAdminKeyInput(key);
  };

  const handleAdminKeySubmit = () => {
    // Update adminKeyDisplay to show the latest admin key
    //AdminKey(adminKeyInput);
    setAdminKeyDisplay(adminKeyInput);
  };

  return (
    <div>
      <p>Current Admin Key: {adminKeyDisplay}</p>
      <input type="text" placeholder="Enter New Admin Key" value={adminKeyInput} onChange={handleAdminKeyChange} />
      {/* Call handleAdminKeySubmit only when the button is clicked */}
      <button onClick={handleAdminKeySubmit}>Update Admin Key</button>
    </div>
  );
};

export default AdminKey;