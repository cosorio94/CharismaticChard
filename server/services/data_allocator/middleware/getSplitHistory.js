const models = require('../../../../db/models');
const controller = require('../../../controllers');
const Promise = require('bluebird');

module.exports = {
  splitHistory: (req, res, next) => {
    return controller.Splits.getUsersParticipatedSplits(req, res)
      .then(splits => {
        console.log('results: ', splits);
        res.send(splits.sort(sortByDate).slice(0, 10));
      })
      .error(err => {
        res.status(500).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  },

  itemHistory: (req, res, next) => {
    return controller.Splits.getUsersItemsWithSplit(req, res)
      .then(items => {
        res.send(items.sort(sortByDate).slice(0, 10));
      })
      .error(err => {
        res.status(500).send(err);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  }
};

var sortByDate = (a, b) => {
  return new Date(b['updated_at']) - new Date(a['updated_at']);
};