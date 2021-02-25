var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");


//creating connection to the database
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "elemelon23",
    database: "employeesDB"
});
connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});