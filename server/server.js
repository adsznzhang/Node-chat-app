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

    socket.emit('newEmail', {
        from: 'adszn@hotmail.com',
        text: 'Hey. What is going on',
        createAt: 123
    });

    socket.emit('newMessageEvent', {
        form: 'adsaa@hotmail.com',
        text: 'ni hao shi jie',
        createAt: 321
    });


    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    socket.on('createEmail', (newEmail) => {
        console.log('createEmail', newEmail);
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

});
server.listen(port, function() {
    console.log('Example app listening on port' + port);
});

