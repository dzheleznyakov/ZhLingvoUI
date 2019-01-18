import { connect } from 'react-redux';

import AbstractEditableSpan from '../AbstractEditableSpan/AbstractEditableSpan';

class EditableSpan extends AbstractEditableSpan {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
      cursorPosition: (props.value && props.value.length) || 0,
      active: false,
    };
  }

  onSpanClicked = () => {
    this.setState({ active: true, cursorPosition: this.state.value.length });
  };

  onBlur = () => {
    this.setState({ active: false });
    if (this.props.edited) {
      this.props.edited(this.state.value);
    }
  };

  getClassNames = () => this.props.cssClasses ? [this.props.cssClasses] : [];

  isInEditMode = () => this.props.editMode;
}

const mapStateToProps = state => ({
  editMode: state.dictionary.editMode,
});

export default connect(mapStateToProps)(EditableSpan);
