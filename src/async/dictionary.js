import axios from './axios-api';

export const loadDictionary = (languageCode) => {
  return axios.get(`/dictionaries/${languageCode}`)
    .then(res => (res.data && res.data.words) || []);
  /*
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
  */
};

export const loadPartsOfSpeech = (languageCode) => {
  return axios.get(`/languages/constants/${languageCode}`)
    .then(res => res.data)
    .catch(err => console.error(err));
};
