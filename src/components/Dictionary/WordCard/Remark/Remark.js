import React from 'react';

import styles from './Remark.module.scss';

import editable from '../../../../hoc/editable/editable';

const remark = (props) => <span 
  className={styles.Remark}
  onClick={props.clicked}
>
  {props.children}{' '}
</span>;

export default editable(remark);
