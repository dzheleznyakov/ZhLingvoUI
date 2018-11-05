import React from 'react';

import styles from './NavigationItems.module.css';

import NavigationItem from './NavigationItem';

const navigationItems = () => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link='/auth'>Auth</NavigationItem>
    <NavigationItem link='/language'>Language</NavigationItem>
    <NavigationItem link='/dictionary'>Dictionary</NavigationItem>
    <NavigationItem link='/tutor'>Tutor</NavigationItem>
  </ul>
);

export default navigationItems;