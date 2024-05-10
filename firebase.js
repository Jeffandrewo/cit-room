// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCHVtiMugb7_KvWgw_NhZXpiDnE83uJKI",
  authDomain: "citroom-67503.firebaseapp.com",
  projectId: "citroom-67503",
  storageBucket: "citroom-67503.appspot.com",
  messagingSenderId: "940537831957",
  appId: "1:940537831957:web:35dbc5158c7fe30199641c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage }