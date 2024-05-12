'use client'
import { UserButton } from "@clerk/nextjs"
import { Alert, Container, Snackbar } from "@mui/material"
import Information from "../components/Information"
import InfoForm from "../components/InfoForm"
import { useState } from "react"
import { InfoContext } from "./InfoContext"
import './dashboard.css'


const DashboardPage = () => {
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
    teacherName: '',
    day: '',
    status: ''
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
      <InfoForm />
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
      <Information />
      </Container>
    </InfoContext.Provider>
  )
}

export default DashboardPage