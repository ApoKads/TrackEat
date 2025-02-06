import express from 'express';
import pool from '../db.js';
import accessValidation from './middleware.js';

const router = express.Router();

router.get('/:id', accessValidation,async (req, res) => {
    try {
      const userId = req.userData.id;
      const {id} = req.params
      const results = await pool.query('SELECT f.name , f.calories, f.fat, f.carbs, f.protein FROM recipe r join foods f on r.food_id = f.id where user_id in (0 , $1) and r.recipe_id = ($2)',[userId,id]);
      res.json(results.rows); 
    } catch (err) {
      console.error('Error fetching data:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  
  export default router;

//   SELECT recipe_id, 
//        STRING_AGG(f.name, ', ') AS food_names
// FROM recipe r
// JOIN foods f ON r.food_id = f.id
// GROUP BY r.recipe_id;
