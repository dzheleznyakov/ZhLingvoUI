export const isEnter = (event) => event.keyCode === 13;
const isLeftArrow = (event) => event.keyCode === 37;
const isRightArrow = (event) => event.keyCode === 39;
const isUpArrow = (event) => event.keyCode === 38;
const isDownArrow = (event) => event.keyCode === 40;
const isBackspace = (event) => event.keyCode === 8;
const isDisplayableCharacter = (event) => 
  (event.keyCode > 47 && event.keyCode < 58)   || // number keys
  (event.keyCode === 32)   || // spacebar
  (event.keyCode > 64 && event.keyCode < 91)   || // letter keys
  (event.keyCode > 95 && event.keyCode < 112)  || // numpad keys
  (event.keyCode > 185 && event.keyCode < 193) || // ;=,-./` (in order)
  (event.keyCode > 218 && event.keyCode < 223);

export const getNextCursorPosition = (value, cursorPosition, event) => {
  const moveCursorLeft = () => Math.max(0, cursorPosition - 1);
  const moveCursorRight = () => Math.min(value.length, cursorPosition + 1);
  const incrementCursor = () => cursorPosition + 1;
  const moveCursorToHome = () => 0;
  const moveCursorToEnd = () => value.length;
  const jumpOverWordToLeft = () => {
    let i = Math.max(0, cursorPosition - 1);
    let char;
    do {
      char = value.charAt(i);
    } while (i-- >= 0 && char === ' ');

    while (i >= 0) {
      char = value.charAt(i);
      if (char === ' ') {
        break;
      }
      i--;
    }
    return Math.min(i + 1, value.length);
  };
  const jumpOverWordToRight = () => {
    let i = Math.max(0, cursorPosition - 1);
    let char;
    do {
      char = value.charAt(i);
    } while (i++ < value.length && char === ' ');

    while (i < value.length && char !== ' ' && char !=='.') {
      char = value.charAt(i);
      i++;
    }
    if (char === '.') {
      i--;
    }
    return Math.min(i, value.length);
  };

  if (isLeftArrow(event) && event.altKey)
    return jumpOverWordToLeft();
  else if (isLeftArrow(event))
    return moveCursorLeft();
  else if (isRightArrow(event) && event.altKey)
    return jumpOverWordToRight();
  else if (isRightArrow(event))
    return moveCursorRight();
  else if (isUpArrow(event))
    return moveCursorToHome();
  else if (isDownArrow(event))
    return moveCursorToEnd();
  else if (isBackspace(event))
    return moveCursorLeft();
  else if (isDisplayableCharacter(event))
      return incrementCursor();
  else
    return null;
  };