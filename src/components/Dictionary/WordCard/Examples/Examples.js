import React from 'react';
import { connect } from 'react-redux';

import classes from './Examples.module.scss';

import EditableSpan from '../../../UI/EditableSpan/EditableSpan';
import Remark from '../Remark/Remark';
import * as actions from '../../../../store/actions/';

const emDash = '\u2014';

const examples = (props) => {
  let exampleBlock = null;
  if (props.examples) {
    const onRemarkEdited = (index) => (value) => props.editRemark(props.branch, index, value);
    const onExpressionEdited = (index) => (value) => props.editExpression(props.branch, index, value);

    exampleBlock = props.examples.map(({ expression, explanation, remark}, index) => (
      <div key={`ex${index}`} className={classes.Example}>
        <EditableSpan edited={onExpressionEdited(index)} value={expression} />
        {remark ? <Remark edited={onRemarkEdited(index)} prefix=' '>{remark}</Remark> : null}
        {` ${emDash} `}
        <EditableSpan value={explanation} />
      </div>
    ));
  }
  return exampleBlock;
};

const mapDispatchToProps = dispatch => ({
  editRemark: (branch, index, remark) => dispatch(actions.editExampleRemark(branch, index, remark)),
  editExpression: (branch, index, remark) => dispatch(actions.editExampleExpression(branch, index, remark)),
});

export default connect(null, mapDispatchToProps)(examples);
