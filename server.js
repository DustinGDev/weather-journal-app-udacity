const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

// Setup Server
const port = 8000;
/* Spin up the server*/
app.listen(port);

app.post('/add', function (req, res) {  
    newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
  
    projectData = newEntry;
    res.send(projectData);
});

  // GET method route
app.get('/all', function (request, response) {
    response.send(projectData);
});
  