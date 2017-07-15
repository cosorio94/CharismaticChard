var twilioMessages = require('./twilio.js');
var helperTwilio = require('./helper_twilio.js');

module.exports.twilioMiddleware = function (req, res) {
  var messages = helperTwilio.generateMessage(req.body); 
  var numbers = helperTwilio.numbersForTextMessage(req.body.debtors); 
  for ( let i = 0; i < messages.length; i++) {
    twilioMessages.sendSms(numbers[i], messages[i]).then((data) => {
      console.log('message received');
    }); 
  }
};