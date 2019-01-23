import React, { Component } from 'react';

import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show ||
            nextProps.children !== this.props.children;
    }

    render() {
      const modalClasses = [
        classes.Modal, 
        this.props.show ? classes.ShowModal : classes.HideModal,
      ];
      return (
          <React.Fragment>
              <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
              <div className={modalClasses.join(' ')}>
                  {this.props.children}
              </div>
          </React.Fragment>
      );
    }
}

export default Modal;
