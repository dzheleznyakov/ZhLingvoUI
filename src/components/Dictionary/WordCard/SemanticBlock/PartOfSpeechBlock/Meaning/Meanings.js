import React from 'react';

import styles from './Meanings.module.scss';

const meanings = (props) => {
  let remark = null;
  if (props.remark) {
    remark = <span key='remark' className={styles.remark}>{props.remark} </span>
  }

  let meaning = null;
  if (props.translations) {
    meaning = props.translations.reduce((arr, { translation, elaboration }, index, tArray) => {
      const length = tArray.length;
      const span = (<span key={`t${index}`}>
        {translation}
        <span className={styles.elaboration}>{elaboration ? ` (${elaboration})` : ''}</span>
        {index < length - 1 ? '; ' : ''}
      </span>);
      arr.push(span);
      return arr;
    }, remark ? [remark] : []);
  }
  
  return <span>{meaning}</span>;
};

export default meanings;