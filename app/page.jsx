'use client'
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import NGE from "/app/buildings/NGE.jsx";
import F8 from "/app/buildings//NGE/Floor8.jsx";
import F7 from "/app/buildings//NGE/Floor7.jsx";
import F6 from "/app/buildings//NGE/Floor6.jsx";
import F5 from "/app/buildings//NGE/Floor5.jsx";
import F4 from "/app/buildings//NGE/Floor4.jsx";
import F3 from "/app/buildings//NGE/Floor3.jsx";
import F2 from "/app/buildings//NGE/Floor2.jsx";
import F1 from "/app/buildings//NGE/Floor1.jsx";


//<NGE/>
export default function Home() {
  return (
    <div>
      <F8/>
      <F7/>
      <F6/>
      <F5/>
      <F4/>
      <F3/>
      <F2/>
      <F1/>
    </div>
  );
}
  
