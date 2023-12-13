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
    name: "Tasnim's Employee Tracker"
  }).render()
  console.log(title);
  inquirer.prompt([
    {
      type: "list",
      name: "menu",
      message: " What information you want to see from the database? ",
      choices: ["View all departments", "View all roles", "View all employees", "Add a new department", "Add a new role", "Add an employee", "Remove a department(BONUS)", "Remove an employee(BONUS)", "Remove a Role(BONUS)", "Update an employee role", "BONUS- Update an employee's manager", "BONUS- View emp by dept", "BONUS- View all employees by manager", "Restart"],
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
      case "Remove a department(BONUS)":
        removeDept();
        break;
      case "Remove an employee(BONUS)":
        removeEmp();
        break;
      case "Remove a Role(BONUS)":
        removeRole();
        break;
      case "Update an employee role":
        updateEmpRole();
        break;
      case "BONUS- Update an employee's manager":
        updateEmpManager();
        break;
      case "BONUS- View emp by dept":
        viewEmpbyD();
        break;
      case "BONUS- View all employees by manager":
        viewEmpbyM();
        break;
      case "Restart":
        startApp();
        break;
    }
  })
}
//--------------------------------------- VIEW ALL DEPARTMENT ---------------------------------
function viewDept() {
  db.query("SELECT id AS department_id, name AS department_name FROM department;", function (err, res) {
    err ? console.log(err) : console.table(res), startApp();
  })
}
//--------------------------------------- VIEW ALL ROLE -----------------------------------------------
function viewRole() {
  db.query("SELECT role.id AS role_id, department.name AS department_name, role.title AS job_title, role.salary FROM role JOIN department ON role.department_id ORDER BY department_name;", function (err, res) {
    err ? console.log(err) : console.table(res), startApp();
  })
}
//--------------------------------------- VIEW ALL EMPLOYEE -------------------------------------------
function viewEmp() {
  db.query("SELECT e.id AS employee_id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id ORDER BY employee_id;", function (err, res) {
    err ? console.log(err) : console.table(res), startApp();
  })
}
//---------------------------------------ADDING A DEPARTMENT ---------------------------------
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
//---------------------------------------ADDING A ROLE ---------------------------------
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
//---------------------------------------ADDING AN EMPLOYEE ---------------------------------
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

  db.query("SELECT d.name AS department, e.id AS employee_id, e.first_name, e.last_name, r.title AS job_title, r.salary FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id ORDER BY d.name ASC;", function (err, res) {
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
function viewEmpbyM() {
  db.query("SELECT e.id AS employee_id, CONCAT(e.first_name, ' ', e.last_name) AS employee_name, r.title AS job_title, d.name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id ORDER BY manager_name;", function (err, res) {
    err ? console.log(err) : console.table(res);
  })
}
//---------------------------------------UPDATE EMPLOYEE'S MANAGER --------------------------------------
function updateEmpManager() {
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
          message: "Who is the employee?",
          choices: empList,
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
          message: "Who is going to be the new manager?",
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
//---------------------------------------DELETE A DEPARTMENT --------------------------------------------
function removeDept() {
  const sql1 = `SELECT department.id, department.name FROM department;`
  db.query(sql1, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    const dept = res.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`
    }));
    console.table(res);
    return inquirer.prompt([
      {
        type: "list",
        name: "dept",
        message: "Delete this Department",
        choices: dept
      }
    ]).then((res) => {
      const sql = `DELETE FROM department WHERE ?`;
      db.query(sql, { id: res.dept }, (err, res) => {
        console.log(" Delete department from database...");
        console.log(" ");
        err ? console.log(err) : console.table(res), viewDept();
      })
    })
  })
}
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
        err ? console.log(err) : console.table(res);
      })
    })
  })
}
//---------------------------------------DELETE AN EMPLOYEE ROLE ----------------------------------------
function removeRole() {
  const sql1 = `SELECT role.id, role.title FROM role;`
  db.query(sql1, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    const roles = res.map(({ id, title }) => ({
      value: id,
      name: `${id} ${title}`
    }));
    console.table(res);
    return inquirer.prompt([
      {
        type: "list",
        name: "roles",
        message: "Which Role you want to delete from database?",
        choices: roles
      }
    ]).then((res) => {
      const sql = `DELETE FROM role WHERE ?`;
      db.query(sql, { id: res.roles }, (err, res) => {
        console.log(" Deleting employee role from database...");
        console.log(" ");
        err ? console.log(err) : console.table(res);
      })
    })
  })
}

startApp();