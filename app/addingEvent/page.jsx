'use client'

import { Alert, Container, Snackbar } from "@mui/material"
import InformationEvent from "../components/InformationEvent"
import InfoFormEvent from "../components/InfoFormEvent"
import { useState } from "react"
import { InfoContextEvent } from "./InfoContextEvent"
import "./addingEvent.css"



const EventPage = () => {
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [ infoAddEvent, setinfoAddEvent ] = useState 
  ({ 
    name: '', 
    date: '', 
    location: '', 
    organizer: ''
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
    <InfoContextEvent.Provider value={{showAlert, infoAddEvent, setinfoAddEvent}}>
      <Container>
      <InfoFormEvent />
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
      <InformationEvent />
      </Container>
    </InfoContextEvent.Provider>
  )
}

export default EventPage