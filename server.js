const express = require('express');
const mysql = require('mysql2');
const {user, pw} = require('./project.config');
const PORT = process.env.PORT || 3001;
const app = express();

// express middleware
app.use(express.urlencoded({ extended: false })); app.use(express.json());

// connect to the SQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: "root",
        password: pw,
        database: 'election'
    },
    console.log('Connected to the election database.')
);

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

app.get('/api/candidates', (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

app.get('/api/candidate/:id', (req, res) => {
    const query = [req.params.id]
    const sql = `SELECT * FROM candidates WHERE id = ?;`

    db.query(sql, query, (err, row) => {
        if (err) {
            res.status(400).json({error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
    if (err) {
        console.log(err);
    }
    console.log(row);
});

// db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) VALUES (?,?,?,?)`;
// const params = [1, 'Ronald', 'Firbank', 1];

// db.query(sql, params, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log(result);
// });

// default response for any other request
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});