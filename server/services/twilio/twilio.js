if (process.env.Twilio_accountSid && process.env.Twilio_authToken) {
  var config = {
    accountSid: process.env.Twilio_accountSid,
    authToken: process.env.Twilio_authToken
  };
} else if (!process.env.isTravis) {
  var config = require('./config.js');
}
var twilio = require('twilio');
if (process.env.isTravis) {
  var client = {
    messages: {
      create: () => {
        return;
      }
    }
  };
} else {
  var client = new twilio(config.accountSid, config.authToken);
}


module.exports.sendSms = function(to, message) {
  return client.messages
    .create({
      body: message,
      to: to,
      from: '+17602277616',
    }).then(function(data) {
      console.log('Administrator notified');
    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
};
