'use client'
import React from 'react';
import { FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactPage() {
  // Function to open the contact form URL in a new tab or pop-up
  const openContactForm = () => {
    window.open('https://forms.gle/aoeMrHTDMpr3Xe4o8', '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-800">Contact Admin</h1>
        <p className="text-lg lg:text-xl mb-8 text-gray-700">Have a question or need assistance? Feel free to contact our admin team.</p>
        <button onClick={openContactForm} className="text-lg md:text-xl font-bold bg-yellow-500 text-white rounded-full py-3 px-8 md:py-4 md:px-10 hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300 ease-in-out mb-8">Contact Admin</button>
      </div>
      <div className="flex justify-center items-center space-x-16 mt-8">
        <a href="mailto:andrewdandan80@gmail.com" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
          <FaEnvelope className="inline-block text-6xl" />
          <strong className="mt-4">EMAIL</strong>
          <span>andrewdandan80@gmail.com</span>
        </a>
        <a href="#" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
          <FaMapMarkerAlt className="inline-block text-6xl" />
          <strong className="mt-4">ADDRESS</strong>
          <span>N. Bacalso Avenue, Cebu City, 6000 Cebu</span>
        </a>
        <a href="tel:0987654321" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
          <FaPhone className="inline-block text-6xl" />
          <strong className="mt-4">CALL US</strong>
          <span>0987654321</span>
        </a>
        <a href="https://www.facebook.com/CITROOMCHECKER/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
          <FaFacebook className="inline-block text-6xl" />
          <strong className="mt-4">FACEBOOK</strong>
          <span>CIT ROOM CHECKER</span>
        </a>
        <a href="https://twitter.com/citroomchecker" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
          <FaTwitter className="inline-block text-6xl" />
          <strong className="mt-4">TWITTER</strong>
          <span>@citroomchecker</span>
        </a>
        <a href="https://www.instagram.com/citroomchecker/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-gray-600 hover:text-gray-800">
          <FaInstagram className="inline-block text-6xl" />
          <strong className="mt-4">INSTAGRAM</strong>
          <span>@citroomchecker</span>
        </a>
      </div>
    </div>
  );
}
