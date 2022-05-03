const express = require('express');
const router = express.Router();
const db = require('../../db/connection');


// display/ view all departments
router.get('/department', (req, res) => {
    const sql = `SELECT department.*, roles.job_title
    AS roles_job_title
    FROM department
    LEFT JOIN roles
    ON department.roles_id = roles.id`;
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


// Create a new department
router.post('/department', ({ body }, res) => {
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

module.exports = router;