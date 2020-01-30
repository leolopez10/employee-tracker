//======================================
//Dependencies
//======================================

var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
require("dotenv").config();

//================================================================
//Establishing database connections
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
    openingQuestions();
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
            name: "action",
            type: "rawlist",
            message: "Navigate Employee DataBase \n What would you like to do?",
            choices: [
                "View All Employees",
                "View Employees by Departments",
                "View Departments",
                "View Employee Roles",
                "Create New Department",
                "Create New Employee Role",
                "Add New Employee",
                "Update Employee Role",
                "EXIT"


            ]

        }])
        .then(function(answer) {
            switch (answer.action) {
                case "View All Employees":
                    getAllEmployees();
                    break;
                case "View Employees by Departments":
                    getEmployeeByDepartments();
                    break;
                case "View Departments":
                    getDepartments();
                    break;
                case "View Employee Roles":
                    getEmployeeRoles();
                    break;
                case "Create New Department":
                    createDepartment();
                    break;
                case "Create New Employee Role":
                    createRole();
                    break;
                case "Add New Employee":
                    createEmployee();
                    break;
                case "Update Employee Role":
                    updateEmployee();
                    break;
                case "EXIT":
                    connection.end();
                default:
                    connection.end();
            }
        })
}


//==============================
//CRUD functions for SQL table
//==============================

//Select all employee Data
function getAllEmployees() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.department_name, employee_role.salary FROM employee INNER JOIN employee_role ON employee.role_id=employee_role.id OR employee.manager_id=employee_role.id INNER JOIN department ON employee_role.department_id=department.id ORDER BY employee.id ASC;"

    connection.query(query, function(err, res) {
        console.table(res);
        openingQuestions();
    })
}

// Get employees by Departments
function getEmployeeByDepartments() {
    //Select all departments to add them as choices for the user
    var departmentQuery = "SELECT * FROM department;"
    connection.query(departmentQuery, function(err, res) {
        if (err) throw err;
        //Prompt user to choose specific department
        inquirer
            .prompt([{
                name: "department",
                type: "list",
                message: "Choose a Department",
                choices: function() {
                    let departments = [];
                    for (let i = 0; i < res.length; i++) {
                        departments.push(res[i].department_name);
                    }
                    return departments
                }
            }]).then(function(answer) {

                console.log(answer.department.toUpperCase());
                var query = "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.department_name, employee_role.salary FROM employee INNER JOIN employee_role ON employee.role_id=employee_role.id OR employee.manager_id=employee_role.id INNER JOIN department ON employee_role.department_id=department.id WHERE department.department_name= ? ORDER BY employee.id ASC;"

                connection.query(query, [answer.department], function(err, employeeRes) {
                    console.table(employeeRes);
                    openingQuestions();
                })

            })
    })

}



//Select all departmnets
let getDepartments = function() {
    var query = "SELECT * FROM department;"

    connection.query(query, function(err, res) {
        console.table(res);
        openingQuestions();
    })
}

//Selecting all employee roles
let getEmployeeRoles = function() {
    var query = "SELECT * FROM employee_role;"

    connection.query(query, function(err, res) {
        console.table(res);
        openingQuestions();
    })
}

let createDepartment = function() {
    inquirer
        .prompt([{
            name: "department_name",
            type: "input",
            message: "What is the name of the department?"
        }])
        .then(function(answer) {
            var query = "INSERT INTO department (department_name) VALUES (?);"
            connection.query(query, [answer.department_name], function(err, res) {
                console.table(res);
                console.log("Successfully created new department");
                openingQuestions();
            })

        })

}

//================================================================
//Create class files for creating an employee, department, or role
//================================================================

// deleteDepartments = () => {
//     connection.query("SELECT * FROM department", function(err, results) {
//         if (err) throw err;

//         inquirer
//             .prompt([{
//                 type: "rawlist",
//                 name: "deleteColm",
//                 choices: function() {
//                     var choiceArray = [];
//                     for (var i = 0; i < results.length; i++) {
//                         choiceArray.push(results[i].name)
//                     }
//                     return choiceArray;
//                 },
//                 message: "Which department would you like to delete?"
//             }]).then((result) => {
//                 connection.query(`SELECT id FROM department WHERE name = "${result.deleteColm}"`, function(err, departmentResults) {
//                     if (err) throw err;
//                     // console.log(employeeResults);
//                     var departmentID = departmentResults[0].id;
//                     // console.log(employeeID);

//                     connection.query(
//                         "DELETE FROM department WHERE ?", {
//                             id: departmentID
//                         },
//                         function(err, res) {
//                             if (err) throw err;
//                             console.log(res.affectedRows + " department deleted!\n");
//                         }
//                     )

//                     showAll(`department`);
//                     // start();
//                 })


//             })


//     })
// };