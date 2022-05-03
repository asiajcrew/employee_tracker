const inquirer= require('inquirer');
const express = require('express');
const router = express.Router();
const db = require('./db/connection');

const promptUser= () => {
    return inquirer.prompt([
        {
            type: "list",
            name: 'initialize',
            message: "Please select an action",
            choices: ['view all departments', "view all roles", "view all employees", "add a department", "add a role", "add an emploee", "update an employee's role"]
        }
    ])
    .then(answers => {
        const selection = answers.initialize;
        if (selection === "view all departments") {
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
        };
        // if (selection === "view all roles") {
        //   viewRoles();
        // };
        // if (selection === "view all employees") {
        //   viewEmployees();
        // };
        // if (selection === "add a department") {
        //   addDepartment();
        // };
        // if (selection === "add a role") {
        //   addRole();
        // };
        // if (selection === "add an employee") {
        //   addEmployee();
        // };
        // if (selection === "update an employee's role") {
        //   updateEmployeeRole();
        // };
    });
};

promptUser();