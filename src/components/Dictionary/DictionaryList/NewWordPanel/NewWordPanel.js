import React, { Component } from 'react';

import classes from './NewWordPanel.module.scss';

import Button from '../../../UI/Button/Button';

class NewWordPanel extends Component {
  state = {
    value: '',
  };

  focus = () => {
    if (this.input) {
      this.input.focus();
    }
  };

  onInputChanged = (event) => {
    const newValue = event.target.value;
    this.setState({ value: newValue });
  };

  onConfirmed = () => {
    this.props.confirmed(this.state.value)
    this.setState({ value: '' });
    this.props.closed();
  };

  onKeyUp = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.onConfirmed();
      this.props.closed();
    }
  };

  render() {
    this.focus();

    return (
      <div className={classes.NewWordPanel}>
        <div className={classes.NewWordPanelPrompt}>
          <label><strong>Enter new word: </strong></label>
          <input 
            className={classes.Input} 
            value={this.state.vallue} 
            onChange={this.onInputChanged}
            onKeyUp={this.onKeyUp}
            ref={input => { this.input = input }} />
        </div>
        <div className={classes.ButtonPane}>
          <Button btnType={'Danger'} clicked={this.props.canceled}>Cancel</Button>
          <Button btnType={'Success'} clicked={this.onConfirmed}>OK</Button>
        </div>
      </div>
    );
  }
}

export default NewWordPanel;
