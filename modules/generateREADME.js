const generateREADME = function (obj) {
    const readme = {
        title : `# ${obj.title}\n\n`,
        projectLink : `<https://${obj.username}.github.io/${obj.repo}>\n\n`,
        description : '## Description\n\n' + obj.description + '\n\n',
        toc : '## Table of Contents\n\n',
        writeTOC : function(){ 
            obj.sections.forEach(element => {
                this.toc += `* [${element}](#${element.toLowerCase()})\n`;
            });
            this.toc += '\n';
        },
        installation : '## Installation\n\n' + obj.installation + '\n\n',
        usage : '## Usage\n\n' + obj.usage + '\n\n',
        includeImage : function(){
            if(obj.includeImage) {
                const img = `![${obj.title}](${obj.imagePath})\n\n`;
                this.usage += img;
            }
        },
        credits : '## Credits\n\n' + obj.credits + '\n\n',
        license : '## License\n\n' + obj.license + '\n\n',
        tests : '## Tests\n\n' +'\n```\n' + obj.tests+'\n```' + '\n\n',
        questions : '## Questions\n\n' + `Submit your questions to [${obj.username}](mailto:${obj.email})`,
    };
    readme.writeTOC();
    readme.includeImage();

    // Assemble Readme into a string
    let readmeStr = readme.title.concat(readme.projectLink, readme.description, readme.toc);
    
    // Include sections in README based on user selection
    obj.sections.forEach(element => {
        let key = element.toLowerCase();
        if(readme.hasOwnProperty(key)){
            readmeStr += readme[key];
        }
    });
    readmeStr += readme.questions;
    
    return readmeStr;
}

module.exports = {
    generateREADME: generateREADME,
}