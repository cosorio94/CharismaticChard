// // Require `PhoneNumberFormat`. 
// var PNF = require('google-libphonenumber').PhoneNumberFormat;
 
// // Get an instance of `PhoneNumberUtil`. 
// var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const formatPhone = require('../helperFunctions/parsePhone.js').parseAndFormatPhone;
 
module.exports = {
  
  parseUserPhoneNumber: (req, res, next) => {
    req.body.phone = formatPhone(req.body.phone);
    console.log('formatted: ', req.body.phone);
    return next();
  }

};