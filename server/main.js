// index.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.js'; // Impor router user
import foodRoutes from './routes/food.js'; // Impor router user
import trackerRoutes from './routes/tracker.js';
import  recipeRoutes from './routes/recipe.js';
import scheduleRoutes from './routes/schedule.js';
import sectionRoutes from './routes/section.js';
import calendarRoutes from './routes/calendar.js';
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
app.use('/calorie-tracker',trackerRoutes);
app.use('/recipe',recipeRoutes);
app.use('/schedule',scheduleRoutes);
app.use('/section',sectionRoutes);
app.use('/calendar',calendarRoutes);

// Route dasar untuk mengecek apakah server berjalan
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});