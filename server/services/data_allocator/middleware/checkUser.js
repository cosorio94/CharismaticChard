const controller = require('../../../controllers');
var Promise = require('bluebird');

module.exports = (req, res) => {
  controller.Profiles.findUser(req, res);
};