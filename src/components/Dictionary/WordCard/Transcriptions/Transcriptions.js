import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import classes from './Transcriptions.module.scss';

import Transcription from '../Transcription/Transcription';
import PromptSpan from '../../../UI/PromptSpan/PromptSpan';
import * as actions from '../../../../store/actions/';

const Transcriptions = props => {
  const editMode = useSelector(state => _.get(state, 'dictionary.editMode'));
  const dispatch = useDispatch();

  const addTranscriptionButton = editMode
    ? <PromptSpan
      edited={transcription => dispatch(actions.createTranscription(transcription))}
      prefix='['
      postfix='] ' />
    : null;

  const transcriptionEntries = props.transcriptions || [];
  const transcriptionEdited = index => transcription => dispatch(actions.editTranscription(transcription, index));
  const transcriptions = (
    <span className={classes.Transcriptions}>
      {transcriptionEntries.map((tr, i) => 
        <span key={`tr${i}`}>
          <Transcription edited={transcriptionEdited(i)}>
            {tr}
          </Transcription>
        </span>)}
        {addTranscriptionButton}
    </span>
  );
  return transcriptions;
};

export default Transcriptions;
