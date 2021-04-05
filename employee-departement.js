require('dotenv').config()
const mysql = require("mysql");
const inquirer = require("inquirer");
var util = require("util");
const cTable = require('console.table');
var figlet = require('figlet');



// CREDENTIALS FOR CONNECTION
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PW,
  database: "employeeTracker_DB"
});



// CONNECTING SERVER WITH MYSQL DB
connection.connect((err)  => {

    if (err) throw err;
        figlet('Employee Tracker', function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.clear() 
            console.log(data)
            console.log('Welcome to the Employee Tracker you are connected as ID ' + connection.threadId);
            console.log('Press the up or down arrow key to begin') 
        });
        tablelog();
        runPrompts();
    });
    // Kick off the prompts
   
const tablelog = () => {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, employee.manager, role.title, role.salary, departments.department_name
    FROM((role INNER JOIN employee ON role.title = employee.role_title)
     INNER JOIN departments ON role.department = departments.department_name)`
    connection.query(query, async (err, res) => {
        if (err) throw err;
        await console.table(res);
    });
};

const roletablelog = () => {
    const query = `SELECT role.id, role.title, role.salary, role.department FROM role `
    connection.query(query, async (err, res) => {
        if (err) throw err;
        await console.table(res);
    });
};

  

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
                    removeRecords();
                    break;

                case "Exit":
                    console.clear() 
                    figlet(`$GOODBYE`, function(err, data) {
                        if (err) {
                            console.log('Something went wrong...');
                            console.dir(err);
                            return;
                        }
                        console.clear() 
                        console.log(data)
                        console.log(`Press 'control' + C to extit Port`)
                    });
    };
    });
};



// ? VIEW RECORDS PROMPTS AND FUNCTIONS //
const viewRecords = () => {
    console.clear() 
    figlet(`$Employee Tracker`, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.clear() 
        console.log(data)
    });
    
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Which Records would you like to display?",
        choices: [
            "View All Employees",
            "View All Employees by Manager",
            "View All Employees by Department",
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

                case "View All Employees by Manager":
                    viewByManger();
                    break;

                   
                case  "View All Employees by Department":
                    viewByDepartment();
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
                    console.clear() 
                        figlet(`$GOODBYE`, function(err, data) {
                            if (err) {
                                console.log('Something went wrong...');
                                console.dir(err);
                                return;
                            }
                            console.clear() 
                            console.log(data)
                            console.log(`Press 'control' + C to extit Port`)
                        });
                };
            });
};
        
const viewEmployees = () => {
    console.clear() 
    figlet('Employees', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.clear() 
        console.log(data)
    });

    const query = "SELECT id, first_name, last_name, role_title FROM employee"
    connection.query(query, (err, res) => {
        res.forEach(({id, first_name, last_name , role_title})=> {
            console.log(`ID: ${id}|| Full Name: ${first_name} ${last_name}  || Title: ${role_title}` ) 
        });
    runPrompts();
    });
};

const viewDepartments = () => {
    console.clear() 
    figlet('Departments', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.clear() 
        console.log(data)
    });

    const query = "SELECT id, department_name, department_lead FROM departments"
    connection.query(query, (err, res) => {
        res.forEach(({id, department_name, department_lead})=> {
            console.log(`ID: ${id}|| Name: ${department_name}, || Lead By: ${department_lead}`)
        });
    runPrompts();
    });
};

const viewRoles = () => {
     console.clear() 
    figlet('Roles', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.clear() 
        console.log(data)
    });

    const query = "SELECT id, title, salary FROM role"
    connection.query(query, (err, res) => {
        res.forEach(({id, title, salary})=> {
            console.log(`ID: ${id}|| Tile: ${title}|| Salary: ${salary}`)
        });
    runPrompts();
    });
};

const viewByManger = () => {
    console.clear() 
    figlet(`$Managers`, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.clear() 
        console.log(data)
    });
   /*  const query = "SELECT id, first_name, last_name, manager_id FROM employee"
    connection.query(query, (err, res) => {
        res.forEach(({id, first_name, last_name})=> {
            console.log(`ID: ${id}|| Full Name: ${first_name} ${last_name}`) */
    connection.query('SELECT * FROM employee', (err, results) => {
    
        if (err) throw err;

        let query = 'SELECT id, first_name, last_name, role_title FROM employee '
        query += ' WHERE employee.manager = ?'

        inquirer.prompt([
            {
              name: 'manager',
              type: 'list',
              choices() {
                const viewManArray = []
                results.forEach(({manager}) => {
                    viewManArray.push(manager);
                });
                let viewByManArray = viewManArray;
                return viewByManArray
              },
              message: 'Which Manager Records would you like to view?'
            }
          ])
          .then((answers) => {
            console.clear() 
            figlet(`${answers.manager}'s Team`, function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.clear() 
                console.log(data)
            });
          
            connection.query(query, [answers.manager], (err, res) => {
              /*   console.log(res)
                console.log(query)
                console.log(answers)
                console.log(answers.manager) */
              if (res.length < 1){
                console.log("No Employees under this management... Add one!!!")
                runPrompts();
              }
              else{
              // Going to push the department data into a table
              console.log(`Here are the employees under ${answers.manager}`)
              console.table(res)
              //Return to the main prompt
              runPrompts();
              }
            })
          }
          )
      })
};

