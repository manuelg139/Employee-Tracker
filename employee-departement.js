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
            "View All Employees",
            "View Departments",
            "View Managers",
            "Add Employee", 
            "Remove Employee",
            "Update Employee Role", 
            "Update Employee Manger", 
            "Exit"]
        })
        .then((answer) => {
            switch (answer.action) {

                case "View All Employees":
                    viewEmployees();
                    break;
                case "View Departments":
                    viewDepartments();
                    break;
                
                case "View Managers":
   
                    viewManagers();
                    break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Remove Employee":
                    removeEmployee();
                    break;

                case "Update Employee Role":
                    updateEmployee();
                    break;

                case "Update Employee Manager":
                    updateManager();
                    break;

                case "Exit":
                    console.log("Goodbye");
    };
    });
};



const viewEmployees = () => {
    const query = "SELECT id, first_name, last_name, role_id FROM employee"
    connection.query(query, (err, res) => {
        res.forEach(({id, first_name, last_name})=> {
            console.log(`ID: ${id}|| Full Name: ${first_name} ${last_name}`)
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

const viewManagers = () => {
    const query = "SELECT id, first_name, last_name, manager_id FROM employee"
    connection.query(query, (err, res) => {
        res.forEach(({id, first_name, last_name})=> {
            console.log(`ID: ${id}|| Full Name: ${first_name} ${last_name}`)
        });
    runPrompts();
    });
};



const addEmployee = async () => {
    const query = "SELECT id,title FROM role;"
    const rolesResponse = await connection.query(query);
    const roleRes = [rolesResponse].map(role => {
        return {
            value: role.id,
            name: role.title
        };
    });
        
    inquirer.prompt([
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
            name: "role",
            type: "list",
            message: "What is this employees role?",
            choices: roleRes
        },
        
        {
          name: 'managerId',
          type: 'input',
          message: 'What is the employees managers ID?'
        }
      ])
      .then((data)=>{
        connection.query('INSERT INTO employee SET ?',
        {
          first_name: data.firstName,
          last_name: data.lastName,
          role_id: data.roleId,
          manager_id: data.managerId
        },
        (err, res) => {
          if (err) throw err;
            // affectedrows calls on the rows affected
          console.log(`Employee ${data.firstName}  ${data.lastName} inserted!\n`);
          runPrompts();
        
      })
    })
   
};


const removeEmployee = () => {
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
};