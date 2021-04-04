
USE employeeTracker_DB;

/*We are creating the different departments, roles and employee examples for the tables */


/* ADDING DEPARTMENTS */
INSERT INTO departments (department_name, department_lead)
VALUES 
("Engineering", "Natalie Romans"), 
("Sales", "Jim Halper"), 
("Customer Service", "Walter Williams"),
("Creative", "Manuel Gonzalez"),
("Marketing", "Xonia Rodiguez"),
("Big Picture", "Michael Scott"),
("Human Resources", "Sean McDonald"),
("Finnance", "Angela Martin"),
("Production ", "Derryl Philbin")

/* ADDING ROLES */
INSERT INTO role (title, salary, department)
VALUES 
("Software Engineer", 120000, "Engineering"),
("General Manager", 120000, "Engineering"),
("Jr Engineer", 80000, "Engineering"),
("Sales Manager", 70000, "Sales"),
("Sales Representative", 60000, "Sales"),
("Office Manager", 55000.00, "Customer Service"),
("Creative Director", 120000, "Creative"),
("Creative Editor", 70000, "Creative"),
("Account Manager", 70000, "Marketing"),
("Marketing Director", 70000, "Marketing"),
("Hiring Manager", 70000, "Human Resources"),
("HR Manager", 70000, "Human Resources"),
("HR Representative", 50000, "Human Resources"),
("Account Manager", 70000, "Finance"),
("Accountant", 55000, "Finance"),
("Production Manager", 75000, "Production"),
("Intern", 25000, "Big Picture")




/* ADDING EMPLOYEES */
INSERT INTO employee (first_name, last_name, role_title, manager)
VALUES 
("Manuel", "Gonzalez", "Software Engineer", "Natalie"),
("Michael", "Scott", "General Manager", "Michael"),
("Ryan", "Howard", "Software Engineer", "Natalie"),
("Jim", "Halper", "Sales Manager", "Jim" ),
("Dwight", "Shrute", "Sales Representative", "Jim" ),
("Stanley", "Hudson", "Sales Representative", "Jim" ),
("Phyllis", "Vance", "Sales Representative", "Jim" ),
("Angela", "Martin", "Account Manager", "Angela" ),
("Oscar", "Martinez", "Accountant", "Angela" ),
("Kevin", "Malone", "Accountant", "Angela" ),
("Gabe", "Lewis", "Hiring Manager", "Sean" ),
("Toby", "Flenderson", "HR Manager", "Sean" ),
("Pam", "Beesly", "Office Manager", "Walter" ),
("Erin", "Hannon", "Customer Success Representative", "Walter" ),
("Andy", "Bernard", "Marketing Director", "Xonia" ),
("Holly", "Flax", "Creative Director", "Manuel" ),
("Meredith", "Palmer", "HR Representative", "Sean" ),
("Creed", "Bratton", "HR Representative", "Sean" ),
("Clark", "Green", "Intern", "Michael" ),
("Pete", "Miller", "Intern", "Michael" ),
("Darryl", "Phinbin", "Production Manager", "Darryl")




