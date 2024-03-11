import Image from 'next/image';

export default function Home() {
  return (
    <div className="bg-white">
      <div className="min-h-[60vh] max-w-6xl mx-auto grid md:grid-cols-2 px-6">
        <div className="flex flex-col justify-center text-white font-bold">
          <p className="text-4xl w-full text-center mb-3 max-w-md mx-auto" style={{ color: '#010101' }}>
            Stay in the Know. Stay Updated. 
          </p>
          <p className="text-2xl w-full text-center" style={{ color: '#79CFDC' }}>
            Your room status at a glance!
          </p>
        </div>
        <div className="flex items-center justify-center md:justify-end">
          <div className="w-96 h-72 relative">
            <Image src="/assets/image/home/GLE-building.png" alt="Building" layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>
      <div className="h-24 bg-gradient-to-b from-[#ffffff] to-[#79CFDC]"></div>
    </div>
  );
}
