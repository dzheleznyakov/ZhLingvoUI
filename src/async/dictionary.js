const resolveDictionary = (dictionary) => new Promise(resolve => {
  setTimeout(() => {
    resolve(dictionary);
  }, 50);
});

export const loadDictionary = (languageCode) => {
  switch (languageCode) {
    case 'En':
      return resolveDictionary([
        {
          word: 'a',
          transcriptions: ['ə', 'eɪ'],
        }, {
          word: 'book',
          transcriptions: ['bʊk'],
        }, {
          word: 'box',
          transcriptions: ['bɒks'],
          semanticBlocks: [{
            noun: {
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
            }
          }],
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
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(`No dictionary for language [${languageCode}] found`);
        }, 500);
      });
  }
};