const viewByDepartment = () => {
    console.clear() 
    figlet(`$Departments`, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.clear() 
        console.log(data)
    });


    connection.query('SELECT * FROM departments', (err, results) => {
        
        if (err) throw err;

        let query = 'SELECT departments.department_name, role.title, employee.first_name, employee.last_name ';
        query += 'FROM departments INNER JOIN role ON (department_name = role.department) INNER JOIN employee ON (employee.role_title = role.title)';
        query += 'WHERE departments.department_name = ?'
        
        inquirer.prompt([
            {
              name: 'department',
              type: 'list',
              choices() {
                const viewDepArray = []
                results.forEach(({ department_name }) => {
                    viewDepArray.push(department_name);
                });
                let viewByDepArray = viewDepArray;
                return viewByDepArray
              },
              message: 'Which department would you like to view?'
            }
          ])
           
            .then((answers) => {
                console.clear() 
                figlet(`$${answers.department} Team`, function(err, data) {
                    if (err) {
                        console.log('Something went wrong...');
                        console.dir(err);
                        return;
                    }
                    console.clear() 
                    console.log(data)
                });

              connection.query(query, [answers.department], (err, res) => {
              /*   console.log(res) */
                if (res.length < 1){
                  console.log("No Employees in this department... Add one!!!")
                  runPrompts();
                }
                else{
                // Going to push the department data into a table
                console.log(`Here are the employees in ${answers.department}`)
                console.table(res)
                //Return to the main prompt
                runPrompts();
                }
              })
            }
            )
        })
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
                    console.clear() 
                    figlet(`$GOODBYE`, function(err, data) {
                        if (err) {
                            console.log('Something went wrong...');
                            console.dir(err);
                            return;
                        }
                        console.clear() 
                        console.log(data)
                        console.log(`Press 'control' + C to extit Port`)
                    });
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
        console.clear() 
        figlet(`$Welcome ${answer.firstName}`, function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.clear() 
            console.log(data)
        });


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
          console.log(`Employee ${answer.firstName} ${answer.lastName} was added to the ${answer.roleTitle} Team!\n`);
          runPrompts();
        });
    });
});
};


const addRole = () => {
    //connect to role table for department data
    connection.query('SELECT * FROM departments', async (err, results) => {
        
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
            message: 'What is the role'/'s salary ?'
            },
            {
            name: 'roleDepartment',
            type: 'list',
            message: 'What Department is the new role in?',
            /* choices: [ "a", "b", "c",] */


                choices() {

                    //creating an array to push titles into 
                    const depArray = [];
                    //loop to push names into the array
                    results.forEach(({ department_name }) => {
                        depArray.push(department_name);
                    });
                    //create var to add and display answers
                    let displayDepartments = depArray;
                    return displayDepartments
                } 
            },
    ])

    .then((answer)=>{
        console.clear() 
        figlet(`$${answer.rolenName} Added`, function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
            console.clear() 
            console.log(data)
        });

            connection.query('INSERT INTO role SET ?',
            {
                title: answer.rolenName,
                salary: answer.roleSalary,
                department: answer.roleDepartment,
            },
            (err, res) => {
            if (err) throw err;


            console.log(`Role ${answer.rolenName} was added under ${answer.roleDepartment} !\n`);
            runPrompts();
            });
        });
    });
};


