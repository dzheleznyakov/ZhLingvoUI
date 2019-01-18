import React from 'react';

import classes from './KeyInterceptor.module.scss';

const keyInterceptor = (props) => (
  <input
    type="text"
    className={classes.Interceptor}
    value={props.value}
    onChange={props.changed}
    onKeyDown={props.keyDown}
    onBlur={props.blurred}
    ref={props.inputRef} />
);

export default keyInterceptor;
