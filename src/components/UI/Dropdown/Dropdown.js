import React, { Component } from 'react';

import styles from './Dropdown.module.css';

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
    const listDisplayStyle = {
      display: this.state.dropped ? 'block' : 'none',
    };

    return (
      <dl className={styles.Dropdown}>
        <dt><div onClick={this.onDropDownButtonClicked}><span>Please select...</span></div></dt>
        <dd>
          <ul style={listDisplayStyle}>
            {this.props.options.map((html, index) => <li 
                key={index}
                onClick={() => this.itemClickedHandler(html.props.onclicked)}
            >{html}</li>)}
          </ul>
        </dd>
      </dl>
    );
  }
}

export default Dropdown;