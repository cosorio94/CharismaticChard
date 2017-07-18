const models = require('../../../../db/models');

const deconstructSplitData = (req, res, next) => {
  req.split = {
    'split_name': req.body.splitName,
    'total': req.body.splitTotal,
    'tax': req.body.totalTax,
    'tip': req.body.totalTip
  };
  // next();
};

const deconstructDebtorsData = (req, res, next) => {
  req.debtors = req.body.debtors.map((debtor, index, debtors) => {
    var fullName = debtor.name.split(' ');
    var lastName = fullName.length > 1 ? fullName.slice(1).join(' ') : null;
    return {
      first: fullName[0],
      last: lastName,
      display: debtor.name,
      phone: debtor.phone
    };
  });
  // next();
};

const deconstructDebtorsItemsData = (req, res, next) => {
  req.debtorItems = req.body.debtors.map(debtor => {
    return debtor.items.map(item => {
      return {
        'item_name': item.itemName,
        'price': item.itemPrice
      };
    });
  });
  // next();
};

const deconstructSplitterItems = (req, res, next) => {
  req.splitter = req.body.splitter;
  req.splitterItems = req.splitter.items.map((item) => {
    return {
      'item_name': item.itemName,
      'price': item.itemPrice
    };
  });
  // next();
};

module.exports = (req, res, next) => {
  deconstructSplitData(req, res);
  deconstructDebtorsData(req, res);
  deconstructDebtorsItemsData(req, res);
  deconstructSplitterItems(req, res);
  next();
};

