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
        type: "checkbox",
        message: "Select the Sections you wish to incude in the README.md",
        name: "sections",
        choices: ["Installation", "Usage", "Credits", "License", "Tests"],
        default: ["Installation", "Usage", "License"]
    },
    {
        type: "input",
        message: "How do you install this project?",
        name: "installation",
        when: response => (response.sections.indexOf("Installation") >= 0) ? true : false
    },
    {
        type: "input",
        message: "Provide instructions and examples for use of this project.",
        name: "usage",
        when: response => (response.sections.indexOf("Usage") >= 0) ? true : false,
    },
    {
        type: "confirm",
        message: "Are there any images you wish to include in the README?",
        name: "includeImage",
        when: response => (response.sections.indexOf("Usage") >= 0) ? true : false,
    },
    {
        type: "input",
        message: "Enter the path of the images, starting with './' (e.g. ./image_directory). If there is more than one file, ensure they are located in the same directory.",
        message: "Enter the path of the images (e.g. ./image_directory). If there is more than one file, ensure they are located in the same directory.",
        name: "imagePath",
        when: response => (response.includeImage && response.sections.indexOf("Usage") >= 0),
        validate: path => (path.indexOf('./')===0) ? true : 'Enter a valid path (beginning with ./)',
    },
    {
        type: "input",
        message: " Enter the filename of the image. If more than one file, separate filenames with a SPACE. (e.g. image.png animation.gif)",
        name: "filenames",
        when: response => (response.includeImage),
    },
    {
        type: "input",
        message: "Enter names of contributors to this project.",
        name: "credits",
        default: "none",
        when: response => (response.sections.indexOf("Credits") >= 0) ? true : false,
    },
    {
        type: "input",
        message: "Enter test case code blocks.",
        name: "tests",
        when: response => (response.sections.indexOf("Tests") >= 0) ? true : false,
    },
    {
        type: "list",
        message: "Choose a license for this project.",
        choices: ["MIT", "ISC", "GNU", "none"],
        default: 0,
        name: "license",
        when: response => (response.sections.indexOf("License") >= 0) ? true : false,
    },
    {
        type: "confirm",
        message: "Is there a deployed website for your project?",
        name: "website",
    },
    {
        type: "input",
        message: "Enter your Github username.",
        name: "username",
        default: "mc4506",
    },
    {
        type: "input",
        message: "Enter your email address.",
        default: "mike4506@gmail.com",
        name: "email",
        validate: input => {
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
    // console.log(response);
    const readme = generateREADME.generateREADME(response);
    // console.log(readme);
    fs.writeFile('README.md',readme, 'utf8', (error)=>{
        if (error) return console.log(error);
        console.log('File saved...');
    })
})
