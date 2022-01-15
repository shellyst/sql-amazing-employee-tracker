INSERT INTO department (name)
VALUES
('Management'),
('Financial'),
('Administration'),
('Sales'),
('Humanities');

INSERT INTO role (title, salary, department_id)
VALUES
('General Manager', 100000, 1),
('Lead Sales', 60000, 4),
('Accountant', 80000, 2),
('Receptionist', 50000, 3),
('Human Resource Manager', 65000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Michael', 'Scott', 1, NULL),
('Jim', 'Halpert', 2, 1),
('Angela', 'Martin', 3, 1),
('Pam', 'Beesley', 4, 1),
('Toby', 'Flenderson', 5, 1);


-- "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"