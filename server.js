let  projectData = {};

// TODO-Express to run server and routes
const express = require('express');

// TODO-Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO-Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initializing the main project folder This line of code connects our server-side code (the code in the server.js file) to our client-side code (the browser code written in the files housed in the website folder). */
app.use(express.static('website'));

const port = 8080;

//callback to debug
function listening () {
console.log(`server is running at localhost: ${port}`)};

// Spin up the server
const server = app.listen(port,listening);

let data = [];

// callback function for the post route
const addData = (req, res) => {
    data.push(req.body);
    projectData = data[data.length - 1].main;
    console.log(projectData); 
}
 
// Post Route
app.post('/all', addData);

// Callback function for get route
const sendData = (request, response) => { response.send(projectData) };

// Get Route
app.get('/get', sendData);
