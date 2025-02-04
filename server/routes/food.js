import express from 'express';
import pool from '../db.js';
import accessValidation from './middleware.js';

const router = express.Router();

router.get('/', accessValidation,async (req, res) => {
    try {
      const id = req.userData.id;
      const results = await pool.query('SELECT * FROM foods where user_id in (0 , $1)',[id]);
      res.json(results); 
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  export default router;