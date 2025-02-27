import express from 'express';
import pool from '../db.js';
import accessValidation from './middleware.js';

const router = express.Router();

// Endpoint untuk mengupdate status active
router.put('/update-active', accessValidation, async (req, res) => {
    try {
        const { sectionId, isActive } = req.body;

        // Validasi input
        if (!sectionId || typeof isActive !== 'boolean') {
            return res.status(400).json({ error: 'Invalid input: sectionId and isActive are required' });
        }

        // Update status active di database
        await pool.query(
            "UPDATE section SET active = $1 WHERE id = $2",
            [isActive, sectionId]
        );

        res.status(200).json(isActive);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', accessValidation, async (req, res) => {
    try {
        const { id } = req.params;

        // Hapus semua section yang terkait dengan schedule
        await pool.query(
            `DELETE FROM section WHERE schedule_id = $1`,
            [id]
        );

        res.status(200).json({ message: 'All sections deleted successfully' });
    } catch (error) {
        console.error('Error deleting sections:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/:id', accessValidation, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, time, active } = req.body;

        // Tambahkan section baru
        const result = await pool.query(
            `INSERT INTO section (schedule_id, name, hour, active)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
            [id, name, time, active]
        );

        res.status(201).json({ id: result.rows[0].id });
    } catch (error) {
        console.error('Error adding section:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/:id/foods', accessValidation, async (req, res) => {
    try {
        const { id } = req.params;
        const { foodId } = req.body;

        // Tambahkan makanan ke section
        await pool.query(
            `INSERT INTO sectionfood (section_id, food_id)
             VALUES ($1, $2)`,
            [id, foodId]
        );

        res.status(201).json({ message: 'Food added to section successfully' });
    } catch (error) {
        console.error('Error adding food to section:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;