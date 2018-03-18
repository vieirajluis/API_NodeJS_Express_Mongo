// TODO: create a basic server with express
// that will send back the index.html file on a GET request to '/'
// it should then send back jsonData on a GET to /data
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

//var jsonData = {count: 12, message: 'hey'}; 

// express.static will serve everything
// with in client as a static resource
// also, it will server the index.html on the
// root of that directory on a GET to '/'
// only works for creating an index route
app.use(express.static('client'));

// body parser makes it possible to post JSON to the server
// we can accss data we post on as req.body
app.use(bodyParser.urlencoded({ extended: true }));

//Allows req.body to be accessed for data
app.use(bodyParser.json());

var lions = [];
var id = 0;

// TODO: make the REST routes to perform CRUD on lions
//returns all lions
app.get('/lions', function (req, res) {
    console.log(id);
    res.json(lions);
});
//returns one lion based on an id
app.get('/lions/' + id, function (req, res) {
    //Find in the lions array an object whose id matches the searched for id
    console.log(id);
    var lion = _.find(lions, { id: req.params.id });
    console.log(lion);
    res.json(lion || {});
});
//Add a lion
app.post('/lions', function (req, res) {
    //just need to send the req.body
    var lion = req.body;
    //Increment the id for a new lion
    id++;
    lion.id = id + '';//convert id to string

    lions.push(lion);
    res.send(lion);
});
//Update a lion
app.put('/lions', function (req, res) {
    var update = req.body;
    //clear the id that was sent in the req.body because we want to use an existing object
    if (update.id) {
        delete update.id;
    }
    var lion = _.find(lions, { id: req.params.id });
    if (!lions[lion]) {
        res.send();
    } else {
        //merges two objects
        var updatedLion = _.assign(lions[lion], update);
        res.json(updatedLion);
    }
});

//Delete a lion
app.delete('/lions/:id', function (req, res) {

    var lion = _.find(lions, { id: req.params.id });
    if (!lions[lion]) {
        res.send();
    } else {
        //merges two objects
        var deletedLion = lions[lion];
        lions.splice(lion, 1);
        res.json(updatedLion, 'lion removed');
    }
});


var port = 3000;
app.listen(port, function () {
    console.log('listening on http//localhost:', port);
});
