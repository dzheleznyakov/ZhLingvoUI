import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Dictionary.module.scss';

import * as actions from '../../store/actions/';
import Spinner from '../UI/Spinner/Spinner';
import DictionaryList from './DictionaryList/DictionaryList';
import WordCard from './WordCard/WordCard';

class Dictionary extends Component {
  componentDidMount() {
    this.props.loadDictionary();
    this.props.loadPartsOfSpeeches();
  }

  renderDictionaryList = () => {
    if (this.props.dictionary) {
      return <DictionaryList dictionary={this.props.dictionary} />
    }
    return <Spinner />;
  };

  renderWordCard = () => {
    if (this.props.dictionary && this.props.selectedWordIndex >= 0) {
      const index = this.props.selectedWordIndex;
      const fetchedWord = this.props.fetchedWord;
      const wordEntry = this.props.dictionary[index];
      return <WordCard wordEntry={fetchedWord || wordEntry} />;
    }
    return null;
  };

  render() {
      const list = this.renderDictionaryList();
      const card = this.renderWordCard();
      return (
        <div className={styles.Dictionary}>
          {list}
          {card}
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    dictionary: state.dictionary.loadedDictionary,
    selectedWordIndex: state.dictionary.selectedWordIndex,
    fetchedWord: state.dictionary.fetchedWord,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDictionary: () => dispatch(actions.loadDictionary()),
    loadPartsOfSpeeches: () => dispatch(actions.loadPartsOfSpeeches()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);