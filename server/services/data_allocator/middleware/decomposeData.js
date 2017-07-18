const models = require('../../../../db/models');

module.exports = {

  decomposeSplitData: (req, res, next) => {
    req.split = {
      'split_name': req.body.splitName,
      'total': req.body.splitTotal,
      'tax': req.body.totalTax,
      'tip': req.body.totalTip
    };
    next();
  },

  decomposeDebtorsData: (req, res, next) => {
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
    next();
  },

  decomposeDebtorsItemsData: (req, res, next) => {
    req.debtorItems = req.body.debtors.map(debtor => {
      return debtor.map(item => {
        return {
          'item_name': item.itemName,
          'price': item.itemPrice
        };
      });
    });
    next();
  }

};

