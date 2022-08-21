const inquirer = require('inquirer');
const mysql = require('mysql2');
const manageChoices = [
    "View Departments",
    "View Roles",
    "View Employees",
    "Add Department",
    "Add Role",
    "Add Employee"
]

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'work_db'
    },
    console.log(`work_db database`)
);

