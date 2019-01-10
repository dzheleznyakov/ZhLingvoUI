import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './EditableSpan.module.scss';

class EditableSpan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      cursorPosition: props.value.length || 0,
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
    if (event.keyCode === 13) {
      event.preventDefault();
      this.interceptor.blur();
    } else if (event.keyCode === 37) {
      const newCursorPosition = Math.max(0, this.state.cursorPosition - 1);
      this.setState({ cursorPosition: newCursorPosition });
    } else if (event.keyCode === 39) {
      const newCursorPosition = Math.min(this.state.value.length, this.state.cursorPosition + 1);
      this.setState({ cursorPosition: newCursorPosition });
    }
  };

  render() {
    const classNames = this.props.cssClasses ? [this.props.cssClasses] : [];
    classNames.push(classes.EditableSpan);

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

    const beforeCursorText = this.state.value.slice(0, this.state.cursorPosition);
    const afterCursorText = this.state.value.slice(this.state.cursorPosition);
    const beforeCursorSpan = <span className={beforeCursorClass}>{beforeCursorText}</span>;

    return (
      <React.Fragment>
        <span 
          className={classNames.join(' ')} 
          onClick={this.onSpanClicked}>{beforeCursorSpan}{afterCursorText}</span>
        {interceptor}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  editMode: state.dictionary.editMode,
});

export default connect(mapStateToProps)(EditableSpan);
