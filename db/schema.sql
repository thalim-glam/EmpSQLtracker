DROP DATABASE IF EXISTS thcompany_db;
CREATE DATABASE thcompany_db;
USE thcompany_db;

DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    CONSTRAINT fk_role  FOREIGN KEY (role_id)  REFERENCES role(id)  ON DELETE CASCADE,
    manager_id INT,
    CONSTRAINT fk_manager  FOREIGN KEY (manager_id)  REFERENCES employee(id)  ON DELETE SET NULL
   
);
