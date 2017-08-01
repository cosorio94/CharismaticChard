const twilio = require('twilio');
const config = process.env.isHeroku ? {
  accountSid: process.env.Twilio_accountSid,
  authToken: process.env.Twilio_authToken
} : require('config')['twilio'];
const client = process.env.isTravis ? {
  messages: {
    create: () => null
  }
} : new twilio(config.accountSid, config.authToken);

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
