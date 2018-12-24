import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './word-card-control.module.scss';

import ToggleButton from '../../../UI/ToggleButton/ToggleButton';
import ArrowButton from '../../../UI/ArrowButton/ArrowButton';
import * as actions from '../../../../store/actions/';

class WordCardControl extends Component {
  state = {
    showControlPanel: false,
  };

  onExpansionToggled = () => {
    this.setState({ 
      showControlPanel: !this.state.showControlPanel, 
    });
    this.props.setEditMode(false);
  };

  onEditToggled = () => {
      this.props.setEditMode(!this.props.editMode);
  };

  render() {
    const cardConrtrolStyle = [styles['word-card-control']];
    if (this.state.showControlPanel) {
      cardConrtrolStyle.push(styles['open']);
    }

    return (
      <div className={cardConrtrolStyle.join(' ')}>
        <ArrowButton 
          buttonStyle={styles['arrow-button-style']} 
          open={this.state.showControlPanel}
          clicked={this.onExpansionToggled} 
        />
        <div className={styles['word-card-control-entry']}>
            <label><strong>Edit</strong></label>
            <ToggleButton checked={this.props.editMode} toggled={this.onEditToggled} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    editMode: state.dictionary.editMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setEditMode: (editMode) => dispatch(actions.setEditMode(editMode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WordCardControl);