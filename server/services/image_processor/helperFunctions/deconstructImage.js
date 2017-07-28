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
    getAllBlocks(data).forEach(block => {
      block.paragraphs.forEach(paragraph => {
        paragraphData.push(paragraph);
      });
    });
    return paragraphData;
  },

  getAllWordsFromImage: (data) => {
    var wordData = [];
    getAllParagraphs(data).forEach(paragraph => {
      paragraph.words.forEach(word => {
        wordData.push(getWordFromSymbols(word));
      });
    });
    return wordData;
  },

  getAllWordsFromParagraph: (paragraph) => {
    return paragraph.words.map(word => {
      return getWordFromSymbols(word);
    });
  },

  getTextFromParagraph: (paragraph) => {
    return getAllWordsFromParagraph(paragraph).map(word => {
      return word.text;
    }).join(' ');
  },

  getParagraphsFromImage: (data) =>{
    return getAllParagraphs(data).map(paragraph => {
      return formatParagraph(paragraph);
    });
  },

  formatParagraph: (paragraph) => {
    return {
      detectedBreak: paragraph.property.detectedBreak,
      bounds: paragraph.boundingBox.vertices,
      text: getTextFromParagraph(paragraph)
    };
  },

  getAllParagraphsFromBlock: (block) => {
    return block.paragraphs.map(paragraph => {
      return formatParagraph(paragraph);
    });
  },

  formatBlock: (block) => {
    return {
      bounds: block.boundingBox.vertices,
      detectedBreak: block.property.detectedBreak,
      blockType: block.blockType,
      text: getAllWordsFromBlock(block)
    };
  },

  getAllWordsFromBlock: (block) => {
    return getAllParagraphsFromBlock(block).map(paragraph => {
      return paragraph.text;
    }).join('\n');
  },

  getBlocksFromImage: (data) => {
    return getAllBlocks(data).map(block => {
      return formatBlock(block);
    });
  },

  getAllText: (data) => {
    return data[0].fullTextAnnotation.text;
  }

};
