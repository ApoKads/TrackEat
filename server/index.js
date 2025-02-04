import express from "express";
import pg from 'pg';
import cors from 'cors';
import { config } from 'dotenv';
import bodyParser from "body-parser";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {google} from 'googleapis';

config(); 
const {Pool} = pg;


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.CALLBACK_URL,
)
const scope=[
    `https://www.googleapis.com/auth/userinfo.email`,
    `https://www.googleapis.com/auth/userinfo.profile`
]

const authorizationUrl = oauth2Client.generateAuthUrl({
    access_type:'offline',
    scope:scope,
    include_granted_scopes:true,
})

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
  });
const port = process.env.PORT;


const accessValidation = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization)
    {
        return res.status(401).json({
            message:'Token diperlukan'
        })
    }
    // console.log(authorization)
    const token = authorization.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    try{
        const jwtDecode = jwt.verify(token,secret);
        req.userData = jwtDecode
    }catch(error)
    {
        return res.status(401).json({
            message:'Unauthorized'
        });
    }
    next();
}
app.post('/validate-token', (req, res) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ isValid: false });
    }
  
    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;
    try {
      const decoded = jwt.verify(token, secret); // Gunakan secret key yang sama seperti saat membuat token
      return res.status(200).json({ isValid: true, user: decoded });
    } catch (err) {
      return res.status(401).json({ isValid: false });
    }
  });

app.post("/api/users", async (req, res) => {
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
            goal
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
                goal = $10
            WHERE id = $11
            RETURNING *`,
            [firstName, lastName, selectedSex, Age, WeightOption, weight, height, ActivityOption, ProgressOption, goal, id]
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

app.get('/user/info',accessValidation,async(req,res)=>{
    try {
        const id = req.userData.id; // Ambil id dari user yang sudah di-authenticate

        const results = await pool.query(
            `SELECT id, activity_option, age, email, first_name, goal, google_email, height, last_name, progress_option, selected_sex, weight, weight_option
             FROM users
             WHERE id = $1`,
            [id]
          );

        res.status(200).json({ data: results.rows[0]});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})


app.post('/register',async(req,res)=>{

    try{

        const {email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and Password are required'});
        }
        const result = await pool.query(
            `INSERT INTO users (email,password) VALUES ($1, $2) RETURNING *`,[email,hashedPassword]
        );
        const payload = {
            id: result.rows[0].id,
        }
        const secret = process.env.JWT_SECRET;
        const duration = 60 * 60 * 1;
        const token = jwt.sign(payload,secret,{expiresIn: duration});
        return res.json(
            {
                data:{
                    id: result.rows[0].id,
                },
                token: token
            }
        )
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await pool.query(
            `Select distinct * from users where email = $1`,[email]
        );
        if(user.rowCount == 0)
        {
            return res.status(404).json(
                {message: 'Incorrect Username or Password'}
            );
        }
        if(!user.rows[0].password){
            return res.status(404).json({
                message:'Password not set'
            });
        }

        const isPasswordValid = await bcrypt.compare(password,user.rows[0].password)
        if(isPasswordValid){
            const payload = {
                id: user.rows[0].id,
            }
            const secret = process.env.JWT_SECRET;
            const duration = 60 * 60 * 1;
            const token = jwt.sign(payload,secret,{expiresIn: duration});
            return res.json(
                {
                    data:{
                        id: user.rows[0].id,
                    },
                    token: token
                }
            )
        }else{
            return res.status(403).json({
                message:'Incorrect Username or Password'
            })
        }

        
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.get('/auth/google',(req,res)=>{
    res.redirect(authorizationUrl);
})

app.get('/auth/google/callback',async (req,res)=>{
    const {code} = req.query
    

    const {tokens} = await oauth2Client.getToken(code); // code adalah authorization code yang Anda dapatkan setelah login
    oauth2Client.setCredentials(tokens);
    
    
    const oauth2 = google.oauth2({
        auth:oauth2Client,
        version: 'v2'
    })
    
    const {data} = await oauth2.userinfo.get();
    
    if(!data.email || !data.name){
        return res.json({
            data: data,
        })
    }
    let user = await pool.query(
        `Select distinct * from users where google_email = $1`,[data.email]
    );

    if(user.rowCount == 0){
        user = await pool.query(
            `INSERT INTO users (google_email,name) VALUES ($1, $2) RETURNING *`,[data.email,data.name]
        )
    }
    console.log(user);

    const payload = {
        id: user.rows[0].id,
    }
    const secret = process.env.JWT_SECRET;
    const duration = 60 * 60 * 1;
    const token = jwt.sign(payload,secret,{expiresIn: duration});

    // console.log(user.rows[0].id)
    return res.json(
        {
            data:{
                id: user.rows[0].id,
            },
            token: token
        }
    )
    

})

app.get('/mess',accessValidation,(req,res)=>{
    const userId = req.body;
    console.log(userId);
    return res.json(userId);
})

app.listen(port,()=>{
    console.log(`Server listening in port ${port}`);
})
