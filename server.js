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
function startApp() {
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
    console.log(" User Choose " + userChoice.menu)
    switch (userChoice.menu) {
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
//--------------------------------------- VIEW DEPARTMENT ---------------------------------
function viewDept() {
  db.query("SELECT id AS department_id, name AS department_name FROM department;", function (err, res) {
    err ? console.log(err) : console.table(res), startApp();
  })
}
//--------------------------------------- VIEW ROLE ---------------------------------
function viewRole() {
  db.query("SELECT role.id AS role_id, role.title AS job_title, role.salary, department.name AS department_name FROM role JOIN department ON role.department_id;", function (err, res) {
    err ? console.log(err) : console.table(res), startApp();
  })
}
//--------------------------------------- VIEW EMPLOYEE ---------------------------------
function viewEmp() {
  db.query("SELECT e.id AS employee_id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;", function (err, res) {
    err ? console.log(err) : console.table(res), startApp();
  })
}
//---------------------------------------ADDING DEPARTMENT ---------------------------------
function addDept() {
  inquirer.prompt([
    {
      type: "input",
      name: "add_department",
      message: "What dept you want to add?"
    }
  ]).then((userChoice) => {
    let departmentName = userChoice.add_department
    db.query("INSERT INTO department(name) VALUES (?)", [departmentName], function (err, res) {
      err ? console.log(err) : console.table(res), viewDept();
    })
  })
}
//---------------------------------------ADDING ROLE ---------------------------------
function addRole() {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) {
      console.log(err);
      return;
    }
    const departmentChoices = res.map((department) => ({
      value: department.id,
      name: department.dept_name,
    }));
    inquirer.prompt([
      {
        type: "input",
        name: "addingRole",
        message: "What role you want to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of this Role?",
      },
      {
        type: "list",
        name: "deptId",
        message: "witch department does this belong to?",
        choices: departmentChoices,
      },
    ])
      .then((userChoice) => {
        console.log("Role added:  " + userChoice.addARole);
        let departmentId = userChoice.deptId;
        let roleName = userChoice.addARole;
        let roleSalary = userChoice.salary;
        db.query(
          `INSERT INTO role (title, salary, department_id) 
          VALUES ('${roleName}', '${roleSalary}', '${departmentId}')`, function (err, results) {
          err ? console.log(err) : console.table(res), viewRole();
        }
        );
      });
  });
}
//---------------------------------------ADDING EMPLOYEE ---------------------------------
function addEmp() {
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) {
      console.log(err);
      return;
    }
    const empList = res.map((employee) => ({
      name: employee.first_name.concat(" ", employee.last_name),
      value: employee.id,
    }));
    db.query("SELECT * FROM role", function (err, res) {
      const roleList = res.map((role) => ({
        value: role.id,
        name: role.title,
      }));
      return inquirer.prompt([
        {
          type: "input",
          name: "first",
          message: "What is the first name of the employee?",
        },
        {
          type: "input",
          name: "last",
          message: "What is the last name of the employee?",
        },
        {
          type: "list",
          name: "role",
          message: "What is the role of the employee?",
          choices: roleList,
        },
        {
          type: "list",
          name: "manager",
          message: "Who is the manager of the employee?",
          choices: empList,
        }
      ]).then((userChoice) => {
        console.log("New employee " + userChoice.first + " " + userChoice.last + " added to the database.");
        const sql = `INSERT INTO employee SET first_name='${userChoice.first}', last_name='${userChoice.last}', role_id='${userChoice.role}',manager_id=${userChoice.manager};`
        db.query(sql, function (err, res) {
          err ? console.log(err) : console.table(res), viewEmp();
        })
      })
    });
  });
}
startApp()