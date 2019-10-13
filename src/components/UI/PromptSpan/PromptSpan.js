import React, { useState, useRef, useEffect } from 'react';

import classes from './PromptSpan.module.scss';

import { isEnter, isEscape } from '../../../utils/keybordControl';

const PromptSpan = ({ prefix = '', postfix = '', placeholder = '...',
                      edited, cssClasses }) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(placeholder);
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current)
      inputRef.current.focus();
  }, [active]);

  const classNames = cssClasses ? [cssClasses] : [];
  if (!active) {
    classNames.push(classes.Dimmed);
  }

  const blur = () => {
    inputRef.current && inputRef.current.blur();
  };

  const onSpanClicked = () => {
    setValue('');
    setActive(true);
  };

  const onBlur = () => {
    setActive(false);
    setValue(placeholder);
  };

  const onKeyDown = (event) => {
    if (isEnter(event)) {
      event.preventDefault();
      if (edited && value && value.trim().length > 0) {
        blur();
        edited(value);
      }
    } else if (isEscape(event)) {
      event.preventDefault();
      blur();
    }
  };

  return active 
  ? (
    <div>
      {prefix}
      <input 
        type="text"
        value={value}
        ref={inputRef}
        onChange={event => setValue(event.target.value)}
        onKeyDown={onKeyDown}
        onBlur={onBlur} />
      {postfix}
    </div>
  )
  : (
    <span
      className={classNames.join(' ')}
      onClick={onSpanClicked}
    >{prefix}{value}{postfix}</span>
  );
};

export default PromptSpan;
