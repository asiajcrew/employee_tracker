INSERT INTO roles (job_title, salary)
VALUES
('Accountant', '50.00');

INSERT INTO department (department_name, roles_id)
VALUES
('Accounting', 1);

INSERT INTO employee (first_name, last_name, roles_id)
VALUES
('Ashley', 'Cruz', 1)