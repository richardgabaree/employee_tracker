const inquirer = require("inquirer");
const mysql = require('mysql');
const express = requirer('express');
const cTable = require('console.table');

const connection = mysql.createConnection ({
    host: 'localhost',
    port : 3000,
    user: 'root',
    password: 'J@hntnaious1',
    database: 'employee_tracker_db'
});

connection.connect((err) => {
    if (err) throw err;
});

const runMain = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What do you want to do?',
            choices: [
                'Add department',
                'Add role',
                'Add employee',
                'View a department',
                'View roles',
                'View employees',
                'Update employee role',
                'Exit',
            ],
        })
        .then((anser) => {
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

                case 'View a department':
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
};

