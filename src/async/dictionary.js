const resolveDictionary = (dictionary) => new Promise(resolve => {
  setTimeout(() => {
    resolve(dictionary);
  }, 500);
});

export const loadDictionary = (languageCode) => {
  switch (languageCode) {
    case 'En':
      return resolveDictionary([
        {
          word: 'book',
        }, {
          word: 'boy',
        }, {
          word: 'do',
        }, {
          word: 'dog',
        }, {
          word: 'green',
        }, {
          word: 'just',
        }, {
          word: 'keep',
        }, {
          word: 'key',
        }, {
          word: 'mother',
        }, {
          word: 'xenomorph',
        },
      ]);
    default:
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(`No dictionary for language [${languageCode}] found`);
        }, 500);
      });
  }
};