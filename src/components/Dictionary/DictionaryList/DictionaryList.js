import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './DictionaryList.module.css';

import WordEntry from '../WordEntry/WordEntry';

class DictionaryList extends Component {
  render() {
    return (
      <div className={styles.DictionaryListWrapper}>
        <ul className={styles.DictionaryList}>
          {this.props.dictionary
            .map((entry, index) => <WordEntry 
              key={index}
              pos={index}
              numberOfPos={this.props.dictionary.length}
              word={entry.word} 
              selected={index === this.props.selectedWordIndex}
            />)}
        </ul>
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