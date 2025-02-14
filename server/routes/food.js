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

  router.post('/', accessValidation,async (req, res) => {
    try {
      const id = req.userData.id;
      const {name,calories,protein,fat,carbs,serving_size,type,description} = req.body;
      const results = await pool.query('insert into foods (user_id,name,calories,protein,fat,carbs,serving_size,type,description) values ($1,$2,Round($3,2),Round($4,2),Round($5,2),Round($6,2),$7,$8,$9) returning id',[id,name,calories,protein,fat,carbs,serving_size,type,description]);
      res.json(results); 
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Internal Server Error');
    }
  });

  router.put('/:id', accessValidation, async (req, res) => {
    const { id } = req.params;
    const { name, serving_size, description, calories, fat, protein, carbs } = req.body;
    console.log(name,serving_size,description,calories,fat,protein,carbs)
    try {
      const updateQuery = `
        UPDATE Foods
        SET 
          name = $1,
          serving_size = $2,
          description = $3,
          calories = $4,
          fat = $5,
          protein = $6,
          carbs = $7
        WHERE 
          id = $8
        RETURNING *;
      `;
  
      const updatedFood = await pool.query(updateQuery, [
        name,
        serving_size,
        description,
        calories,
        fat,
        protein,
        carbs,
        id,
      ]);
  
      if (updatedFood.rows.length === 0) {
        return res.status(404).json({ error: 'Food not found' });
      }
  
      res.json(updatedFood.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });


router.delete('/:id',accessValidation,async(req,res)=>{
  const { id } = req.params;
    try {
        const deleteQuery = `
            DELETE FROM foods
            WHERE id = $1
            RETURNING *;
        `;

        const deletedFood = await pool.query(deleteQuery, [id]);

        // if (deletedRecipes.rows.length === 0) {
        //     return res.status(404).json({ error: 'No recipes found for the given recipe_id' });
        // }

        res.json({ message: 'Food deleted successfully', deletedFood: deletedFood.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

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
          calories,user_id
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