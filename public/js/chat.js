var socket = io();


function scrollToBottom(){
    //selector
    var message = jQuery('#messages');
    var newMessage = message.children('li:last-child');

    var clientHeight = message.prop('clientHeight');
    var scrollTop = message.prop('scrollTop');
    var scrollHeight = message.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        message.scrollTop(scrollHeight);
    };
};

socket.on('connect', () => {
    var params = jQuery.deparam(window.location.search);


    socket.emit('join',params, function(err){
        if(err){
            alert(err);
            window.location.herf = '/';
        }else {
            console.log('No error');
        }
    });
});


socket.on('updateUserList', function(users) {
    var ol = jQuery('<ol></ol>');

    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });


    jQuery('#users').html(ol);
});


socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', (message) => {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime

    });


    // console.log('New Message', message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    jQuery('#messages').append(html);
    scrollToBottom();
});


socket.on('newLocationMessage', function(message) {

    var formmattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formmattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});


jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function(e) {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location...');


    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    },function() {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });

});
