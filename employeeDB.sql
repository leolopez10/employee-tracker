DROP DATABASE IF EXISTS employee_DB;
CREATE database employee_DB;

USE employee_DB;


CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE employee_role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(role_id) REFERENCES employee_role(id),
  FOREIGN KEY(manager_id) REFERENCES employee_role(id)
);


-- creating departments

INSERT INTO department (department_name)
VALUES ("operations");

INSERT INTO department (department_name)
VALUES ("marketing");

-- creating employee-roles

INSERT INTO employee_role (title, salary, department_id)
VALUES ("COO", 125000.00, 1);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("Manager", 85000.00, 1);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("employee", 50000.00, 1);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("PR Lead", 85000.00, 2);

INSERT INTO employee_role (title, salary, department_id)
VALUES ("PR Associate", 50000.00, 2);


-- creating employees

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Leo", "Lopez", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Blake", "Patterson", 5, null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rodrigo", "Liques", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Alberto", "Rodriguez", 3, null);


-- reads all of the employee list

SELECT 
	employee.id,
	employee.first_name, 
	employee.last_name, 
	employee_role.title, 
	department.department_name, 
	employee_role.salary
    employee_role
FROM 
	employee
INNER JOIN 
	employee_role ON employee.role_id=employee_role.id OR employee.manager_id=employee_role.id
INNER JOIN 
	department ON employee_role.department_id=department.id
ORDER BY
	employee.id
ASC;


-- Reads all employee by department

SELECT 
	employee.id,
	employee.first_name, 
	employee.last_name, 
	employee_role.title, 
	department.department_name, 
	employee_role.salary
FROM 
	employee
INNER JOIN 
	employee_role ON employee.role_id=employee_role.id OR employee.manager_id=employee_role.id
INNER JOIN 
	department ON employee_role.department_id=department.id
WHERE
	department.department_name="marketing"
ORDER BY
	employee.id
ASC;

-- View all employees by manager
    
SELECT 
	employee.id,
	employee.first_name, 
	employee.last_name, 
	employee_role.title, 
	department.department_name, 
	employee_role.salary
FROM 
	employee
INNER JOIN 
	employee_role ON employee.role_id=employee_role.id OR employee.manager_id=employee_role.id
INNER JOIN 
	department ON employee_role.department_id=department.id
WHERE
	employee_role.title="Manager"
ORDER BY
	employee.id
ASC;


select * from department;
select * from employee_role;
SELECT * FROM employee;
