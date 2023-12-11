// Department Tables
INSERT INTO department (name)
VALUES ("Human Resource"),
       ("Management"),
       ("Accounting"),
       ("Customer Care");

// Roles Tables
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 70000, 2),
       ("Assistant Manager", 50000, 1),
       ("Accountant", 40000, 3),
       ("Salesman", 25000, 4);

// Employees Tables
INSERT INTO employee (title, salary, department_id)
VALUES ("Manager", 70000, 2),
       ("Assistant Manager", 50000, 1),
       ("Accountant", 40000, 3),
       ("Salesman", 25000, 4);