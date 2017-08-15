const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const path = require('path');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

// Listens for connection
io.on('connection', function(socket){
    console.log('New user connected');
    
    // Listens for the emit of createMessage from the client..
    socket.on('createMessage', function(message){
       console.log('New message', message); 
       io.emit('newMessage', {
          from: message.from,
          text: message.text,
          createdAt: new Date().getTime()
       });
    });
    
    socket.on('disconnect', function(){
       console.log('User was disconnected'); 
    });
});

server.listen(port, process.env.IP, function(){
   console.log(`Server is listening on ${port}`); 
});
