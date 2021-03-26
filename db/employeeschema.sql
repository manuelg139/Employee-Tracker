
USE employeeTracker_DB;

/*We are creating the different departments, roles and employee examples for the tables */


/* ADDING DEPARTMENTS */
INSERT INTO departments (department_name, department_lead)
VALUES 
("Engineering", "Natelie"), 
("Sales", "Molly"), 
("Customer Service", "Walter");

/* ADDING ROLES */
INSERT INTO role (title, salary, department)
VALUES 
("Software Engineer", 120000, "Engineering"),
("Sales Representative", 80000, "Sales"),
("Customer Success Representative", 55000.00, "Customer Service");


/* ADDING EMPLOYEES */
INSERT INTO employee (first_name, last_name, role_title, manager)
VALUES 
("Manuel", "Gonzalez", "Software Engineer", "Natelie"),
("Adriana", "Romero", "Sales Representative", "Molly" ),
("Julian", "Perez", "Customer Success Representative", "Walter" )

