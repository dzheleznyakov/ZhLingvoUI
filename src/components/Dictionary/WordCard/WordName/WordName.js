import React from 'react';

import editable from '../../../../hoc/editable/editable';

const wordName = (props) => (
  <span 
    className={props.className} 
    onClick={props.clicked}
  >
    {props.children}
  </span>
);

export default editable(wordName);
