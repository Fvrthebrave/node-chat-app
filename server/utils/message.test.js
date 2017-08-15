var expect = require('expect');

var {generateMessage} = require('./message');
console.log({generateMessage});

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