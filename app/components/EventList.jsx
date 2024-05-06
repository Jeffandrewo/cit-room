import React, { useState, useEffect } from 'react';
import { db } from "@/firebase";
import { collection, query, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import moment from "moment";


function EventList() {
  const [approvedEvents, setApprovedEvents] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "approvedEvents");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setApprovedEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);
  

  return (
    <>
      <h2 style={{ fontWeight: 'bold' }}>Approved Events</h2>
      <div className="flex flex-wrap justify-start max-w-screen-xl mx-auto">
        {approvedEvents.map((event) => (
          <div key={event.id} className="card p-3 m-2 border border-gray-300 rounded-md" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontWeight: 'bold' }}>{event.name}</h3>
            <p><strong>Date:</strong> {moment(event.date).format("MMMM DD, YYYY")}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Organizer:</strong> {event.organizer}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default EventList;
