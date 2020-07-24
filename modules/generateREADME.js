const response = {
    title: 'Test project',
    repo: 'github-readme-generator',
    description: 'Test',
    installation: '',
    usage: '',
    includeImage: true,
    imagePath: './img/image.jpg',
    contributors: '',
    tests: '',
    license: 'MIT',
    username: 'mc4506',
    email: 'mike4506@gmail.com'
};


const generateREADME = function (obj) {
    //TODO: Include a TOC
    const readme = {
        title : `# ${obj.title}\n\n`,
        projectLink : `[Project Link](https://${obj.username}.github.io/${obj.repo}\n\n)`,
        description : '## Description\n\n' + obj.description + '\n\n',
        installation : '## Installation\n\n' + obj.installation + '\n\n',
        usage : '## Usage\n\n' + obj.usage + '\n\n',
        includeImage : function(){
            if(obj.includeImage) {
                const img = `![${obj.title}](${obj.imagePath})\n\n`;
                this.usage += img;
            }
        },
        contributors : '## Credits\n\n' + obj.contributors + '\n\n',
        license : '## License\n\n' + obj.license + '\n\n',
        tests : '## Tests\n\n' +'\n```\n' + obj.tests+'\n```' + '\n\n',
        questions : '## Questions\n\n' + `Submit your questions to [${obj.username}](mailto:${obj.email})`,
    };
    readme.includeImage();
    let readmeStr = readme.title.concat(readme.projectLink, readme.description, readme.installation, readme.usage, readme.contributors, readme.license, readme.tests, readme.questions);
    return readmeStr;
}

module.exports = {
    generateREADME: generateREADME,
}