CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

-- CREATE TABLE roles (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     job_title VARCHAR(30) NOT NULL,
--     salary DECIMAL NOT NULL,
--     department_id INT NOT NULL,
--     CONSTRAINT fk_departments FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
-- );

-- CREATE TABLE employee (
--     id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     roles_id INT NOT NULL,
--     manager_id INT,
--     CONSTRAINT fk_roles FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE CASCADE,
--     CONSTRAINT fk_employee FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE CASCADE
-- );

