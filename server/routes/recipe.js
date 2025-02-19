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
  
router.delete('/:id', accessValidation, async (req, res) => {
    const { id } = req.params;

    try {
        const deleteQuery = `
            DELETE FROM Recipe
            WHERE recipe_id = $1
            RETURNING *;
        `;

        const deletedRecipes = await pool.query(deleteQuery, [id]);

        // if (deletedRecipes.rows.length === 0) {
        //     return res.status(404).json({ error: 'No recipes found for the given recipe_id' });
        // }

        res.json({ message: 'Recipes deleted successfully', deletedRecipes: deletedRecipes.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

  // Masukin ke table Recipe
router.post('/',accessValidation,async(req,res)=>{
  try{
    const userId = req.userData.id;
    const {recipe_id,recipes} = req.body;
    console.log(recipes)
    for (const recipe of recipes) {
      const { id } = recipe;
      // if(recipe === null)console.log('test')
      // console.log("test",recipe)
      const result = await pool.query(
        'INSERT INTO recipe (recipe_id,food_id) VALUES ($1, $2)',
        [recipe_id,recipe.id]
      );
    }
    res.json({ message: 'Recipes saved successfully' });
  }catch(err)
  {
    console.log('Error fetching data:', err);
    res.status(500).send('Internal Server Error'); 
  }
})
  export default router;
