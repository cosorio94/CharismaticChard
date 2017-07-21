const models = require('../../../../db/models');
const controller = require('../../../controllers');
var Promise = require('bluebird');

const saveSplitterItems = (req, res) => {
  return controller.Splits.saveSplit(req, res)
    .then(split => {
      req.split.id = split.get('id');
      return controller.Items.saveItems(req.splitterItems, req.split.id, req.split['splitter_id']);
    });
};

const saveDebtorItems = (req, res) => {
  return Promise.map(req.body.debtors, (debtor, index) => {
    // would be better to use email, but for now phone is fine
    return models.Profile.findOrCreate(req.debtors[index])
      .then(profile => {
        return controller.Items.saveItems(req.debtorItems[index], req.split.id, profile.get('id'));
      });
  });
};

module.exports = (req, res, next) => {
  return saveSplitterItems(req, res)
    .then(() => {
      console.log('time to save debtor items!');
      return saveDebtorItems(req, res);
    })
    .then(() => {
      next();
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      console.log('error here!!');
      res.sendStatus(404);
    });
};