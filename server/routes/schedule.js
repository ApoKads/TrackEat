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
        // console.log(results.rows);
        res.json(results.rows); // Kirim data schedule ke frontend
        // console.log('Response sent successfully');
    } catch (err) {
        console.error('Error fetching schedule data:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.delete('/:id',accessValidation,async(req,res)=>{
    try{
        const userId = req.userData.id;
        const {id} = req.params;
        const results = await pool.query(
            'Delete from schedule where id = $1',[id]
        )
        res.status(201).json({ message: 'Schedule berhasil didelete!' });

    }catch(err){
        console.error('Error fetching schedule data:',err)
        res.status(500).send('Internal Server Error');
    }
})

router.get('/detail/:id', accessValidation, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userData.id; // Ambil user_id dari token atau session

        // Query untuk mengambil data schedule, section, dan food
        const results = await pool.query(
            `SELECT 
                s.id AS schedule_id,
                s.name AS schedule_name,
                s.monday,
                s.tuesday,
                s.wednesday,
                s.thursday,
                s.friday,
                s.saturday,
                s.sunday,
                s.active,
                s.description,
                sec.id AS section_id,
                sec.name AS section_name,
                sec.hour AS section_time,
                sec.active AS section_active,
                f.id AS food_id,
                f.name AS food_name,
                f.calories,
                f.carbs,
                f.fat,
                f.protein
            FROM 
                schedule s
            JOIN 
                section sec ON s.id = sec.schedule_id
            LEFT JOIN  -- Menggunakan LEFT JOIN untuk sectionfood dan foods
                sectionfood sf ON sec.id = sf.section_id
            LEFT JOIN 
                foods f ON sf.food_id = f.id
            WHERE 
                s.id = $1 AND s.user_id = $2;`, // Pastikan schedule milik user yang sesuai
            [id, userId]
        );

        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'Schedule not found' });
        }

        // Format data untuk respons
        const schedule = {
            id: results.rows[0].schedule_id,
            name: results.rows[0].schedule_name,
            description:results.rows[0].description,
            monday: results.rows[0].monday,
            tuesday: results.rows[0].tuesday,
            wednesday: results.rows[0].wednesday,
            thursday: results.rows[0].thursday,
            friday: results.rows[0].friday,
            saturday: results.rows[0].saturday,
            sunday: results.rows[0].sunday,
            active:results.rows[0].active,
            sections: []
        };

        // Mengelompokkan section dan food
        const sectionMap = new Map();
        results.rows.forEach(row => {
            if (!sectionMap.has(row.section_id)) {
                sectionMap.set(row.section_id, {
                    id: row.section_id,
                    name: row.section_name,
                    time: row.section_time,
                    foods: [],
                    active:row.section_active,
                });
            }

            if (row.food_id) {
                sectionMap.get(row.section_id).foods.push({
                    id: row.food_id,
                    name: row.food_name,
                    calories: row.calories,
                    carbs: row.carbs,
                    fat: row.fat,
                    protein: row.protein
                });
            }
        });

        // Menambahkan section ke schedule
        schedule.sections = Array.from(sectionMap.values());

        res.json(schedule); // Kirim data schedule ke frontend
    } catch (err) {
        console.error('Error fetching schedule data:', err);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/', accessValidation, async (req, res) => {
    const client = await pool.connect(); // Ambil koneksi dari pool

    try {
        const { name, description, days, sections } = req.body;
        const userId = req.userData.id; // Ambil user_id dari token

        // Mulai transaction
        await client.query('BEGIN');

        // Insert ke tabel schedule
        const scheduleQuery = `
            INSERT INTO schedule (user_id, name, description, monday, tuesday, wednesday, thursday, friday, saturday, sunday,active)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,FALSE)
            RETURNING id;
        `;
        const scheduleValues = [
            userId,
            name,
            description,
            days.includes(1), // Monday
            days.includes(2), // Tuesday
            days.includes(3), // Wednesday
            days.includes(4), // Thursday
            days.includes(5), // Friday
            days.includes(6), // Saturday
            days.includes(7), // Sunday
        ];
        const scheduleResult = await client.query(scheduleQuery, scheduleValues);
        const scheduleId = scheduleResult.rows[0].id;

        // Insert ke tabel section
        for (const section of sections) {
            const sectionQuery = `
                INSERT INTO section (schedule_id, name, hour, active)
                VALUES ($1, $2, $3, $4)
                RETURNING id;
            `;
            const sectionValues = [
                scheduleId,
                section.name,
                section.time,
                true, // Set active ke true
            ];
            const sectionResult = await client.query(sectionQuery, sectionValues);
            const sectionId = sectionResult.rows[0].id;

            // Insert ke tabel sectionfood
            for (const food of section.foods) {
                const sectionFoodQuery = `
                    INSERT INTO sectionfood (section_id, food_id)
                    VALUES ($1, $2);
                `;
                const sectionFoodValues = [sectionId, food.id];
                await client.query(sectionFoodQuery, sectionFoodValues);
            }
        }

        // Commit transaction
        await client.query('COMMIT');
        res.status(201).json({ message: 'Schedule berhasil disimpan!' });
    } catch (error) {
        // Rollback transaction jika terjadi error
        await client.query('ROLLBACK');
        console.error('Error saving schedule:', error);
        res.status(500).json({ message: 'Gagal menyimpan schedule.' });
    } finally {
        // Lepaskan koneksi
        client.release();
    }
});


router.put('/update-active', accessValidation, async (req, res) => {
    try {
        const { scheduleId, isActive } = req.body;

        // Validasi input
        if (!scheduleId || typeof isActive !== 'boolean') {
            return res.status(400).json({ error: 'Invalid input: scheduleId and isActive are required' });
        }

        // Update status active di database
        await pool.query(
            "UPDATE schedule SET active = $1 WHERE id = $2",
            [isActive, scheduleId]
        );

        // Kirim respons dengan status active yang baru
        res.status(200).json(isActive);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', accessValidation, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, monday, tuesday, wednesday, thursday, friday, saturday, sunday, active } = req.body;

        // Update informasi schedule
        await pool.query(
            `UPDATE schedule
             SET name = $1, description = $2, monday = $3, tuesday = $4, wednesday = $5, thursday = $6, friday = $7, saturday = $8, sunday = $9, active = $10
             WHERE id = $11`,
            [name, description, monday, tuesday, wednesday, thursday, friday, saturday, sunday, active, id]
        );

        res.status(200).json({ message: 'Schedule updated successfully' });
    } catch (error) {
        console.error('Error updating schedule:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;