const addDepartment = () => {
    
    inquirer
        .prompt([
            {
                name: 'deptName',
                type: 'input',
                message: 'What is the name of the department?',
            },
            {
                name: 'deptLead',
                type: 'input',
                message: 'Who is the manager for this deparment?',
            },
        ])
        .then((answer) => {
            console.clear() 
            figlet(`$${answer.deptName} Added`, function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                console.clear() 
                console.log(data)
            });

            
            connection.query(
                'INSERT INTO departments SET?',
                {
                    department_name: answer.deptName,
                    department_lead: answer.deptLead,
                },

                async (err, res) => {
                    if (err) throw err;
                    await console.log(`${answer.deptName} was added!!!`)
                    await console.log(`Is now being Lead by ${answer.deptLead}!!!`)
                    await runPrompts();
                })

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

                case "Back to Menu":
                    runPrompts();
                    break;
    
                case "Exit":
                        console.clear() 
                        figlet(`$GOODBYE`, function(err, data) {
                            if (err) {
                                console.log('Something went wrong...');
                                console.dir(err);
                                return;
                            }
                            console.clear() 
                            console.log(data)
                            console.log(`Press 'control' + C to extit Port`)
                        });

                default:
                    console.log(`Invalid action: ${answer.updaterec}`)

            };
        });

};

const updateEmployee = async () => {
    console.clear() 
    tablelog();
    console
    let query = 'SELECT role.title, role.id, employee.id, employee.first_name, employee.last_name, employee.role_title ';
      query += 'FROM role INNER JOIN employee ON (employee.role_title = role.title)';
      connection.query(query, async (err, results) => {
        if (err) throw err;

        try {
            const employeeUpdate = await inquirer
                .prompt([
                {
                    name: 'employee',
                    type: 'list',
                    choices() {
                    const employeeArray = []
                    results.forEach(({ id, first_name, last_name }) => {
                    employeeArray.push(`${id} ${first_name} ${last_name}`);
                    })
                    return employeeArray
        
                    },
                    message: 'Which employee would you like to update?'
                    },

                {
                    name: 'updateAnswers',
                    type: 'list',
                    message: 'What field would you like to update?',
                    choices: ['First Name', 'Last Name', 'Job Title', 'Manager',],
                },

                {
                    name: 'updatedinfo',
                    type: 'input',
                    message: 'Enter the new information.',
                }, 

            ])
            let updateAnswers = employeeUpdate.updateAnswers;
            let updatedInfo = employeeUpdate.updatedinfo;
            // split asnwer array and gave each index a variable 
            let employeeArr = employeeUpdate.employee.split(' ');
            let firstName = employeeArr[1];
            let lastName =employeeArr[2];
            let query;
            /* console.log(employeeUpdate); */
            
            switch (updateAnswers) {
                case 'First Name':
                    query = `UPDATE employee SET first_name = '${updatedInfo}' WHERE (first_name, last_name)=('${firstName}','${lastName}')`
                    break;

                case 'Last Name':
                    query = `UPDATE employee SET last_name = '${updatedInfo}' WHERE (first_name, last_name)=('${firstName}','${lastName}')`
                    break;

                case 'Job Title':
                   
                   
                    query = `UPDATE employee SET role_title = '${updatedInfo}' WHERE (first_name, last_name)=('${firstName}','${lastName}')`
                    break;

                case 'Manager':
                    query = `UPDATE employee SET manager = '${updatedInfo}' WHERE (first_name, last_name)=('${firstName}','${lastName}')`
                    break;

                default:
                    console.log(`Cannot update ${updateAnswers}`);
            };
            /* console.log(query); */
            console.clear() 
                figlet(`$Employee Updated`, function(err, data) {
                    if (err) {
                        console.log('Something went wrong...');
                        console.dir(err);
                        return;
                    }
                    console.clear() 
                    console.log(data)
                });
                
            connection.query(query, async (err, res) => {
                if (err) throw err;
                await console.table(`${res.affectedRows} record updated!\n`);
                console.log(`Employee ${employeeUpdate.employee} was updated!\n`);
                
                runPrompts();
            });
        } catch (error) { console.log(error) };
    });
    };

