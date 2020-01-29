DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
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
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);


-- creating departments

INSERT INTO department (department_name)
VALUES ("operations");

INSERT INTO department (department_name)
VALUES ("marketing");

INSERT INTO department (department_name)
VALUES ("coaching");

INSERT INTO department (department_name)
VALUES ("playing");

-- creating employee-roles

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Director", 125000.00, 1);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Manager", 85000.00, 1);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Manager", 85000.00, 2);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Manager", 85000.00, 3);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("employee", 50000.00, 1);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("employee", 50000.00, 2);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("employee", 50000.00, 3);

-- creating employees

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Leo", "Lopez", 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Blake", "Patterson", 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Rodrigo", "Liques", 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Alberto", "Rodriguez", 4);







SELECT * FROM employee;
select * from department;
select * from employee_role;
