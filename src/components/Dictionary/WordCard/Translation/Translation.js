import React from 'react';

import EditableSpan from '../../../UI/EditableSpan/EditableSpan';

const translation = (props) => <EditableSpan
  value={props.children}
  edited={props.edited} />;

export default translation;
