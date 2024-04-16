'use client'
import { QuerySnapshot, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Todo from "./Todo";

const Information = () => {

    

    const [info, setInfo] = useState([]);
    useEffect(() => {
        const collectionRef = collection(db, "info");

        const q = query(collectionRef, orderBy("timestamp", "desc")); // Correct import for 'query'

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setInfo(QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
        });
        return unsubscribe;
    }, []);

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
                    subjectNo={todo.subjectNo}  // Assuming 'subject' is a property in your 'info' documents
                    teacherName={todo.teacherName}
                    day={todo.day}
                    status={todo.status}
                />
            ))}
        </div>
    );
}

export default Information;
