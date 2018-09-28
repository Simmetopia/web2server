import { Converter } from 'showdown';
import * as fs from 'fs';
import * as path from 'path';

const converter = new Converter();
const MD = fs.readFileSync(path.join(__dirname, '../../api_docs.md')).toString();
const docs = converter.makeHtml(MD);


const style = `
<style>
body {
font-family: 'Open Sans', sans-serif;
}

pre {
	box-sizing: border-box;
	width: 100%;
	padding: 0;
	margin: 0;
	overflow: auto;
	overflow-y: hidden;
	font-size: 12px;
	line-height: 20px;
	background: #efefef;
	border: 1px solid #777;
	color: #333;
	font-family: 'Open Sans', sans-serif;
}
</style>
`;

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
  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
  ${style}
</body>
</html>
`;


