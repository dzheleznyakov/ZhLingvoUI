import React from 'react';
import { connect } from 'react-redux';

import classes from './Examples.module.scss';

import EditableSpan from '../../../UI/EditableSpan/EditableSpan';
import PromptSpan from '../../../UI/PromptSpan/PromptSpan';
import Remark from '../Remark/Remark';
import * as actions from '../../../../store/actions/';

const emDash = '\u2014';

const examples = (props) => {
  let exampleBlock = [];
  const onRemarkEdited = (index) => (value) => props.editRemark(props.branch, index, value);
  const onExpressionEdited = (index) => (value) => props.editExpression(props.branch, index, value);
  const onExplanationEdited = (index) => (value) => props.editExplantion(props.branch, index, value);

  if (props.examples) {
    const getRemark = (index, remark) => (
      remark ? ( 
        <Remark edited={onRemarkEdited(index)} prefix=' '>{remark}</Remark> 
      ) : props.editMode ? (
        <PromptSpan
          cssClasses={classes.RemarkPlaceholder}
          edited={onRemarkEdited(index)}
          prefix=' '
          placeholder='##' />
      ) : null);

      const getExpression = (index, expression) => (
        expression ? (
          <EditableSpan edited={onExpressionEdited(index)} value={expression} /> 
        ) : props.editMode ? (
          <PromptSpan edited={onExpressionEdited(index)} />
        ) : null);

      const getExplanation = (index, explanation) => (
        explanation ? (
          <EditableSpan edited={onExplanationEdited(index)} value={explanation} /> 
        ) : props.editMode ? (
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

  if (props.editMode) {
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

const mapStateToProps = state => ({
    editMode: state.dictionary.editMode,
});

const mapDispatchToProps = dispatch => ({
  editRemark: (branch, index, remark) => dispatch(actions.editExampleRemark(branch, index, remark)),
  editExpression: (branch, index, expression) => dispatch(actions.editExampleExpression(branch, index, expression)),
  editExplantion: (branch, index, elaboration) => dispatch(actions.editExampleExplanation(branch, index, elaboration)),
});

export default connect(mapStateToProps, mapDispatchToProps)(examples);
