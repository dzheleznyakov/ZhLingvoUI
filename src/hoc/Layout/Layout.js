import React from 'react';

import styles from './Layout.module.scss';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const layout = (props) => (
  <React.Fragment>
    <Toolbar />
    <main className={styles.Content}>
      {props.children}
    </main>
  </React.Fragment>
);

export default layout;