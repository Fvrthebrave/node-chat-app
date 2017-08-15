var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');
console.log({generateMessage, generateLocationMessage});

describe('generateMessage', function(){
    it('Should generate a message object', function() {
       // store response in variable
       var from = 'Collin';
       var text = 'Some message';
       var message = generateMessage(from, text);
       
       expect(message.createdAt).toBeA('number');
       // ES6 syntax
       expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', function () {
    it('Should generate location object', function () {
        var from = 'Collin';
        var latitude = 1;
        var longitude = 1;
        var url = 'https://www.google.com/maps?q=1,1';
        var message = generateLocationMessage(from, latitude, longitude);
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});