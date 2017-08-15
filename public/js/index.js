var socket = io();
            
socket.on('connect', function(){
    console.log('Connected to server');
});
            
socket.on('disconnect', function(){
    console.log('Disconnected from the server'); 
});

// Listens for the emit of newMessage from the server..
socket.on('newMessage', function(message){
    console.log(message);
    
    // Add list item containing message details to screen
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    $('#messages').append(li);
    
    // Reset the input value to blank
    $('[name=message]').val('');
});

// Listens for the emit of newLocation message from the server..
socket.on('newLocationMessage', function (message){
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    
    li.append(a);
    $('#messages').append(li);
});

// Select the DOM element with the id 'message-form'
$('#message-form').on('submit', function (e) {
    e.preventDefault();
    
    // Emits 'createMessage' to the server when the form is submitted..
    socket.emit('createMessage', {
       from: "User",
       text: $('[name=message]').val()
    }, function () {
        
    });
});

// Select the DOM element with the id 'send-location'
var locationButton = $('#send-location');
locationButton.on('click', function(){
    
    // If no access to geolocation API
    if(!navigator.geolocation) {
        return alert('Geolocation not supported by your browser!');
    } 
    
    // Function takes a position and a callback.
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit('createLocationMessage', {
           latitude: position.coords.latitude,
           longitude: position.coords.longitude
        });
    }, function () {
       alert('Unable to fetch location.'); 
    });
});
