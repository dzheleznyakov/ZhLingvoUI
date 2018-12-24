import React from 'react';

import styles from './toggle-button.module.scss';

const toggleButton = (props) => (
  <label className={styles['switch']}>
    <input type='checkbox' checked={props.checked} onChange={props.toggled} />
    <span className={styles['slider']}></span>
  </label>
);

export default toggleButton;