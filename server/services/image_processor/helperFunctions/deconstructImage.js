module.exports = {

  getWordFromSymbols: (word) => {
    return {
      detectedBreak: word.property.detectedBreak,
      bounds: word.boundingBox.vertices,
      text: word.symbols.map(symbol => {
        return symbol.text;
      }).join('')
    };
  },

  getAllBlocks: (data) => {
    return data[0].fullTextAnnotation.pages[0].blocks;
  },

  getAllParagraphs: (data) => {
    var paragraphData = [];
    module.exports.getAllBlocks(data).forEach(block => {
      block.paragraphs.forEach(paragraph => {
        paragraphData.push(paragraph);
      });
    });
    return paragraphData;
  },

  getAllWordsFromImage: (data) => {
    var wordData = [];
    module.exports.getAllParagraphs(data).forEach(paragraph => {
      paragraph.words.forEach(word => {
        wordData.push(getWordFromSymbols(word));
      });
    });
    return wordData;
  },

  getAllWordsFromParagraph: (paragraph) => {
    return paragraph.words.map(word => {
      return module.exports.getWordFromSymbols(word);
    });
  },

  getTextFromParagraph: (paragraph) => {
    return module.exports.getAllWordsFromParagraph(paragraph).map(word => {
      return word.text;
    }).join(' ');
  },

  getParagraphsFromImage: (data) =>{
    return module.exports.getAllParagraphs(data).map(paragraph => {
      return module.exports.formatParagraph(paragraph);
    });
  },

  formatParagraph: (paragraph) => {
    return {
      detectedBreak: paragraph.property.detectedBreak,
      bounds: paragraph.boundingBox.vertices,
      text: module.exports.getTextFromParagraph(paragraph)
    };
  },

  getAllParagraphsFromBlock: (block) => {
    return block.paragraphs.map(paragraph => {
      return module.exports.formatParagraph(paragraph);
    });
  },

  formatBlock: (block) => {
    return {
      bounds: block.boundingBox.vertices,
      detectedBreak: block.property.detectedBreak,
      blockType: block.blockType,
      text: module.exports.getAllWordsFromBlock(block)
    };
  },

  getAllWordsFromBlock: (block) => {
    return module.exports.getAllParagraphsFromBlock(block).map(paragraph => {
      return paragraph.text;
    }).join('\n');
  },

  getBlocksFromImage: (data) => {
    return module.exports.getAllBlocks(data).map(block => {
      return module.exports.formatBlock(block);
    });
  },

  getAllText: (data) => {
    return data[0].fullTextAnnotation.text;
  },

  getImageBounds: (data) => {
    return data[0].textAnnotations[0].boundingPoly.vertices;
  },

  getTextFromWords: (words) => {
    return words.map(word => {
      return word.text;
    }).join(' ');
  },

  getTextLines: (data) => {
    return module.exports.getAllText(data).split('\n').map(line => {
      return {
        text: line,
        words: line.split(' ')
      };
    });
  }

};
