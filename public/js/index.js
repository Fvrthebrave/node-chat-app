var socket = io();
            
socket.on('connect', function(){
    console.log('Connected to server');
});
            
socket.on('disconnect', function(){
    console.log('Disconnected from the server'); 
});

// Listens for the emit of newMessage from the server..
socket.on('newMessage', function(message){
    var template = $('#message-template').html();
    var html = Mustache.render(template);
    
    $('#messages').append(html);
    
    // // Format value provided by generateMessage function..
    // var formattedTime = moment(message.createdAt).format('MMMM Do, YYYY (h:mm a)');
    
    // // Add list item containing message details to screen
    // var li = $('<li></li>');
    // var span = $('<span class="date"></span>');
    // li.text(`${message.from}: ${message.text}`);
    // span.text(`Sent: ${formattedTime}`);
    
    // // Add new list item and it's children to the message section..
    // li.append(span);
    // $('#messages').append(li);
});

// Listens for the emit of newLocation message from the server..
socket.on('newLocationMessage', function (message){
    
    // Format value provided by generateLocationMessage function..
    var formattedTime = moment(message.createdAt).format('MMMM Do, YYYY (h:mm a)');
    
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    var span = $('<span class="date"></span>');
    
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    span.text(`Sent: ${formattedTime}`);
    
    
    // Add new list item and it's children to the message section..
    li.append(a);
    li.append(span);
    $('#messages').append(li);
});

// Select the DOM element with the id 'message-form'
$('#message-form').on('submit', function (e) {
    e.preventDefault();
    
    // Emits 'createMessage' to the server when the form is submitted..
    socket.emit('createMessage', {
       from: "User",
       text: $('[name=message]').val()
    }, function (data) {
        console.log(data);
        
        // Once confirmed server has received emit, reset the user's input.
        $('[name=message]').val('');    
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
