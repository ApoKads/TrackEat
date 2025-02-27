import express from 'express';
import pool from '../db.js';
import accessValidation from './middleware.js';

const router = express.Router();

router.get('/', accessValidation, async(req, res) => {
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

    try {
      // Get the old values of the food item
      const oldFood = await pool.query('SELECT * FROM Foods WHERE id = $1', [id]);
      const oldCalories = oldFood.rows[0].calories;
      const oldFat = oldFood.rows[0].fat;
      const oldProtein = oldFood.rows[0].protein;
      const oldCarbs = oldFood.rows[0].carbs;

      // Update the food item
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


        // Calculate the differences
        const calorieDiff = calories - oldCalories;
        const fatDiff = fat - oldFat;
        const proteinDiff = protein - oldProtein;
        const carbsDiff = carbs - oldCarbs;

        // Find all recipes that contain this food item
        const recipesContainingFood = await pool.query(
            'SELECT recipe_id FROM recipe WHERE food_id = $1',
            [id]
        );

        // Update the nutrition values for each recipe
        for (const recipe of recipesContainingFood.rows) {
            const recipeId = recipe.recipe_id;

            // Get the current nutrition values of the recipe
            const currentRecipe = await pool.query(
                'SELECT calories, fat, protein, carbs FROM foods WHERE id = $1',
                [recipeId]
            );

            const currentCalories = currentRecipe.rows[0].calories;
            const currentFat = currentRecipe.rows[0].fat;
            const currentProtein = currentRecipe.rows[0].protein;
            const currentCarbs = currentRecipe.rows[0].carbs;

            // Calculate the new nutrition values
            const newCalories = currentCalories + calorieDiff;
            const newFat = currentFat + fatDiff;
            const newProtein = currentProtein + proteinDiff;
            const newCarbs = currentCarbs + carbsDiff;

            // Update the recipe with the new nutrition values
            await pool.query(
                'UPDATE foods SET calories = $1, fat = $2, protein = $3, carbs = $4 WHERE id = $5',
                [newCalories, newFat, newProtein, newCarbs, recipeId]
            );
        }

        res.json(updatedFood.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


 router.delete('/:id', accessValidation, async (req, res) => {
    const { id } = req.params;
    try {
      // Mulai transaksi
      await pool.query('BEGIN');

      // Cek apakah food terkait dengan recipe
      const checkRecipeQuery = `
        SELECT recipe_id,food_id,calories,protein,carbs,fat
        FROM recipe r join foods f on r.food_id = f.id 
		    where food_id = $1
      `;
      
      const recipeResult = await pool.query(checkRecipeQuery, [id]);
      // console.log(recipeResult.rows)
      if (recipeResult.rows.length > 0) {
        // Jika food terkait dengan recipe, kurangi nilai kalori, fat, carbs, dan protein di tabel food
        for (const row of recipeResult.rows) {
          const updateFoodQuery = `
            UPDATE foods
            SET calories = calories - $1,
                fat = fat - $2,
                carbs = carbs - $3,
                protein = protein - $4
            WHERE id =  $5;
          `;
          await pool.query(updateFoodQuery, [
            row.calories,
            row.fat,
            row.carbs,
            row.protein,
            row.recipe_id,
          ]);
        }
  
        // Hapus food dari tabel recipe
        const deleteRecipeQuery = `
          DELETE FROM recipe
          WHERE food_id = $1;
        `;
        await pool.query(deleteRecipeQuery, [id]);
      }
  
      // Hapus food dari tabel foods
      const deleteFoodQuery = `
        DELETE FROM foods
        WHERE id = $1
        RETURNING *;
      `;
      const deletedFood = await pool.query(deleteFoodQuery, [id]);
  
      // Commit transaksi
      await pool.query('COMMIT');
  
      res.json({ message: 'Food deleted successfully', deletedFood: deletedFood.rows });
    } catch (err) {
      // Rollback transaksi jika terjadi error
      await pool.query('ROLLBACK');
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
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
            f.id,
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