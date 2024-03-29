import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase"; // Import your firebase instance
import Modal from "../../components/Modal";
import styles from "../../buildings/NGE.module.css";
import DashboardPage from "../../dashboard/pageModal";
import { useUser } from "@clerk/nextjs";

function Floor1({ roomsData }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const { isSignedIn } = useUser();

  const openModal = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const toggleDashboard = (room) => {
    if (isSignedIn) {
      setSelectedRoom(room);
      setShowDashboard(!showDashboard);
    } else {
      console.log("User is not logged in."); // You can handle this case as needed
    }
  };

  const closeDashboard = () => {
    setShowDashboard(false);
  };

  // Calculate maximum height based on whether dashboard is open or not
  const getMaxHeight = () => {
    if (showDashboard) {
      return '80vh'; // Adjust as needed
    } else {
      return '50vh'; // Adjust as needed
    }
  };

  return (
    <div className="flex flex-wrap justify-center text-center">
      <div className="w-full mt-4">
        <h1>FLOOR 1</h1>
        </div>
      {roomsData.map((room, index) => (
        <button
          key={index}
          className={styles.room}
          onClick={() => openModal(room)}
        >
          <h2 className="text-lg font-bold mb-1">ROOM {room.roomNo}</h2>
          <p className="text-gray-600 mb-1">TEACHER: {room.teacherName}</p>
          <div className="items-center">
            <div className="w-50 h-2 bg-green-500 "></div>
            <span className="text-blue-500">{room.status}</span>
          </div>
        </button>
      ))}
      <Modal isVisible={showModal} onClose={() => setShowModal(false)} onCloseDashboard={closeDashboard}>
        <div className="modal-content" style={{ maxHeight: getMaxHeight(), overflowY: 'auto' }}>
          {showDashboard ? (
            <div>
              <DashboardPage onClose={() => setShowDashboard(false)} selectedRoom={selectedRoom} />
            </div>
          ) : (
            <div>
              <h2 className={styles.modal}>
                Room #: {selectedRoom?.roomNo} <br />
                Teacher: {selectedRoom?.teacherName} <br />
                Section: {selectedRoom?.classSection} <br />
                Time: {selectedRoom?.startTime} - {selectedRoom?.endTime} <br />
              </h2>
              <button onClick={() => toggleDashboard(selectedRoom)}>Update Info</button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

const F1 = () => {
  const [info, setInfo] = useState([]);
  
  useEffect(() => {
    const fetchRoomsData = async () => {
      try {
        const collectionRef = collection(db, "info");
        const q = query(collectionRef, orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const filteredInfo = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            timestamp: doc.data().timestamp?.toDate().getTime(),
          })).filter(room => room.roomNo >= 101 && room.roomNo <= 106); // Filter rooms 801 to 806
          setInfo(filteredInfo);
        });
        return unsubscribe;
      } catch (error) {
        console.error("Error fetching rooms data: ", error);
      }
    };

    fetchRoomsData();
  }, []);

  return (
    <div>
      <Floor1 roomsData={info} />
    </div>
  );
};

export default F1;