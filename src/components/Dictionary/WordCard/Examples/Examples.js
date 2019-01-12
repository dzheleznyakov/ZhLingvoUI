import React from 'react';
import { connect } from 'react-redux';

import classes from './Examples.module.scss';

import Remark from '../Remark/Remark';
import * as actions from '../../../../store/actions/';

const emDash = '\u2014';

const examples = (props) => {
  let exampleBlock = null;
  if (props.examples) {
    const onRemarkEdited = (index) => (value) => props.editRemark(props.branch, index, value);

    exampleBlock = props.examples.map(({ expression, explanation, remark}, index) => (
      <div key={`ex${index}`} className={classes.Example}>
        {expression}
        {remark ? <Remark edited={onRemarkEdited(index)} prefix=' '>{remark}</Remark> : null}
        {` ${emDash} `}
        {explanation}
      </div>
    ));
  }
  return exampleBlock;
};

const mapDispatchToProps = dispatch => ({
  editRemark: (branch, index, remark) => dispatch(actions.editExampleRemark(branch, index, remark)),
});

export default connect(null, mapDispatchToProps)(examples);
