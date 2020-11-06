USE employeeTracker_db;

INSERT into department (name) VALUES ("Accounting");
INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("Health");
INSERT into department (name) VALUES ("HR");
INSERT into department (name) VALUES ("Legal");
INSERT into department (name) VALUES ("Risk");
INSERT into department (name) VALUES ("Maintianance");

INSERT into role (title, salary, department_id) VALUES ("Accounting Manager", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("Accounting Assitant", 50000, 1);
INSERT into role (title, salary, department_id) VALUES ("Tech Lead", 130000, 2);
INSERT into role (title, salary, department_id) VALUES ("Software Engineer", 110000, 2);
INSERT into role (title, salary, department_id) VALUES ("Counsler", 105000, 3);
INSERT into role (title, salary, department_id) VALUES ("Nurse", 55000, 3);
INSERT into role (title, salary, department_id) VALUES ("HR Manager", 80000, 4);
INSERT into role (title, salary, department_id) VALUES ("HR Assistant", 45000, 4);
INSERT into role (title, salary, department_id) VALUES ("Laywer", 170000, 5);
INSERT into role (title, salary, department_id) VALUES ("Portofolio Risk Manager", 180000, 6);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jordan", "Raw", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Yannal", "Naei", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Shawn", "Fok", 3, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("David", "Brick", 4, 3);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Chris", "White", 5, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Flin", 6, 5);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Naveen", "Patel", 7, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Billy", "Rosewood", 8, 7);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Eddie", "Goodwin", 9, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Nicolas", "Smith", 10, null);

