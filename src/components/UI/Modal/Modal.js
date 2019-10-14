import React from 'react';

import classes from './Modal.module.scss';
import Backdrop from '../Backdrop/Backdrop';

const Modal = props => {
  const modalClasses = [
    classes.Modal, 
    props.show ? classes.ShowModal : classes.HideModal,
  ];
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div className={modalClasses.join(' ')}>
        {props.children}
      </div>
    </React.Fragment>
  );
};

export default Modal;
