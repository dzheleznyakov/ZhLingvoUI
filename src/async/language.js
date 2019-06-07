import axios from './axios-api';

export const loadLanguagesFromServer = () => axios.get('/languages')
    .then(res => res.data)
    .catch(err => console.error(err));
    