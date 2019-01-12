import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './EditableSpan.module.scss';

class EditableSpan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
      cursorPosition: (props.value && props.value.length) || 0,
      active: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  onInterceptorCreated = (interceptor) => {
    this.interceptor = interceptor;
    if (interceptor) {
      interceptor.focus();
    }
  };

  onSpanClicked = () => {
    this.setState({ active: true })
  };

  onBlur = () => {
    this.setState({ active: false });
    if (this.props.edited) {
      this.props.edited(this.state.value);
    }
  };

  onChange = (event) => {
    this.setState({ value: event.target.value });
  };

  onKeyDown = (event) => {
    const moveCursorLeft = () => {
      const newCursorPosition = Math.max(0, this.state.cursorPosition - 1);
      this.setState({ cursorPosition: newCursorPosition });
    };
    const moveCursorRight = () => {
      const newCursorPosition = Math.min(this.state.value.length, this.state.cursorPosition + 1);
      this.setState({ cursorPosition: newCursorPosition });
    };
    const incrementCursor = () => {
      this.setState({ cursorPosition: this.state.cursorPosition + 1 });
    };
    const moveCursorToHome = () => {
      this.setState({ cursorPosition: 0 });
    };
    const moveCursorToEnd = () => {
      this.setState({ cursorPosition: this.state.value.length });
    };

    if (event.keyCode === 13) {
      event.preventDefault();
      this.interceptor.blur();
    } else if (event.keyCode === 37) {
      moveCursorLeft();
    } else if (event.keyCode === 39) {
      moveCursorRight();
    } else if (event.keyCode === 38) {
      moveCursorToHome();
    } else if (event.keyCode === 40) {
      moveCursorToEnd();
    } else if (event.keyCode === 8) {
      moveCursorLeft();
    } else if (
      (event.keyCode > 47 && event.keyCode < 58)   || // number keys
      (event.keyCode === 32)   || // spacebar
      (event.keyCode > 64 && event.keyCode < 91)   || // letter keys
      (event.keyCode > 95 && event.keyCode < 112)  || // numpad keys
      (event.keyCode > 185 && event.keyCode < 193) || // ;=,-./` (in order)
      (event.keyCode > 218 && event.keyCode < 223)) {
          incrementCursor();
    } else {
      event.preventDefault();
    }
  };

  render() {
    const classNames = this.props.cssClasses ? [this.props.cssClasses] : [];

    let beforeCursorClass = null;

    let interceptor = null;

    if (this.props.editMode && this.state.active) {
      classNames.push(classes.Active);
      beforeCursorClass = classes.ActiveCursor;

      interceptor = <input 
        type="text"
        className={classes.Interceptor}
        value={this.state.value}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        onBlur={this.onBlur}
        ref={this.onInterceptorCreated} />;
    }

    const beforeCursorText = this.state.cursorPosition > 0 
      ? this.state.value.slice(0, this.state.cursorPosition - 1)
      : null;
    const beforeCursorLetter = this.state.cursorPosition > 0 
      ? this.state.value.charAt(this.state.cursorPosition - 1) 
      : null;
    const afterCursorText = this.state.value.slice(this.state.cursorPosition);

    const beforeCursorLetterSpan = <span className={beforeCursorClass}>{beforeCursorLetter}</span>

    return (
      <React.Fragment>
        {interceptor}
        {this.props.prefix}
        <span 
          className={classNames.join(' ')} 
          onClick={this.onSpanClicked}>{beforeCursorText}{beforeCursorLetterSpan}{afterCursorText}</span>
        {this.props.postfix}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  editMode: state.dictionary.editMode,
});

export default connect(mapStateToProps)(EditableSpan);
