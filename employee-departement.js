const mysql = require("mysql");
const inquirer = require("inquirer");
var util = require("util");
require("console.table");
require('dotenv').config()


// CREDENTIALS FOR CONNECTION
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.PASSWORD,
  database: "employeeTracker_DB"
});



// CONNECTING SERVER WITH MYSQL DB
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);
    // Kick off the prompts
    runPrompts();
  });
  


const runPrompts = () => {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Records",
            "Add Records", 
            "Update Records",
            "Remove Records",
            "Exit"]
        })
        .then((answer) => {
            switch (answer.action) {

                case  "View Records":
                    viewRecords();
                    break;

                case "Add Records":
                    addRecords();
                    break;

                case "Update Records":
                    updateRecords();
                    break;
                
                case "Remove Records":
                    renoveRecords();
                    break;

                case "Exit":
                    console.log("Goodbye");
    };
    });
};



// ? VIEW RECORDS PROMPTS AND FUNCTIONS //
const viewRecords = () => {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Which Records would you like to display?",
        choices: [
            "View All Employees",
            "View All Employees by Manger",
            "View All Roles",
            "View All Departments",
            "Back to Menu",
            "Exit"]
        })
        .then((answer) => {
            switch (answer.action) {
                
                case "View All Employees":

                    viewEmployees();
                    break;

                case "View All Employees by Manger":
                    viewByManger();
                    break;

                case "View All Roles":
                        viewRoles();
                        break;

                case  "View All Departments":
                    viewDepartments();
                    break;

                case "Back to Menu":
                    runPrompts();
                        break;

                case "Exit":
                    console.log("Goodbye");
                };
            });
};
        
const viewEmployees = () => {
    const query = "SELECT id, first_name, last_name, role_title FROM employee"
    connection.query(query, (err, res) => {
        res.forEach(({id, first_name, last_name , role_title})=> {
            console.log(`ID: ${id}|| Full Name: ${first_name} ${last_name}  || Title: ${role_title}` ) 
        });
    runPrompts();
    });
};

const viewDepartments = () => {
    const query = "SELECT id, name FROM departments"
    connection.query(query, (err, res) => {
        res.forEach(({id, name})=> {
            console.log(`ID: ${id}|| Name: ${name}`)
        });
    runPrompts();
    });
};

const viewRoles = () => {
    const query = "SELECT id, title, salary FROM role"
    connection.query(query, (err, res) => {
        res.forEach(({id, title, salary})=> {
            console.log(`ID: ${id}|| Tile: ${title}|| Salary: ${salary}`)
        });
    runPrompts();
    });
};

const viewByManger = () => {
    const query = "SELECT id, first_name, last_name, manager_id FROM employee"
    connection.query(query, (err, res) => {
        res.forEach(({id, first_name, last_name})=> {
            console.log(`ID: ${id}|| Full Name: ${first_name} ${last_name}`)
        });
    runPrompts();
    });
};











// ? ADD RECORDS PROMPTS AND FUNCTIONS //
const addRecords = () => {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What type of record would you like to add?",
        choices: [
            "Add Employee",
            "Add Role",
            "Add Department",
            "Back to Menu",
            "Exit"]
        })
        .then((answer) => {
            switch (answer.action) {
                
                case  "Add Employee":
                    addEmployee();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case  "Add Department":
                    addDepartment();
                    break;

                case "Back to Menu":
                    runPrompts();
                        break;

                case "Exit":
                    console.log("Goodbye");
                };
            });
        };
        

const addEmployee = () => {
    connection.query('SELECT * FROM role', async (err, results) => {
        if (err) throw err;
   
        
   await inquirer.prompt([
        {
          name: 'firstName',
          type: 'input',
          message: 'What is the employees first name?'
        },
        {
          name: 'lastName',
          type: 'input',
          message: 'What is the employees last name?'
        },
        
        {
            name: 'roleTitle',
            type: 'list',
            message: `What is this employees role?
            `,
            choices: [
                "Software Engineer",
                "Sales Representative",
                "Customer Success Representative",
            ]

        },
        
        {
          name: 'manager',
          type: 'input',
          message: 'What is the employees managers name?'
        }
      ])
      .then((answer)=>{
        connection.query('INSERT INTO employee SET ?',
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_title : answer.roleTitle,
          manager: answer.manager,
        },
        (err, res) => {
          if (err) throw err;
            // affectedrows calls on the rows affected
          console.log(`Employee ${answer.firstName}  ${answer.lastName} inserted!\n`);
          runPrompts();
        });
    });
});
};


const addRole = () => {
    connection.query('SELECT * FROM role', async (err, results) => {
        if (err) throw err;
   
        
   await inquirer.prompt([
        {
          name: 'rolenName',
          type: 'input',
          message: 'What is the name of the role?'
        },
        {
          name: 'roleSalary',
          type: 'input',
          message: 'What is the employees last name?'
        },
        {
            name: 'roleSalary',
            type: 'input',
            message: 'What is the employees last name?'
          },
        
        
        
        {
          name: 'manager',
          type: 'input',
          message: 'What is the employees managers name?'
        }
      ])
      .then((answer)=>{
        connection.query('INSERT INTO role SET ?',
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_title : answer.roleTitle,
          manager: answer.manager,
        },
        (err, res) => {
          if (err) throw err;
            // affectedrows calls on the rows affected
          console.log(`Employee ${answer.firstName}  ${answer.lastName} inserted!\n`);
          runPrompts();
        });
    });
});
};








// ? UPDATE RECORDS PROMPTS AND FUNCTIONS //
const updateRecords = () => {
    inquirer
        .prompt([
            {
                name: 'updateRecords',
                type: 'list',
                message: 'Select the Records you want to update',
                choices: ['Employee Records', 'Current Roles', 'Departments']
            },
        ])
        .then((answer) => {
            switch (answer.updateRecords) {
                case 'Employee Records':
                    updateEmployee();
                    break;

                case 'Current Roles':
                    updateRoles();
                    break;

                case 'Departments':
                    updateDepartment();
                    break;

                default:
                    console.log(`Invalid action: ${answer.updaterec}`)

            };
        });

};


/* const removeEmployee = () => {
    console.log("removeEmployee DATA");
    runPrompts();
};

const updateEmployee = () => {
    console.log("updateEmployee DATA");
    runPrompts();
};

const updateManager = () => {
    console.log("updateManager DATA");
    runPrompts();
}; */