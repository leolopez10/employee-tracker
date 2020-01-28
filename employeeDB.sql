DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL,
  PRIMARY KEY(id)
 -- FOREIGN KEY(role_id) REFERENCES employee_role(id),
 -- FOREIGN KEY(manager_id) REFERENCES employee_role(id)
);

CREATE TABLE employee_role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY(id)
 -- FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

SELECT * FROM employee;
select * from department;
select * from employee_role;
