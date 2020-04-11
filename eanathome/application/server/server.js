var express = require('express')
var fs = require('fs')
var https = require('https')
var app = express()
var path = require('path');

app.use(express.static('public'));

app.use('/', express.static(__dirname + '../../public'));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname + '../../public/index.html'));
})

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});

var server = https.createServer({
    cert: fs.readFileSync('./cert.pem'),
    key: fs.readFileSync('./key.pem')
}, app);

server.listen(443);
