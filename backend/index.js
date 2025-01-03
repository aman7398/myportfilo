import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url';
import contactRoute from './routes/contact.js';

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(bodyParser.json());
app.use('/api/contact', contactRoute);

// Serve static files
app.use(cors());
// app.use(cors({ origin: 'http://127.0.0.1:5500' }))
app.use(express.static(path.join(__dirname, 'public')));

// Resume download route
app.get('/download-resume', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'Aman-Resume.pdf');
  res.download(filePath, 'Aman-Resume.pdf', (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Failed to download the file.');
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
