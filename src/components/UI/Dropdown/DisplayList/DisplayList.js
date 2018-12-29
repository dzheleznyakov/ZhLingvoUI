import React from 'react';

import styles from './DisplayList.module.scss';

const displayList = (props) => {
  const displayStyle = {
    display: props.dropped ? 'block' : 'none',
  };

  return (
    <ul className={styles.DisplayList} style={displayStyle}>
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