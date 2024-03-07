'use client'
import React, { useState } from "react";
import Modal from "../components/Modal";
import styles from "../buildings/NGE.module.css";



function Floor1({ roomsData }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="flex flex-wrap justify-center text-center">
      <div className="w-full mt-4">
        <h1>FLOOR1</h1>
      </div>
      {roomsData.map((room, index) => (
        <button key={index} className="bg-white p-1 m-2 rounded-lg shadow-md border-t-2 border-green-500 w-48 h-48 overflow-hidden"
          onClick={() => setShowModal(true)}>
          <h2 className="text-lg font-bold mb-1">ROOM {101 + index}</h2>
          <p className="text-gray-600 mb-1">TEACHER: {room.teacher}</p>
          <div className="items-center">
            <div className="w-48 h-2 bg-blue-500 mr-1"></div>
            <span className="text-blue-500">{room.otherData}</span>
            
          </div>
        </button>
  
      ))}
      <Modal isVisible={showModal} onClose={() =>
      setShowModal(false)}>
        <div>
        <h2 className="text-base mt-2 mx-4 text-gray-400 font-semibold text-center">
            Room #: (Put number here) <br/>
            Teacher: (Name here) <br/>
            Section: (Section here) <br/>
            Time: (Time Here) <br/>
          </h2>
        </div>
      </Modal>
    </div>
  );
}
function Floor2({ roomsData }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="flex flex-wrap justify-center text-center">
      <div className="w-full mt-4">
        <h1>FLOOR2</h1>
      </div>
      {roomsData.map((room, index) => (
        <button key={index} className="bg-white p-1 m-2 rounded-lg shadow-md border-t-2 border-green-500 w-48 h-48 overflow-hidden"
          onClick={() => setShowModal(true)}>
          <h2 className="text-lg font-bold mb-1">ROOM { + index}</h2>
          <p className="text-gray-600 mb-1">TEACHER: {room.teacher}</p>
          <div className="items-center">
            <div className="w-48 h-2 bg-blue-500 mr-1"></div>
            <span className="text-blue-500">{room.otherData}</span>
            
          </div>
        </button>
  
      ))}
      <Modal isVisible={showModal} onClose={() =>
      setShowModal(false)}>
        <div>
        <h2 className="text-base mt-2 mx-4 text-gray-400 font-semibold text-center">
            Room #: (Put number here) <br/>
            Teacher: (Name here) <br/>
            Section: (Section here) <br/>
            Time: (Time Here) <br/>
          </h2>
        </div>
      </Modal>
    </div>
  );
}
function Floor3({ roomsData }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="flex flex-wrap justify-center text-center">
      <div className="w-full mt-4">
        <h1>FLOOR3</h1>
      </div>
      {roomsData.map((room, index) => (
        <button key={index} className="bg-white p-1 m-2 rounded-lg shadow-md border-t-2 border-green-500 w-48 h-48 overflow-hidden"
          onClick={() => setShowModal(true)}>
          <h2 className="text-lg font-bold mb-1">ROOM {301 + index}</h2>
          <p className="text-gray-600 mb-1">TEACHER: {room.teacher}</p>
          <div className="items-center">
            <div className="w-48 h-2 bg-blue-500 mr-1"></div>
            <span className="text-blue-500">{room.otherData}</span>
            
          </div>
        </button>
  
      ))}
      <Modal isVisible={showModal} onClose={() =>
      setShowModal(false)}>
        <div>
        <h2 className="text-base mt-2 mx-4 text-gray-400 font-semibold text-center">
            Room #: (Put number here) <br/>
            Teacher: (Name here) <br/>
            Section: (Section here) <br/>
            Time: (Time Here) <br/>
          </h2>
        </div>
      </Modal>
    </div>
  );
}
function Floor4({ roomsData }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="flex flex-wrap justify-center text-center">
      <div className="w-full mt-4">
        <h1>FLOOR4</h1>
      </div>
      {roomsData.map((room, index) => (
        <button key={index} className="bg-white p-1 m-2 rounded-lg shadow-md border-t-2 border-green-500 w-48 h-48 overflow-hidden"
          onClick={() => setShowModal(true)}>
          <h2 className="text-lg font-bold mb-1">ROOM {401 + index}</h2>
          <p className="text-gray-600 mb-1">TEACHER: {room.teacher}</p>
          <div className="items-center">
            <div className="w-48 h-2 bg-blue-500 mr-1"></div>
            <span className="text-blue-500">{room.otherData}</span>
            
          </div>
        </button>
  
      ))}
      <Modal isVisible={showModal} onClose={() =>
      setShowModal(false)}>
        <div>
        <h2 className="text-base mt-2 mx-4 text-gray-400 font-semibold text-center">
            Room #: (Put number here) <br/>
            Teacher: (Name here) <br/>
            Section: (Section here) <br/>
            Time: (Time Here) <br/>
          </h2>
        </div>
      </Modal>
    </div>
  );
}
function Floor5({ roomsData }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="flex flex-wrap justify-center text-center">
      <div className="w-full mt-4">
        <h1>FLOOR5</h1>
      </div>
      {roomsData.map((room, index) => (
        <button key={index} className="bg-white p-1 m-2 rounded-lg shadow-md border-t-2 border-green-500 w-48 h-48 overflow-hidden"
          onClick={() => setShowModal(true)}>
          <h2 className="text-lg font-bold mb-1">ROOM {501 + index}</h2>
          <p className="text-gray-600 mb-1">TEACHER: {room.teacher}</p>
          <div className="items-center">
            <div className="w-48 h-2 bg-blue-500 mr-1"></div>
            <span className="text-blue-500">{room.otherData}</span>
            
          </div>
        </button>
  
      ))}
      <Modal isVisible={showModal} onClose={() =>
      setShowModal(false)}>
        <div>
        <h2 className="text-base mt-2 mx-4 text-gray-400 font-semibold text-center">
            Room #: (Put number here) <br/>
            Teacher: (Name here) <br/>
            Section: (Section here) <br/>
            Time: (Time Here) <br/>
          </h2>
        </div>
      </Modal>
    </div>
  );
}
function Floor6({ roomsData }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="flex flex-wrap justify-center text-center">
      <div className="w-full mt-4">
        <h1>FLOOR6</h1>
      </div>
      {roomsData.map((room, index) => (
        <button key={index} className="bg-white p-1 m-2 rounded-lg shadow-md border-t-2 border-green-500 w-48 h-48 overflow-hidden"
          onClick={() => setShowModal(true)}>
          <h2 className="text-lg font-bold mb-1">ROOM {601 + index}</h2>
          <p className="text-gray-600 mb-1">TEACHER: {room.teacher}</p>
          <div className="items-center">
            <div className="w-48 h-2 bg-blue-500 mr-1"></div>
            <span className="text-blue-500">{room.otherData}</span>
            
          </div>
        </button>
  
      ))}
      <Modal isVisible={showModal} onClose={() =>
      setShowModal(false)}>
        <div>
        <h2 className="text-base mt-2 mx-4 text-gray-400 font-semibold text-center">
            Room #: (Put number here) <br/>
            Teacher: (Name here) <br/>
            Section: (Section here) <br/>
            Time: (Time Here) <br/>
          </h2>
        </div>
      </Modal>
    </div>
  );
}
function Floor7({ roomsData }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="flex flex-wrap justify-center text-center">
      <div className="w-full mt-4">
        <h1>FLOOR7</h1>
      </div>
      {roomsData.map((room, index) => (
        <button key={index} className={styles.room}
          onClick={() => setShowModal(true)}>
          <h2 className="text-lg font-bold mb-1">ROOM {701 + index}</h2>
          <p className="text-gray-600 mb-1">TEACHER: {room.teacher}</p>
          <div className="items-center">
            <div className="w-48 h-2 bg-blue-500 mr-1"></div>
            <span className="text-blue-500">{room.otherData}</span>
            
          </div>
        </button>
  
      ))}
      <Modal isVisible={showModal} onClose={() =>
      setShowModal(false)}>
        <div>
        <h2 className="text-base mt-2 mx-4 text-gray-400 font-semibold text-center">
            Room #: (Put number here) <br/>
            Teacher: (Name here) <br/>
            Section: (Section here) <br/>
            Time: (Time Here) <br/>
          </h2>
        </div>
      </Modal>
    </div>
  );
}
function Floor8({ roomsData }) {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="flex flex-wrap justify-center text-center">
      <div className="w-full mt-4">
        <h1>FLOOR8</h1>
      </div>
      {roomsData.map((room, index) => (
        <button key={index} className={styles.room}
          onClick={() => setShowModal(true)}>
          <h2 className="text-lg font-bold mb-1">ROOM {801 + index}</h2>
          <p className="text-gray-600 mb-1">TEACHER: {room.teacher}</p>
          <div className="items-center">
            <div className="w-48 h-2 bg-blue-500 mr-1"></div>
            <span className="text-blue-500">{room.otherData}</span>
            
          </div>
        </button>
  
      ))}
      <Modal isVisible={showModal} onClose={() =>
      setShowModal(false)}>
        <div>
        <h2 className="text-base my-10 mx-10 p-10 text-gray-400 font-semibold text-left">
            Room #: (Put number here) <br/>
            Teacher: (Name here) <br/>
            Section: (Section here) <br/>
            Time: (Time Here) <br/>
          </h2>
        </div>
      </Modal>
    </div>
  );
}
const roomsData8 = [
  { teacher: 'John Doe', otherData: 'Some info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  // Add more room data objects as needed
];
const roomsData7 = [
  { teacher: 'John Doe', otherData: 'Some info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  // Add more room data objects as needed
];
const roomsData6 = [
  { teacher: 'John Doe', otherData: 'Some info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  // Add more room data objects as needed
];
const roomsData5 = [
  { teacher: 'John Doe', otherData: 'Some info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  // Add more room data objects as needed
];
const roomsData4 = [
  { teacher: 'John Doe', otherData: 'Some info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  // Add more room data objects as needed
];
const roomsData3 = [
  { teacher: 'John Doe', otherData: 'Some info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  // Add more room data objects as needed
];
const roomsData2 = [
  { teacher: 'John Doe', otherData: 'Some info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  // Add more room data objects as needed
];
const roomsData1 = [
  { teacher: 'John Doe', otherData: 'Some info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  { teacher: 'Jane Smith', otherData: 'More info' },
  // Add more room data objects as needed
];
function App() {
  return(
  <div>
  <Floor8 roomsData={roomsData8} />
  <Floor7 roomsData={roomsData7} />
  <Floor6 roomsData={roomsData6} />
  <Floor5 roomsData={roomsData5} />
  <Floor4 roomsData={roomsData4} />
  <Floor3 roomsData={roomsData3} />
  <Floor2 roomsData={roomsData2} />
  <Floor1 roomsData={roomsData1} />
  </div>
  )
}
export default function NGE() {
    return (
      <div>
        <App/>
      </div>
     )
  }