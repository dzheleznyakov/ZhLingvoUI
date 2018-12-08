import React from 'react';

import styles from './Toolbar.module.css';

import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = () => (
  <header className={styles.Toolbar}>
    <div>Logo</div>
    <nav className={styles.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;