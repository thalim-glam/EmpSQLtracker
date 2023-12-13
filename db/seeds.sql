-- Department Tables
INSERT INTO department (name)
VALUES ("Human Resource"),
       ("Management"),
       ("Sales"),
       ("Front Desk");

-- Roles Tables
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 70000, 2),
       ("Assistant Manager", 50000, 2),
       ("Accountant", 40000, 1),
       ("Salesman", 25000, 3),
       ("HR", 30000, 1),
       ("Intern", 10000, 4);

-- Employees Tables
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kamala", "Harris", 1, NULL),
       ("Mayson", "Truff", 2, 1),
       ("Tylor", "Swift", 3, 1),
       ("Victor", "Zaiden", 2, NULL),
       ("Benjamin", "Huff", 3, 2),
       ("David", "Copperfield", 2, NULL),
       ("Weldy", "Josephin", 4, 2),
       ("Ratan", "Tataa", 4, NULL);