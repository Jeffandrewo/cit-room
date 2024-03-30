'use client'
import { QuerySnapshot, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Todo from "./TodoModal";


const Information = ({ selectedRoom }) => {
    
  //console.log("Selected Room:", selectedRoom);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "info");
        const q = query(collectionRef, orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setInfo(
                QuerySnapshot.docs
                    .map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() }))
                    .filter(todo => todo.roomNo === selectedRoom?.roomNo) // Filter by selected room number
            );
        });

        return unsubscribe;
    }, [selectedRoom]);

    return (
        <div>
            {info.map(todo => (
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
                />
            ))}
        </div>
    );
}
export default Information;