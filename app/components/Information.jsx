'use client'
import { useEffect, useState } from "react";
import { FormControl, Select, MenuItem } from "@mui/material";
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

  const filteredTodos = info.filter((todo) => {
    if (searchQuery === "") {
      return true;
    }
    return todo[searchBy].toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" , margin:"40px"}}>
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
              : searchBy === "day" // Adjust placeholder based on selected value
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

      {filteredTodos.map((todo) => (
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
      ))}
    </div>
  );
};

export default Information;