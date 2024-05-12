import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import { UserButton, auth } from "@clerk/nextjs";

const Header = () => {
 
  const { userId } = auth();

  return (
    <nav className="bg-gradient-to-r from-yellow-500 to-red-500 relative py-4 px-6 flex items-center justify-between mb-5">
      <div className="flex items-center">
        <Link href="/">
          <div className="text-lg uppercase font-bold text-white">
            CIT ROOM CHECKER
          </div>
        </Link>
      </div>
      <div className="text-white flex items-center">

      {userId && (
          <Link
            href="/dashboard"
            className="text-lg font-bold hover:text-black mr-10"
          >
            Dashboard
          </Link>
        )}
        
        <div className="relative inline-block text-left">
          <div className="group">
            <button className="text-lg font-bold hover:text-black mr-10 group-hover:text-black">
              Events
            </button>
            <div className="w-40 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-0 top-full mt-2" style={{ zIndex: 10 }}>
              {userId && ( // Conditionally render the Booked Event link
                <Link href="/bookingevent">
                  <div className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">Booked Event</div>
                </Link>
              )}
              <Link href="/eventlist">
                <div className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">Event List</div>
              </Link>
              <Link href="/addingEvent">
                <div className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200">Add Event</div>
              </Link>
            </div>
          </div>
        </div>
        <Link
          href="/calendar"
          className="text-lg font-bold hover:text-black mr-10"
        >
          Calendar
        </Link>
        <Link
          href="/news"
          className="text-lg font-bold hover:text-black mr-10"
        >
          News
        </Link>
    
        <Link
          href="/room-details"
          className="text-lg font-bold hover:text-black mr-10"
        >
          Room Details
        </Link>

        <Link
          href="/about-us"
          className="text-lg font-bold hover:text-black mr-10"
        >
          About Us
        </Link>
        
        <Link
          href="/contact-us"
          className="text-lg font-bold hover:text-black mr-10"
        >
          Contact Us
        </Link>

        {userId && (
          <Link
            href="/admin-key"
            className="text-lg font-bold hover:text-black mr-10"
          >
            Admin Key
          </Link>
        )}
        {!userId && (
          <Link
            href="/admin-key"
            className="text-gray-300 hover:text-white ml-5"
          >
            <MdAccountCircle size={30} />
          </Link>
        )}
        {userId && (
          <div className="ml-5">
            <UserButton afterSignOutUrl="/" />
          </div>
        )}
      </div>
    </nav>
  );
  
  
};

export default Header;