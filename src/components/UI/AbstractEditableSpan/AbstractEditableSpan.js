import React, { Component } from 'react';

import classes from './AbstractEditableSpan.module.scss';

import { getNextCursorPosition, isEnter } from '../../../utils/keybordControl';
import KeyInterceptor from '../KeyInterceptor/KeyInterceptor';

class AbstractEditableSpan extends Component {
    state = {
      value: '',
      cursorPosition: 0,
      active: false,
    };

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onInterceptorCreated = (interceptor) => {
    this.interceptor = interceptor;
    if (interceptor) {
      interceptor.focus();
    }
  };

  onChange = (event) => {
    this.setState({ value: event.target.value });
  };

  onKeyDown = (event) => {
    const newCursorPosition = getNextCursorPosition(
      this.state.value, this.state.cursorPosition, event);
    
    if (isEnter(event)) {
      event.preventDefault();
      this.interceptor.blur();
    } else if (newCursorPosition === null) {
      event.preventDefault();
    } else {
      this.setState({ cursorPosition: newCursorPosition });
    }
  };

  render() {
    const classNames = this.getClassNames();

    let beforeCursorClass = null;

    let interceptor = null;

    if (this.isInEditMode() && this.state.active) {
      classNames.push(classes.Active);
      beforeCursorClass = classes.ActiveCursor;

      interceptor = <KeyInterceptor
        value={this.state.value}
        changed={this.onChange}
        keyDown={this.onKeyDown}
        blurred={this.onBlur}
        inputRef={this.onInterceptorCreated} />
    }

    const value = this.state.value || '';
    const beforeCursorText = this.state.cursorPosition > 0 
      ? value.slice(0, this.state.cursorPosition - 1)
      : null;
    const beforeCursorLetter = this.state.cursorPosition > 0 
      ? value.charAt(this.state.cursorPosition - 1) 
      : null;
    const afterCursorText = value.slice(this.state.cursorPosition);

    const beforeCursorLetterSpan = <span className={beforeCursorClass}>{beforeCursorLetter}</span>

    return (
      <React.Fragment>
        {interceptor}
        <span 
          className={classNames.join(' ')} 
          onClick={this.onSpanClicked}>
            {this.props.prefix}{beforeCursorText}{beforeCursorLetterSpan}{afterCursorText}{this.props.postfix}
        </span>
      </React.Fragment>
    );
  }
}

export default AbstractEditableSpan;
