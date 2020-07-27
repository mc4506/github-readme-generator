const generateREADME = (obj) => {
    const readme = {
        title : `# ${obj.title} ![https://img.shields.io/github/license/${obj.username}/${obj.repo}](https://img.shields.io/github/license/${obj.username}/${obj.repo})\n\n`,
        projectLink : `<https://${obj.username}.github.io/${obj.repo}>`,
        description : '## Description\n\n' + obj.description + '\n',
        includeLink : function(){
            if(obj.website) this.description += `Deployed Site: ${this.projectLink}\n\n`;
        },
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
                let filenameArr = obj.filenames.split(" ");
                filenameArr.forEach(element => {
                    let img = `![${obj.title}](${obj.imagePath}/${element})\n\n`;
                    this.usage += img;
                });
            };
        },
        credits : '## Credits\n\n' + obj.credits + '\n\n',
        license : `## License\n\n`
                    + 'Licensed under ' + obj.license + ' License.\n\n',
        tests : '## Tests\n' +'\n```\n' + obj.tests+'\n```' + '\n\n',
        questions : '## Questions\n\n' + `Contact [${obj.username}](mailto:${obj.email})`,
    };

    readme.includeLink();
    readme.writeTOC();
    readme.includeImage();

    // Assemble Readme into a string
    let readmeStr = readme.title.concat(readme.description, readme.toc);

    // Include sections in Readme String based on user selection
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
