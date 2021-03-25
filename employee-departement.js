const mysql = require("mysql");
const inquirer = require("inquirer");


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
            "View All Employees By Department",
            "View All Employees By Manager",
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
                case "View All Employees By Department":
                    viewDepartments();
                    break;
                
                case "View All Employees By Manager":
                    viewMangers();
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
    console.log("viewEmployees DATA");
    runPrompts();
};

const viewDepartments = () => {
    console.log("viewDepartments DATA");
    runPrompts();
};

const viewMangers = () => {
    console.log("viewMangers DATA");
    runPrompts();
};

const addEmployee = () => {
    console.log("addEmployee DATA");
    runPrompts();
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