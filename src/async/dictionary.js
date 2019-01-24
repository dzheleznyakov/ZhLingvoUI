const ENGLISH_LOCAL_STORAGE_KEY = 'EnglishDictionary';
const SPANISH_LOCAL_STORAGE_KEY = 'SpanishDictionary';
const RUSSIAN_LOCAL_STORAGE_KEY = 'RussianDictionary';

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
  let savedDictionary;
  switch (languageCode) {
    case 'En':
      savedDictionary = JSON.parse(localStorage.getItem(ENGLISH_LOCAL_STORAGE_KEY));
      return resolveDictionary(savedDictionary, [
        {
          id: 'aa1',
          word: 'a',
          transcriptions: ['ə', 'eɪ'],
        }, {
          id: 'aa2',
          word: 'book',
          transcriptions: ['bʊk'],
        }, {
          id: 'aa3',
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
          id: 'aa4',
          word: 'do',
          transcriptions: ['duː'],
        }, {
          id: 'aa5',
          word: 'dog',
          transcriptions: ['dɒɡ'],
        }, {
          id: 'aa6',
          word: 'green',
          transcriptions: ['ɡriːn'],
        }, {
          id: 'aa7',
          word: 'just',
          transcriptions: ['dʒʌst'],
        }, {
          id: 'aa8',
          word: 'keep',
          transcriptions: ['kiːp'],
        }, {
          id: 'aa9',
          word: 'key',
          transcriptions: ['kiː'],
        }, {
          id: 'aa10',
          word: 'mother',
          transcriptions: ['ˈmʌðə'],
        }, {
          id: 'aa11',
          word: 'xenomorph',
        },
      ]);
    case 'Es':
      savedDictionary = JSON.parse(localStorage.getItem(SPANISH_LOCAL_STORAGE_KEY));
      return resolveDictionary(savedDictionary, []);
    case 'Ru':
      savedDictionary = JSON.parse(localStorage.getItem(RUSSIAN_LOCAL_STORAGE_KEY));
      return resolveDictionary(savedDictionary, []);  
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
    case 'Es': return resolveSavingDictionary(SPANISH_LOCAL_STORAGE_KEY, dictionary);
    case 'Ru': return resolveSavingDictionary(RUSSIAN_LOCAL_STORAGE_KEY, dictionary);
    default: return Promise.resolve();
  }
};

let counter = 1;

export const addWord = (wordName) => new Promise(resolve => {
  setTimeout(() => {
    resolve(`bb${counter++}`);
  }, 10);
});
