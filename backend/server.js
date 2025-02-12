const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sqlite3 = require('sqlite3').verbose();

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a SQLite
const db = new sqlite3.Database('db.sqlite', (err) => { // Usa 'db' en lugar de 'client'
    if (err) {
        console.error('Error al conectar a SQLite:', err);
    } else {
        console.log('Conectado a SQLite');
        // Crear la tabla users si no existe (importante para SQLite)
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                name TEXT NOT NULL
            )
        `);
    }
});

const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
};

app.post('/api/register', async (req, res) => {
    const { email, password, name } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {  // Usa db.get para SQLite
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error checking email' });
        }
        if (row) {
            return res.status(400).json({ message: 'Email already registered' });
        }
        else{
            return express.json(row);
        }

        bcrypt.hash(password, 10, (err, hashedPassword) => { // Callback para bcrypt.hash
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error hashing password' });
            }

            db.run('INSERT INTO users(email, password, name) VALUES (?, ?, ?)', [email, hashedPassword, name], function(err) { // Usa db.run
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Error registering user' });
                }
                db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (err, row) => { // Obtener el usuario insertado
                    if(err){
                        console.error(err);
                        return res.status(500).json({ message: 'Error getting user' });
                    }
                    res.status(201).json(row);
                })
            });
        });
    });
});


app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => { 
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error during login' });
        }
        if (!row) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        bcrypt.compare(password, row.password, (err, result) => { // Callback para bcrypt.compare
            if (err || !result) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ id: row.id }, process.env.JWT_SECRET, { expiresIn: '30m' });
            res.json(token);
        });
    });
});

app.get('/api/users', async (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => { // Usa db.all
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error getting users' });
        }
        res.json(rows); console.log(rows);
        
    });
});

app.get('/', (req, res) => {
    res.send('API working');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));