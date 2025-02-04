// index.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js'; // Impor router user
import foodRoutes from './routes/food.js'; // Impor router user
import { config } from 'dotenv';

// Load environment variables
config();

const app = express();
const port = process.env.PORT || 3000; // Gunakan port dari environment variable atau default 3000

// Middleware
app.use(express.json()); // Untuk parsing JSON request body
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Untuk parsing JSON request body

// Gunakan router untuk route yang berhubungan dengan user
app.use('/user', userRoutes);
app.use('/food',foodRoutes);

// Route dasar untuk mengecek apakah server berjalan
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// cd backend
// npm init -y
// npm i express cors body-parser dotenv pg ->Backend


// npm i axios
// 