const ENGLISH_LOCAL_STORAGE_KEY = 'EnglishDictionary';

const resolveDictionary = (savedDictionary, defaultDictionary) => new Promise(resolve => {
  setTimeout(() => {
    if (savedDictionary) {
      resolve(savedDictionary);
    } else {
      localStorage.setItem(ENGLISH_LOCAL_STORAGE_KEY, JSON.stringify(defaultDictionary));
      resolve(defaultDictionary);
    }
  }, 50);
});

export const loadDictionary = (languageCode) => {
  switch (languageCode) {
    case 'En':
      const savedDictionary = JSON.parse(localStorage.getItem(ENGLISH_LOCAL_STORAGE_KEY));
      return resolveDictionary(savedDictionary, [
        {
          word: 'a',
          transcriptions: ['ə', 'eɪ'],
        }, {
          word: 'book',
          transcriptions: ['bʊk'],
        }, {
          word: 'box',
          transcriptions: ['bɒks'],
          semanticBlocks: [
          [{
            type: 'noun',
            meanings: [{
              translations: [
                { translation: 'коробка' },
                { translation: 'ящик' },
                { translation: 'сундук' },
                { translation: ' сумка, вместилище' },
              ],
            }, {
              translations: [
                { translation: 'ящичек', elaboration: 'стола' },
                { translation: 'коробочка', elaboration: 'для всяких мелочей' },
                { translation: 'шкатулка' },
              ],
              examples: [
                { expression: 'witness box', explanation: 'место в суде, где сидят свидетели' },
                { expression: 'music box', explanation: 'музыкальная шкатулка', remark: 'амер.' },
              ],
            }, {
              remark: 'рел.',
              translations: [
                { translation: 'дарохранительница'},
                { translation: 'дароносица' },
              ],
            }, {
              translations: [
                { translation: 'сейф' },
              ],
            }],
          }, {
            type: 'verb',
            meanings: [{
              translations: [
                { translation: 'класть в ящик или коробку' },
                { translation: 'упаковывать' },
                { translation: 'запирать в сундук' },
              ],
            }, {
              remark: 'полигр.',
              translations: [
                { translation: 'обрамлять, печатать в рамке' },
              ],
            }],
          }], 
          [{
            type: 'noun',
            meanings: [{
              translations: [
                { translation: 'пощёчина' },
              ],
            }],
          }]
        ],
        }, {
          word: 'do',
          transcriptions: ['duː'],
        }, {
          word: 'dog',
          transcriptions: ['dɒɡ'],
        }, {
          word: 'green',
          transcriptions: ['ɡriːn'],
        }, {
          word: 'just',
          transcriptions: ['dʒʌst'],
        }, {
          word: 'keep',
          transcriptions: ['kiːp'],
        }, {
          word: 'key',
          transcriptions: ['kiː'],
        }, {
          word: 'mother',
          transcriptions: ['ˈmʌðə'],
        }, {
          word: 'xenomorph',
        },
      ]);
    default:
      return resolveDictionary([]);
  }
};

const resolvePartsOfSpeeches = (partsOfSpeeches) => new Promise(resolve => {
  setTimeout(() => {
    resolve(partsOfSpeeches);
  });
});

export const loadPartsOfSpeech = (languageCode) => {
  switch (languageCode) {
    case 'En':
      return resolvePartsOfSpeeches(['noun', 'verb', 'adj']);
    default: 
      return resolvePartsOfSpeeches([]);
  }
};

const resolveSavingDictionary = (key, dictionary) => new Promise(resolve => {
  setTimeout(() => {
    localStorage.setItem(key, JSON.stringify(dictionary));
    resolve();
  }, 50);
});

export const saveDictionary = (languageCode, dictionary) => {
  switch (languageCode) {
    case 'En': return resolveSavingDictionary(ENGLISH_LOCAL_STORAGE_KEY, dictionary);
    default: return Promise.resolve();
  }
};
