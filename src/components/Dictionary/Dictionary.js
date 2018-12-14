import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/';
import Spinner from '../UI/Spinner/Spinner';
import DictionaryList from './DictionaryList/DictionaryList';

class Dictionary extends Component {
  componentDidMount() {
    this.props.onPageLoaded();
  }

  render() {
      let list = <Spinner />
      if (this.props.dictionary && this.props.dictionary.length) {
        list = <DictionaryList dictionary={this.props.dictionary} />
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