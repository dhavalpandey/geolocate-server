const { response } = require('express');
const Datastore = require('nedb');

var express = require('express');
const { request } = require('http');

var app = express();
var port = process.env.PORT || 3000
app.listen(port, () => console.log('Server is running'));
app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

var database = new Datastore('user.db');
database.loadDatabase();


app.post('/data', (request, response) => {
    console.log('Recieved a request via your app!');
    var data = request.body;
    var timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    console.log(database);
    response.json({
        status: "success",
        lat: data.lat,
        long: data.lon
    });
});