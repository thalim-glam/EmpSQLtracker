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
  name: "empTracker"
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

startApp()