const updateRoles = () => {
    connection.query('SELECT * FROM role', async (err, results) => {
        
        if (err) throw err;
        await inquirer
            .prompt([
                {
                    name: 'role',
                    type: 'list',
                    message: 'Which role would you like to update',
                    choices() {

                        //creating an array to push titles into 
                        const rolesArray = [];
                        //loop to push titles into the array
                        results.forEach(({ title }) => {
                            rolesArray.push(title);
                        });
                        //create var to add and display answers
                        let displayRoles = rolesArray;
                        return displayRoles
                    }
                },

                {
                    name: 'updatetype',
                    type: 'list',
                    message: 'Seect item to update.',
                    choices: [
                        'title',
                        'department',
                        'salary'
                    ],
                },

                {
                    name: 'updateinfo',
                    type: 'input',
                    message: 'Enter the new information to update.',
                },
                
            ])
            .then((answer) => {
                console.clear() 
                figlet(`$Role Updated`, function(err, data) {
                    if (err) {
                        console.log('Something went wrong...');
                        console.dir(err);
                        return;
                    }
                    console.clear() 
                    console.log(data)
                });

                const query = `UPDATE role SET ${answer.updatetype} = '${answer.updateinfo}' WHERE ?`
                
                //selecting where to add the new qiery
                connection.query(query,
                    
                    [
                        {
                            title: answer.role,
                        },
                    ],
                    async (err, res) => {
                        if (err) throw err;
                        await console.table(`${answer.role} was updated!!!\n`);
                        runPrompts();
                      
                    });
            });
    });
};

const updateDepartment = async () => {
    
        connection.query('SELECT * FROM departments', async (err, results) => {
            
            if (err) throw err;
            /* const depUpdate = await inquirer */

            await inquirer.prompt([
                        {
                            name: 'department',
                            type: 'list',
                            message: 'Which deparment would you like to update?',
                            choices() {

                                //creating an array to push titles into 
                                const updateDepArray = [];
                                //loop to push titles into the array
                                results.forEach(({ department_name }) => {
                                    updateDepArray.push(department_name);
                                });
                                //create var to add and display answers
                                let updateDepartments = updateDepArray;
                                return updateDepartments
                            }
                        },

                        {
                            name: 'updateitem',
                            type: 'list',
                            message: 'What would you like to update?',
                            choices: ['id', 'department_name', 'department_lead'],
                        },

                        {
                            name: 'updateinfo',
                            type: 'input',
                            message: 'Enter the new information.',
                        },
                        
                    ])
                    
                    .then((depUpdate)=>{ 
                        console.clear() 
                        figlet(`$Department Updated`, function(err, data) {
                            if (err) {
                                console.log('Something went wrong...');
                                console.dir(err);
                                return;
                            }
                            console.clear() 
                            console.log(data)
                        });

                        const query = `UPDATE departments SET ${depUpdate.updateitem} = '${depUpdate.updateinfo}' WHERE ?`
                        
                        //selecting where to add the new qiery
                      
                        connection.query(query,
                            [
                                {
                                    department_name: depUpdate.department,
                                },
                            ],
                            async (err, res) => {
                                if (err) throw err;
                                await console.table(`${depUpdate.department} record updated!\n`)
                              /*   await console.table('NEW '+ depUpdate.updateitem + ' -- ' + depUpdate.updateinfo ) */
                                
                                runPrompts();
                            }
                        );
                    });
        });            
};

// OTHER UPDATE CODE
/* 
const updateDepartment = async () => {
    try {
        connection.query('SELECT * FROM departments', async (err, results) => {
            if (err) throw err;
            const depUpdate = await inquirer
                .prompt([
                    {
                        name: 'department',
                        type: 'list',
                        message: 'Which deparment would you like to update?',
                        choices() {

                            //creating an array to push titles into 
                            const updateDepArray = [];
                            //loop to push titles into the array
                            results.forEach(({ department_name }) => {
                                updateDepArray.push(department_name);
                            });
                            //create var to add and display answers
                            let updateDepartments = updateDepArray;
                            return updateDepartments
                        }
                    },

                    {
                        name: 'updateName',
                        type: 'input',
                        message: 'Update name for the Department.',
                    
                    },

                    {
                        name: 'updateLead',
                        type: 'input',
                        message: 'Update Lead for the Department.',
                    },
                    
                ])
                console.log(depUpdate)
                    const query = `UPDATE departments SET ${depUpdate.updateName}, ${depUpdate.updateLead} WHERE ?`
                    console.log(query)
                    //selecting where to add the new qiery
                    console.log(depUpdate.department)
                    connection.query(query,
                        [
                            {
                                department_name: depUpdate.department,
                            },
                        ],
                        async (err, res) => {
                            if (err) throw err;
                            await console.table(`${res.affectedRows} record updated!\n`);
                        }
                    );
        });
    } catch (error) { console.log(error) }
};

 */







