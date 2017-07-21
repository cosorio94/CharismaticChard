const models = require('../../../../db/models');

const deconstructSplitData = (req, res) => {
  req.split = {
    'split_name': req.body.splitName,
    'total': req.body.splitTotal,
    'tax': req.body.totalTax,
    'tip': req.body.totalTip
  };
};


const deconstructDebtorsData = (req, res) => {
  console.log('body: ', req.body);
  

  req.debtors = req.body.debtors.map((debtor, index, debtors) => {
    var fullName = debtor.name.split(' ');
    var lastName = fullName.length > 1 ? fullName.slice(1).join(' ') : null;
    // change the return object here to fetch users from database with different queries
    if (debtor.email) {
      return {
        email: debtor.email
      };
    }
    return {
      first: fullName[0],
      last: lastName,
      display: debtor.name,
      phone: debtor.phone
    };
  });
  console.log('DEBOTRS??', req.debtors);
};

const deconstructDebtorsItemsData = (req, res) => {
  req.debtorItems = req.body.debtors.map(debtor => {
    return debtor.items.map(item => {
      return {
        'item_name': item.itemName,
        'price': item.itemPrice
      };
    });
  });
};

const deconstructSplitterItems = (req, res) => {
  req.splitter = req.body.splitter;
  req.splitterItems = req.splitter.items.map((item) => {
    return {
      'item_name': item.itemName,
      'price': item.itemPrice
    };
  });
};

module.exports = (req, res, next) => {
  deconstructSplitData(req, res);
  deconstructDebtorsData(req, res);
  deconstructDebtorsItemsData(req, res);
  deconstructSplitterItems(req, res);
  next();
};

