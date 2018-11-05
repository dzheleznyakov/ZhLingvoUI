import React from 'react';
import { connect } from 'react-redux';

import styles from './NavigationItems.module.css';

import NavigationItem from './NavigationItem';

const navigationItems = (props) => {
  let learningPages = null;
  if (props.languageChosen) {
    learningPages = (
      <React.Fragment>
        <NavigationItem link='/dictionary'>Dictionary</NavigationItem>
        <NavigationItem link='/tutor'>Tutor</NavigationItem>
      </React.Fragment>
    );
  }

  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link='/auth'>Auth</NavigationItem>
      <NavigationItem link='/language'>Language</NavigationItem>
      {learningPages}
    </ul>
  )
};

const mapStateToProps = state => {
  return {
    languageChosen: state.language.languageChosen,
  }
};

export default connect(mapStateToProps)(navigationItems);