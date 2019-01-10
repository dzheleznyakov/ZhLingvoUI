import React from 'react';
import { connect } from 'react-redux';

import styles from './Transcriptions.module.scss';

import PlusButton from '../../../UI/PlusButton/PlusButton';

import Transcription from '../Transcription/Transcription';
import * as actions from '../../../../store/actions/';

const transcriptions = (props) => {
  const addTranscriptionButton = props.editMode 
    ? <PlusButton size="small" clicked={props.createTranscription} />
    : null;

  const transcriptionEntries = props.transcriptions || [];
  const transcriptionEdited = (index) => (value) => props.editTranscription(value, index);
  const transcriptions = (
    <span className={styles.Transcriptions}>
      {transcriptionEntries.map((tr, i) => 
        <span key={`tr${i}`}>
          [<Transcription edited={transcriptionEdited(i)}>
            {tr}
          </Transcription>]{' '}
        </span>)}
        {addTranscriptionButton}
    </span>
  );
  return transcriptions;
};

const mapStateToProps = state => {
  return {
    editMode: state.dictionary.editMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTranscription: () => dispatch(actions.addTranscription()),
    editTranscription: (transcription, index) => dispatch(actions.editTranscription(transcription, index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(transcriptions);
