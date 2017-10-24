var socket = io();

socket.on('connect', () => {
    console.log('Connected to the server');


    socket.emit('createMessage', {
        from: 'dadfa@hotmail.com',
        text: 'waowao'
    });
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessageEvent', (newMessage) => {
    console.log('New Message', newMessage);
});
