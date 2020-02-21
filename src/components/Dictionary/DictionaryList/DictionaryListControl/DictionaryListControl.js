import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';

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

const DictionaryListControl = props => {
  const selectedWordIndex = useSelector(state => _.get(state, 'dictionary.selectedWordIndex'));
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [panelType, setPanelType] = useState(null);

  const onNewWordButtonClicked = () => {
    setShowModal(true);
    setPanelType(panelTypes.newWord)
  };

  const onRemoveWordButtonClicked = () => {
    if (selectedWordIndex >= 0) {
      setShowModal(true);
      setPanelType(panelTypes.removeWord);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onNewWordConfirmed = (wordName) => {
    dispatch(actions.createWord(wordName))
    setPanelType(null);
  }

  const onRemoveWordConfirmed = () => {
    dispatch(actions.removeWord())
    setPanelType(null);
  };

  const renderModalPanel = () => {
    switch (panelType) {
      case panelTypes.newWord: return (
        <NewWordPanel 
          canceled={closeModal} 
          confirmed={onNewWordConfirmed}
          closed={closeModal} />
      );
      case panelTypes.removeWord: return selectedWordIndex >= 0 
        ? (
          <RemoveWordPanel
            canceled={closeModal}
            confirmed={onRemoveWordConfirmed} />
        ) : null;
      default: return null;
    }
  };

  const entries = [{
    label: 'New',
    element: <PlusButton size='large' clicked={onNewWordButtonClicked} />,
  }, {
    label: 'Remove',
    element: <MinusButton size='large' clicked={onRemoveWordButtonClicked} />,
  }];

  const modalPanel = renderModalPanel();
  const modal = modalPanel ? (
    <Modal show={showModal} modalClosed={closeModal}>
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
};

export default DictionaryListControl;
