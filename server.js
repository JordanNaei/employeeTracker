var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "@Yannalrawas1571985",
    database: "employeetracker_db",
    multipleStatements: true,
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);

    start();
})

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "selAction",
            type: "list",
            message: "What Would You Like To Perform?",
            choices: ["View All Employees", "View All Employees By Department", "View All Employees By Role",
                "Add Employee", "Add role", "Add department", "Remove Role", "Remove Employee", "View Department Budget", "Exit"
            ]
        })
        .then(function (input) {
            switch (input.selAction) {
                case "View All Employees":
                    displayAllEmp();
                    break;
                case "View All Employees By Department":
                    getDepNames();
                    break;
                case "View All Employees By Role":
                    getRoleNames();
                    break;
                case "Add Employee":
                    getEmployeeQuesInfo();
                    break;
                case "Remove Employee":
                    getEmployeesList();
                    break;
                case "Add department":
                    getDepFromUser();
                    break;
                case "Add role":
                    getRoleFromUser();
                    break;
                case "Remove Role":
                    getRoleFromDB();
                    break;
                case "View Department Budget":
                    getDeptInfoFromDB();
                    break;
            }

        });
}

// Viewing All Employees
async function displayAllEmp() {
    const query = "SELECT e.id, e.first_name, e.last_name, e.role_id, CONCAT(em.first_name, ' ', em.last_name) AS manager_name, role.title, role.salary, department.name AS dep_name  FROM employee AS e LEFT JOIN employee AS em ON e.manager_id = em.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id ORDER BY id;"
    connection.query(query, function (err, res) {
        if (err) throw new Error(err);
        console.clear();
        console.table(res);
        start();
    });
}

// Viewing Employee by Department
async function getDepNames() {
    const departmentNames = [];
    const query = "SELECT name FROM department";
    connection.query(query, function (err, res) {
        if (err) throw new Error(err);
        for (let i = 0; i < res.length; i++) {
            departmentNames.push(res[i].name);
        }
        whicDepartment(departmentNames);
    });
}
async function whicDepartment(x) {
    inquirer.prompt({
        name: "selDepartment",
        type: "list",
        message: "Which department would you like to search?",
        choices: x
    })
        .then((ans) => {
            const query = `SELECT e.id, e.first_name, e.last_name, e.role_id, CONCAT(em.first_name, ' ', em.last_name) AS manager_name, role.title, role.salary, department.name AS dep_name  FROM employee AS e LEFT JOIN employee AS em ON e.manager_id = em.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE department.name = '${ans.selDepartment}'ORDER BY id;`;
            connection.query(query, (err, res) => {
                if (err) return new Error(err);
                console.clear();
                console.log("\n");
                console.table(res);
                start();
            });
        });
}

