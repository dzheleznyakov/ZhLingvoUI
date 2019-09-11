import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './DictionaryList.module.scss';

import WordEntry from './WordEntry/WordEntry';
import DictionaryListControl from './DictionaryListControl/DictionaryListControl';

class DictionaryList extends Component {
  render() {
    return (
      <div className={classes.DictionaryListWrapper}>
        <DictionaryListControl />
        <div className={classes.DictionaryListContainer}>
          <ul className={classes.DictionaryList}>
            {this.props.dictionary
              .map((entry, index) => <WordEntry 
                key={index}
                pos={index}
                numberOfPos={this.props.dictionary.length}
                word={entry.word}
                wordId={entry.id}
                selected={index === this.props.selectedWordIndex}
              />)}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedWordIndex: state.dictionary.selectedWordIndex,
  };
};

export default connect(mapStateToProps)(DictionaryList);