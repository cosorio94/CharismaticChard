const helperFunctions = require('../helperFunctions');

module.exports = (req, res, next) => {
  req.items = helperFunctions.deconstructLines.items(req.itemLines);
  req.tax = helperFunctions.deconstructLines.tax(req.taxLine, req.lines);
  req.total = helperFunctions.deconstructLines.total(req.totalLine, req.lines);
  return res.send({
    items: req.items,
    tax: req.tax,
    total: req.total
  });
};