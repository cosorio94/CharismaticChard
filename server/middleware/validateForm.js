const validator = (req, res, next, redirect, flash) => {
  return req.getValidationResult()
    .then((result) => {
      if (!result.isEmpty()) {
        var errors = result.useFirstErrorOnly().array();
        // console.log('error: ', errors[0].msg);
        req.flash(flash, errors[0].msg);
        return res.redirect(redirect);
      }
      return next();
    });
};


module.exports = {

  validateSignUp:  (req, res, next) => {
    req.checkBody('email', 'Enter a valid email address.').notEmpty().isEmail();
    req.checkBody('phone', 'Enter a valid US phone number.').isMobilePhone('en-US').notEmpty();
    req.checkBody('password', 'Password must be at least 6 characters long.').isLength({ min: 6 });
    return validator(req, res, next, '/signup', 'signupMessage');
  },

  validateUpdate: (req, res, next) => {
    req.checkBody('phone', 'Enter a valid US phone number.').isMobilePhone('en-US').notEmpty();
    return validator(req, res, next, '/update-profile', 'updateProfile');
  }

};