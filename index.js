const inquirer = require('inquirer');
const generateREADME = require('./modules/generateREADME.js');
const fs = require('fs');

console.log("===================================================");
console.log("This is a README.md generator for your Github repo.");
console.log("Please follow the prompts to generate a markdown");
console.log("that you can add to your project!");
console.log("===================================================\n\n");

const questions = [
    {
        type: "input",
        message: "What is the title of this project?",
        name: "title",
    },
    {
        type: "input",
        message: "Enter Github repo name.",
        name: "repo",
    },
    {
        type: "editor",
        message: "Enter a description for this project.",
        name: "description",
    },
    {
        type: "input",
        message: "How do you install this project?",
        name: "installation",
    },
    {
        type: "input",
        message: "Provide instructions and examples for use of this project",
        name: "usage",
    },
    {
        type: "confirm",
        message: "Are there any images you wish to include in the README?",
        name: "includeImage",
    },
    {
        type: "input",
        message: "Enter the path of the image.",
        name: "imagePath",
        when: (response) => response.includeImage,
        validate: function(path){
            if(path.indexOf('./')===0){
                return true;
            }
            return 'Enter a valid path (beginning with ./)';
        },
    },
    {
        type: "input",
        message: "Enter names of contributors to this project.",
        name: "contributors",
        default: "none",
    },
    {
        type: "input",
        message: "Enter test case code blocks",
        name: "tests",
    },
    {
        type: "list",
        message: "Choose a license for this project.",
        choices: ["MIT", "ISC", "GNU", "none"],
        default: 0,
        name: "license",
    },
    {
        type: "input",
        message: "Enter your Github username",
        name: "username",
        default: "mc4506",
    },
    {
        type: "input",
        message: "Enter your email address",
        default: "mike4506@gmail.com",
        name: "email",
        validate: function(input){
            if (input.indexOf('@')>0){
                if(input.indexOf('.', input.indexOf('@')+2)>=0){
                    return true;
                }
            }
            return 'Please enter a valid email address';
        },
    },
];

inquirer.prompt(questions).then(function(response){
    console.log(response);
    const readme = generateREADME.generateREADME(response);
    console.log(readme);
    fs.writeFile('README.md',readme, 'utf8', (error)=>{
        if (error) return console.log(error);
        console.log('File saved...');
    })
})