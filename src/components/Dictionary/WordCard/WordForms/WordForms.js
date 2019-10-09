import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import _ from 'lodash';
import 'react-tabs/style/react-tabs.css';

import Modal from '../../../UI/Modal/Modal';
import WordFormsTable from './WordFormsTable/WordFormsTable';
import * as actions from '../../../../store/actions';

const WordForms = (props) => {
  const word = useSelector(state => state.dictionary.fetchedWord);
  const changeModels = useSelector(state => state.language.changeModels);
  const dispatch = useDispatch();

  const partsOfSpeeches = (word.semanticBlocks || [])
    .reduce((flatArray, array) => flatArray.concat(array), [])
    .map(sb => sb.type)
    .reduce((arr, el) => {
      if (arr.indexOf(el) < 0)
        arr.push(el);
      return arr;
    }, []);

  const initialSelectedPos = partsOfSpeeches[0] || null
  const [selectedPos, setSelectedPos] = useState(initialSelectedPos);

  useEffect(() => {
    if (!selectedPos) return;
    const changeModel = _.get(changeModels, selectedPos);
    if (!changeModel) {
      dispatch(actions.fetchChangeModel(selectedPos));
    }
  }, [selectedPos]);

  const changeModel = _.get(changeModels, [selectedPos], {});
  const dimensions = Object.keys(changeModel)
    .map(key => changeModel[key]);

  const tabs = partsOfSpeeches.map(pos => <Tab key={`tab-${pos}`} onClick={() => setSelectedPos(pos)}>{pos}</Tab>);
  const tabPanels = partsOfSpeeches.map(pos => (
    <TabPanel key={`tabpanel-${pos}`}>
      {pos === selectedPos ? <WordFormsTable dimensions={dimensions} pos={selectedPos} /> : null}
    </TabPanel>
  ));

  return (
    <Modal show modalClosed={props.closed}>
      <Tabs>
        <TabList>
          {tabs}
        </TabList>
        {tabPanels}
      </Tabs>
    </Modal>
  );
};

WordForms.propTypes = {
  changeModels: PropTypes.object,
};

export default WordForms;
