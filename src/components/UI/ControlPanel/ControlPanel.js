import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './ControlPanel.module.scss';

import ArrowButton from '../../UI/ArrowButton/ArrowButton';

class ControlPanel extends Component {
  static propTypes = {
    type: PropTypes.oneOf(['Right', 'Left']),
  }

  state = {
    showControlPanel: false,
  };

  onExpansionToggledProxy = () => {
    this.setState({ 
      showControlPanel: !this.state.showControlPanel, 
    });
    if (this.props.onExpansionToggled) {
      this.props.onExpansionToggled();
    }
  };

  getWrapperClass = () => {
    const baseClass = classes.CardControlWrapper
    switch (this.props.type) {
      case 'Left': return [`${baseClass} ${classes.ButtonAtLeft}`];
      default: return [baseClass];
    }
  };

  getOpeningClass = () => {
    switch (this.props.type) {
      case 'Right': return classes.OpenToRight;
      case 'Left': return classes.OpenToLeft;
      default: return null;
    }
  };

  getArrowButtonClass = () => {
    switch (this.props.type) {
      case 'Left': return classes.ArrowButtonAtLeft;
      default: return null;
    }
  };

  render() {
    const conrtrolWrapperStyle = this.getWrapperClass();
    if (this.props.className) {
      conrtrolWrapperStyle.push(this.props.className);
    }
    let openningClass = this.getOpeningClass();
    if (this.state.showControlPanel && openningClass) {
      conrtrolWrapperStyle.push(openningClass);
    }

    const controlEntries = this.props.entries.map(({ label, element }) => (
      <div key={label} className={classes.CardControlEntry}>
        <label><strong>{label}</strong></label>
        {element}
      </div>
    ));

    const arrowButton = (
      <ArrowButton 
        buttonStyle={this.getArrowButtonClass()}
        open={this.state.showControlPanel}
        clicked={this.onExpansionToggledProxy} />
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
}

export default ControlPanel;
