import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import F8 from "/app/buildings//NGE/Floor8.jsx";
import F7 from "/app/buildings//NGE/Floor7.jsx";
import F6 from "/app/buildings//NGE/Floor6.jsx";
import F5 from "/app/buildings//NGE/Floor5.jsx";
import F4 from "/app/buildings//NGE/Floor4.jsx";
import F3 from "/app/buildings//NGE/Floor3.jsx";
import F2 from "/app/buildings//NGE/Floor2.jsx";
import F1 from "/app/buildings//NGE/Floor1.jsx";

export default function NGE() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBy, setSearchBy] = useState("roomNo");

  const handleSearchChange = (event) => {
    setSearchBy(event.target.value);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <p>Search Room:&nbsp;</p>
        <FormControl>
          <Select
            value={searchBy}
            onChange={handleSearchChange}
            style={{
              border: "1px solid #ccc", // Add border
              width: "200px", // Adjust width as needed
              padding: "5px", // Adjust padding as needed
              height: "30px",
              margin: "0px 10px"
            }}
          >
            <MenuItem value="roomNo">Room Number</MenuItem>
            <MenuItem value="teacherName">Teacher Name</MenuItem>
            <MenuItem value="subjectNo">Subject Number</MenuItem> {/* New Option */}
          </Select>
        </FormControl>
        <input
          type="text"
          placeholder={`Search by ${
            searchBy === "roomNo"
              ? "Room Number"
              : searchBy === "teacherName"
              ? "Teacher Name"
              : "Subject No" /* Placeholder adjusted based on selected value */
          }`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            border: "1px solid #ccc", // Add border
            width: "400px", // Adjust width as needed
            padding: "5px", // Adjust padding as needed
            height: "30px"
          }}
        />
      </div>
      <F8 searchQuery={searchQuery} searchBy={searchBy} />
      <F7 searchQuery={searchQuery} searchBy={searchBy} />
      <F6 searchQuery={searchQuery} searchBy={searchBy} />
      <F5 searchQuery={searchQuery} searchBy={searchBy} />
      <F4 searchQuery={searchQuery} searchBy={searchBy} />
      <F3 searchQuery={searchQuery} searchBy={searchBy} />
      <F2 searchQuery={searchQuery} searchBy={searchBy} />
      <F1 searchQuery={searchQuery} searchBy={searchBy} />
      <div className="m-10"></div>
    </div>
  );
}