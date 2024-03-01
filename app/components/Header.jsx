import Link from "next/link"
import { UserButton,auth } from "@clerk/nextjs"

const Header = () => {

    const { userId } = auth();
    console.log(userId);

  return (
    <>
        <nav className="bg-amber-500 py-4 px-6  flex items-center justify-between mb-5 ">
            <div className="flex items-center ">
                <Link href="/">
                    <div className="text-lg uppercase font-bold text-white">
                        CIT ROOM CHECKER
                    </div>
                </Link>
            </div>
            <div className="text-white flex items-center">
                {!userId && (
                    <>
                        <Link href='sign-in' className="text-gray-300 hover:text-white mr-4">
                            Sign in
                        </Link>
                        <Link href='sign-up' className="text-gray-300 hover:text-white mr-4">
                            Sign up
                        </Link>
                    </>
                )}
                { userId && ( 
                    <div className="ml-auto">
                    <UserButton afterSignOutUrl="/"/>
                    </div>
                )}
            </div>
        </nav>
    </>
  )
}

export default Header