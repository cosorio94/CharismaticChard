const deconstructImage = require('./deconstructImage.js');

module.exports = (words, bounds, lines) => {
  // console.log('words: ', words);
  // console.log('lines: ', lines);
  // console.log('bound: ', bounds);
  var filteredWords = filterWordsWithinBounds(words, bounds);
  // console.log('filteredWords: ', filteredWords);
  return getLineWithWords(filteredWords, lines);
};

const filterWordsWithinBounds = (words, bounds) => {
  return words.filter(word => {
    return isWithinBounds(word, bounds);
  });
};

const getLineWithWords = (words, lines) => {
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

const getMostSimilarLineIndex = (words, lines) => {
  return lines.reduce((acc, line, index) => {
    var lineCount = getLineCountForWords(words, line);
    return lineCount > acc[1] ? [index, lineCount] : acc;
  }, [0, 0])[0];
};


