
/*
MIT License

Copyright (c) 2021 Richard A. Healy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

'use strict';

var yargs = require('yargs');
var argv = yargs
    .option('input', {
        alias: 'r',
        description: 'JSON formatted input resume file.',
        type: 'string',
    })
    .option('template', {
        alias: 't',
        description: 'Handlebars formatted HTML template file corresponding to input file.',
        type: 'string',
    })
    .option('css', {
        alias: 'c',
        description: 'Name of CSS file.',
        type: 'string',
    })
    .usage('Usage: $0 -r "resume.json" -t "template.handlebars" -c "template.css"')
    .demandOption(['r','t','c'])
    .help()
    .alias('help', 'h')
    .argv;




function generate() {
    var fs = require("fs");
    var resumeObject = JSON.parse(fs.readFileSync(argv.r, "utf8"));

    var promise = new Promise( (resolve, reject) => {
        var resumeSchema = require("resume-schema");
        var onComplete = function (err, report) {
            if(err) {
                console.error("The resume was invalid:", err);
                reject();
            } else {
                console.log("Resume validated successfully:", report);
                resolve();
            }
        }
        resumeSchema.validate(resumeObject, onComplete);
    });

    promise.then(() => {
        var templateFile = argv.t;
        var templateSrc  = fs.readFileSync(templateFile).toString();
        var handlebars   = require("handlebars");
        var template     = handlebars.compile(templateSrc);

        var htmlStr = template(resumeObject);
        fs.writeFileSync("resume.html", htmlStr, "utf8");

        var cssStr = fs.readFileSync(argv.c, "utf8");
        fs.writeFileSync("resume.css", cssStr, "utf8");

        console.log("Wrote resume.html & resume.css. Done");    
    });
}

generate();
