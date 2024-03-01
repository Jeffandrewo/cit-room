import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-wrap">

      <div className="bg-white p-1 rounded-lg shadow-md border-t-2 border-blue-500 w-48 h-48 overflow-hidden">
        <h2 className="text-lg font-bold mb-1">Reservation Details</h2>
        <p className="text-gray-600 mb-1">Pleased dadasdsadsa d sa sadsa sad .</p>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-500 mr-1"></div>
          <span className="text-blue-500">Reserved</span>
        </div>
      </div>    
      
      <div className="bg-white p-1 rounded-lg shadow-md border-t-2 border-green-500 w-48 h-48 overflow-hidden">
        <h2 className="text-lg font-bold mb-1">Another Box</h2>
        <p className="text-gray-600 mb-1">This is a .</p>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 mr-1"></div>
          <span className="text-green-500">Some Status</span>
        </div>
      </div>
      

    </div>
  );
}



