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

export const addToArray = (oldArray, index, element) => {
  const newArray = oldArray.slice(0, index);
  newArray.push(element);
  return newArray.concat(oldArray.slice(index));
};

export const removeFromArray = (oldArray, elementInex) => {
  const prefix = oldArray.slice(0, elementInex);
  const postfix = oldArray.slice(elementInex + 1);
  return prefix.concat(postfix);
};

export const toRoman = (num) => {
  if (Number.isNaN(num)) {
    throw new Error(`[${num}] is not a number`);
  }
  switch (num) {
    case 1: return 'I';
    case 2: return 'II';
    case 3: return 'III';
    case 4: return 'IV';
    case 5: return 'V';
    default: throw new Error(`[${num}] is too big`);
  }
};
