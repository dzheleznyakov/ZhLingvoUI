import React from 'react';
import Table from 'rc-table';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import classes from './WordFormsTable.module.scss';

import EditableSpan from '../../../../UI/EditableSpan/EditableSpan';
import * as actions from '../../../../../store/actions';

const twoDimensions = ([d1, d2], wordForms) => {
  const formNameColumn = { 
    title: '',
    dataIndex: 'formName',
    key: 'formName',
    className: classes.FormNameColumn,
  };
  const columns = [formNameColumn].concat(
    d1.map(({ first, second }) => ({
      title: second,
      dataIndex: first,
      key: first,
      render: text => <EditableSpan 
        cssClasses={classes.WordFormColumn}
        value={text}
        edited={() => {console.log('edit cell' + text)}} />
    }))
  );
  const getTableLineData = (d2Key) => d1.map(({ first }) => first)
    .map(d1Key => ({ key: d1Key, valueKey: `${d1Key};${d2Key}` }))
    .map(({ key, valueKey }) => ({ [key]: wordForms[valueKey] }))
    .reduce((acc, obj) => ({ ...acc, ...obj }), {});
  const data = d2.map(({ first, second }, index) => ({
    formName: second,
    ...getTableLineData(first),
    key: first + index
  }));
  return <Table columns={columns} data={data} prefixCls={classes.WordFormsTable} />;
};

const wordWormsTable = (props) => {
  const wordForms = useSelector(state => _.get(state, 'dictionary.fetchedWordForms'));
  const { pos } = props;
  const dispatch = useDispatch();

  if (!wordForms)
    dispatch(actions.getFetchedWordForms(pos));

  const dimensions = props.dimensions
    .filter(dimension => Array.isArray(dimension))
    .filter(dimension => dimension.length);

  switch (dimensions.length) {
    case 2: return twoDimensions(dimensions, wordForms);
    default: return <div>We are sorry, but we are not able yet to display these word forms</div>;
  }
};

wordWormsTable.defaultProps = {
  dimensions: [],
};

export default wordWormsTable;
