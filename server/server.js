const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');


var app = express();
var server = http.createServer(app);
const port = 3000;
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');


    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});
server.listen(port, function() {
    console.log('Example app listening on port' + port);
});

