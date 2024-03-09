
import React from 'react';
import Link from 'next/link';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { SignInButton, SignUpButton, UserButton, auth } from '@clerk/nextjs';

const Header = ({ userId }) => {
  return (
    <nav className="[background-color:_#800000] relative py-4 px-6  flex items-center justify-between mb-5 ">
      <div className="flex items-center">
        <Link href="/">
          <div className="text-lg uppercase font-bold text-white">
            CIT ROOM CHECKER
          </div>
        </Link>
      </div>
      <div className="text-white flex items-center">
        <div className="ml-auto flex items-center">
          <Link href="/dashboard" className="text-gray-300 hover:text-white mr-10">
            Home
          </Link>
          <Link href="/AboutUs" className="text-gray-300 hover:text-white mr-10"> {/* Changed href */}
            About Us
          </Link>
          <Link href="/dashboard" className="text-gray-300 hover:text-white mr-10">
            Room Details
          </Link>
          <Link href="/dashboard" className="text-gray-300 hover:text-white mr-20">
            Search Room
          </Link>
          {!userId && (
            <>
              <Link href="/sign-in" className="text-gray-300 hover:text-white ml-5">
                <FaSignInAlt size={20} /> 
              </Link>
              <Link href="/sign-up" className="text-gray-300 hover:text-white ml-5">
                <FaUserPlus size={20} /> 
              </Link>
            </>
          )}
          {userId && (
            <div className="ml-5">
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
