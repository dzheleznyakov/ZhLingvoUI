import React from 'react';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';

import TwoDimensionsTable from './TwoDimensionsTable';
import * as actions from '../../../../../store/actions';

const wordWormsTable = (props) => {
  const wordForms = useSelector(state => _.get(state, 'dictionary.fetchedWordForms'), _.isEqual);
  const dispatch = useDispatch();
  const { pos } = props;

  if (!wordForms) {
    dispatch(actions.getFetchedWordForms(pos));
    return null;
  }

  const dimensions = props.dimensions
    .filter(dimension => Array.isArray(dimension))
    .filter(dimension => dimension.length);

  switch (dimensions.length) {
    case 2: return (
      <TwoDimensionsTable dimensions={dimensions} pos={pos}>
        {wordForms}
      </TwoDimensionsTable>
    );
    default: return <div>We are sorry, but we are not able yet to display these word forms</div>;
  }
};

wordWormsTable.defaultProps = {
  dimensions: [],
};

export default wordWormsTable;
