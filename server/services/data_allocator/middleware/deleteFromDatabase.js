const models = require('../../../../db/models');
const controller = require('../../../controllers');
var Promise = require('bluebird');

module.exports = {

  deleteProfile: (req, res, next) => {
    models.Profile.destroy({ id: req.user.id })
      .then(() => {
        return next();
      })
      .error(err => {
        res.status(500).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  }

};