import React, { Component } from 'react';

import styles from './editable.module.scss';

const editable = (WrappedComponent) => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.children,
      active: false,
    }
  }

  componentWillMount() {
    this.focus();
  }

  onElementClicked = () => {
    this.setState({ active: true })
  };

  onInputChanged = (event) => {
    this.setState({ value: event.target.value });
  };

  edit = () => {
    if (this.props.edited) {
      this.props.edited(this.state.value);
    }
  };

  onEnterTyped = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.edit();
    }
  };

  focus = () => {
    if (this.input) {
      this.input.focus();
    }
  }

  onRenderingInput = (input) => {
    this.input = input;
    this.focus();
  };

  onFocusOut = () => {
    this.setState({ active: false });
    this.edit();
  };

  render() {
    if (this.props.editMode && this.state.active) {
      const classes = [styles['input']];
      if (this.props.className) {
        classes.push(this.props.className)
      }

      return <input className={classes.join(' ')}
        value={this.state.value}
        onChange={this.onInputChanged}
        ref={this.onRenderingInput}
        onBlur={this.onFocusOut}
        onKeyUp={this.onEnterTyped}
      />
    }
    return <WrappedComponent {...this.props} clicked={this.onElementClicked} />;
  }
};

export default editable;
