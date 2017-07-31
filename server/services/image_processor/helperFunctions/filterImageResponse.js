const deconstructImage = require('./deconstructImage.js');

module.exports = (words, bounds, lines) => {
  var filteredWords = filterWordsWithinBounds(words, bounds);
  return getLineWithWords(filteredWords, lines);
};

const filterWordsWithinBounds = (words, bounds) => {
  return words.filter(word => {
    return isWithinBounds(word, bounds);
  });
};

const getLineWithWords = (words, lines) => {
  // console.log('lines: ', lines);
  // console.log('getMostSimilarLineIndex: ', getMostSimilarLineIndex(words, lines));
  return lines[getMostSimilarLineIndex(words, lines)];
};

const isWithinBounds = (word, bounds) => {
  var avg = avgPosition(word);
  return (avg.x <= bounds.bottomRight.bottomX && avg.x >= bounds.topLeft.topX && avg.y <= bounds.bottomRight.bottomY && avg.y >= bounds.topLeft.topY);
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
  return words.reduce((acc, word) => {
    return line.words.includes(word.text) ? ++acc : acc;
  }, 0);
};

const getLinesWordSimilarityCount = (words, lines) => {
  return lines.map(line => {
    return getLineCountForWords(words, line);
  });
};

// const getMostSimilarLineIndex = (words, lines) => {
//   return getLinesWordSimilarityCount(words, lines).reduce((acc, lineCount, index) => {
//     return lineCount > acc[1] ? [index, lineCount] : acc;
//   });
// };

const getMostSimilarLineIndex = (words, lines) => {
  return lines.reduce((acc, line, index) => {
    var lineCount = getLineCountForWords(words, line);
    return lineCount > acc[1] ? [index, lineCount] : acc;
  }, [0, 0])[0];
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


