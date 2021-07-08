// Load all node modules
var express = require('express');
// initalise Express
var app = express();
// Render static files
app.use(express.static('public'));
// Port website will run on
app.listen(8080);

// move all static files (html, css, javascript, images) to public folder
// ensure this file is above the public folder
// run npm install express
// now run npm init and press enter on all default options
    // ensure express module depedency is there.
// then run npm start and go to the webpage. 
//this will start the express server which should serve the static pages.
