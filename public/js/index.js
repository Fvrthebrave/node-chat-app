var socket = io();
            
socket.on('connect', function(){
    console.log('Connected to server');
    
    socket.on('newMessage', function(message){
        console.log(message);
    });
    
    socket.emit('createMessage', {
       to: 'Collin',
       text: "Do not talk to me!",
       createdAt: 123123
    });
});
            
socket.on('disconnect', function(){
    console.log('Disconnected from the server'); 
});

socket.on('newEmail', function(email){
   console.log('New email', email); 
});