import classes from './PromptSpan.module.scss';
import AbstractEditableSpan from '../AbstractEditableSpan/AbstractEditableSpan';

class PromptSpan extends AbstractEditableSpan {
  constructor(props) {
    super(props);
    this.placeholder = props.placeholder || '...';
    this.state = {
      value: this.placeholder,
      cursorPosition: this.placeholder.length,
      active: false,
    };
  }

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
    this.setState({ active: false, value: this.placeholder, cursorPosition: this.placeholder.length });
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
