'use client'
import React from 'react';

export default function contactPage() {
  // Function to open the contact form URL in a new tab or pop-up
  const openContactForm = () => {
    window.open('https://forms.gle/aoeMrHTDMpr3Xe4o8', '_blank');
  };

  return (
    <div>
      <h1>Contact Admin Page</h1>
      <p>This page is for contacting the admin.</p>
      <button onClick={openContactForm}  className="text-lg font-bold border-2 border-red-500 m-5 p-5">Contact Admin</button>
    </div>
  );
}