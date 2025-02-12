const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const {Client} = require('pg');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(cors());
app.use(express.json());

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});
client.connect((err) => {
    if (err) {
      console.error('Error al conectar a PostgreSQL:', err);
    } else {
      console.log('Conectado a PostgreSQL');
    client.query("  CREATE TABLE IF NOT EXISTS users (   id INTEGER PRIMARY KEY AUTOINCREMENT,  email TEXT UNIQUE NOT NULL, password TEXT NOT NULL,  name TEXT NOT NULL );");
    }
  });
  client.connect();

  
const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

app.post('/api/register', async(req ,res)=>{
    const {email, password, name} = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }
    
    const emailExists = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailExists.rows.length > 0) {
        return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password,8);

    try {
            const result = await client.query(
            'INSERT INTO users(email, password, name) VALUES ($1, $2, $3) RETURNING *',
            [email, hashedPassword, name]    
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error registering user' });
    }
    
});

app.post('/api/login', async(req, res)=>{
    const {email, password} = req.body;
    const result = await client.query('SELECT * FROM users WHERE email = $1',
       [email]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, { expiresIn: '30m' });        
        res.json(token);
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }  
}
);

app.get('/api/users', async(req, res)=>{
    const result = await client.query('SELECT * FROM users');
    res.json(result.rows);
});

//testing
app.get('/', (req, res) => {
    res.send('API working');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