// Viewing Employees by Roles
async function getRoleNames() {
    const rolesAva = [];
    const query = "SELECT title FROM role";
    connection.query(query, function (err, res) {
        if (err) throw new Error(err);
        for (let i = 0; i < res.length; i++) {
            rolesAva.push(res[i].title);
        }
        whichRole(rolesAva);
    });
}
async function whichRole(x) {
    inquirer.prompt({
        name: "selRole",
        type: "list",
        message: "Which Role would you like to search?",
        choices: x
    })
        .then((ans) => {
            const query = `SELECT e.id, e.first_name, e.last_name, e.role_id, CONCAT(em.first_name, ' ', em.last_name) AS manager_name, role.title, role.salary, department.name AS dep_name  FROM employee AS e LEFT JOIN employee AS em ON e.manager_id = em.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id WHERE role.title = '${ans.selRole}'ORDER BY id;`
            connection.query(query, (err, res) => {
                if (err) return new Error(err);
                console.clear();
                console.log("\n");
                console.table(res);
                start();
            });
        });
}
// Adding an employee to db
async function getEmployeeQuesInfo() {
    let roles = [];
    let managers = [];
    let distinctRole = [];
    let distinctManager = [];
    var query = 'SELECT id, title from role; SELECT e.id, CONCAT(em.first_name, " ", em.last_name) AS manager_name FROM employee AS e LEFT JOIN employee AS em ON e.manager_id = em.id;';
    connection.query(query, (err, res) => {
        if (err) return new Error(err);
        const rolesArr = res[0];
        const managerArr = res[1];

        for (const t of rolesArr) {
            roles.push(t.title)
        }
        for (const m of managerArr) {
            managers.push(m.manager_name)
        }
        const filterManager = managers.filter(manager => {
            if (manager === null) {
                return false;
            } else {
                return true;
            }
        });
        distinctRole = [...new Set(roles)];
        distinctManager = [...new Set(filterManager)];
        console.log(distinctRole);
        console.log(distinctManager);
        getEmployeeInfo(rolesArr, managerArr, distinctRole, distinctManager);

    });
}
async function getEmployeeInfo(rObj, mObj, r, m) {
    console.log(rObj);
    console.log(mObj);
    console.log(r);
    console.log(m);
    inquirer
        .prompt([{
            name: "emFName",
            type: "input",
            message: "What is the Empolyee First Name?",
        },
        {
            name: "emLName",
            type: "input",
            message: "What is the Empolyee Last Name?",
        },
        {
            name: "emRole",
            type: "list",
            message: "What is the title of the added employee?",
            choices: r
        },
        {
            name: "emManager",
            type: "list",
            message: "Who is the added employee Manager?",
            choices: m
        }])
        .then(ans => {
            console.log(ans);
            let roleId = rObj.find(obj => obj.title === ans.emRole).id;
            let managerId = mObj.find(obj => obj.manager_name === ans.emManager).id;
            addEmployeeToDB(ans.emFName, ans.emLName, roleId, managerId)
        })
}
async function addEmployeeToDB(fN, lN, rId, mId) {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,? ,? ,?)';
    connection.query(query, [fN, lN, rId, mId], function (err) {
        if (err) throw new Error(err);
        console.clear();
        console.log(`Employee ${fN} ${lN} is added successfully to the Database`);
        start();
    });

}
// Removing an Employee from DB
async function getEmployeesList() {
    let nameList = [];
    const query = "SELECT e.id, CONCAT(e.first_name, ' ', e.last_name) AS employee_name FROM employee AS e"
    connection.query(query, function (err, res) {
        if (err) throw new Error(err);
        for (let i = 0; i < res.length; i++) {
            nameList.push(res[i].employee_name);
        }
        presentEmployeeList(res, nameList);
    });
}
async function presentEmployeeList(aE, nE) {
    inquirer
        .prompt({
            name: "emName",
            type: "list",
            message: "Which Employee you would like to remove from the DB?",
            choices: nE
        })
        .then(ans => {
            console.log(ans);
            let findEmpId = aE.find(obj => obj.employee_name === ans.emName).id;
            removeEmployeeFromDB(findEmpId, ans.emName);
        })
}
async function removeEmployeeFromDB(eId, n) {
    const query = "DELETE FROM employee WHERE id=?"
    connection.query(query, eId, function (err, res) {
        if (err) throw new Error(err);
        console.log(`Employee ${n} with id ${eId} has been deleted successfully`);
    });
}
// Adding Department
async function getDepFromUser() {
    inquirer
        .prompt({
            name: "depName",
            type: "input",
            message: "Provide the Department Name you would like to add?"
        }).then((ans) => {
            addDepToDB(ans.depName)
        })
}
async function addDepToDB(d) {
    connection.query("INSERT INTO department (name) VALUES (?);", [d], (err, res) => {
        if (err) return new Error(err);
        console.clear();
        console.log(`${d} is added`);
        start();
    })
}
// Adding a Role
async function getRoleFromUser() {
    inquirer.prompt([
        {
            name: "roleName",
            type: "input",
            message: "What is the new Role you are trying to add?"
        },
        {
            // Prompt user for salary
            name: "salary",
            type: "number",
            message: "Porivde The Salary for this Title?"
        },
        {
            // Prompt user to select department role is under
            name: "deptId",
            type: "number",
            message: "Provide the Department Id?",
        }]).then((ans) => {
            addRoleToDB(ans);
        })
}
async function addRoleToDB(a) {
    connection.query(`INSERT INTO role (title, salary, department_id)
    VALUES (?,?,?)`, [a.roleName, a.salary, a.deptId], (err) => {
        if (err) return err;
        console.log(`Role: ${a.roleName}\n Salary: ${a.salary}\n DepId: ${a.deptId}\n is added`);
        start();
    });
}

// Deleting a role 
function getRoleFromDB() {
    let roles = [];
    connection.query("SELECT id, title FROM role;", (err, ans) => {
        if (err) return new Error(err);
        console.log(ans);
        for (const role of ans) {
            roles.push(role.title)
        }
        getRoleUserInput(ans, roles);
    });
}
async function getRoleUserInput(a, r) {
    let titleId;
    inquirer
        .prompt({
            name: "title",
            type: "list",
            message: "Who is the added employee Manager?",
            choices: r
        }).then((ans) => {
            for (let i = 0; i < a.length; i++) {
                if (ans.title === a[i].title) {
                    titleId = a[i].id;
                    titleName = a[i].title
                }
            }
            removeRoleFromDB(titleId, titleName);

        })
}
async function removeRoleFromDB(t, n) {
    connection.query(`DELETE FROM role WHERE id= ?;`, t, (err) => {
        if (err) return new Error(err);
        console.log(`ROLE ${n} with id ${t} has been removed from DB`);
        start();
    });
}

// Display the Departments Budget
function getDeptInfoFromDB() {
    const query = 'SELECT department.name, role.salary FROM employee e LEFT JOIN employee em ON e.manager_id = em.id INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id; SELECT name FROM department';
    connection.query(query, (err, res) => {
        if (err) return new Error(err);
        displayBudget(res);
    });
}
async function displayBudget(m) {
    let depBudArr = [];
    let department;
    let depSalaries = m[0];
    let dep = m[1];
    console.log(depSalaries);
    console.log(dep);
    for (let w = 0; w < dep.length; w++) {
        let depBudget = 0;
        for (i = 0; i < depSalaries.length; i++) {
            if (dep[w].name == depSalaries[i].department) {
                depBudget += depSalaries[i].salary;
            }
        }
        department = {
            departmentName: dep[w].name,
            Budget: depBudget
        }

        depBudArr.push(department);
    }
    console.table(depBudArr);

}




