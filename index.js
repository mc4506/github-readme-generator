const inquirer = require('inquirer');
const fs = require('fs');

console.log("This is a README.md generator for your Github repo.\nPlease follow the prompts to generate a professional README that you can add to your project!\n");

const questions = [
    {
        type: "input",
        message: "What is the title of this project?",
        name: "title"
    },
    {
        type: "input",
        message: "Enter a description for this project.",
        name: "description"
    },
    {
        type: "input",
        message: "What is the objective of this project?",
        name: "objective"
    },
    {
        type: "input",
        message: "How do you install this project?",
        name: "installation" 
    },
    {
        type: "input",
        message: "Provide examples for use of this project",
        name: "usage"
    },
    {
        type: "confirm",
        message: "Are there any images you wish to include in the README?",
        name: "includeImage"
    },
    {
        type: "input",
        message: "Enter the path of the image.",
        name: "imagePath",
        when: (response) => response.includeImage
    },
    {
        type: "input",
        message: "Enter names of contributors to this project.",
        name: "contributors"
    },
    {
        type: "input",
        message: "Enter test case code blocks",
        name: "tests"
    },
    {
        type: "list",
        message: "Choose a license for this project.",
        choices: ["MIT", "ISC", "GNU", "none"]
    },
    {
        type: "input",
        message: "Enter your Github username",
        name: "username"
    },
    {
        type: "input",
        message: "Enter your email address",
        name: "email",
        validate: function(){}
    }
];