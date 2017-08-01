const helperFunctions = require('../helperFunctions');

module.exports = (req, res, next) => {
  req.itemLines = req.body.imageItems.map(itemBounds => {
    return helperFunctions.filterImageResponse(req.words, itemBounds, req.lines);
  });
  req.totalLine = !!req.body.total ? helperFunctions.filterImageResponse(req.words, req.body.total, req.lines) : null;
  req.taxLine = !!req.body.tax ? helperFunctions.filterImageResponse(req.words, req.body.tax, req.lines) : null;
  return next();
};