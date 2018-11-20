import React, { Component } from 'react';
import { connect } from 'react-redux';

import Language from '../elements/Language';
import Dropdown from '../../UI/Dropdown/Dropdown';
import Spinner from '../../UI/Spinner/Spinner';
import * as actions from '../../../store/actions/';

class LanguageChooser extends Component {
  componentDidMount() {
    this.props.onPageLoaded();
  }

  renderDropdown = () => {
    if (this.props.languages.length) {
      const options = this.props.languages.map(lang => {
        return (
          <Language 
            key={lang.code}
            onclicked={() => this.props.onLanguageSelected(lang)}
            code={lang.code}
            name={lang.name}
            size='Medium'
          />
        );
      });
      return <Dropdown options={options} select='language' />
    }

    return <Spinner />
  };

  render() {
    const currentLanguage = this.props.selectedLanguage;
    let currentLanguageMessage = <div>No language selected</div>;
    if (currentLanguage) {
      currentLanguageMessage = (<div>
        Selected language:
        <Language 
          code={currentLanguage.code}
          name={currentLanguage.name}
          size='Medium'
        />
      </div>);
    }

    return (
      <React.Fragment>
        {currentLanguageMessage}
        {this.renderDropdown()}
      </React.Fragment>
    );
  };
}

const mapStateToProps = state => {
  return {
    languages: state.language.languages,
    selectedLanguage: state.language.selectedLanguage,
  };
};

const mapDispatchToProps = dispath => {
  return {
    onPageLoaded: () => dispath(actions.loadLanguages()),
    onLanguageSelected: ({ code, name }) => dispath(actions.selectLanguage(code, name)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageChooser);