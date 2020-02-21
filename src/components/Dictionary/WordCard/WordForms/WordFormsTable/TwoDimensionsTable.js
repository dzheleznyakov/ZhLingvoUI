import React from 'react';
import { useDispatch } from 'react-redux';
import Table from 'rc-table';

import classes from './WordFormsTable.module.scss';

import EditableSpan from '../../../../UI/EditableSpan/EditableSpan';
import * as actions from '../../../../../store/actions';

const TwoDimensions = props => {
  const { pos } = props;
  const wordForms = props.children;
  const [d1, d2] = props.dimensions;
  const dispatch = useDispatch();
  const formNameColumn = { 
    title: '',
    dataIndex: 'formName',
    key: 'formName',
    className: classes.FormNameColumn,
  };
  const onEdited = (form, value) => {
    dispatch(actions.updateWordForms(pos, { [form]: value }));
  };
  const columns = [formNameColumn].concat(
    d1.map(({ first, second }) => ({
      title: second,
      dataIndex: first,
      key: first,
      render: function(text, row, d2index) {
        const form = `${first};${d2[d2index].first}`;
        return <EditableSpan 
          cssClasses={classes.WordFormColumn}
          value={text}
          edited={(value) => onEdited(form, value)} />
      }
    }))
  );
  const getTableLineData = (d2Key) => d1.map(({ first }) => first)
    .map(d1Key => ({ key: d1Key, valueKey: `${d1Key};${d2Key}` }))
    .map(({ key, valueKey }) => ({ [key]: (wordForms && wordForms[valueKey]) || '' }))
    .reduce((acc, obj) => ({ ...acc, ...obj }), {});
  const data = d2.map(({ first, second }, index) => ({
    formName: second,
    ...getTableLineData(first),
    key: first + index
  }));
  console.log('data', data);
  
  return <Table columns={columns} data={data} prefixCls={classes.WordFormsTable} />;
};

export default TwoDimensions;