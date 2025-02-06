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

router.get('/detail/:id',accessValidation, async (req, res) => {
    const { id } = req.params;
  
    try {
      // Query untuk mengambil data makanan utama berdasarkan ID
      const foodQuery = `
        SELECT 
          id, 
          name,  
          serving_size, 
          description, 
          type, 
          fat, 
          carbs, 
          protein, 
          calories
        FROM 
          Foods
        WHERE 
          id = $1;
      `;
  
      const foodResult = await pool.query(foodQuery, [id]);
  
      if (foodResult.rows.length === 0) {
        return res.status(404).json({ error: 'Food not found' });
      }
  
      const foodData = foodResult.rows[0];
  
      // Jika makanan memiliki tipe "recipe", ambil data resep
      if (foodData.type === 1) {
        const recipeQuery = `
          SELECT 
            f.name, 
            f.calories, 
            f.fat, 
            f.carbs, 
            f.protein
          FROM 
            recipe r
          JOIN 
            foods f ON r.food_id = f.id
          WHERE 
            r.recipe_id = $1;
        `;
  
        const recipeResult = await pool.query(recipeQuery, [id]);
        foodData.recipe = recipeResult.rows; // Tambahkan data resep ke objek makanan utama
      }
  
      res.json(foodData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  export default router;