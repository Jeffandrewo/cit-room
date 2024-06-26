'use client'
import { db } from "@/firebase";
import { Button, TextField, FormControl, Select, InputLabel, MenuItem } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp, updateDoc, query, where, getDocs } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { InfoContext } from "../dashboard/InfoContext";

const InfoForm = ({ selectedRoom }) => {

  const inputAreaRef = useRef();
  let docRef;

  const { showAlert } = useContext(InfoContext);
  const [infoAdd, setinfoAdd] = useState({
    id: selectedRoom?.id || '', // Ensure you have the document ID if you're updating
    buildingName: selectedRoom?.buildingName || '',
    classSection: selectedRoom?.classSection || '',
    floorNumber: selectedRoom?.floorNumber || '',
    roomNo: selectedRoom?.roomNo || '',
    startTime: selectedRoom?.startTime || '',
    endTime: selectedRoom?.endTime || '',
    subjectNo: selectedRoom?.subjectNo || '',
    teacherName: selectedRoom?.teacherName || '',
    day:selectedRoom?.day || '',
    status:selectedRoom?.status || '',
    timestamp: selectedRoom?.timestamp || null // Ensure you have the timestamp if you're updating
  });

  const onSubmit = async () => {
    const { id, buildingName, classSection, floorNumber, roomNo, startTime, endTime, subjectNo, teacherName, day, status } = infoAdd;

    /*if (id) {
      // If ID exists, it means we're updating an existing document
      docRef = doc(db, "info", id);
      const infoUpdated = { ...infoAdd, timestamp: serverTimestamp() };
      await updateDoc(docRef, infoUpdated);
      showAlert('success', `Information with id ${id} is updated successfully`);
    } else {
      // If ID doesn't exist, you might want to handle this case
      showAlert('error', 'Cannot update information without an ID.');
    }*/
    if (!buildingName || !classSection || !floorNumber || !roomNo || !startTime || !endTime || !subjectNo || !teacherName || !day || !status) {
      showAlert('error', 'Please fill in all fields.');
      return;
    }
    if (floorNumber < 1 || floorNumber > 8) {
      showAlert('error', 'Invalid floor number. Please enter a number between 1 and 8.');
      return;
    }
    const floorPrefix = floorNumber.toString();
    if (!roomNo.startsWith(floorPrefix)) {
    showAlert('error', `Room number must start with ${floorPrefix} on floor ${floorNumber}.`);
    return;
    }
    if ((floorPrefix === '1' && (roomNo < 101 || roomNo > 108)) ||
        (floorPrefix === '2' && (roomNo < 201 || roomNo > 208)) ||
        (floorPrefix === '3' && (roomNo < 301 || roomNo > 308)) ||
        (floorPrefix === '4' && (roomNo < 401 || roomNo > 408)) ||
        (floorPrefix === '5' && (roomNo < 501 || roomNo > 508)) ||
        (floorPrefix === '6' && (roomNo < 601 || roomNo > 608)) ||
        (floorPrefix === '7' && (roomNo < 701 || roomNo > 708)) ||
        (floorPrefix === '8' && (roomNo < 801 || roomNo > 808))) 
    {
      showAlert('error', `Room number must be between ${floorNumber}01 and ${floorNumber}08`);
      return;
    }

    try {
      // If ID exists, it means we're updating an existing document
      if (id) {
        docRef = doc(db, "info", id);
        const infoUpdated = { ...infoAdd, timestamp: serverTimestamp() };
        await updateDoc(docRef, infoUpdated);
        showAlert('success', `Information with id ${id} is updated successfully`);
      } else {
        // If ID doesn't exist, it means we're adding a new document
        if (selectedRoom?.status === "Available") {
          // Create a new document only if the selected room is a placeholder
          const collectionRef = collection(db, "info");
          docRef = await addDoc(collectionRef, { ...infoAdd, timestamp: serverTimestamp() });
          console.log('Firestore Write Success:', docRef.id);
          showAlert('success', `Information with id ${docRef.id} is added successfully`);
        } else {
          showAlert('error', 'Cannot update information without an ID.');
        }
      }
    } catch (error) {
      console.error('Firestore Write Error:', error);
      showAlert('error', 'An error occurred while processing your request.');
    }
  }

  /*useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        ('Outside input area');
        setinfoAdd({
          buildingName: '',
          classSection: '',
          floorNumber: '',
          roomNo: '',
          startTime: '',
          endTime: '',
          subjectNo: '',
          teacherName: ''
        });
      } else {
        console.log('Inside input area');
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, []);*/

  return (
    <div ref={inputAreaRef}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="buildingName-label">Building Name</InputLabel>
        <Select
          labelId="buildingName-label"
          id="buildingName"
          value={infoAdd.buildingName}
          onChange={(e) => setinfoAdd({ ...infoAdd, buildingName: e.target.value })}
          label="Building Name"
          style={{ color: 'black' }}
        >
          <MenuItem value="NGE" style={{ color: 'black' }}>NGE</MenuItem>
          <MenuItem value="GLE" style={{ color: 'black' }}>GLE</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="classSection"
        margin="normal"
        value={infoAdd.classSection}
        onChange={(e) => setinfoAdd({ ...infoAdd, classSection: e.target.value })}
        style={{ color: 'black' }}
      />
      <TextField
        fullWidth
        label="roomNo"
        margin="normal"
        value={infoAdd.roomNo}
        onChange={(e) => setinfoAdd({ ...infoAdd, roomNo: e.target.value })}
        style={{ color: 'black' }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="floorNumber-label">Floor Number</InputLabel>
        <Select
          labelId="floorNumber-label"
          id="floorNumber"
          value={infoAdd.floorNumber}
          onChange={(e) => setinfoAdd({ ...infoAdd, floorNumber: e.target.value })}
          label="Floor Number"
          style={{ color: 'black' }}
        >
          {[...Array(8).keys()].map((num) => (
            <MenuItem key={num + 1} value={(num + 1).toString()}>
              {(num + 1).toString()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="day-label">Day</InputLabel>
        <Select
          labelId="day-label"
          id="day"
          value={infoAdd.day}
          onChange={(e) => setinfoAdd({ ...infoAdd, day: e.target.value })}
          label="Day"
          style={{ color: 'black' }}
        >
          <MenuItem value="Monday" style={{ color: 'black' }}>Monday</MenuItem>
          <MenuItem value="Tuesday" style={{ color: 'black' }}>Tuesday</MenuItem>
          <MenuItem value="Wednesday" style={{ color: 'black' }}>Wednesday</MenuItem>
          <MenuItem value="Thursday" style={{ color: 'black' }}>Thursday</MenuItem>
          <MenuItem value="Friday" style={{ color: 'black' }}>Friday</MenuItem>
          <MenuItem value="Saturday" style={{ color: 'black' }}>Saturday</MenuItem>
          <MenuItem value="Sunday" style={{ color: 'black' }}>Sunday</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="startTime"
        margin="normal"
        type="time"
        InputLabelProps={{
          shrink: true,
        }}
        value={infoAdd.startTime}
        onChange={(e) => setinfoAdd({ ...infoAdd, startTime: e.target.value })}
        style={{ color: 'black' }}
      />
      <TextField
        fullWidth
        label="endTime"
        margin="normal"
        type="time"
        InputLabelProps={{
          shrink: true,
        }}
        value={infoAdd.endTime}
        onChange={(e) => setinfoAdd({ ...infoAdd, endTime: e.target.value })}
        style={{ color: 'black' }}
      />
      <TextField
        fullWidth
        label="subjectNo"
        margin="normal"
        value={infoAdd.subjectNo}
        onChange={(e) => setinfoAdd({ ...infoAdd, subjectNo: e.target.value })}
        style={{ color: 'black' }}
      />
      <TextField
        fullWidth
        label="teacherName"
        margin="normal"
        value={infoAdd.teacherName}
        onChange={(e) => setinfoAdd({ ...infoAdd, teacherName: e.target.value })}
        style={{ color: 'black' }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          value={infoAdd.status}
          onChange={(e) => setinfoAdd({ ...infoAdd, status: e.target.value })}
          label="Status"
          style={{ color: 'black' }}
        >
          <MenuItem value="In-use" style={{ color: 'black' }}>In-use</MenuItem>
          <MenuItem value="Available" style={{ color: 'black' }}>Available</MenuItem>
        </Select>
      </FormControl>

      <Button
  onClick={onSubmit}
  variant="contained"
  sx={{ mt: 3 }}
  style={{ color: 'black', backgroundColor: 'blue' }}
>
  Update Information
</Button>

    </div>
  );
};

export default InfoForm;