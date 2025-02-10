const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {Client} = require('pg');
const bcrypt = require("bcrypt.js");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});
client.connect();

app.post('/api/register', async(req ,res)=>{
    const {email, password, name} = req.body;
    const hashedPassword = await bcrypt.hash(password,8);
    const result = await client.query(
        'INSERT INTO users(email, password, name) VALUES ($1, $2, $3) RETURNING *',
        [email, hashedPassword, name]    
    );
    res.status(201).json(result.rows[0]);
});

app.post('/api/login', async(req, res)=>{
    const {email, password} = req.body;
    const result = await client.query('SELECT * FROM users WHERE email = $1',
       [email]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '30m' });        
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }  
}
);


//testing
app.get('/', (req, res) => {
    res.send('API working');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
