export const updateObject = (oldObject, updatedProperties) => {
  return {
      ...oldObject,
      ...updatedProperties
  };
};

export const updateArray = (oldArray, elementIndex, newElement) => {
  const newArray = oldArray.slice(0, elementIndex);
  newArray.push(newElement, ...oldArray.slice(elementIndex + 1));
  return newArray;
};

export const toRoman = (num) => {
  if (Number.isNaN(num)) {
    throw new Error(`[${num}] is not a number`);
  }
  switch (num) {
    case 1: return 'I';
    case 2: return 'II';
    default: throw new Error(`[${num}] is too big`);
  }
};
