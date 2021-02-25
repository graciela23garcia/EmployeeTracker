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
      prompts();
    });
  }
function viewDepartments() {
    connection.query("SELECT * FROM department", (err, res) => {
      if (err) throw err;
      console.table(res);
      prompts();
    });
  }

function viewRoles() {
    connection.query("SELECT * FROM role", (err, res) => {
      if (err) throw err;
      console.table(res);
      prompts();
    });
  }

  
function updateEmployeeRole() {
    connection.query(
      "SELECT role.id, title, first_name, last_name, employee.id, employee.role_id FROM role LEFT JOIN employee on role.id = employee.role_id;",
      (err, res) => {
        if (err) throw err;
        let employee_ids = res.map(({ id, first_name, last_name }) => ({
          name: first_name + " " + last_name,
          value: id,
        }));
        let role_ids = res.map(({ role_id, title }) => ({
          name: title,
          value: role_id,
        }));
        console.table(res);
        inquirer
          .prompt([
            {
              type: "list",
              name: "employee_id",
              message: "What is the employee's name?",
              choices: employee_ids,
            },
            {
              type: "list",
              name: "newrole_id",
              message: "What is the new role title?",
              choices: role_ids,
            },
          ])
          .then((data) => {
            connection.query(
              "UPDATE employee SET ? WHERE ?",
              [{ role_id: data.newrole_id }, { id: data.employee_id }],
              (err, res) => {
                if (err) throw err;
                console.log(res.affectedRows + " has been updated!\n");
                prompts();
              }
            );
          });
      }
    );
  }
