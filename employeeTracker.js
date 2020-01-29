var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
require("dotenv").config();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "employee_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(connection.threadId);
});