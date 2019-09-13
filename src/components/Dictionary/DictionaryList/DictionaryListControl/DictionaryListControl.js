import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './DictionaryListControl.module.scss';

import NewWordPanel from '../NewWordPanel/NewWordPanel';
import RemoveWordPanel from '../RemoveWordPanel/RemoveWordPanel';
import ControlPanel from '../../../UI/ControlPanel/ControlPanel';
import PlusButton from '../../../UI/PlusButton/PlusButton';
import MinusButton from '../../../UI/MinusButton/MinusButton';
import Modal from '../../../UI/Modal/Modal';
import * as actions from '../../../../store/actions/';

const panelTypes = {
  newWord: 'newWord',
  removeWord: 'removeWord',
};

class DictionaryListControl extends Component {
  state = {
    showModal: false,
    panelType: null,
  };

  onNewWordButtonClicked = () => {
    this.setState({ 
      showModal: true,
      panelType: panelTypes.newWord,
    });
  };

  onRemoveWordButtonClicked = () => {
    if (this.props.selectedWordIndex >= 0) {
      this.setState({
        showModal: true,
        panelType: panelTypes.removeWord,
      });
    }
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  onNewWordConfirmed = (wordName) => {
    this.props.createWord(wordName);
    this.setState({ panelType: null });
  }

  onRemoveWordConfirmed = () => {
    this.props.removeWord();
    this.setState({ panelType: null });
  };

  renderModalPanel = () => {
    switch (this.state.panelType) {
      case panelTypes.newWord: return (
        <NewWordPanel 
          canceled={this.closeModal} 
          confirmed={this.onNewWordConfirmed}
          closed={this.closeModal} />
      );
      case panelTypes.removeWord: return this.props.selectedWordIndex >= 0 
        ? (
          <RemoveWordPanel
            canceled={this.closeModal}
            confirmed={this.onRemoveWordConfirmed} />
        ) : null;
      default: return null;
    }
  };

  render() {
    const entries = [{
      label: 'New',
      element: <PlusButton size='large' clicked={this.onNewWordButtonClicked} />,
    }, {
      label: 'Remove',
      element: <MinusButton size='large' clicked={this.onRemoveWordButtonClicked} />,
    }];

    const modalPanel = this.renderModalPanel();
    const modal = modalPanel ? (
      <Modal show={this.state.showModal} modalClosed={this.closeModal}>
        {modalPanel}
      </Modal>
    ) : null;
  
    return (
      <React.Fragment>
        {modal}
        <ControlPanel 
          type='Left'
          className={classes.DictionaryListControl}
          entries={entries} />
      </React.Fragment>
    );
  }
};

const mapStateToProps = state => ({
  selectedWordIndex: state.dictionary.selectedWordIndex,
});

const mapDispatchToProps = dispatch => ({
  createWord: (wordName) => dispatch(actions.createWord(wordName)),
  removeWord: () => dispatch(actions.removeWord()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DictionaryListControl);
