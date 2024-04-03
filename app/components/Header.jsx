import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import { UserButton, auth } from "@clerk/nextjs";

const Header = () => {
  const { userId } = auth();

  return (
    <nav className="[background-color:_#09cfcf] relative py-4 px-6  flex items-center justify-between mb-5 ">
      <div className="flex items-center">
        <Link href="/">
          <div className="text-lg uppercase font-bold text-white">
            CIT ROOM CHECKER
          </div>
        </Link>
      </div>
      <div className="text-white flex items-center">
        <Link
          href="/calendar"
          className="text-lg font bold hover:text-black mr-10"
        >
          Calendar
        </Link>
        <Link
          href="/news"
          className="text-lg font bold hover:text-black mr-10"
        >
          News
        </Link>
        <Link
          href="/about-us"
          className="text-lg font bold hover:text-black mr-10"
        >
          About Us
        </Link>
        {userId && (
          <Link
            href="/dashboard"
            className="text-lg font bold hover:text-black mr-10"
          >
            Dashboard
          </Link>
        )}
        <Link
          href="/room-details"
          className="text-lg font bold hover:text-black mr-10"
        >
          Room Details
        </Link>
        <Link
          href="/search-room"
          className="text-lg font bold hover:text-black mr-20"
        >
          Search Room
        </Link>
        {!userId && (
          <Link
            href="/sign-up"
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
