export { loadConfig } from './config';

export {
  loadLanguages,
  setLanguages,
  selectLanguage,
  setSelectedLanguage,
} from './language';

export { 
  loadDictionary, 
  setDictionary,
  removeDictionary,
  loadPartsOfSpeeches,
  storePartsOfSpeech,
  selectWord,
  setEditMode,
  editWordName,
  setWordName,
  addTranscription,
  deleteTranscription,
  editTranscription,
  setTranscription,
  createSemanticBlock,
  addSemanticBlock,
  removeSemanticBlockAndSaveDictionary,
  deleteSemanticBlock,
  addPartOfSpeech,
  setPartOfSpeech,
  removePartOfSpeechAndSaveDictionary,
  deletePartOfSpeech,
  addMeaning,
  createMeaning,
  editMeaningRemark,
  setMeaningRemark,
  editTranslation,
  setTranslation,
} from './dictionary';
