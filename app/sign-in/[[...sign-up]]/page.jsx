'use client'
import { useState, useEffect } from 'react';
import { SignIn } from '@clerk/nextjs';
import AdminKey from '/app/admin-key/page';

// List of valid emails
const validKeys = ['1']; // Add your valid keys here

const SignInPage = () => {
  const [key, setKey] = useState('');
  const [isValidKey, setIsValidKey] = useState(false); // State to track if key is valid
  const [showSignIn, setShowSignIn] = useState(false); // State to track whether to show SignIn component

  // Function to handle key input change
  const handleKeyChange = (e) => {
    const enteredKey = e.target.value;
    setKey(enteredKey);
    setIsValidKey(validKeys.includes(enteredKey));
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