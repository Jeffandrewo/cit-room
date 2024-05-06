'use client'
import { useState } from 'react';
import { SignIn } from '@clerk/nextjs';

// List of valid emails
const validEmails = ['1', 'example2@example.com']; // Add your valid emails here

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false); // State to track if email is valid
  const [showSignIn, setShowSignIn] = useState(false); // State to track whether to show SignIn component

  // Function to handle email input change
  const handleEmailChange = (e) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    setIsValidEmail(validEmails.includes(enteredEmail));
    setShowSignIn(enteredEmail && isValidEmail);
  };

  // Function to handle login submission
  const handleLogin = () => {
    if (isValidEmail) {
      // Proceed with login
      // You can add any additional logic here if needed
      console.log('Valid email. Proceeding with login...');
      // Set showSignIn to true when the button is clicked and email is valid
      setShowSignIn(true);
    } else {
      // Email not found in the list of valid emails
      console.log('Invalid email. Login denied.');
      // You can display an error message or handle it as per your application's requirements
    }
  };

  return (
    <div style={{ position: 'relative', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
        <input type="email" placeholder="Enter Admin Key" value={email} onChange={handleEmailChange} style={{textAlign: 'center' }}/>
        <button onClick={handleLogin} style={{ marginLeft: '10px' }}>Enter</button>
      </div>
      {showSignIn && <SignIn style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)' }} />}
    </div>
  );
};

export default SignInPage;