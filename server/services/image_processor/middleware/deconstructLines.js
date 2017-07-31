const helperFunctions = require('../helperFunctions');

module.exports = (req, res, next) => {
  req.items = helperFunctions.deconstructLines(req.itemLines);
  return res.send(req.items);
};