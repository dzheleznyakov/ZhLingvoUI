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
  editMeaningRemark,
  setMeaningRemark,
} from './dictionary';
