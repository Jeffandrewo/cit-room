'use client'
import React, { useState, useEffect } from 'react';
import { SignIn } from '@clerk/nextjs';
import { db } from "@/firebase";
import { doc, getDoc } from 'firebase/firestore';
import { IconButton, Input, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignInPage = () => {
  const [key, setKey] = useState('');
  const [isValidKey, setIsValidKey] = useState(false); // State to track if key is valid
  const [showSignIn, setShowSignIn] = useState(false); // State to track whether to show SignIn component
  const [showText, setShowText] = useState(true); // State to track whether to show the text in the textbox

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

  // Function to toggle visibility of text
  const toggleShowText = () => {
    setShowText(!showText);
  };

  useEffect(() => {
    setShowSignIn(isValidKey);
  }, [isValidKey]);

  return (
    <div style={{ textAlign: 'center', paddingTop: '50px' }}>
      <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
        <label style={{ fontSize: '18px', fontWeight: 'bold', marginRight: '10px' }}>Admin Key:</label>
        <Input 
          type={showText ? 'text' : 'password'} 
          placeholder="Enter Admin Key" 
          value={key} 
          onChange={handleKeyChange} 
          style={{ 
            padding: '10px', 
            borderRadius: '5px', 
            border: '1px solid #ccc', 
            width: '300px', 
            maxWidth: '100%', 
            boxSizing: 'border-box',
            marginRight: '10px' // Add margin to separate from the IconButton
          }} 
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={toggleShowText} edge="end">
                {showText ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
      {showSignIn && (
        <div style={{ position: 'relative', maxWidth: '400px', margin: 'auto' }}>
          <SignIn style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)' }} />
        </div>
      )}
    </div>
  );
};

export default SignInPage;
