const inquirer = require("inquirer");
const mysql = require("mysql2");
const logo = require("asciiart-logo");
require("console.table")

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root",
    database: "thcompany_db",
  },
  console.log("Connected to the database")
);
function startApp(){
const title = logo({
  name: "employeeTracker"
}).render()
console.log(title);
inquirer.prompt([
  {
    type: "list",
    name: "menu",
    message: " What do first:",
    choices: ["View all dept", "View all roles", "View all emp", "Add a dept", "Add a role", "Add an emp", "Update an emp", "Quit"],
  }
]).then((userChoice) => {
  console.log(" I picked" + userChoice.menu)
  switch(userChoice.menu){
    case "View all dept": 
    viewDept();
    break;
    case "View all roles": 
    viewRole();
    break;
    case "View all emp": 
    viewEmp();
    break;
    case "Add a dept": 
    addDept();
    break;
    case "Add a role": 
    addRole();
    break;
    case "Add an emp": 
    addEmp();
    break;
    case "Update an emp": 
    updateEmp();
    break;
    case "Quit": 
    quit();
    break;
  }
})
}
function viewDept(){
  db.query("SELECT id AS department_id, name AS department_name FROM department;", function(err,res){
    err ? console.log(err) : console.table(res), startApp();
  })
}
function viewRole(){
  db.query("SELECT role.id AS role_id, role.title AS job_title, role.salary, department.name AS department_name FROM role JOIN department ON role.department_id;", function(err,res){
    err ? console.log(err) : console.table(res), startApp();
  })
}
function viewEmp(){
  db.query("SELECT e.id AS employee_id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;", function(err,res){
    err ? console.log(err) : console.table(res), startApp();
  })
}
function addDept(){
  inquirer.prompt([
    {
      type: "input",
      name: "add_department",
      message: "What dept you want to add"
    }
  ]).then((userChoice) => {
    let departmentName = userChoice.add_department
    db.query("INSERT INTO department(name) VALUES (?)", [departmentName], function(err,res){
      err ? console.log(err) : console.table(res), viewDept();
    })
  })
}
startApp()