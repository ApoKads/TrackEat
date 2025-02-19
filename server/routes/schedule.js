import express from 'express';
import pool from '../db.js';
import accessValidation from './middleware.js';

const router = express.Router();

router.get('/', accessValidation, async (req, res) => {
    try {
        const userId = req.userData.id; // Ambil user_id dari token atau session
        const results = await pool.query(
            'SELECT * FROM schedule WHERE user_id = $1', [userId]
        );
        res.json(results.rows); // Kirim data schedule ke frontend
    } catch (err) {
        console.error('Error fetching schedule data:', err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;

