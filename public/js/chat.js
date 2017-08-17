var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    
    /* 
        We need to take into account the clients view height,
        the distance scrolled, the height if the incoming message,
        and the height of the previous message in order to autoscroll
        when user is at the bottom of the page. 
    */
    
    // Height of the client's messages container view
    var clientHeight = messages.prop('clientHeight');
    
    // Number of pixels scrolled vertically
    var scrollTop = messages.prop('scrollTop');
    
    // Height of the scroll bar after new message is added.
    var scrollHeight = messages.prop('scrollHeight');
    
    // Height of the incoming message
    var newMessageHeight = newMessage.innerHeight();
    
    // Height of the message previous to the new message
    var lastMessageHeight = newMessage.prev().innerHeight();
    

    if(clientHeight + scrollTop + newMessageHeight +lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}
            
socket.on('connect', function(){
    console.log('Connected to server');
});
            
socket.on('disconnect', function(){
    console.log('Disconnected from the server'); 
});

// Listens for the emit of newMessage from the server..
socket.on('newMessage', function(message){
    var formattedTime = moment(message.createdAt).format('MMMM Do, YYYY (h:mm a)');
    
    // template will be the html content within the #message-template
    var template = $('#message-template').html();
    
    // html is then placed into our template and rendered to the message section.
    var html = Mustache.render(template, {
        from: message.from,
        text: message.text,
        createdAt: formattedTime
    });
    
    // Scroll to bottom of chat if user is not scrolled up
    $('#messages').append(html);
    scrollToBottom();
    
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
    var formattedTime = moment(message.createdAt).format('MMMM Do, YYYY (h:mm a)');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    
    $('#messages').append(html);
    
    // // Format value provided by generateLocationMessage function..
    // var formattedTime = moment(message.createdAt).format('MMMM Do, YYYY (h:mm a)');
    
    // var li = $('<li></li>');
    // var a = $('<a target="_blank">My current location</a>');
    // var span = $('<span class="date"></span>');
    
    // li.text(`${message.from}: `);
    // a.attr('href', message.url);
    // span.text(`Sent: ${formattedTime}`);
    
    
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
