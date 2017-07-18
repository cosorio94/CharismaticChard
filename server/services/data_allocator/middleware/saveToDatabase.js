const models = require('../../../../db/models');
const controller = require('../../../controllers');

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
  // return 
};

// save split, returns split
// save spliter items
// for each debtor in debtors
// check for profiles of debtor
// if exists, get id
// if not, create a new one
// return debtor id and split id
// for each item in debtors items
// save item with debtor id and split id