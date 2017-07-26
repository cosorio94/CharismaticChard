const models = require('../../../../db/models');
const controller = require('../../../controllers');
const Promise = require('bluebird');

module.exports = (req, res, next) => {
  return controller.Splits.getUsersSplits(req, res)
    .then(splits => {
      res.send(splits);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};