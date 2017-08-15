var express = require('express');
var app = express();
const path = require('path');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8080;

app.use(express.static(publicPath));

app.listen(port, function(){
   console.log('Server is listening on ' + port); 
});
