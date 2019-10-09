import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import classes from './NewWordPanel.module.scss';

import DialogPanel from '../../../UI/DialogPanel/DialogPanel';

const newWordPanel = props => {
  const [value, setValue] = useState('');

  let input;
  const focus = () => {
    if (input) {
      input.focus();
    }
  };

  const onInputChanged = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
  };

  const onConfirmed = () => {
    props.confirmed(value)
    setValue('');
    props.closed();
  };

  const onKeyUp = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      onConfirmed();
      props.closed();
    }
  };

  useEffect(() => {
    focus();
  }, [])

  return (
    <DialogPanel canceled={props.canceled} confirmed={onConfirmed}>
      <div className={classes.NewWordPanelPrompt}>
        <label><strong>Enter new word: </strong></label>
        <input 
          className={classes.Input} 
          value={value} 
          onChange={onInputChanged}
          onKeyUp={onKeyUp}
          ref={inputElement => { input = inputElement }} />
      </div>
    </DialogPanel>
  );
}

newWordPanel.propTypes = {
  confirmed: PropTypes.func.isRequired,
  canceled: PropTypes.func.isRequired,
  closed: PropTypes.func.isRequired,
};

export default newWordPanel;
