// requirements
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// path variables
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// array variable
const employeeArr = [];

// function to write to team.html
const writeFilePromise = (text) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(outputPath, text, (err) => {
            if (err) {
                return reject(err);
            }
            else {
                return resolve("Successfully wrote to team.html!");
            }
        })
    })
}

// function to start inquirer and create employee objects
function createEmployee() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Is this employee a manager, an engineer, or an intern?",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        },
        {
            type: "input",
            name: "name",
            message: "Enter the employee's name."
        },
        {
            type: "input",
            name: "id",
            message: "Enter their employee ID."
        },
        {
            type: "input",
            name: "email",
            message: "Enter their email address."
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Because this is a manager, enter their office number.",
            when: (answers) => answers.role === "Manager"
        },
        {
            type: "input",
            name: "github",
            message: "Because this is an engineer, enter their GitHub username.",
            when: (answers) => answers.role === "Engineer"
        },
        {
            type: "input",
            name: "school",
            message: "Because this is an intern, enter their school.",
            when: (answers) => answers.role === "Intern"
        },
        {
            type: "confirm",
            name: "continue",
            message: "Do you want to add another employee?"
        }
    ]).then((answers) => {

        let Employee = {};
        if (answers.role === "Manager") {
            Employee = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        } 
        else if (answers.role === "Engineer") {
            Employee = new Engineer(answers.name, answers.id, answers.email, answers.github);
        } 
        else {
            Employee = new Intern(answers.name, answers.id, answers.email, answers.school);
        }
        employeeArr.push(Employee);

        if(answers.continue) {
            createEmployee();
        }
        else {
            const text = render(employeeArr);
            writeFilePromise(text).then((success) => {
                console.log(success);
            }).catch((err) => {
                console.log(err);
            })
        }
    });
}

createEmployee();
