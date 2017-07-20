const models = require('../../../../db/models');
const controller = require('../../../controllers');
var Promise = require('bluebird');

module.exports = {

  updateProfileInfo: (req, res, next) => {
    var user = Object.assign({display: req.body.first + ' ' + req.body.last}, req.body);
    models.Profile.update(user, { id: req.user.id })
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