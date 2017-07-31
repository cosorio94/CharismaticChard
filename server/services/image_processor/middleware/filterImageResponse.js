const helperFunctions = require('../helperFunctions');

module.exports = (req, res, next) => {
  req.itemLines = req.body.imageItems.map(itemBounds => {
    return helperFunctions.filterImageResponse(req.words, itemBounds, req.lines);
  });
  return next();
};