USE employeeTracker_db;

INSERT into department (name) VALUES ("Sales");
INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("health");
INSERT into department (name) VALUES ("HR");

INSERT into role (title, salary, department_id) VALUES ("Sales Manager", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("Sales Assitant", 50000, 1);
INSERT into role (title, salary, department_id) VALUES ("IT Manager", 120000, 2);
INSERT into role (title, salary, department_id) VALUES ("Engineer", 90000, 2);
INSERT into role (title, salary, department_id) VALUES ("HR Manager", 100000, 3);
INSERT into role (title, salary, department_id) VALUES ("Tech Lead", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Porduct Analyst", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Cashier", 30000, 3);
INSERT into role (title, salary, department_id) VALUES ("Counselor", 80000, 4);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Pat", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Yannal", "Raw", 2, 1);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("steve", "cornor", 2, 1);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Mont", "David", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Angus", "MacGyver", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Kaylee", "Frye", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Cyrus", "Smith", 4, 3);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Rose", "Wood", 5, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Eddie", "Good", 6, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Nice", "Man", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Good", "boy", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Bob", "Hope", 8, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Dina", "Troi", 9, null);

