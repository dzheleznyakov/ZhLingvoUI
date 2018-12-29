import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './PartOfSpeechesExpansion.module.scss';

import ThreeDotsButton from '../../../UI/ThreeDotsButton/ThreeDotsButton';
import DisplayList from '../../../UI/Dropdown/DisplayList/DisplayList';
import * as actions from '../../../../store/actions/';

class PartOfSpeechesExpansion extends Component {
  state = {
    dropped: false,
  }

  onButtonClicked = () => {
    this.setState({ dropped: !this.state.dropped })
  };

  onOptionClicked = (partOfSpeech) => {
    this.setState({ dropped: false });
    this.props.addPartOfSpeech(this.props.semanticBlockIndex, partOfSpeech);
  }

  render() {
    const availablePartsOfSpeech = this.props.partsOfSpeech
      .filter(partOfS => !this.props.setPartsOfSpeech.find(setPartOfS => setPartOfS === partOfS));

    return (
      <dl className={styles.PartOfSpeechesExpansion}>
        <dt><ThreeDotsButton clicked={this.onButtonClicked}/></dt>
        <dd><DisplayList 
          dropped={this.state.dropped}
          options={availablePartsOfSpeech}
          clicked={this.onOptionClicked}
        /></dd>
      </dl>
    );
  }
}

const mapStateToProps = state => {
  return {
    partsOfSpeech: state.dictionary.partsOfSpeech,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addPartOfSpeech: (sbIndex, partOfSpeech) => dispatch(actions.addPartOfSpeech(sbIndex, partOfSpeech)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PartOfSpeechesExpansion);
