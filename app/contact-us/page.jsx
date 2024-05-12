'use client'
import React from 'react';
import { FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';
import { useTheme } from 'next-themes';

export default function ContactPage() {
  // Function to open the contact form URL in a new tab or pop-up
  const openContactForm = () => {
    window.open('https://forms.gle/aoeMrHTDMpr3Xe4o8', '_blank');
  };
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="container mx-auto px-4 py-8 text-center">
      <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Contact Admin</h1>
      <p className={`text-lg lg:text-xl mb-8 ${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-700'}`}>Have a question or need assistance? Feel free to contact our admin team.</p>
        <button onClick={openContactForm} className="text-lg md:text-xl font-bold bg-yellow-500 text-white rounded-full py-3 px-8 md:py-4 md:px-10 hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300 ease-in-out mb-8">Contact Admin</button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        <ContactLink icon={<FaEnvelope className="text-6xl" />} title="EMAIL" content="andrewdandan80@gmail.com" link="mailto:andrewdandan80@gmail.com" />
        <ContactLink icon={<FaMapMarkerAlt className="text-6xl" />} title="ADDRESS" content="N. Bacalso Avenue, Cebu City, 6000 Cebu" />
        <ContactLink icon={<FaPhone className="text-6xl" />} title="CALL US" content="0987654321" link="tel:0987654321" />
        <ContactLink icon={<FaFacebook className="text-6xl" />} title="FACEBOOK" content="CIT ROOM CHECKER" link="https://www.facebook.com/CITROOMCHECKER/" />
        <ContactLink icon={<FaTwitter className="text-6xl" />} title="TWITTER" content="@citroomchecker" link="https://twitter.com/citroomchecker" />
        <ContactLink icon={<FaInstagram className="text-6xl" />} title="INSTAGRAM" content="@citroomchecker" link="https://www.instagram.com/citroomchecker/" />
      </div>
    </div>
  );
}

const ContactLink = ({ icon, title, content, link }) => {
  const { resolvedTheme } = useTheme();
  
  return (
    <a href={link} target="_blank" rel="noopener noreferrer"  className={`flex flex-col items-center ${
        resolvedTheme === "dark" ? "text-white" : "text-gray-600"
      } hover:${resolvedTheme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
    {icon}
    <strong className="mt-4">{title}</strong>
    <span>{content}</span>
  </a>
  );
};