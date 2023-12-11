-- Department Tables
INSERT INTO department (name)
VALUES ("Human Resource"),
       ("Management"),
       ("Accounting"),
       ("Customer Care");

-- Roles Tables
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 70000, 2),
       ("Assistant Manager", 50000, 1),
       ("Accountant", 40000, 3),
       ("Salesman", 25000, 4);

-- Employees Tables
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kamala", "Harris", 1, NULL),
       ("Donald", "Duck", 2, NULL),
       ("Amalia", "Amman", 3, NULL),
       ("Victor", "Zaiden", 2, NULL),
       ("Mickey", "Mulan", 3, NULL),
       ("David", "Copperfield", 2, NULL),
       ("Jashon", "Joshia", 4, NULL),
       ("Ratan", "Tataa", 4, NULL);