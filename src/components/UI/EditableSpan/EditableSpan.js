import React, { useState, useRef, useEffect } from 'react';

import useSelectEditMode from '../../../hooks/useSelectEditMode';
import { isEnter, isEscape } from '../../../utils/keybordControl';

const EditableSpan = ({ value = '', prefix = '', postfix = '',
                        edited, cssClasses }) => {
  const editMode = useSelectEditMode();
  const [active, setActive] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [persistedValue, setPersistedValue] = useState(value);
  const inputRef = useRef();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (active && inputRef.current)
      inputRef.current.focus();
    if (active)
      setInputValue(value);
  }, [active]);

  useEffect(() => {
    if (persistedValue !== value)
      edited(persistedValue);
  }, [persistedValue]);

  const blur = () => {
    inputRef.current && inputRef.current.blur();
  };

  const onBlur = () => {
    setActive(false);
  };

  const onKeyDown = (event) => {
    if (isEnter(event)) {
      event.preventDefault();
      setPersistedValue(inputValue);
      blur();
    } else if (isEscape(event)) {
      setInputValue(value);
      blur();
    }
  };

  const classNames = cssClasses ? [cssClasses] : [];
  
  return editMode && active 
    ? (
      <div>
        {prefix}
        <input
          style={{ width: '100%' }}
          type="text"
          value={inputValue}
          ref={inputRef}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onChange={(event) => setInputValue(event.target.value)} />
        {postfix}
      </div>
    )
    : (
      <span
        className={classNames.join(' ')}
        onClick={() => setActive(true)}
      >{prefix}{value}{postfix}</span>
    );
};

export default EditableSpan;
