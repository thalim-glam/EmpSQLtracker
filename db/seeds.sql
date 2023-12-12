-- Department Tables
INSERT INTO department (name)
VALUES ("Human Resource"),
       ("Management"),
       ("Accounting"),
       ("Customer Care"),
       ("Sales"),
       ("Front Desk");

-- Roles Tables
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 70000, 2),
       ("Assistant Manager", 50000, 1),
       ("Accountant", 40000, 3),
       ("Salesman", 25000, 4),
       ("HR", 30000, 1),
       ("Intern", 10000, 4);

-- Employees Tables
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kamala", "Harris", 1, NULL),
       ("Donald", "Duck", 2, 1),
       ("Amalia", "Amman", 3, NULL),
       ("Victor", "Zaiden", 2, NULL),
       ("Benjamin", "Mulan", 3, 2),
       ("David", "Copperfield", 2, NULL),
       ("Weldy", "Joshia", 4, NULL),
       ("Ratan", "Tataa", 4, NULL);