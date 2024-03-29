'use client'
import { UserButton } from "@clerk/nextjs"
import { Alert, Container, Snackbar } from "@mui/material"
import Information from "../components/InformationModal"
import InfoForm from "../components/InfoFormModal"
import { useState } from "react"
import { InfoContext } from "./InfoContext"


const DashboardPage = ({ selectedRoom }) => {
  //console.log("Selected Room:", selectedRoom);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [ infoAdd, setinfoAdd ] = useState 
  ({ 
    buildingName: '', 
    classSection: '', 
    floorNumber: '', 
    roomNo: '', 
    startTime: '',
    endTime: '',
    subjectNo: '',
    teacherName: ''
  });
  const showAlert = (type, msg) =>{
    setAlertType(type);
    setAlertMessage(msg);
    setOpen(true);
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  

  return (
    <InfoContext.Provider value={{showAlert, infoAdd, setinfoAdd}}>
      <Container>
      <p>ROOM: {selectedRoom.roomNo}</p>
      <InfoForm selectedRoom={selectedRoom}/>
      <Snackbar 
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertType}
          variant="filled"
          sx={{ width: '100%' }}
        >
        {alertMessage}
        </Alert>
      </Snackbar>
      </Container>
    </InfoContext.Provider>
  )
}

export default DashboardPage