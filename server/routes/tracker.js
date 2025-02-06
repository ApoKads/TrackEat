import express from 'express';
import pool from '../db.js';
import accessValidation from './middleware.js';

const router = express.Router();

// Endpoint untuk mendapatkan total nutrisi hari ini
router.get('/today-nutrition/:user_id',accessValidation, async (req, res) => {
  const { user_id } = req.params;

  try {
    // Query untuk mengambil data makanan yang dimakan hari ini
    const query = `
      SELECT 
        f.calories, 
        f.protein, 
        f.carbs, 
        f.fat
      FROM 
        FoodLog fl
      JOIN 
        Foods f ON fl.food_id = f.id
      WHERE 
        fl.user_id = $1 
        AND fl.eat_date = CURRENT_DATE;
    `;

    const result = await pool.query(query, [user_id]);

    // Hitung total nutrisi
    const totals = result.rows.reduce(
      (acc, food) => {
        acc.calories += food.calories;
        acc.protein += food.protein;
        acc.carbs += food.carbs;
        acc.fat += food.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    res.json(totals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;