import express from 'express';
import pool from '../db.js';
import accessValidation from './middleware.js';

const router = express.Router();

router.post('/', accessValidation, async (req, res) => {
  try {
    const userId = req.userData.id;
    const { food_id, quantity } = req.body;

    // Validasi input
    if (!food_id || !quantity || quantity < 1) {
      return res.status(400).json({ error: 'Invalid input: food_id and quantity (min 1) are required' });
    }

    // Insert ke database
    await pool.query(
      "INSERT INTO foodlog (eat_date, user_id, food_id, quantity) VALUES (CURRENT_DATE, $1, $2, $3)",
      [userId, food_id, quantity]
    );

    res.status(201).json({ message: 'Food log added successfully' });
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint untuk mendapatkan total nutrisi hari ini
router.get('/today-nutrition/:user_id',accessValidation, async (req, res) => {
  const { user_id } = req.params;

  try {
    // Query untuk mengambil data makanan yang dimakan hari ini
    const query = `
      SELECT 
        fl.quantity,
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
        acc.calories += food.calories*food.quantity;
        acc.protein += food.protein*food.quantity;
        acc.carbs += food.carbs*food.quantity;
        acc.fat += food.fat*food.quantity;
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