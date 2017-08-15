var socket = io();
            
socket.on('connect', function(){
    console.log('Connected to server');
    
    // Listens for the emit of newMessage from the server..
    socket.on('newMessage', function(message){
        console.log(message);
    });
});
            
socket.on('disconnect', function(){
    console.log('Disconnected from the server'); 
});
