'use client'
import { QuerySnapshot, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

const InformationEvent = () => {
    const [addevent, setInfoevent] = useState([]);

    useEffect(() => {
        const collectionRef = collection(db, "addevent");
        const q = query(collectionRef, orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            setInfoevent(QuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id, timestamp: doc.data().timestamp?.toDate().getTime() })))
        });
        return unsubscribe;
    }, []);

    return null; // Just returning null here to remove rendering of TodoEvent component
}

export default InformationEvent;