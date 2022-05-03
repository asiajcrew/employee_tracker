const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

// display/ view all roles
router.get('/roles', (req, res) => {
    const sql= `SELECT * FROM roles`;
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

// Create a role
router.post('/roles', ({ body }, res) => {
    const sql= `INSERT INTO roles (job_title, salary)
    VALUES (?,?,?)`;
    const params = [body.job_title, body.salary];
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

module.exports = router;