'use client'
import { db } from "@/firebase";
import { Button, TextField } from "@mui/material";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { InfoContext } from "../dashboard/InfoContext";

const InfoForm = () => {

  const inputAreaRef = useRef();
  let docRef;

  
  const {showAlert, infoAdd, setinfoAdd} = useContext(InfoContext);
  const onSubmit = async () => {
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
