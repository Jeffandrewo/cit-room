'use client'
import React, { useState, useEffect } from 'react';
import { SignIn } from '@clerk/nextjs';
import { db } from "@/firebase";
import { doc, getDoc } from 'firebase/firestore';

const SignInPage = () => {
  const [key, setKey] = useState('');
  const [isValidKey, setIsValidKey] = useState(false); // State to track if key is valid
  const [showSignIn, setShowSignIn] = useState(false); // State to track whether to show SignIn component
  
  useEffect(() => {
    const fetchAdminKey = async () => {
      try {
        const keyRef = doc(db, 'admin', 'adminKey');
        const keySnapshot = await getDoc(keyRef);
        if (keySnapshot.exists()) {
          const adminKey = keySnapshot.data().key;
          return adminKey;
        } else {
          console.log("Admin key document does not exist.");
          return null;
        }
      } catch (error) {
        console.error("Error fetching admin key:", error);
        return null;
      }
    };

    const loadAdminKey = async () => {
      const validKeys = await fetchAdminKey();
      if (validKeys) {
        setIsValidKey(validKeys === key);
      }
    };

    loadAdminKey();
  }, [key]);

  // Function to handle key input change
  const handleKeyChange = (e) => {
    const enteredKey = e.target.value;
    setKey(enteredKey);
  };

  useEffect(() => {
    setShowSignIn(isValidKey);
  }, [isValidKey]);

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <p style={{ marginRight: '10px' }}>ADMIN KEY:</p>
        <input type="text" placeholder="Enter Admin Key" value={key} onChange={handleKeyChange} style={{ textAlign: 'center' }} />
        {/*<button onClick={handleLogin} style={{ marginLeft: '10px' }}>Enter</button>*/}
      </div>
      {showSignIn && <SignIn style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)' }} />}
    </div>
  );
};

export default SignInPage;