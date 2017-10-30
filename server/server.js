const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} =require('./utils/validation.js');
const publicPath = path.join(__dirname, '../public');


var app = express();
var server = http.createServer(app);
const port = 3000;
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join',(params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('Name and room name are reuqired');
        }

        socket.join(params.room);
        //socket.leave('The office fans');

        //io.emit-> io.to('The office fans').emit()
        //socket.broadcast.emit -> socket.broadcast.to('The office fans').emt
        //socket.emit
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));




        callback();
    });

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

});
server.listen(port, function() {
    console.log('Example app listening on port' + port);
});

