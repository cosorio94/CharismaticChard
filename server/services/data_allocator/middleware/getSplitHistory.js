const models = require('../../../../db/models');
const controller = require('../../../controllers');
const Promise = require('bluebird');

module.exports = {
  splitHistory: (req, res, next) => {
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
  },

  itemHistory: (req, res, next) => {
    return controller.Splits.getUsersItems(req, res)
      .then(items => {
        res.send(items);
      })
      .error(err => {
        res.status(500).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  }
};