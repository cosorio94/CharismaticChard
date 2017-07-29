const express = require('express');
const middleware = require('../middleware');

const router = express.Router();

router.route('/')
  .post(middleware.deconstructData)
  .post(middleware.saveToDatabase)
  .post((req, res, next) => {

    res.redirect(307, '/api/send-split');
  });

router.route('/update-profile')
  .post(middleware.phoneParser.parseUserPhoneNumber)
  .post(middleware.updateDatabase.updateProfileInfo)
  .post((req, res) => {
    res.redirect('/profile');
  });

router.route('/delete-profile')
  .get(middleware.deleteFromDatabase.deleteProfile)
  .get((req, res) => {
    console.log(req.user);
    res.render('deletedProfile.ejs');
    // res.redirect('/logout');
  });

router.route('/profile')
  .get((req, res) => {
    res.send(req.user);
  });

router.route('/split-history')
  .get(middleware.getSplitHistory.splitHistory);

router.route('/item-history')
  .get(middleware.getSplitHistory.itemHistory);

router.route('/check-user/:email')
  .get(middleware.checkUser);




module.exports = router;

