const moment = require('moment');
const date = moment();

var generateMessage = function (from, text){
    return {
        from,
        text,
        createdAt: date.format('MMMM DD, YYYY')
    };
};

var generateLocationMessage = function (from, latitude, longitude) {
    return {
        from: from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    };
};

module.exports = {generateMessage, generateLocationMessage};