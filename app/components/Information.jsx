'use client'
import { useEffect, useState } from "react";
import { FormControl, Select, MenuItem, Card, CardContent, Typography } from "@mui/material";
import Todo from "./Todo";
import { db } from "../../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const Information = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("roomNo");
  const [info, setInfo] = useState([]);

  const handleSearchChange = (event) => {
    setSearchBy(event.target.value);
  };

  useEffect(() => {
    const collectionRef = collection(db, "info");
    const q = query(collectionRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setInfo(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp?.toDate().getTime(),
        }))
      );
    });

    return unsubscribe;
  }, []);

  // Filtered todos based on search query and search by
  const filteredTodos = info.filter((todo) => {
    if (searchQuery === "") {
      return true;
    }
    return todo[searchBy].toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Organize todos into an object where keys are days of the week (Monday to Saturday)
  const todosByDay = filteredTodos.reduce((acc, todo) => {
    if (!acc[todo.day]) {
      acc[todo.day] = [];
    }
    acc[todo.day].push(todo);
    return acc;
  }, {});

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "40px" }}>
        <p>Search:</p>
        <FormControl>
          <Select
            value={searchBy}
            onChange={handleSearchChange}
            style={{
              border: "1px solid #ccc",
              width: "200px",
              padding: "5px",
              height: "30px",
              margin: "0px 10px",
            }}
          >
            <MenuItem value="roomNo">Room Number</MenuItem>
            <MenuItem value="teacherName">Teacher Name</MenuItem>
            <MenuItem value="subjectNo">Subject Number</MenuItem>
            <MenuItem value="day">Day</MenuItem>
          </Select>
        </FormControl>
        <input
          type="text"
          placeholder={`Search by ${
            searchBy === "roomNo"
              ? "Room Number"
              : searchBy === "teacherName"
              ? "Teacher Name"
              : searchBy === "day"
              ? "Day"
              : "Subject No"
          }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            border: "1px solid #ccc",
            width: "400px",
            padding: "5px",
            height: "30px",
          }}
        />
      </div>

     
      <div style={{ overflowX: "auto", whiteSpace: "nowrap"}}>
        <div style={{ display: "flex" }}>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
            <Card key={day} style={{ minWidth: "300px", maxWidth: "300px", margin: "5px",  marginBottom: "50px"}}>
              <CardContent>
                <Typography variant="h6" component="h2" style={{ marginBottom: "10px", textAlign: "center", fontWeight: "bold" }}>
                  {day}
                </Typography>
                {todosByDay[day] ? (
                  todosByDay[day].map((todo) => (
                    <Todo
                      key={todo.id}
                      id={todo.id}
                      buildingName={todo.buildingName}
                      classSection={todo.classSection}
                      endTime={todo.endTime}
                      floorNumber={todo.floorNumber}
                      roomNo={todo.roomNo}
                      startTime={todo.startTime}
                      subjectNo={todo.subjectNo}
                      teacherName={todo.teacherName}
                      day={todo.day}
                      status={todo.status}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary" style={{ marginBottom: "10px", textAlign: "center", fontWeight: "bold" }}>
                    No information available
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Information;