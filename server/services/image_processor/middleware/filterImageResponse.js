const helperFunctions = require('../helperFunctions');

module.exports = (req, res, next) => {
  req.itemLines = req.body.imageItems.map(itemBounds => {
    return helperFunctions.filterImageResponse(req.words, itemBounds, req.lines);
  });
  req.totalLine = !!req.body.imageTotal ? helperFunctions.filterImageResponse(req.words, req.body.imageTotal, req.lines) : null;
  req.taxLine = !!req.body.imageTax ? helperFunctions.filterImageResponse(req.words, req.body.imageTax, req.lines) : null;
  return next();
};