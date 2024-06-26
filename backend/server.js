const express = require('express');
const cors = require('cors');
const multer = require('multer');
const firebase = require('firebase/app');
require('firebase/storage');
require('firebase/firestore');

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDCHVtiMugb7_KvWgw_NhZXpiDnE83uJKI",
  authDomain: "citroom-67503.firebaseapp.com",
  projectId: "citroom-67503",
  storageBucket: "citroom-67503.appspot.com",
  messagingSenderId: "940537831957",
  appId: "1:940537831957:web:35dbc5158c7fe30199641c"
});

const storage = firebase.storage();
const db = firebase.firestore();

const app = express();
app.use(cors());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Update your server code to handle title along with the image data

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const storageRef = storage.ref();
    const uploadTask = storageRef.child(`images/${file.originalname}`).put(file.buffer);

    await uploadTask;
    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();

    // Save the post data to Firestore
    await db.collection('posts').add({
      title: req.body.title,
      imageUrl: downloadURL,
      createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    });

    res.status(200).send({ message: 'Image and post uploaded successfully', downloadURL });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error uploading image or saving post to Firestore' });
  }
});


app.listen(3000, () => {
  console.log('Server listening on port 3001');
});