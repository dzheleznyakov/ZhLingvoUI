import React from 'react';

import styles from './Layout.module.css';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const layout = (props) => (
  <React.Fragment>
    <Toolbar />
    <div className={styles.Content}>
      {props.children}
    </div>
  </React.Fragment>
);

export default layout;