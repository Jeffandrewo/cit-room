'use client'
import { db } from "@/firebase";
import { Button, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp, updateDoc, query, where, getDocs } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { InfoContext } from "../dashboard/InfoContext";



const InfoForm = () => {

  const inputAreaRef = useRef();
  let docRef;

  
  const {showAlert, infoAdd, setinfoAdd} = useContext(InfoContext);
  
  const onSubmit = async () => {
    const { buildingName, classSection, floorNumber, roomNo, startTime, endTime, subjectNo, teacherName, day, status } = infoAdd;

  // Check if any of the fields are blank
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



    if (infoAdd?.hasOwnProperty('timestamp')){
      // update
      docRef = doc(db, "info", infoAdd.id);
      const infoUpdated = { ...infoAdd, timestamp: serverTimestamp() }
      updateDoc(docRef, infoUpdated)
      setinfoAdd
      ({ 
        buildingName: '', 
        classSection: '', 
        floorNumber: '', 
        roomNo: '', 
        startTime: '',
        endTime: '',
        subjectNo: '',
        teacherName: '',
        day: '',
        status: ''
      })
      showAlert('success', `Information with id ${docRef.id} is updated successfully`);

    }else{
      const collectionRef = collection(db, "info");
      try {
        docRef = await addDoc(collectionRef, { ...infoAdd, timestamp: serverTimestamp() });
        console.log('Firestore Write Success:', docRef.id);
      } catch (error) {
        console.error('Firestore Write Error:', error);
    
      }
      showAlert('success', `Information with id ${docRef.id} is added successfully`);
    }
  }
  const clearFields = () => {
    setinfoAdd({
      buildingName: "",
      classSection: "",
      floorNumber: "",
      roomNo: "",
      startTime: "",
      endTime: "",
      subjectNo: "",
      teacherName: "",
      day: "",
      status: "",
    });
  };
   
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
        >
          <MenuItem value="NGE">NGE</MenuItem>
          <MenuItem value="GLE">GLE</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="classSection"
        margin="normal"
        value={infoAdd.classSection}
        onChange={(e) => setinfoAdd({ ...infoAdd, classSection: e.target.value })}
      />
      <TextField
        fullWidth
        label="roomNo"
        margin="normal"
        value={infoAdd.roomNo}
        onChange={(e) => setinfoAdd({ ...infoAdd, roomNo: e.target.value })}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="floorNumber-label">Floor Number</InputLabel>
        <Select
          labelId="floorNumber-label"
          id="floorNumber"
          value={infoAdd.floorNumber}
          onChange={(e) => setinfoAdd({ ...infoAdd, floorNumber: e.target.value })}
          label="Floor Number"
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
        >
          <MenuItem value="Monday">Monday</MenuItem>
          <MenuItem value="Tuesday">Tuesday</MenuItem>
          <MenuItem value="Wednesday">Wednesday</MenuItem>
          <MenuItem value="Thursday">Thursday</MenuItem>
          <MenuItem value="Friday">Friday</MenuItem>
          <MenuItem value="Saturday">Saturday</MenuItem>
          <MenuItem value="Sunday">Sunday</MenuItem>
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
      />
      <TextField
        fullWidth
        label="subjectNo"
        margin="normal"
        value={infoAdd.subjectNo}
        onChange={(e) => setinfoAdd({ ...infoAdd, subjectNo: e.target.value })}
      />
      <TextField
        fullWidth
        label="teacherName"
        margin="normal"
        value={infoAdd.teacherName}
        onChange={(e) => setinfoAdd({ ...infoAdd, teacherName: e.target.value })}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          value={infoAdd.status}
          onChange={(e) => setinfoAdd({ ...infoAdd, status: e.target.value })}
          label="Status"
        >
          <MenuItem value="In-use">In-use</MenuItem>
          <MenuItem value="Available">Available</MenuItem>
        </Select>
      </FormControl>
      <div style={{ marginTop: "1rem" }}>
        <Button onClick={onSubmit} variant="contained" style={{ marginRight: "1rem" }}>
          {infoAdd.hasOwnProperty('timestamp') ? 'Update information' : 'Add information'}
        </Button>
        <Button onClick={clearFields} variant="contained" color="secondary">
        Clear All Fields
      </Button>
      </div>
    </div>
  );
};

export default InfoForm;