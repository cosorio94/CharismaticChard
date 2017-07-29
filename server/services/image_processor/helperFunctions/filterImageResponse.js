const deconstructImage = require('./deconstructImage.js');

module.exports = {

  filterWordsWithinBounds: (words, bounds) => {
    return words.filter(word => {
      return isWithinBounds(word, bounds);
    });
  }

};

const isWithinBounds = (word, bounds) => {
  
};

// think of finding closest pairs in the future
const averagePosition = (word) => {

};

const findClosestPairs = (word) => {
  var closestPairs = {};
  var mins = {};
  word.bounds.forEach((bound, index, bounds) => {
    if (index === 0) {
      return;
    } else {
      var xDiff = Math.abs(bound.x - bounds[0].x);
      var yDiff = Math.abs(bound.y - bounds[0].y);
      if (!closestPairs.x || xDiff < mins.x) {
        mins.x = xDiff;
        closestPairs.x = index;
      }
      if (!closestPairs.y || yDiff < mins.yx) {
        mins.y = yDiff;
        closestPairs.y = index;
      }
    }
  });
  return closestPairs;
};


var bounds = [
  {
    "x": 2425,
    "y": 647
  },
  {
    "x": 2447,
    "y": 647
  },
  {
    "x": 2447,
    "y": 723
  },
  {
    "x": 2425,
    "y": 723
  }
];