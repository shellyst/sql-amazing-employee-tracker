const inquirer = require("inquirer");
const db = require("./db/connection");
const table = require("console.table");

db.connect((err) => {
  if (err) throw err;
  console.log("connected");
  mainQuestion();
});

function mainQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "main",
        message: "What would you like to do?",
        choices: [
          "View All",
          "Add Employee",
          "View Employees",
          "Add Department",
          "View Departments",
          "Add Role",
          "View Roles",
          "Update Employees Role",
          "Done",
        ],
      },
    ])
    .then((answer) => {
      if (answer.main === "View All") {
        viewAll();
      } else if (answer.main === "Add Employee") {
        addEmployee();
      } else if (answer.main === "View Employees") {
        viewEmployees();
      } else if (answer.main === "Add Department") {
        addDepartment();
      } else if (answer.main === "View Departments") {
        viewDepartments();
      } else if (answer.main === "Add Role") {
        addRole();
      } else if (answer.main === "View Roles") {
        viewRoles();
      } else if (answer.main === "Update Employees Role") {
        update();
      } else {
        db.end();
      }
    });
}

function viewAll() {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
    (err, res) => {
      if (err) throw err;
      console.table(res);
      mainQuestion();
    }
  );
}

function addEmployee() {
  db.query("SELECT * FROM role", (err, res) => {
    let ids = res.map((item) => item.id);

    inquirer
      .prompt([
        {
          type: "input",
          name: "first",
          message: "What is the employees first name?",
        },
        {
          type: "input",
          name: "last",
          message: "What is the employees last name?",
        },
        {
          type: "list",
          name: "role_id",
          message: "What is the employees role_id?",
          choices: ids,
        },
      ])
      .then((answers) => {
        db.query("INSERT INTO employee SET ?", {
          first_name: answers.first,
          last_name: answers.last,
          role_id: answers.role_id,
        });
        mainQuestion();
      });
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employee;", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainQuestion();
  });
}

function addDepartment() {
  db.query("SELECT * FROM department;", (err, res) => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "department",
          message: "What department would you like to add?",
        },
      ])
      .then((answers) => {
        db.query("INSERT INTO department SET ?", {
          name: answers.department,
        });
        mainQuestion();
      });
  });
}

function viewDepartments() {
  db.query("SELECT * FROM department;", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainQuestion();
  });
}

function addRole() {
  db.query("SELECT * FROM department;", (err, res) => {
    let ids = res.map((item) => item.id);

    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of the role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary for this role?",
        },
        // department id?
        {
          type: "input",
          name: "role",
          choices: ids,
          message: "What role would you like to add?",
        },
      ])
      .then((answers) => {
        db.query("INSERT INTO role SET ?", {
          title: answers.title,
          salary: answers.salary,
          department_id: answers.department_id,
        });
        mainQuestion();
      });
  });
}

function viewRoles() {
  db.query("SELECT * FROM role;", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainQuestion();
  });
}

function update() {
  db.query("SELECT * FROM employee", (err, res) => {
    let staff = res.map(({ id, first_name }) => ({ id: id, name: first_name }));

    db.query("SELECT * FROM role", (err, res) => {
      let id = res.map((item) => item.id);

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee",
            choices: staff,
            message: "Which employee would you like to update?",
          },
          {
            type: "list",
            name: "role",
            choices: id,
            message: "Please select the new role:",
          },
        ])
        .then((answers) => {
          db.query(
            `SELECT * FROM employy WHERE first_name = '${answers.employee}' ;`,
            (err, data) => {
              let id = res.map((item) => item.id);

              db.query("UPDATE employee SET ? WHERE ?;", [
                { role_id: answers.role },
                { id: id[0] },
              ]);
              console.log("The role was updated.");
              mainQuestion();
            }
          );
        });
    });
  });
}
