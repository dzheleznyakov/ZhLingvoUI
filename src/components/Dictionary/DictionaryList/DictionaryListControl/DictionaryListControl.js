import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './DictionaryListControl.module.scss';

import NewWordPanel from '../NewWordPanel/NewWordPanel';
import ControlPanel from '../../../UI/ControlPanel/ControlPanel';
import PlusButton from '../../../UI/PlusButton/PlusButton';
import Modal from '../../../UI/Modal/Modal';
import * as actions from '../../../../store/actions/';

class DictionaryListControl extends Component {
  state = {
    showNewWordPropmtPanel: false,
  };

  onNewWordButtonClicked = () => {
    this.setState({ showNewWordPropmtPanel: true });
  };

  closeModal = () => {
    this.setState({ showNewWordPropmtPanel: false });
  };

  onNewWordConfirmed = (wordName) => {
    this.props.createWord(wordName);
  }

  render() {
    const entries = [{
      label: 'New',
      element: <PlusButton clicked={this.onNewWordButtonClicked} />,
    }];
  
    return (
      <React.Fragment>
        <Modal show={this.state.showNewWordPropmtPanel} modalClosed={this.closeModal}>
          <NewWordPanel 
            canceled={this.closeModal} 
            confirmed={this.onNewWordConfirmed}
            closed={this.closeModal} />
        </Modal>
        <ControlPanel 
          type='Left'
          className={classes.DictionaryListControl}
          entries={entries} />
      </React.Fragment>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  createWord: (wordName) => dispatch(actions.createWord(wordName)),
});

export default connect(null, mapDispatchToProps)(DictionaryListControl);
