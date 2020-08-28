const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { push } = require("../../In Class Activities/Week-10/24-Mini-Project/Solved/lib/words");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employeeArr = [];

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

        
        employeeArr.push(answers);

        if(answers.continue) {
            createEmployee();
        }
        else {
            console.log(employeeArr);
            fs.writeFile("team.html", render(employeeArr), (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Successfully wrote to team.html!");
                }
            });
        }
    });
}

createEmployee();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
