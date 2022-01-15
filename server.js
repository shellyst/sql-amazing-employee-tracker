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

function viewAll() {}

function addEmployee() {
  db.query("SELECT * FROM roles", (err, res) => {
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
  db.query("SELECT * FROM roles;", (err, res) => {
    inquirer.prompt([
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
    ]);
  });
}

function viewRoles() {
  db.query("SELECT * FROM roles;", (err, res) => {
    if (err) throw err;
    console.table(res);
    mainQuestion();
  });
}

function update() {}
