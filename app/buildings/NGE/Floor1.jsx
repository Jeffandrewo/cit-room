import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase"; // Import your firebase instance
import Modal from "../../components/Modal";
import styles from "../../buildings/NGE.module.css";
import DashboardPage from "../../dashboard/pageModal";
import { useUser } from "@clerk/nextjs";

const mapDayToIndex = (dayName) => {
  const daysMap = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  return daysMap[dayName];
};

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
          style={{ order: parseInt(room.roomNo) }}
          onClick={() => openModal(room)}
        >
          <h2 className="text-lg font-bold mb-1">ROOM {room.roomNo}</h2>
          <p className="text-gray-600 mb-1">TEACHER: {room.teacherName}</p>
          <p className="text-gray-600 mb-1">Subject: {room.subjectNo}</p>
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
                Building Name: {selectedRoom?.buildingName} <br />
                Floor: {selectedRoom?.floorNumber} <br />
                Room #: {selectedRoom?.roomNo} <br />
                Teacher: {selectedRoom?.teacherName} <br />
                Section: {selectedRoom?.classSection} <br />
                Subject: {selectedRoom?.subjectNo} <br />
                Day: {selectedRoom?.day} <br />
                Status: {selectedRoom?.status} <br />
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
          const currentTime = new Date(); // Current date and time
    
          // Initialize an array to store the rooms that fulfill the condition
          const roomsFulfillingCondition = [];
    
          // Map rooms that fulfill the condition (start time and end time within current time)
          querySnapshot.docs.forEach(doc => {
            const room = {
              ...doc.data(),
              id: doc.id,
              timestamp: doc.data().timestamp?.toDate().getTime(),
            };
            
            const currentDay = mapDayToIndex(currentTime.toLocaleDateString('en-US', { weekday: 'long' }));
            const currentHour = currentTime.getHours();
            const currentMinute = currentTime.getMinutes();
            const startTimeParts = room.startTime.split(":");
            const endTimeParts = room.endTime.split(":");
            
            
            // Convert start and end time from Firebase to hours and minutes
            const startHour = parseInt(startTimeParts[0], 10);
            const startMinute = parseInt(startTimeParts[1], 10);
            const endHour = parseInt(endTimeParts[0], 10);
            const endMinute = parseInt(endTimeParts[1], 10);
            
    
            // Check if current time is within the range of start and end time
          /*if (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) {
              if (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute)) {
                roomsFulfillingCondition.push(room);
              }
            }
          });*/
          if (
            currentDay === mapDayToIndex(room.day) && // Map room day to index using mapDayToIndex
            (currentHour > startHour || (currentHour === startHour && currentMinute >= startMinute)) &&
            (currentHour < endHour || (currentHour === endHour && currentMinute <= endMinute))
          ) {
            roomsFulfillingCondition.push(room); // Add the room to the list of rooms fulfilling the condition
          }
        });

        // Filter rooms to only include those with room numbers 101 to 106
          const filteredRooms = roomsFulfillingCondition.filter(room => {
          const roomNo = parseInt(room.roomNo);
          return roomNo >= 101 && roomNo <= 106;
          });
    
          // Initialize an array to store the placeholders for rooms that do not fulfill the condition
          const placeholders = [];
    
          // Check for each room number if it fulfills the condition, if not, add a placeholder
          for (let i = 101; i <= 106; i++) {
            const roomExists = roomsFulfillingCondition.some(room => room.roomNo === i.toString());
            if (!roomExists) {
              placeholders.push({
                roomNo: i.toString(),
                teacherName: "N/A",
                classSection: "N/A",
                subjectNo: "N/A",
                classSection: "N/A",
                startTime: "N/A",
                endTime: "N/A",
                day: "N/A",
                status: "Available"
              });
            }
          }
          
          // Combine rooms fulfilling the condition with placeholders
          //const filteredInfo = [...roomsFulfillingCondition, ...placeholders];
          const filteredInfo = [...filteredRooms, ...placeholders];
          filteredInfo.sort((a, b) => parseInt(a.roomNo) - parseInt(b.roomNo));
    
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