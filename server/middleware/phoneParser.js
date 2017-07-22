// // Require `PhoneNumberFormat`. 
// var PNF = require('google-libphonenumber').PhoneNumberFormat;
 
// // Get an instance of `PhoneNumberUtil`. 
// var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const phoneParser = require('../helperFunctions/parsePhone.js');
 
module.exports = {
  
  parseUserPhoneNumber: (req, res, next) => {
    req.body.phone = phoneParser.parseAndFormatPhone(req.body.phone);
    return next();
  },

  formatPhoneForView: (req, res, next) => {
    req.user.phone = phoneParser.formatPhoneNational(req.user.phone);
    return next();
  }

};