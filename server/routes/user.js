// routes/user.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import pool from '../db.js'; 
import accessValidation from './middleware.js';
import { oauth2Client, authorizationUrl } from '../oauthConfig.js';

const router = express.Router();

// const oauth2Client = new google.auth.OAuth2(
//     process.env.GOOGLE_CLIENT_ID,
//     process.env.GOOGLE_CLIENT_SECRET,
//     process.env.CALLBACK_URL,
// );

// const scope = [
//     `https://www.googleapis.com/auth/userinfo.email`,
//     `https://www.googleapis.com/auth/userinfo.profile`,
//     `https://www.googleapis.com/auth/calendar`, // Scope untuk Google Calendar API
//     `https://www.googleapis.com/auth/calendar.events`,
// ];

// const authorizationUrl = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: scope,
//     include_granted_scopes: true,
// });

router.post("/update", async (req, res) => {
    try {
        const {
            id,
            firstName,
            lastName,
            selectedSex,
            Age,
            WeightOption,
            weight,
            height,
            ActivityOption,
            ProgressOption,
            goal,
            dailyCalories,
            profileImage
        } = req.body;
        const result = await pool.query(
                `UPDATE users
                SET first_name = $1, 
                    last_name = $2, 
                selected_sex = $3, 
                age = $4, 
                weight_option = $5, 
                weight = $6, 
                height = $7, 
                activity_option = $8, 
                progress_option = $9, 
                goal = $10,
                dailyCalories = $12,
                imageurl = $13
            WHERE id = $11
            RETURNING *`,
            [firstName, lastName, selectedSex, Age, WeightOption, weight, height, ActivityOption, ProgressOption, goal, id,dailyCalories,profileImage]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "User data updated successfully", user: result.rows[0] });
    } catch (error) {
        console.error("Error updating user data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and Password are required' });
        }

        const checkUser = await pool.query(
            `SELECT * FROM users WHERE email = $1`, [email]
        );

        if (checkUser.rows.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }
        
        const result = await pool.query(
            `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`, [email, hashedPassword]
        );
        const payload = {
            id: result.rows[0].id,
        };
        const secret = process.env.JWT_SECRET;
        const duration = 60 * 60 * 1;
        const token = jwt.sign(payload, secret, { expiresIn: duration });
        return res.json({
            data: {
                id: result.rows[0].id,
            },
            token: token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await pool.query(
            `SELECT DISTINCT * FROM users WHERE email = $1`, [email]
        );
        if (user.rowCount === 0) {
            return res.status(404).json({ message: 'Incorrect Username or Password' });
        }
        if (!user.rows[0].password) {
            return res.status(404).json({ message: 'Password not set' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
        if (isPasswordValid) {
            const payload = {
                id: user.rows[0].id,
            };
            const secret = process.env.JWT_SECRET;
            const duration = 60 * 60 * 1;
            const token = jwt.sign(payload, secret, { expiresIn: duration });
            return res.json({
                data: {
                    id: user.rows[0].id,
                },
                token: token
            });
        } else {
            return res.status(403).json({ message: 'Incorrect Username or Password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/auth/google', (req, res) => {
    res.redirect(authorizationUrl); // Redirect ke Google OAuth
});

router.get('/auth/google/callback', async (req, res) => {
    const { code } = req.query;

    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const oauth2 = google.oauth2({
            auth: oauth2Client,
            version: 'v2'
        });

        const { data } = await oauth2.userinfo.get();
        // res.json(data);

        if (!data.email) {
            return res.status(400).json({ error: 'Email and name are required' });
        }

        let user = await pool.query(
            `SELECT DISTINCT * FROM users WHERE google_email = $1`, [data.email]
        );

        if (user.rowCount === 0) {
            user = await pool.query(
                `INSERT INTO users (google_email, refresh_token) VALUES ($1, $2) RETURNING *`,
                [data.email, tokens.refresh_token] // Simpan refresh_token
            );
        } else {
            // Update refresh_token jika pengguna sudah ada
            // console.log(tokens)
            user = await pool.query(
                `UPDATE users SET refresh_token = $1 WHERE google_email = $2 RETURNING *`,
                [tokens.refresh_token, data.email]
            );
        }

        const payload = {
            id: user.rows[0].id,
        };
        const secret = process.env.JWT_SECRET;
        const duration = 60 * 60 * 12;
        const token = jwt.sign(payload, secret, { expiresIn: duration });

        // Redirect ke frontend dengan token sebagai query parameter
        res.redirect(`http://localhost:5000/auth/google/callback?token=${token}`);
    } catch (error) {
        console.error('Error during Google login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/info', accessValidation, async (req, res) => {
    try {
        const id = req.userData.id;

        const results = await pool.query(
            `SELECT *
             FROM users
             WHERE id = $1`,
            [id]
        );
        // console.log("test",results)
        res.status(200).json({ data: results.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/validate-token', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ isValid: false });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    try {
        const decoded = jwt.verify(token, secret);
        return res.status(200).json({ isValid: true, user: decoded });
    } catch (err) {
        return res.status(401).json({ isValid: false });
    }
});

export default router;