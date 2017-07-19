const models = require('../../../../db/models');
const controller = require('../../../controllers');
var Promise = require('bluebird');

module.exports = {

  updateProfileInfo: (req, res, next) => {
    models.Profile.update(req.body, { id: req.user.id })
      .then(() => {
        next();
      });
    // .finally((profile) => {
    //   return controller.Controller.resolveErrors(profile, res);
    // });
  }

};