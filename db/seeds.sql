-- Department Tables
INSERT INTO department (name)
VALUES ("Human Resource"),
       ("Management"),
       ("Admin"),
       ("Engineers");

-- Roles Tables
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 99000, 2),
       ("Assistant Manager", 88000, 2),
       ("Accountant", 35000, 1),
       ("Receptionist", 21000, 3),
       ("HR Manager", 45000, 1),
       ("Product Manager", 65000, 1),
       ("Techinician", 10000, 4);

-- Employees Tables
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Malala", "Devi", 1, NULL),
       ("Mayson", "Truff", 2, 1),
       ("Tom", "Kash", 3, 1),
       ("Victor", "Zaiden", 2, 3),
       ("Benjamin", "Huff", 3, 2),
       ("David", "Chan", 2, NULL),
       ("Weldy", "Josephin", 4, 2),
       ("Malia", "Brown", 4, 3),
       ("Robert", "Rodrigoz", 2, NULL);