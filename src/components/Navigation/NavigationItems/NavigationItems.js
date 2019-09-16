import React from 'react';
import { connect } from 'react-redux';

import classes from './NavigationItems.module.scss';

import NavigationItem from './NavigationItem';
import LanguageIcon from '../../Language/elements/LanguageIcon';

const navigationItems = (props) => {
  let learningPages = null;
  if (props.selectedLanguage) {
    learningPages = (
      <React.Fragment>
        <NavigationItem link='/dictionary'>Dictionary</NavigationItem>
        <NavigationItem link='/tutor'>Tutor</NavigationItem>
        <LanguageIcon size="Medium">{props.selectedLanguage.code}</LanguageIcon>
      </React.Fragment>
    );
  }

  return (
    <ul className={classes.NavigationItems}>
      {/* <NavigationItem link='/auth'>Auth</NavigationItem> */}
      <NavigationItem link='/language'>Language</NavigationItem>
      {learningPages}
    </ul>
  )
};

const mapStateToProps = state => {
  return {
    selectedLanguage: state.language.selectedLanguage,
  }
};

export default connect(mapStateToProps)(navigationItems);