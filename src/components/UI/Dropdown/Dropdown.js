import React, { Component } from 'react';

import styles from './dropdown.module.scss';

import DisplayList from './DisplayList/DisplayList';

class Dropdown extends Component {
  state = {
    dropped: false,
  }

  onDropDownButtonClicked = () => {
    const dropped = this.state.dropped;
    this.setState({ dropped: !dropped })
  };

  itemClickedHandler = (onclick) => {
    if (onclick) {
      onclick() 
    }
    this.onDropDownButtonClicked();
  };

  render() {
    const selectMessage = 'Please select' +
      (this.props.select ? ` ${this.props.select}` : '...');

    return (
        <dl className={styles.Dropdown}>
          <dt><div onClick={this.onDropDownButtonClicked}><span>{selectMessage}</span></div></dt>
          <dd>
            <DisplayList 
              dropped={this.state.dropped} 
              options={this.props.options} 
              clicked={(html) => this.itemClickedHandler(html.props.onclicked)}
            />
          </dd>
        </dl>
    );
  }
}

export default Dropdown;