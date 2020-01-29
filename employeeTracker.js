//======================================
//Dependencies
//======================================

var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
require("dotenv").config();

//================================================================
//Establishing Server connections
//================================================================

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "employee_DB"
});

//================================================================
//Initiate Applications by calling async function that runs it all
//================================================================

connection.connect(function(err) {
    if (err) throw err;
    // runEmployeeTracker();
    getAllEmployees();
});


//================================================================
//Create an async function that runs the program
//================================================================

async function runEmployeeTracker() {
    try {

    } catch (err) {
        console.log(err);
        throw err;
    }
}

//================================================================
//Create functions for opening questions and follow up questions
//================================================================

function openingQuestions() {
    inquirer.
    prompt([{
        type: "rawlist",
        message: "Navigate Employee DataBase \n What would you like to do?",
        choices: [
            "View all employees",
            "View all employees by department",
            "View all employes by manager",
            "Add a department",
            "Add a role",
            "Add an employee",
            "Update employee information",
            "Remove employee from database",
        ]

    }])
}


function getAllEmployees() {
    var query =
        `SELECT 
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
        ORDER BY
        employee.id
        ASC;`

    connection.query(query, function(err, res) {
        for (var i = 0; i < res.length; i++) {
            let employeeData = {
                id: res[i].id,
                first_name: res[i].first_name,
                last_name: res[i].last_name,
                title: res[i].title,
                department_name: res[i].department_name,
                salary: res[i].salary
            }
            console.table([employeeData]);
        }
    })
}
//================================================================
//Create class files for creating an employee, department, or role
//================================================================