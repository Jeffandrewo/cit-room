import nextConnect from 'next-connect';
import multer from 'multer';

const upload = multer({ dest: 'api/upload/' });

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(500).json({ error: `Error uploading file: ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(404).json({ error: 'Route not found' });
  },
});

apiRoute.post(upload.single('file'), (req, res) => {
  
  const file = req.file;
  console.log(`File uploaded: ${file.originalname}`);

  res.status(201).json({ message: 'File uploaded successfully' });
});

export default apiRoute;