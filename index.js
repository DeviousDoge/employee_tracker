const inquirer = require('inquirer');
const mysql = require('mysql2');
//reference database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'work_db'
    },
    console.log(`work_db database`)
);
//app initialization referencepoint
function init() {
    //main menu
    inquirer
        .prompt([
            {
                type: 'list',
                message: "What would you like to do?",
                name: 'choices',
                choices: [
                    "View Departments",
                    "View Roles",
                    "View Employees",
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "End"
                ]
            }
        ]).then(function ({choices})  {
            switch (choices) {
                case "View Departments":
                    viewDepartment();
                    break;
               
                case "View Roles": 
                    viewRoles();
                    break;
                
                case "View Employees":
                    viewEmployees();
                    init();
                    break;
            
                case "Add Department":
                    addDepartment();
                    break;
                
                case "Add Role":
                    addRole();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "End":
                    db.end();
                    break;
            }
        
        })
}
//display department table
function viewDepartment() {

    var query =
        `SELECT department_name AS Department, id AS ID FROM department`

    db.query(query, function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log("Viewing departments by id. Press down to continue.\n");
        init();
    });
}
//display roles table. Reference department table. 
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

//display employees table. Reference roles and departments tables.
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
        console.log("Viewing Employees! Press Down if you just selected to view employees.\n");

       
    });

}
//add department based on department name
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the name of the Department?",
                name: 'depName'
            }
        ]).then(function (answer) {
            console.log(answer);
      
            var query = `INSERT INTO department SET ?`
                db.query(query,
              {
                department_name: answer.depName,
              },
              function (err, res) {
                if (err) throw err;
      
                console.table(res);
                console.log("Department Added!\n");
      
                init();
              });
          })
};

//reference departments table and add role based on roleprompt
function addRole() {
    var query =
      `SELECT id, department_name FROM department `
  
      db.query(query, function (err, res) {
      if (err) throw err;
  
      const depChoices = res.map(({ id, department_name }) => ({
        value: id, department_name
      }));
  
      console.table(res);
      console.log("Reference Point for departments");
  
      rolePrompt(depChoices);
    });
};
//add role based on title, salary, id
function rolePrompt() {
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
                message: "What is the department ID of this Role?",
                name: 'roleDep'
            }
        ]).then(function (answer) {
            console.log(answer);
      
            var query = `INSERT INTO roles SET ?`
                db.query(query,
              {
                title: answer.roleName,
                salary: answer.roleSalary,
                department_id: answer.roleDep,
              },
              function (err, res) {
                if (err) throw err;
      
                console.table(res);
                console.log("Role Added!\n");
      
                init();
              });
          })
        }
//reference roles and employee table, prompt user for employee criteria. 
function addEmployee() {
    viewEmployees();
    var query =
      `SELECT id, title, salary FROM roles `
  
      db.query(query, function (err, res) {
      if (err) throw err;
  
      const roleChoices = res.map(({ id, title, salary }) => ({
        value: id, title: `${title}`, salary: `${salary}`
      }));
  
      console.table(res);
      console.log("Reference Points for Roles and Managers(Look up...)");
  
      employeePrompt(roleChoices);
    });
  }
  
  //add employee based on first, last name, role, and manager. 
  function employeePrompt(roleChoices) {
  
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
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roleChoices
        },
        {
            type: 'input',
            message: "Please enter the Employees Manager by EMPLOYEE ID. ENTER if null.",
            name: 'managerId'
        },
      ])
      .then(function (answer) {
        console.log(answer);
  
        var query = `INSERT INTO employee SET ?`

            db.query(query,
          {
            first_name: answer.firstName,
            last_name: answer.lastName,
            role_id: answer.roleId,
            manager_id: answer.managerId,
          },
          function (err, res) {
            if (err) throw err;
  
            console.table(res);
            console.log("Employee Added!\n");
  
            init();
          });
      });
  }

//initialize app.
init();