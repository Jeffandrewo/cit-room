'use client'
import { db } from "@/firebase";
import { Button, TextField } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp, updateDoc, query, where, getDocs } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { InfoContext } from "../dashboard/InfoContext";

const InfoForm = () => {

  const inputAreaRef = useRef();
  let docRef;

  
  const {showAlert, infoAdd, setinfoAdd} = useContext(InfoContext);
  const onSubmit = async () => {
    const { buildingName, classSection, floorNumber, roomNo, startTime, endTime, subjectNo, teacherName } = infoAdd;

  // Check if any of the fields are blank
    if (!buildingName || !classSection || !floorNumber || !roomNo || !startTime || !endTime || !subjectNo || !teacherName) {
      showAlert('error', 'Please fill in all fields.');
      return;
    }

    if (floorNumber < 1 || floorNumber > 8) {
      showAlert('error', 'Invalid floor number. Please enter a number between 1 and 8.');
      return;
    }

    // Check if room number already exists or floor is full
    const roomExists = await checkRoomExists(floorNumber, roomNo);
    if (roomExists) {
      showAlert('error', 'Room number already exists or floor is full.');
      return;
    }
    const floorPrefix = floorNumber.toString();
    if (!roomNo.startsWith(floorPrefix)) {
      showAlert('error', `Room number must start with ${floorPrefix} on floor ${floorNumber}.`);
      return;
    }
    if (floorNumber === '7' && !roomNo.startsWith('7')) {
      showAlert('error', 'Room number must start with 7 on floor 7.');
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
        teacherName: ''
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
      setinfoAdd
      ({ 
        buildingName: '', 
        classSection: '', 
        floorNumber: '', 
        roomNo: '', 
        startTime: '',
        endTime: '',
        subjectNo: '',
        teacherName: ''
      })
      showAlert('success', `Information with id ${docRef.id} is added successfully`);
    }

    

      

      
  }
   const checkRoomExists = async (floorNumber, roomNo) => {
    // Check if room number already exists
    const roomQuery = query(collection(db, 'info'), 
      where('floorNumber', '==', floorNumber), 
      where('roomNo', '==', roomNo)
    );
    const querySnapshot = await getDocs(roomQuery);
    return !querySnapshot.empty || querySnapshot.size >= 6; // Check if floor is full
  };

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!inputAreaRef.current.contains(e.target)) {
        console.log('Outside input area');
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
  }, []);
  return (
    <div ref={inputAreaRef}>
      
      <TextField fullWidth label="buildingName" margin="normal"
        value={infoAdd.buildingName}
        onChange={e => setinfoAdd({...infoAdd,buildingName:e.target.value})}
      />
      <TextField fullWidth label="classSection" margin="normal" 
        value={infoAdd.classSection}
        onChange={e => setinfoAdd({...infoAdd,classSection:e.target.value})}
      />
      <TextField fullWidth label="floorNumber" margin="normal" 
        value={infoAdd.floorNumber}
        onChange={e => setinfoAdd({...infoAdd,floorNumber:e.target.value})}
      />
      <TextField fullWidth label="roomNo" margin="normal" 
        value={infoAdd.roomNo}
        onChange={e => setinfoAdd({...infoAdd,roomNo:e.target.value})}
      />

      {/* Use type="time" for startTime */}
      <TextField
        fullWidth
        label="startTime"
        margin="normal"
        type="time"
        InputLabelProps={{
          shrink: true,
        }}
        value={infoAdd.startTime}
        onChange={e => setinfoAdd({...infoAdd,startTime:e.target.value})}
      />

      {/* Use type="time" for endTime */}
      <TextField
        fullWidth
        label="endTime"
        margin="normal"
        type="time"
        InputLabelProps={{
          shrink: true,
        }}
        value={infoAdd.endTime}
        onChange={e => setinfoAdd({...infoAdd,endTime:e.target.value})}
      />

      <TextField fullWidth label="subjectNo" margin="normal" 
        value={infoAdd.subjectNo}
        onChange={e => setinfoAdd({...infoAdd,subjectNo:e.target.value})}
      />
      <TextField fullWidth label="teacherName" margin="normal" 
        value={infoAdd.teacherName}
        onChange={e => setinfoAdd({...infoAdd,teacherName:e.target.value})}
      />

      <Button onClick={onSubmit} variant="contained" sx={{ mt: 3 }}>
        {infoAdd.hasOwnProperty('timestamp')?'Update information' : 'Add information'}
      </Button>
    </div>
  );
};

export default InfoForm;
