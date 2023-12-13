const inquirer = require("inquirer");
const mysql = require("mysql2");
const logo = require("asciiart-logo");
require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
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
      message: " What information you want to see from the database? ",
      choices: ["View all departments", "View all roles", "View all employees", "Add a new department", "Add a new role", "Add an employee", "Remove an employee", "Update an employee role", "BONUS- View emp by dept", "Restart"],
    }
  ]).then((userChoice) => {
    console.log(" User Choose " + userChoice.menu + "!")
    switch (userChoice.menu) {
      case "View all departments":
        viewDept();
        break;
      case "View all roles":
        viewRole();
        break;
      case "View all employees":
        viewEmp();
        break;
      case "Add a new department":
        addDept();
        break;
      case "Add a new role":
        addRole();
        break;
      case "Add an employee":
        addEmp();
        break;
      case "Remove an employee":
        removeEmp();
        break;
      case "Update an employee role":
        updateEmpRole();
        break;
      case "BONUS- View emp by dept":
        viewEmpbyD();
        break;
      case "Restart":
        startApp();
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
      message: "What department you want to add?"
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

    return inquirer.prompt([
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
        message: "Which department does this belong to?",
        choices: departmentChoices,
      },
    ])
      .then((userChoice) => {
        console.log("Role added:  " + userChoice.addingRole);
        let departmentId = userChoice.deptId;
        let roleName = userChoice.addingRole;
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
//---------------------------------------UPDATE AN EMPLOYEE ROLE ---------------------------------

function updateEmpRole() {
  db.query("SELECT * FROM employee", function (err, res) {
    if (err) {
      console.log(err);
      return;
    }
    empList = res.map((employee) => ({
      name: employee.first_name.concat(" ", employee.last_name),
      value: employee.id,
    })
    );

    db.query("SELECT * FROM role", function (err, res) {
      roleList = res.map((role) => ({
        value: role.id,
        name: role.title,
      }));

      return inquirer.prompt([
        {
          type: "list",
          name: "employee",
          message: "Which role of an employee you want to change?",
          choices: empList,
        },
        {
          type: "list",
          name: "role",
          message: "Which role this employee is going to have?",
          choices: roleList,
        },
        {
          type: "list",
          name: "manager",
          message: "Who wiil be the manager of this employee?",
          choices: empList,
        }
      ]).then((userChoice) => {
        const sql2 = `UPDATE employee SET role_id=${userChoice.role}, manager_id=${userChoice.manager} WHERE id=${userChoice.employee};`
        db.query(sql2, function (err, res) {
          err ? console.log(err) : console.table(res), viewEmp();
        })
        console.log(" An Employee information is being updated! ");
      });
    });
  });
}
//---------------------------------------VIEW EMP BY DEPARTMENT ---------------------------------

function viewEmpbyD() {
  console.log("BONUS: View employees by Department ");
  db.query("SELECT e.id AS employee_id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;", function (err, res) {
    if (err) {
      console.log(err);
      return;
    }

    const deptChoice = res.map((employee) => ({
      value: employee.employee_id,
      name: employee.department,
    }));
    return inquirer.prompt([
      {
        type: "list",
        name: "deptName",
        message: "Which department you want to see?",
        choices: deptChoice,
      }
    ]).then((userChoice) => {
      const sql1 = `SELECT e.id, e.first_name, e.last_name, r.title AS role, d.name AS department FROM employee e LEFT JOIN role r ON e.role_id = r.id LEFT JOIN department d ON d.id = r.department_id WHERE e.id=${userChoice.deptName};`
      db.query(sql1, function (err, res) {
        console.log(" View employees by Department...");
        console.log(" ");
        err ? console.log(err) : console.table(res), startApp();
      })
    });
  });
}
//---------------------------------------VIEW EMP BY MANAGER --------------------------------------------

//---------------------------------------UPDATE EMPLOYEE'S MANAGER --------------------------------------

//---------------------------------------DELETE A DEPARTMENT --------------------------------------------

//---------------------------------------DELETE AN EMPLOYEE ---------------------------------------------
function removeEmp() {
  const sql1 = `SELECT employee.id, employee.first_name, employee.last_name FROM employee;`
  db.query(sql1, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    const employee = res.map(({ id, first_name, last_name }) => ({
      value: id,
      name: `${id} ${first_name} ${last_name}`
    }));
    console.table(res);
    return inquirer.prompt([
      {
        type: "list",
        name: "employee",
        message: "Delete this Employee",
        choices: employee
      }
    ]).then((res) => {
      const sql = `DELETE FROM employee WHERE ?`;
      db.query(sql, { id: res.employee }, (err, res) => {
        console.log(" Delete employee from database...");
        console.log(" ");
        err ? console.log(err) : console.table(res), startApp();
      })
    })
  })

}
//---------------------------------------DELETE AN EMPLOYEE ROLE ----------------------------------------

startApp()