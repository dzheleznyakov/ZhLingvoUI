import React from 'react';
import { connect } from 'react-redux';

import DialogPanel from '../../../UI/DialogPanel/DialogPanel';

const removeWordPanel = (props) => {
  return (
    <DialogPanel canceled={props.canceled} confirmed={props.confirmed}>
      <div>Are you sure you want to remove word '{props.wordEntry.word}'?</div>
    </DialogPanel>
  )
};

const mapStateToProps = state => ({
  wordEntry: state.dictionary.loadedDictionary[state.dictionary.selectedWordIndex],
});

export default connect(mapStateToProps)(removeWordPanel);
