import React from 'react';

import styles from './PlusButton.module.scss';

const plusButton = (props) => (
  <button className={styles.PlusButton} onClick={props.clicked} />
);

export default plusButton;