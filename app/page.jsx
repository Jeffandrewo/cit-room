'use client'
import Image from 'next/image';
import Link from 'next/link'; 
import { useTheme } from 'next-themes';

//<NGE/>
export default function Home() {
  
  const { theme } = useTheme();
  return (
    
      <div className="relative py-4 px-20 flex items-center justify-between mb-10">
        <div className="flex flex-col justify-center text-white font-bold">
          <p className={`text-4xl w-full text-center mb-3 max-w-md mx-auto ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
            Stay Updated.
          </p>
          <p className="text-2xl w-full text-center" style={{ color: '#09cfcf' }}>
            Your room status at a glance!
          </p>
        </div>
        <div className="flex items-center md:justify-end">
          <div className="w-96 h-72 relative">
            <div className="image-container" style={{ marginBottom: "-100px" }}> {/* Adjusted marginTop */}
              <Image src="/build.png" alt="building" height="500" width="500" />
            </div>
          </div>
        </div>
      </div>
    
  );
}