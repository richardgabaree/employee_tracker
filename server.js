const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
const { throwError } = require("rxjs");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "J@hntanious1",
  database: "employeetracker_db",
});

inquirer
  .prompt({
    name: "action",
    type: "list",
    message: "What do you want to do?",
    choices: [
      "Add department",
      "Add role",
      "Add employee",
      "View departments",
      "View roles",
      "View employees",
      "Update employee role",
      "Exit",
    ],
  })
  .then((answer) => {
    switch (answer.action) {
      case "Add department":
        addDept();
        break;

      case "Add role":
        addRole();
        break;

      case "Add employee":
        addEmployee();
        break;

      case "View departments":
        viewDept();
        break;

      case "View roles":
        viewRoles();
        break;

      case "View employees":
        viewEmployees();
        break;

      case "Update employee role":
        updateRole();
        break;

      case "exit":
        connection.end();
        break;

      default:
        console.log(`Invalid action: ${answer.action}`);
        break;
    }
  });

// View Departments
const viewDept = () => {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) throwError;
    console.table(res);
    
  });
};

// view roles
const viewRoles = () => {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) throwError;
    console.table(res);
  });
};

const viewEmployees = () => {
  connection.query("SELECT * FROM employees", (err, res) => {
    if (err) throwError;
    console.table(res);
  });
};
//add dept
function addDept() {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What Department would you like to add?",
      },
    ])
    .then(function (res) {
      connection.query(
        `INSERT INTO departments (department)VALUES ("${res.department}")`,
        {
          department: res.departments,
        },
        function (err) {
          if (err) throwError;
          console.table(res);
        }
      );
    });
}

//============= Add Employee Role ==========================//
function addRole() {
  connection.query(
    "SELECT role.title AS Title, role.salary AS Salary FROM roles",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the roles Title?",
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?",
          },
        ])
        .then(function (res) {
          connection.query(
            "INSERT INTO roles SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function (err) {
              if (err) throw err;
              console.table(res);
            }
          );
        });
    }
  );
}

// Add employee
const roleArr = [];
function selectRole() {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
}
//Select Role Quieries The Managers for Add Employee Prompt ===========//
const managersArr = [];
function selectManager() {
  connection.query(
    "SELECT first_name, last_name FROM employees WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managersArr.push(res[i].first_name);
      }
    }
  );
  return managersArr;
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Enter their first name ",
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter their last name ",
      },
      {
        name: "role",
        type: "list",
        message: "What is their role? ",
        choices: selectRole(),
      },
      {
        name: "choice",
        type: "rawlist",
        message: "Whats their managers name?",
        choices: selectManager(),
      },
    ])
    .then(function (val) {
      const roleId = selectRole().indexOf(val.role) + 1;
      const managerId = selectManager().indexOf(val.choice) + 1;
      connection.query(
        "INSERT INTO employees SET ?",
        {
          first_name: val.firstname,
          last_name: val.lastname,
          manager_id: managerId,
          role_id: roleId,
        },
        function (err) {
          if (err) throw err;
          console.table(val);
        }
      );
    });
}

// Update Employee
function updateRole() {
  connection.query(
    "SELECT employees.last_name, roles.title FROM employees JOIN roles ON employees.role_id = roles.id;",
    function (err, res) {
      // console.log(res)
      if (err) throw err;
      console.log(res);
      inquirer
        .prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function () {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole(),
          },
        ])
        .then(function (val) {
          var roleId = selectRole().indexOf(val.role) + 1;
          connection.query(
            "UPDATE employees SET WHERE ?",
            {
              last_name: val.lastName,
              role_id: roleId,
            },
            function (err) {
              if (err) throwError;
              console.table(val);
            }
          );
        });
    }
  );
}
