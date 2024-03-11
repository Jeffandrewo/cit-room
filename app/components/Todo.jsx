import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useContext } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { db } from "@/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { IconButton, ListItem, ListItemText } from "@mui/material";
import { InfoContext } from "../components/InfoContext";
import moment from "moment";

const Todo = ({
  id,
  timestamp,
  buildingName,
  classSection,
  endTime,
  floorNumber,
  roomNo,
  startTime,
  subjectNo,
}) => {
  const { showAlert, setinfoAdd } = useContext(InfoContext);

  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleOpenConfirmation = () => {
    setOpenConfirmation(true);
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const deleteInfor = async (id, e) => {
    e.stopPropagation();
    setOpenConfirmation(false); // Close the confirmation dialog

    const docRef = doc(db, "info", id);
    await deleteDoc(docRef);
    showAlert('error', `Information with id ${id} deleted successfully`);
  };

  return (
    <>
      <ListItem onClick={() => setinfoAdd({
        id,
        timestamp,
        buildingName,
        classSection,
        endTime,
        floorNumber,
        roomNo,
        startTime,
        subjectNo,
      })}
        sx={{ mt: 3, boxShadow: 3 }}
        style={{ backgroundColor: "#FAFAFA" }}
        secondaryAction={
          <>
            <IconButton onClick={handleOpenConfirmation}>
              <DeleteIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </>
        }
      >
        <ListItemText
          primary={subjectNo}
          secondary={moment(timestamp).format("MMMM DD, YYYY ")}
        />
      </ListItem>

      {/* Confirmation Dialog */}
      <Dialog
        open={openConfirmation}
        onClose={handleCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Information?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the information?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmation} color="primary">
            No
          </Button>
          <Button onClick={(e) => deleteInfor(id, e)} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Todo;
