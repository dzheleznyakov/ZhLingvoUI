import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Dictionary.module.css';

import * as actions from '../../store/actions/';
import Spinner from '../UI/Spinner/Spinner';

class Dictionary extends Component {
  componentDidMount() {
    this.props.onPageLoaded();
  }

  renderDictionaryList() {
    return (
      <div className={styles.DictionaryListWrapper}>
        <ul className={styles.DictionaryList}>
          {this.props.dictionary
            .map((entry, index) => 
              <li key={index}>{entry.word}</li>)}
        </ul>
      </div>
    );
  }

  render() {
      let list = <Spinner />
      if (this.props.dictionary && this.props.dictionary.length) {
        list = this.renderDictionaryList();
      }
      return list;
  }
}

const mapStateToProps = state => {
  return {
    dictionary: state.dictionary.loadedDictionary,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPageLoaded: () => dispatch(actions.loadDictionary()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary);