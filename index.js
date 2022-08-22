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
            if (data.choices === choices[0]) {
                viewDepartment();
            } else if (data.choices === choices[1]) {
                viewRoles();
            } else if (data.choices === choices[2]) {
                viewEmployees();
            } else if (data.choices === choices[3]) {
                addDepartment();
            } else if (data.choices === choices[4]) {
                addRole();
            } else if (data.choices === choices[5]) {
                addEmployee();
            }
        })
}

function viewDepartment() {

    var query =
        `SELECT department_name AS Department, id AS ID FROM department`

    db.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log("Viewing departments by id\n");

        init();
    });
}

function viewRoles() {

    var query =
        `SELECT r.title AS Title, r.id AS ID, r.salary AS Salary, d.department_name AS Department 
        FROM roles r
        LEFT JOIN  department d
        ON r.department_id = d.id
        `

    db.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log("Viewing roles!\n");

        init();
    });
}

function viewEmployees() {

    var query =
        `SELECT e.id, e.first_name, e.last_name, r.title, d.department_name AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN roles r
        ON e.role_id = r.id
        LEFT JOIN department d
        ON d.id = r.department_id
        LEFT JOIN employee m
        ON m.id = e.manager_id`

    db.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log("Viewing Employees!\n");

        init();
    });

}

function addDepartment() {

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


function addRole() {

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
        ]).then((data) => {
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