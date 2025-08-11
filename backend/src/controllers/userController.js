const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
};

exports.register = (req, res) => {
    const { email, password, name } = req.body;

    if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) return res.status(500).json({ message: 'Error checking email' });
        if (row) return res.status(400).json({ message: 'Email already registered' });

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: 'Error hashing password' });

            db.run('INSERT INTO users(email, password, name) VALUES (?, ?, ?)', [email, hashedPassword, name], function(err) {
                if (err) return res.status(500).json({ message: 'Error registering user' });

                db.get('SELECT * FROM users WHERE id = ?', [this.lastID], (err, row) => {
                    if (err) return res.status(500).json({ message: 'Error getting user' });
                    res.status(201).json(row);
                });
            });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) return res.status(500).json({ message: 'Error during login' });
        if (!row) return res.status(401).json({ message: 'Invalid credentials' });

        bcrypt.compare(password, row.password, (err, result) => {
            if (err || !result) return res.status(401).json({ message: 'Invalid credentials' });

            const token = jwt.sign({ id: row.id }, process.env.JWT_SECRET, { expiresIn: '30m' });
            res.json({ token });
        });
    });
};

exports.getUsers = (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) return res.status(500).json({ message: 'Error getting users' });
        res.json(rows);
    });
};