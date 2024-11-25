const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Set up the storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create the "uploads" folder if it doesn't exist
    const uploadDir = './uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Give a unique name to the file (e.g., using Date.now and original filename)
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Set up multer
const upload = multer({ storage });

// Endpoint for handling image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.status(200).json({ message: 'File uploaded successfully', file: req.file });
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
