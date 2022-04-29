const express = require('express');
const res = require('express/lib/response');
const PORT = process.env.PORT || 3001;
const app = express();

// Connect to SQL database
const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Cheesecake0810',
        database: 'tracker'
    },
    console.log('Connected to the tracker database.')
);

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// ================================ROUTES=========================================
// display/ view all deppartments
app.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

// Delete a department
app.delete('/api/department/:id', (req, res) => {
    const sql = `DELETE FROM department WHERE id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.statusMessage(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Department not found'
            });
        } else {
            res.json({
                message: 'deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

// Create a new department
app.post('/api/department', ({ body }, res) => {
    const sql = `INSERT INTO department (department_name)
    VALUES (?)`;
    const params = [body.department_name];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: body
        });
    });
});
// ==============================================================================

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});