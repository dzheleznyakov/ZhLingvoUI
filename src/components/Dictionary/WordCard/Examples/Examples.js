import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import classes from './Examples.module.scss';

import EditableSpan from '../../../UI/EditableSpan/EditableSpan';
import PromptSpan from '../../../UI/PromptSpan/PromptSpan';
import Remark from '../Remark/Remark';
import * as actions from '../../../../store/actions/';

const emDash = '\u2014';

const Examples = (props) => {
  const editMode = useSelector(state => _.get(state, 'dictionary.editMode'));
  const dispatch = useDispatch();

  let exampleBlock = [];
  const { branch } = props;
  const onRemarkEdited = index => remark => dispatch(actions.editExampleRemark(branch, index, remark));
  const onExpressionEdited = index => expression => dispatch(actions.editExampleExpression(branch, index, expression));
  const onExplanationEdited = index => elaboration => dispatch(actions.editExampleExplanation(branch, index, elaboration));

  if (props.examples) {
    const getRemark = (index, remark) => (
      remark ? ( 
        <Remark edited={onRemarkEdited(index)} prefix=' '>{remark}</Remark> 
      ) : editMode ? (
        <PromptSpan
          cssClasses={classes.RemarkPlaceholder}
          edited={onRemarkEdited(index)}
          prefix=' '
          placeholder='##' />
      ) : null);

      const getExpression = (index, expression) => (
        expression ? (
          <EditableSpan edited={onExpressionEdited(index)} value={expression} /> 
        ) : editMode ? (
          <PromptSpan edited={onExpressionEdited(index)} />
        ) : null);

      const getExplanation = (index, explanation) => (
        explanation ? (
          <EditableSpan edited={onExplanationEdited(index)} value={explanation} /> 
        ) : editMode ? (
          <PromptSpan edited={onExplanationEdited(index)} />
        ) : null);

    exampleBlock = props.examples.map(({ expression, explanation, remark}, index) => (
      <div key={`ex${index}`} className={classes.Example}>
        {getExpression(index, expression)}
        {getRemark(index, remark)}
        {` ${emDash} `}
        {getExplanation(index, explanation)}
      </div>
    ));
  }

  if (editMode) {
    exampleBlock.push((
      <div key='propmp-example' className={classes.Example}>
        <PromptSpan edited={onExpressionEdited(exampleBlock.length)} />
        {` ${emDash} `}
        <PromptSpan edited={onExplanationEdited(exampleBlock.length)} />
      </div>
    ))
  }
  
  return exampleBlock;
};

export default Examples;
