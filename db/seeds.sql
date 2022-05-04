INSERT INTO roles (job_title, salary)
VALUES
('Accountant', '50.00'),
('Fitness Coach', '30.00'),
('Receptionist', '35.00'),
('Janitor', '25.00'),
('Nutritionist', '50.00');

INSERT INTO department (department_name, roles_id)
VALUES
('Accounting', 1),
('Coaches', 2),
('Front desk', 3),
('Sanitation Crew', 4),
('Dietary', 5);

INSERT INTO employee (first_name, last_name, roles_id)
VALUES
('Ashley', 'Cruz', 1),
('Sierra', 'Phillips', 2),
('Caleb', 'Perez', 3),
('Kenny', 'Daniels', 4),
('David', 'Hall', 5);