INSERT INTO department (name)
VALUES
('Management'),
('Financial'),
('Administration'),
('Sales'),
('Humanities');

INSERT INTO roles (title, salary, department_id)
VALUES
('General Manager', 100000, 1),
('Lead Sales', 60000, 4),
('Accountant', 80000, 2),
('Receptionist', 50000, 3),
('Human Resource Manager', 65000, 5);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
('Michael', 'Scott', 1),
('Jim', 'Halpert', 2),
('Angela', 'Martin', 3),
('Pam', 'Beesley', 4),
('Toby', 'Flenderson', 5);