import { useSelector } from 'react-redux';
import _ from 'lodash';

const useSelectEditMode = 
  () => useSelector(state => _.get(state, 'dictionary.editMode'));

export default useSelectEditMode;
