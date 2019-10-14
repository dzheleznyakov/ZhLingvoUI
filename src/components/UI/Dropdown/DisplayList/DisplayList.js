import React from 'react';

import classes from './DisplayList.module.scss';

const displayList = (props) => {
  const displayStyle = {
    display: props.dropped ? 'block' : 'none',
  };

  return (
    <ul className={classes.DisplayList} style={displayStyle}>
      {props.options.map((html, index) => (
        <li 
          key={index}
          onClick={() => props.clicked(html)}
          {...props.listProps}
        >
          {html}
        </li>
      ))}
    </ul>
  );
};

export default displayList;