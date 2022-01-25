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

// default response for any other request
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});