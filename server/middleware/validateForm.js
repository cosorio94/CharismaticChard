module.exports = {

  validateSignUp:  (req, res, next) => {
    req.checkBody('email', 'Enter a valid email address.').notEmpty().isEmail();
    req.checkBody('phone', 'Enter a valid US phone number.').isMobilePhone('en-US').notEmpty();
    req.checkBody('password', 'Password must be at least 6 characters long.').isLength({ min: 6 });
    return req.getValidationResult()
      .then((result) => {
        console.log('Errors: ', result.array());
        if (!result.isEmpty()) {
          var errors = result.useFirstErrorOnly().array();
          // console.log('error: ', errors[0].msg);
          req.flash('signupMessage', errors[0].msg);
          return res.redirect('/signup');
        }
        return next();
      });
  }

};