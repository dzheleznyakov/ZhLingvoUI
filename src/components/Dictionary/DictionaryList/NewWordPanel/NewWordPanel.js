import React, { Component } from 'react';

import classes from './NewWordPanel.module.scss';

import DialogPanel from '../../../UI/DialogPanel/DialogPanel';

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

  componentDidMount() {
    this.focus();
  }

  render() {
    return (
      <DialogPanel canceled={this.props.canceled} confirmed={this.onConfirmed}>
        <div className={classes.NewWordPanelPrompt}>
          <label><strong>Enter new word: </strong></label>
          <input 
            className={classes.Input} 
            value={this.state.vallue} 
            onChange={this.onInputChanged}
            onKeyUp={this.onKeyUp}
            ref={input => { this.input = input }} />
        </div>
      </DialogPanel>
    );
  }
}

export default NewWordPanel;
