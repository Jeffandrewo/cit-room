'use client'
import { db } from "@/firebase";
import { Button, TextField } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp, updateDoc, query, getDocs } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { InfoContextEvent } from "../addingEvent/InfoContextEvent";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const InfoFormEvent = () => {

  const inputAreaRef = useRef();
  let docRef;

  
  const {showAlert, infoAddEvent, setinfoAddEvent} = useContext(InfoContextEvent);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventCount, setEventCount] = useState(0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setinfoAddEvent({ ...infoAddEvent, date: date.format('YYYY-MM-DD') }); // Format the date as needed
  };

  useEffect(() => {
    const fetchEventCount = async () => {
      const eventCollectionRef = collection(db, "addevent");
      const eventQuery = query(eventCollectionRef);
      const eventSnapshot = await getDocs(eventQuery);
      const count = eventSnapshot.size;
      setEventCount(count);
    };
    fetchEventCount();
  }, []);
  
  const onSubmit = async () => {
    const currentDate = new Date(); // Get the current date

  if (selectedDate && selectedDate < currentDate) {
    // Date is not current or future
    showAlert('error', 'Please select a future date.');
    return;
  }
   // Check if the event count is already 5
   if (eventCount >= 5) {
    showAlert('error', 'Only 5 events can be added.');
    return;
  }

    if (infoAddEvent?.hasOwnProperty('timestamp')){
      // update
      docRef = doc(db, "addevent", infoAddEvent.id);
      const infoUpdated = { ...infoAddEvent, timestamp: serverTimestamp() }
      updateDoc(docRef, infoUpdated)
      setinfoAddEvent({
        name: '', 
        date: '', 
        location: '', 
        organizer: ''
      });
      showAlert('success', `Information Event with id ${infoAddEvent.id} is updated successfully`);
    } else {
      const collectionRef = collection(db, "addevent");
      try {
        docRef = await addDoc(collectionRef, { ...infoAddEvent, timestamp: serverTimestamp() });
        console.log('Firestore Write Success:', docRef.id);
        showAlert('success', `Information Event with id ${docRef.id} is added successfully`);
        setinfoAddEvent({
          name: '', 
          date: '', 
          location: '', 
          organizer: ''
        });
      } catch (error) {
        console.error('Firestore Write Error:', error);
      }
    }
  }
  
  const clearFields = () => {
    setinfoAddEvent({
      name: '', 
      date: '', 
      location: '', 
      organizer: ''
    });
  };

  return (
    <div ref={inputAreaRef}>
      
      <TextField fullWidth label="EventName" margin="normal"
        value={infoAddEvent.name}
        onChange={e => setinfoAddEvent({...infoAddEvent,name:e.target.value})}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Date"
          value={selectedDate}
          onChange={handleDateChange}
          textField={(props) => <TextField {...props} />}
        />
      </LocalizationProvider>
      <TextField fullWidth label="Location" margin="normal"
        value={infoAddEvent.location}
        onChange={e => setinfoAddEvent({...infoAddEvent,location:e.target.value})}
      />
      <TextField fullWidth label="Organizer" margin="normal"
        value={infoAddEvent.organizer}
        onChange={e => setinfoAddEvent({...infoAddEvent,organizer:e.target.value})}
      />
     
     <div style={{ marginTop: "1rem" }}>
        <Button onClick={onSubmit} variant="contained" style={{ marginRight: "1rem" }}>
          {infoAddEvent.hasOwnProperty('timestamp') ? 'Update Event information' : 'Add Event information'}
        </Button>
        <Button onClick={clearFields} variant="contained" color="secondary">
        Clear All Fields
      </Button>
      </div>
    </div>
  );
};

export default InfoFormEvent;