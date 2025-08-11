const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('db.sqlite', (err) => {
    if (err) {
        console.error('Error al conectar a SQLite:', err);
    } else {
        console.log('Conectado a SQLite');
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

module.exports = db;