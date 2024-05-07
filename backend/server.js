// server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const firebase = require('firebase/app');
require('firebase/storage');

firebase.initializeApp({
  apiKey: "AIzaSyDCHVtiMugb7_KvWgw_NhZXpiDnE83uJKI",
  authDomain: "citroom-67503.firebaseapp.com",
  projectId: "citroom-67503",
  storageBucket: "citroom-67503.appspot.com",
});

const storage = firebase.storage();
const app = express();
app.use(cors());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

app.post('/upload', upload.single('image'), (req, res) => {
  const file = req.file;
  const storageRef = storage.ref();
  const uploadTask = storageRef.child(`images/${file.originalname}`).put(file.buffer);

  uploadTask.on('state_changed', (snapshot) => {
    console.log(`Uploaded ${snapshot.bytesTransferred} bytes`);
  }, (error) => {
    console.error(error);
    res.status(500).send({ message: 'Error uploading image' });
  }, () => {
    res.status(200).send({ message: 'Image uploaded successfully', downloadURL: uploadTask.snapshot.ref.getDownloadURL() });
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});