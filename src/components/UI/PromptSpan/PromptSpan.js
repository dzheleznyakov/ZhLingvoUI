import classes from './PromptSpan.module.scss';
import AbstractEditableSpan from '../AbstractEditableSpan/AbstractEditableSpan';

const placeholder = '...';

class PromptSpan extends AbstractEditableSpan {
  state = {
    value: placeholder,
    cursorPosition: placeholder.length,
    active: false,
  };

  componentWillReceiveProps() {
  }

  onSpanClicked = () => {
    this.setState({ 
      active: true, 
      value: '',
      cursorPosition: 0,
    });
  };

  onBlur = () => {
    const value = this.state.value;
    this.setState({ active: false, value: placeholder, cursorPosition: placeholder.length });
    if (this.props.edited && value && value.trim().length > 0) {
      this.props.edited(value);
    }
  };

  getClassNames = () => {
    const cssClasses = this.props.cssClasses ? [this.props.cssClasses] : [];
    if (!this.state.active) {
      cssClasses.push(classes.Dimmed);
    }
    return cssClasses;
  };

  isInEditMode = () => true;
}

export default PromptSpan;
