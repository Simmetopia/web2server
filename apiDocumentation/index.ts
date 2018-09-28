import { Converter } from 'showdown';
import * as fs from 'fs';
import * as path from 'path';

const converter = new Converter();
const MD = fs.readFileSync(path.join(__dirname, '../../api_docs.md')).toString();
const docs = converter.makeHtml(MD);


export const html = `
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Workout API docs</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <div>
  ${docs}
</div>
  <noscript>Please enable JavaScript to continue using this application.</noscript>
  <link type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.css" >
</html>
`;