// ? DELETE RECORDS PROMPTS AND FUNCTIONS //

const removeRecords = () => {
    console.clear() 
    figlet(`$Employee Tracker`, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.clear() 
        console.log(data)
    });

    
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What type of record would you like to remove?",
        choices: [
            "Remove Employee",
            "Remove Role",
            "Remove Department",
            "Back to Menu",
            "Exit"]
        })
        .then((answer) => {
            switch (answer.action) {
                
                case  "Remove Employee":

                   connection.query('SELECT * FROM employee', (err, results) => {
                    console.clear()
                    if (err) throw err;
                    inquirer.prompt([
                      {
                        name: 'employee',
                        type: 'list',
                        choices() {
                          //Creates the choice array
                          const delEmpArray = []
                          //populates the roles into the choice array
                          results.forEach(({ id, first_name, last_name }) => {
                            delEmpArray.push(`${id} ${first_name} ${last_name}`);
                          })
                          let deleteEmployee = delEmpArray;
                          return deleteEmployee
                        },
                        message: 'Which employee would you like to remove?'
                      }
                    ])
                      .then((answer) => {
                        //This is going to allow us to split the employee ID and name into an array we will use the employee ID(employeeARR[0]) later
                        const employeeArr = answer.employee.split(' ')
                        // This is going to use the employee ID to remove the employee from the table
                        connection.query('DELETE FROM employee WHERE ?',
                          {
                            id: employeeArr[0]
                          },
                          (err, res) => {
                            if (err) throw err;
                            console.log(`${answer.employee} deleted!\n`);
            
                            runPrompts();
                          }
                        )
                      })
                  })
                  break;
            
                case "Remove Role":
                    
                   connection.query('SELECT * FROM role', (err, results) => {
                    console.clear()
                    if (err) throw err;
                    inquirer.prompt([
                      {
                        name: 'role',
                        type: 'list',
                        choices() {
                          //Creates the choice array
                          const delRoleArray = []
                          //populates the roles into the choice array
                          results.forEach(({ id, title, salary }) => {
                            delRoleArray.push(`${id} ${title} ${salary}`);
                          })
                          let deleteRole = delRoleArray;
                          return deleteRole
                        },
                        message: 'Which role would you like to remove?'
                      }
                    ])
                      .then((answer) => {
                        //This is going to allow us to split the employee ID and name into an array we will use the employee ID(employeeARR[0]) later
                        const roleArr = answer.role.split(' ')
                        // This is going to use the employee ID to remove the employee from the table
                        connection.query('DELETE FROM role WHERE ?',
                          {
                            id: roleArr[0]
                          },
                          (err, res) => {
                            if (err) throw err;
                            console.log(`${answer.role} deleted!\n`);
            
                            runPrompts();
                          }
                        )
                      })
                  })
                    break;

                case  "Remove Department":
                    
                   connection.query('SELECT * FROM departments', (err, results) => {
                    console.clear()
                    if (err) throw err;
                    inquirer.prompt([
                      {
                        name: 'department',
                        type: 'list',
                        choices() {
                          //Creates the choice array
                          const delDepArray = []
                          //populates the roles into the choice array
                          results.forEach(({ id, department_name  }) => {
                            delDepArray.push(`${id} ${department_name}`);
                          })
                          let deleteDep = delDepArray;
                          return deleteDep
                        },
                        message: 'Which department would you like to remove?'
                      }
                    ])
                      .then((answer) => {
                        //This is going to allow us to split the employee ID and name into an array we will use the employee ID(employeeARR[0]) later
                        const depArr = answer.department.split(' ')
                        // This is going to use the employee ID to remove the employee from the table
                        connection.query('DELETE FROM departments WHERE ?',
                          {
                            id: depArr[0]
                          },
                          (err, res) => {
                            if (err) throw err;
                            console.log(`${answer.department} deleted!\n`);
            
                            runPrompts();
                          }
                        )
                      })
                  })
                    break;

                case "Back to Menu":
                    runPrompts();
                        break;

                case "Exit":
                    console.clear() 
                    figlet(`$GOODBYE`, function(err, data) {
                        if (err) {
                            console.log('Something went wrong...');
                            console.dir(err);
                            return;
                        }
                        console.clear() 
                        console.log(data)
                        console.log(`Press 'control' + C to extit Port`)
                    });
                };
            });
        };
    