const deconstructImage = require('./deconstructImage.js');

module.exports = {

  filterWordsWithinBounds: (words, bounds) => {
    return words.filter(word => {
      return isWithinBounds(word, bounds);
    });
  },

  getLineWithWords: (words, lines) => {

  }

};

const isWithinBounds = (word, bounds) => {
  var avg = avgPosition(word);
  return (avg.x <= bounds.bottomRight.x && avg.x >= bounds.topLeft.x && avg.y <= bounds.bottomRight.y && avg.y >= bounds.topLeft.y);
};

const avgPosition = (word) => {
  var avg = word.bounds.reduce((acc, bound) => {
    return {
      x: acc.x + bound.x,
      y: acc.y + bound.y
    };
  });
  avg.x = avg.x / 4;
  avg.y = avg.y / 4;
  return avg;
};

const getLineCountForWords = (words, line) => {
  var counter = 0;
  // return words.reduce((acc, word) => {
  //   if () {}
  // })
};



// const findOppositeVertex = (firstVertexIndex, word) => {
//   var indices = [0, 1, 2, 3];
//   var closestToVertex = findClosestToVertex(firstVertexIndex, word);
//   var closeVerticesIndices = [firstVertexIndex, closestToVertex.x, closestToVertex.y];
// }

// const findClosestToVertex = (firstVertexIndex, word) => {
//   var closestToOrigin = {};
//   var mins = {};
//   word.bounds.forEach((bound, index, bounds) => {
//     if (index === 0) {
//       return;
//     } else {
//       var xDiff = Math.abs(bound.x - bounds[firstVertexIndex].x);
//       var yDiff = Math.abs(bound.y - bounds[firstVertexIndex].y);
//       if (!closestToOrigin.x || xDiff < mins.x) {
//         mins.x = xDiff;
//         closestToOrigin.x = index;
//       }
//       if (!closestToOrigin.y || yDiff < mins.yx) {
//         mins.y = yDiff;
//         closestToOrigin.y = index;
//       }
//     }
//   });
//   return closestToOrigin;
// };

// var bounds = [
//   {
//     "x": 2425,
//     "y": 647
//   },
//   {
//     "x": 2447,
//     "y": 647
//   },
//   {
//     "x": 2447,
//     "y": 723
//   },
//   {
//     "x": 2425,
//     "y": 723
//   }
// ];

// const findOppositeVertex = (firstVertexIndex, word) => {
//   var oppositeVertex = {};
//   var maxDiff = {};
//   word.bounds.forEach((bound, index, bounds) => {
//     if (index === 0) {
//       return;
//     } else {
//       var xDiff = Math.abs(bound.x - bounds[firstVertexIndex].x);
//       var yDiff = Math.abs(bound.y - bounds[firstVertexIndex].y);
//       if (!oppositeVertex.x || xDiff > maxDiff.x) {
//         maxDiff.x = xDiff;
//         oppositeVertex.x = index;
//       }
//       if (!oppositeVertex.y || yDiff > maxDiff.yx) {
//         maxDiff.y = yDiff;
//         oppositeVertex.y = index;
//       }
//     }
//   });
//   return oppositeVertex;
// };
// think of finding closest pairs in the future
// const averagePosition = (word) => {
//   var closestToOrigin = findClosestToOrigin(word);
//   var topAvg = {
//     x: Math.abs(word.bounds[closestToOrigin.y].x - word.bounds[0].x),
//     y: Math.abs(word.bounds[closestToOrigin.y].y - word.bounds[0].y)
//   };
//   var bottomIndices = 
//   var bottomAvg =
// };


