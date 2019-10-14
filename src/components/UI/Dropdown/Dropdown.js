import React, { useState } from 'react';

import classes from './dropdown.module.scss';

import DisplayList from './DisplayList/DisplayList';

const Dropdown = props => {
  const [dropped, setDropped] = useState(false);

  const onDropDownButtonClicked = () => {
    setDropped(!dropped);
  };

  const itemClickedHandler = (onclick) => {
    onclick && onclick();
    onDropDownButtonClicked();
  };

  const selectMessage = 'Please select' +
    (props.select ? ` ${props.select}` : '...');

  return (
      <dl className={classes.Dropdown}>
        <dt><div onClick={onDropDownButtonClicked}><span>{selectMessage}</span></div></dt>
        <dd>
          <DisplayList 
            dropped={dropped} 
            options={props.options} 
            clicked={html => itemClickedHandler(html.props.onclicked)}
          />
        </dd>
      </dl>
  );
};

export default Dropdown;