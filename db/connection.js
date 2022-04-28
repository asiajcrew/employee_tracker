const mysql = require('mysql2');

// Connect to SQL database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Cheesecake0810',
        database: 'tracker'
    },
    console.log('Connected to the tracker database.')
);

module.exports = db;
