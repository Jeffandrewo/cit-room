import { db } from "@/firebase";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, where, getDocs, doc as firestoreDoc } from "firebase/firestore";
import moment from "moment";
import { Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from '@emailjs/browser';

function BookedEvents() {
  const [bookedEvents, setBookedEvents] = useState([]);
  const [approvedEvents, setApprovedEvents] = useState([]);
  

  useEffect(() => {
    const collectionRef = collection(db, "addevent");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const eventsData = querySnapshot.docs.map((snapshot) => ({ // Rename `doc` to `snapshot`
        id: snapshot.id, // Change `doc.id` to `snapshot.id`
        ...snapshot.data(), // Change `doc.data()` to `snapshot.data()`
      }));
      setBookedEvents(eventsData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const approvedEventsRef = collection(db, "approvedEvents");
    const unsubscribe = onSnapshot(approvedEventsRef, (querySnapshot) => {
      const approvedEventsData = querySnapshot.docs.map((snapshot) => ({
        id: snapshot.id,
        ...snapshot.data(),
      }));
      setApprovedEvents(approvedEventsData);
    });
  
    return () => unsubscribe();
  }, []);
  

  const handleApproveEvent = async (event) => {
    try {
      // Move the event to the approvedEvents collection
      const approvedEventsRef = collection(db, "approvedEvents");
      await addDoc(approvedEventsRef, event);
      console.log("Event approved and added to approvedEvents collection:", event);

       // Send email to organizer
      await sendEmailToOrganizer(event);
       // Display toast notification
       toast.success("Event approved and Email is sent successfully to organizer!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error approving event:", error);
     
    }
  };
  const sendEmailToOrganizer = async (event) => {
    try {

      const templateParams = {
        to_email:event.organizer,
        to_name: event.organizer,
        from_name: 'CIT ROOM CHECKER',
        name: event.name,
        date: new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        location: event.location,
        organizer: event.organizer,
      };
  
      await emailjs.send('service_9o8ufkn', 'template_fwvq0bu', templateParams, 'iFoNywhASF6N8NXbE');
  
      console.log('Email sent successfully to organizer!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
  const handleCancelEvent = async (event) => {
    try {
      const shouldDelete = window.confirm("Are you sure you want to cancel this event?");
      if (!shouldDelete) {
        return; // Do nothing if user cancels the delete operation
      }
  
      const addeventRef = firestoreDoc(db, "addevent", event.id); // Rename `doc` to `firestoreDoc`
      await deleteDoc(addeventRef);
      console.log("Event canceled and deleted from addevent collection:", event);
  
      const approvedEventsRef = collection(db, "approvedEvents");
      const q = query(approvedEventsRef, where("id", "==", event.id));
      const querySnapshot = await getDocs(q);
  
      // Delete referenced events in approvedEvents collection
      querySnapshot.forEach(async (snapshot) => { // Rename `doc` to `snapshot`
        const approvedEventRef = firestoreDoc(db, "approvedEvents", snapshot.id); // Rename `doc` to `firestoreDoc`
        await deleteDoc(approvedEventRef);
        console.log("Referenced event deleted from approvedEvents collection:", snapshot.data());
      });
  
      // Update approvedEvents state after deletion
      const updatedApprovedEvents = approvedEvents.filter((e) => e.id !== event.id);
      setApprovedEvents(updatedApprovedEvents);
      // Send email notification to organizer
    await sendCancelEmailToOrganizer(event);

    // Display success toast notification
    toast.success(`Event "${event.name}" canceled and email sent to organizer.`, {
      position: "top-right",
      autoClose: 3000,
    });
    } catch (error) {
      console.error("Error canceling event:", error);
    }
  };
  const sendCancelEmailToOrganizer = async (event) => {
    try {
      const templateParams = {
        to_email:event.organizer,
        to_name: event.organizer,
        from_name: 'CIT ROOM CHECKER',
        name: event.name,
        date: new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
        location: event.location,
        organizer: event.organizer,
      };
  
      await emailjs.send('service_9o8ufkn', 'template_epd692e', templateParams, 'iFoNywhASF6N8NXbE');
  
      console.log('Email sent successfully to organizer for event cancellation!');
    } catch (error) {
      console.error('Error sending email for event cancellation:', error);
    }
  };
  

  return (
    <div className="flex flex-wrap justify-start max-w-screen-xl mx-auto">
    {bookedEvents.map((event) => (
  <div key={event.id} className="card p-3 m-2 border border-gray-300 rounded-md">
    <h3 style={{ fontWeight: 'bold' }}>{event.name}</h3>
    <p><strong>Date:</strong> {moment(event.date).format("MMMM DD, YYYY")}</p>
    <p><strong>Location:</strong> {event.location}</p>
    <p><strong>Organizer:</strong> {event.organizer}</p>
    <div className="flex justify-center">
      <Button
        variant="contained"
        style={{ marginRight: "1rem" }}
        onClick={() => handleApproveEvent(event)}
        disabled={approvedEvents.some((approvedEvent) => approvedEvent.id === event.id)}
      >
        Approve Event
      </Button>
      <Button variant="contained" color="secondary" onClick={() => handleCancelEvent(event)}>
        Cancel Event
      </Button>
    </div>
  </div>
))}

      <ToastContainer />
    </div>
  );
}

export default BookedEvents;