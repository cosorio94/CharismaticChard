// Require `PhoneNumberFormat`. 
var PNF = require('google-libphonenumber').PhoneNumberFormat;
 
// Get an instance of `PhoneNumberUtil`. 
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
 
module.exports = {
  
  parseUserPhoneNumber: (req, res, next) => {
    // console.log('body: ', req.body);
    var parsedPhone = phoneUtil.parse(req.body.phone, 'US');
    // console.log('parsed: ', parsedPhone);
    req.body.phone = phoneUtil.format(parsedPhone, PNF.E164);
    console.log('formatted: ', req.body.phone);
    next();
  }

};