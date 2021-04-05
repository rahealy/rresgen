# rresgen
Richard's Resume Generator inputs a JSON file meeting the JSON resume specification, a handlebars template file, a template CSS file, and outputs a resume rendered as HTML and CSS files.

1) Clone into desired directory.
3) Run `npm install` to install dependencies in current directory. 
2) Create a JSON file that meets the [JSON resume standard](https://jsonresume.org/) or use the provided `sample_resume.json`.
4) Run `nodejs generate_resume.js --help` for options.
5) Use provided `template_0_html.handlebars` and `template_0.css` or create your own.
6) Files`resume.html` and `resume.css` will be created or overwritten in current directory.

Example Output:
```
>$ nodejs generate_resume.js -r sample_resume.json -t template_0_html.handlebars -c template_0.css 
Resume validated successfully: { valid: true }
Wrote resume.html & resume.css. Done.
```
