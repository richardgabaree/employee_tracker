const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');

const connection = mysql.createConnection ({
    host: 'localhost',
    port : 3000,
    user: 'root',
    password: 'J@hntnaious1',
    database: 'employeetracker_db'
});

    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What do you want to do?',
        choices: [
                'Add department',
                'Add role',
                'Add employee',
                'View departments',
                'View roles',
                'View employees',
                'Update employee role',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Add department':
                    addDept();
                    break;      

                case 'Add role':
                    addRole();
                    break;  
                
                case 'Add employee':
                    addEmployee();
                    break;

                case 'View departments':
                    viewDept();
                    break;
                
                case 'View roles':
                    viewRoles();
                    break;

                case 'View employees':
                    viewEmployees();
                    break;
                
                case 'Update employee role':
                    updateRole();
                    break;
            
                case 'exit':
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
        }
    });

// View Departments
const viewDept = () => {
    connection.query('SELECT * FROM departments', (err, res) => {
      if (err) throw err;
      res.forEach(({name}) => {
          console.log(res$,{name});

    });
  });

//   connection.end();
//   const readRoles = () => {
//     connection.query('SELECT * FROM roles', (err, res) => {
//       if (err) throw err;
  
//       // Log all results of the SELECT statement
//       console.log(res);
//       connection.end();
//     });
//   };

// // Add Department
// function addDept(){

//     inquirer.prompt({

//             // Prompt user for name of department
//             name: "deptName",
//             type: "input",
//             message: "Department Name: "
//         }).then((answer) => {
                
//             // add department to the table
//             connection.query(`INSERT INTO departments (name)VALUES ("${answer.deptName}"`, (err, res) => {
//                 if(err) 
//                 console.log("\n DEPARTMENT ADDED...\n ");
//             });
//                 res.render('department', departments[i])
//         });
// }

// // Add Role
// function addRole(){

//     // Create array of departments
//     let departmentArr = [];

//     // Create connection using promise-sql
//     promisemysql.createConnection(connectionProperties)
//     .then((conn) => {

//         // Query all departments
//         return conn.query('SELECT id, name FROM department ORDER BY name ASC');

//     }).then((departments) => {
        
//         // Place all departments in array
//         for (i=0; i < departments.length; i++){
//             departmentArr.push(departments[i].name);
//         }

//         return departments;
//     }).then((departments) => {
        
//         inquirer.prompt([
//             {
//                 // Prompt user role title
//                 name: "roleTitle",
//                 type: "input",
//                 message: "Role title: "
//             },
//             {
//                 // Prompt user for salary
//                 name: "salary",
//                 type: "number",
//                 message: "Salary: "
//             },
//             {   
//                 // Prompt user to select department role is under
//                 name: "dept",
//                 type: "list",
//                 message: "Department: ",
//                 choices: departmentArr
                
//             }]).then((answer) => {

//                 // Set department ID variable
//                 let deptID;

//                 // get id of department selected
//                 for (i=0; i < departments.length; i++){
//                     if (answer.dept == departments[i].name){
//                         deptID = departments[i].id;
//                     }
//                 }
//                 // Added role to role table
//                 connection.query(`INSERT INTO role (title, salary, department_id)
//                 VALUES ("${answer.roleTitle}", ${answer.salary}, ${deptID})`, (err, res) => {
//                     if(err) return err;
//                     console.log(`\n ROLE ${answer.roleTitle} ADDED...\n`);
//                     mainMenu();
//                 });
//             }); 
//         });

//         // Add employee
//     function addEmp(){

//         // Create two global array to hold 
//         let roleArr = [];
//         let managerArr = [];

//         // Create connection using promise-sql
//         promisemysql.createConnection(connectionProperties
//         ).then((conn) => {

//             // Query  all roles and all manager. Pass as a promise
//             return Promise.all([
//                 conn.query('SELECT id, title FROM role ORDER BY title ASC'), 
//                 conn.query("SELECT employee.id, concat(employee.first_name, ' ' ,  employee.last_name) AS Employee FROM employee ORDER BY Employee ASC")
//             ]);
//         }).then(([roles, managers]) => {

//             // Place all roles in array
//             for (i=0; i < roles.length; i++){
//                 roleArr.push(roles[i].title);
//             }

//             // place all managers in array
//             for (i=0; i < managers.length; i++){
//                 managerArr.push(managers[i].Employee);
//             }

//             return Promise.all([roles, managers]);
//         }).then(([roles, managers]) => {

//             // add option for no manager
//             managerArr.unshift('--');

//             inquirer.prompt([
//                 {
//                     // Prompt user of their first name
//                     name: "firstName",
//                     type: "input",
//                     message: "First name: ",
//                     // Validate field is not blank
//                     validate: function(input){
//                         if (input === ""){
//                             console.log("**FIELD REQUIRED**");
//                             return false;
//                         }
//                         else{
//                             return true;
//                         }
//                     }
//                 },
//                 {
//                     // Prompt user of their last name
//                     name: "lastName",
//                     type: "input",
//                     message: "Lastname name: ",
//                     // Validate field is not blank
//                     validate: function(input){
//                         if (input === ""){
//                             console.log("**FIELD REQUIRED**");
//                             return false;
//                         }
//                         else{
//                             return true;
//                         }
//                     }
//                 },
//                 {
//                     // Prompt user of their role
//                     name: "role",
//                     type: "list",
//                     message: "What is their role?",
//                     choices: roleArr
//                 },
//                 {
//                     // Prompt user for manager
//                     name: "manager",
//                     type: "list",
//                     message: "Who is their manager?",
//                     choices: managerArr
//                 }]).then((answer) => {

//                     // Set variable for IDs
//                     let roleID;
//                     // Default Manager value as null
//                     let managerID = null;

//                     // Get ID of role selected
//                     for (i=0; i < roles.length; i++){
//                         if (answer.role == roles[i].title){
//                             roleID = roles[i].id;
//                         }
//                     }
//                     // get ID of manager selected
//                     for (i=0; i < managers.length; i++){
//                         if (answer.manager == managers[i].Employee){
//                             managerID = managers[i].id;
//                         }
//                     }
//                     // Add employee
//                     connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
//                     VALUES ("${answer.firstName}", "${answer.lastName}", ${roleID}, ${managerID})`, (err, res) => {
//                         if(err) return err;

//                         // Confirm employee has been added
//                         console.log(`\n EMPLOYEE ${answer.firstName} ${answer.lastName} ADDED...\n `);
//                         mainMenu();
//                 });
//             });
//         });
//     }

}
