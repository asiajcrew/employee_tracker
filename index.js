const inquirer= require('inquirer');
const express = require('express');
const db = require('./db/connection');

const promptUser= () => {
    return inquirer.prompt([
        {
            type: "list",
            name: 'initialize',
            message: "Please select an action",
            choices: ['view all departments', "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee's role"]
        }
    ])
    .then(answers => {
        const selection = answers.initialize;
        if (selection === "view all departments") {
            viewDepartments();
        };
        if (selection === "view all roles") {
          viewRoles();
        };
        if (selection === "view all employees") {
          viewEmployees();
        };
        if (selection === "add a department") {
          addDepartment();
        };
        if (selection === "add a role") {
          addRole();
        };
        if (selection === "add an employee") {
          addEmployee();
        };
        if (selection === "update an employee's role") {
          updateEmployeeRole();
        };
    });
};

db.connect((err) => {
    if (err) throw err;
        console.log('\n Connected! \n')
        promptUser();
});

//  view all departments
const viewDepartments= () => {
    const sql = `SELECT department.*, roles.job_title
    AS roles_job_title
    FROM department
    LEFT JOIN roles
    ON department.roles_id = roles.id`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows)
        console.log('\n Select a new action or press ctrl+C to quit the application \n')
        promptUser();
    });
}

// Create a department
const addDepartment= () => {
    const sql= `SELECT * FROM department`;
    db.query(sql, (err) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the new department'
            }
        ])
        .then (newDepartment => {
            const sql2= `INSERT INTO department (department_name) VALUES (?)`;
            const params2= {department_name:newDepartment.departmentName};
            db.query(sql2, params2, () => {
                if (err) throw err;
                console.log('\n Department added successfully! Select a new action or press ctrl+C to quit the application \n')
                promptUser();
            });
        });
    });
};

// view all roles
const viewRoles= () => {
    const sql= `SELECT * FROM roles`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows)
        console.log('\n Select a new action or press ctrl+C to quit the application \n')
        promptUser();
    });
};

// Create a role
const addRole= () => {
    const sql= `SELECT * FROM department`;
    db.query(sql, (err) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'jobTitle',
                message: 'Enter the name of the new role'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for this role'
            },
            {
                type: 'input',
                name: 'department',
                message: 'Enter the department ID'
            }
        ])
        .then (newRole => {
            const sql2= `INSERT INTO roles (job_title, salary, department_id) VALUES (?,?,?)`;
            const params2= {job_title:newRole.jobTitle, salary:newRole.salary, department_id:newRole.department};
            db.query(sql2, params2, () => {
                if (err) throw err;
                console.log('\n Role added successfully! Select a new action or press ctrl+C to quit the application \n')
                promptUser();
            });
        });
    });
};

// view all employees
const viewEmployees= () => {
    const sql= `SELECT * FROM employee`;
    db.query(sql, (err, rows) => {
        if (err) throw err;
            console.table(rows)
            console.log('\n Select a new action or press ctrl+C to quit the application \n')
            promptUser();
    });
};

// Create a new employee
const addEmployee= () => {
    const sql= `SELECT * FROM employee`;
    db.query(sql, (err) => {
      if (err) throw err;
      inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the new employee'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the new employee'
        },
        {
            type: 'input',
            name: 'role',
            message: 'Enter the role ID'
        }
        ])
        .then (newEmployee => {
            const sql2= `INSERT INTO employee (first_name, last_name, roles_id) VALUES (?,?,?)`;
            const params2= {first_name:newEmployee.firstName, last_name:newEmployee.lastName, roles_id:newEmployee.role};
            db.query(sql2, params2, () => {
                if (err) throw err;
                console.log('\n Employee added successfully! Select a new action or press ctrl+C to quit the application \n')
                promptUser();
            });
        });
    });
}

// Update employee's role
const updateEmployeeRole= () => {
    const sql= `SELECT * FROM employee`;
    // const sql= `UPDATE employee SET roles_id = ? WHERE id = ?`;
    // const params= {roles_id, id};
    db.query(sql, (err) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'newRole',
                message: "Enter the employee's new role ID"
            }
        ])
        .then (updateRole => {
        const sql2= `UPDATE employee (roles_id)`;
        const params2= {roles_id:updateRole.newRole};
        db.query(sql2, params2, () => {
            if (err) throw err;
            console.log("\n Employee's role updated successfully! Select a new action or press ctrl+C to quit the application \n");
            promptUser();
        })
        })
    });
};