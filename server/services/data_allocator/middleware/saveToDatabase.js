const models = require('../../../../db/models');
const controller = require('../../../controllers');
var Promise = require('bluebird');

module.exports.saveSplitterItems = (req, res, next) => {
  return controller.Splits.saveSplit(req, res)
    .then(split => {
      req.split.id = split.get('id');
      return controller.Items.saveItems(req.splitterItems, req.split.id, req.split['splitter_id']);
    })
    .then(() => {
      next();
    });
};

module.exports.saveDebtorItems = (req, res, next) => {
  return Promise.map(req.body.debtors, (debtor, index) => {
    // would be better to use email, but for now phone is fine
    return models.Profile.findOrCreate(req.debtors[index])
      .then(profile => {
        return controller.Items.saveItems(req.debtorItems[index], req.split.id, profile.get('id'));
      });
  })
    .then(() => {
      next();
    });
};