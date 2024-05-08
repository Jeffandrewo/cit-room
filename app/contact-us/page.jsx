'use client'
import React from 'react';

export default function ContactPage() {
  // Function to open the contact form URL in a new tab or pop-up
  const openContactForm = () => {
    window.open('https://forms.gle/aoeMrHTDMpr3Xe4o8', '_blank');
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800">Contact Admin</h1>
        <p className="text-lg lg:text-xl mb-8 text-gray-700">Have a question or need assistance? Feel free to contact our admin team.</p>
        <button onClick={openContactForm} className="text-lg md:text-xl font-bold bg-red-500 text-white rounded-full py-3 px-8 md:py-4 md:px-10 hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300 ease-in-out">Contact Admin</button>
      </div>
    </div>
  );
}