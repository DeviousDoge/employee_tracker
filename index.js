const inquirer = require('inquirer');
const mysql = require('mysql2');
const choices = [
    "View Departments",
    "View Roles",
    "View Employees",
    "Add Department",
    "Add Role",
    "Add Employee"
]

const managerArray = ['None']

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'work_db'
    },
    console.log(`work_db database`)
);

function init() {

    inquirer
    .prompt([
        {
            type: 'list',
            message: "What would you like to do?",
            choices: choices,
            name: 'choices'
        }
    ]).then((data) => {
    if(data.choices === choices[0]) {
        console.log('View Departments');
        return init();
    } else if(data.choices === choices[1]) {
        console.log('View Roles');
        return init();
    } else if(data.choices === choices[2]) {
        console.log('View Employees');
        return init();
    } else if(data.choices === choices[3]) {
        addDepartment();
    } else if(data.choices === choices[4]) {
        addRole();
    } else if(data.choices === choices[5]) {
        addEmployee();
    }
    }) 
}

function addDepartment () {

    inquirer
    .prompt([
        {
            type: 'input',
            message: "What is the name of the Department?",
            name: 'depName'
        }
    ]).then((data) => {
     console.log(data);
     return init();
    })
};

function addRole () {

    inquirer
    .prompt([
        {
            type: 'input',
            message: "What is the name of the Role?",
            name: 'roleName'
        },
        {
            type: 'input',
            message: "What is the salary for the Role?",
            name: 'roleSalary'
        },
        {
            type: 'input',
            message: "What is the department of this Role?",
            name: 'roleDep'
        }
    ]).then((data) =>{
     console.log(data);
     return init
    })
};

function addEmployee() {

    inquirer
    .prompt([
        {
            type: 'input',
            message: "What is the Employees First Name?",
            name: 'firstName'
        },
        {
            type: 'input',
            message: "What is the Employees Last Name?",
            name: 'lastName'
        },
        {
            type: 'input',
            message: "What is the Employees Role?",
            name: 'empRole'
        },
        {
            type: 'list',
            message: "Who is the Employees Manager?",
            choices: managerArray,
            name: 'empMgr'
        }
    ]).then((data) => {
     console.log(data);
     managerArray.push(data.firstName);
     return init()
    })

};

init();