const express= require('express');
const router= express.Router();
const db= require('../../db/connection');

// display all employees
router.get('/employee', (req, res) => {
    const sql= `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json ({
            message: 'success',
            data: rows
        });
    });
});

// Create a new employee
router.post('/employee', ({ body }, res) => {
    const sql = `INSERT INTO employee (first_name, last_name) VALUES (?,?)`;
    const params = [body.first_name, body.last_name];
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

// Update employee's role
router.put('/employee/:id', (req, res) => {
    const sql= `UPDATE employee SET roles_id = ? WHERE id = ?`;
    const params= [req.body.roles_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'employee no found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body,
                changes: result.affectedRows
            });
        }
    });
});


module.exports= router;