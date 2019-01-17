export const getWordPath = ({ wordIndex }) =>
  `[${wordIndex}]`;

export const getSemanticBlockPath = ({ wordIndex, sbIndex }) =>
  `[${wordIndex}].semanticBlocks[${sbIndex}]`;

export const getPartOfSpeechPath = ({ wordIndex, sbIndex, posIndex }) =>
  `[${wordIndex}].semanticBlocks[${sbIndex}][${posIndex}]`;

export const getMeaningPath = ({ wordIndex, sbIndex, posIndex, mIndex }) =>
  `[${wordIndex}].semanticBlocks[${sbIndex}][${posIndex}].meanings[${mIndex}]`;

  export const getExamplePath = ({ wordIndex, sbIndex, posIndex, mIndex, exIndex }) =>
  `[${wordIndex}].semanticBlocks[${sbIndex}][${posIndex}].meanings[${mIndex}].examples[${exIndex}]`;