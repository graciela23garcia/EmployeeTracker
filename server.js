var mysql = require("mysql");
var inquirer = require("inquirer");
const { prompts } = require("inquirer");
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
    prompts();
});

function prompts() {
    inquirer
        .prompt({
                type: "list",
                name: "action",
                message: "What would you like to do?",
                choices: [
                    "view all employees",
                    "add employee",
                    "view all employees by department",
                    "view all departments",
                    "add department",
                    "view all roles",
                    "update employee role",
                    "add role",
                    "exit"
                ]
            })
            .then(function (answer) {
            switch (answer.action) {
                case "view all employees":
                    employeeView();
                    break;

                case "add employee":
                    addEmployee();
                    break;

                case "view all employees by department":
                    employeesByDepartment();
                    break;

                case "view all departments":
                    viewDepartments();
                    break;

                case "add department":
                    addDepartment();
                    break;

                case "view all roles":
                    viewRoles();
                    break;

                case "update employee role":
                    updateEmployeeRole();
                    break;

                case "add role":
                    addRole();
                    break;

                case "exit":
                    connection.end();
                    break;
            }
        });
}

function employeeView() {
    connection.query("SELECT * FROM employee", (err, res) => {
      if (err) throw err;
      console.table(res);
      employeeQuesInit();
    });
  }