var socket = io();
            
socket.on('connect', function(){
    console.log('Connected to server');
    
    // Listens for the emit of newMessage from the server..
    socket.on('newMessage', function(message){
        console.log(message);
        var li = $('<li></li>');
        li.text(`${message.from}: ${message.text}`);
        $('#messages').append(li);
    });
});
            
socket.on('disconnect', function(){
    console.log('Disconnected from the server'); 
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    
    socket.emit('createMessage', {
       from: "User",
       text: $('[name=message]').val()
    }, function (data) {
        console.log(data);
    });
});
