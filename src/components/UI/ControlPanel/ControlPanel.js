import React, { useState } from 'react';
import PropTypes from 'prop-types';

import classes from './ControlPanel.module.scss';

import ArrowButton from '../../UI/ArrowButton/ArrowButton';

const controlPanel = props => {
  const [showControlPanel, setShowControlPanel] = useState(false);

  const onExpansionToggledProxy = () => {
    setShowControlPanel(!showControlPanel);
    if (props.onExpansionToggled) {
      props.onExpansionToggled();
    }
  };

  const getWrapperClass = () => {
    const baseClass = classes.CardControlWrapper
    switch (props.type) {
      case 'Left': return [`${baseClass} ${classes.ButtonAtLeft}`];
      default: return [baseClass];
    }
  };

  const getOpeningClass = () => {
    switch (props.type) {
      case 'Right': return classes.OpenToRight;
      case 'Left': return classes.OpenToLeft;
      default: return null;
    }
  };

  const getArrowButtonClass = () => {
    switch (props.type) {
      case 'Left': return classes.ArrowButtonAtLeft;
      default: return null;
    }
  };

  const conrtrolWrapperStyle = getWrapperClass();
  if (props.className) {
    conrtrolWrapperStyle.push(props.className);
  }
  let openningClass = getOpeningClass();
  if (showControlPanel && openningClass) {
    conrtrolWrapperStyle.push(openningClass);
  }

  const controlEntries = props.entries.map(({ label, element }) => (
    <div key={label} className={classes.CardControlEntry}>
      <label><strong>{label}</strong></label>
      {element}
    </div>
  ));

  const arrowButton = (
    <ArrowButton 
      buttonStyle={getArrowButtonClass()}
      open={showControlPanel}
      clicked={onExpansionToggledProxy} />
  );

  return (
    <div className={conrtrolWrapperStyle.join(' ')}>
      <div className={classes.CardControl}>
        {controlEntries}
      </div>
      {arrowButton}
    </div>
  );
}

controlPanel.propTypes = {
  type: PropTypes.oneOf(['Right', 'Left']),
}

export default controlPanel;
