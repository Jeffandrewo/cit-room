'use client'
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import NGE from "/app/buildings/NGE.jsx";
import Test from "/app/buildings/Test.jsx";


export default function Home() {
  return (
    <div>
      <NGE/>
      <Test/>
    </div>
  );
}
  
