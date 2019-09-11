import axios from './axios-api';

export const addWord = (wordName, languageCode) =>
  axios.post(`/words/${wordName}/${languageCode}`)
    .catch(err => console.log('ERROR', err));

export const fetchWord = (id, languageCode) =>
  axios.get(`/words/${languageCode}/${id}`)
    .then(res => res.data)
    .catch(err => console.log('ERROR', err));

export const saveWord = (wordEntry, languageCode) =>
  axios.put(`/words/${languageCode}`, wordEntry)
    .then(res => res.data)
    .catch(err => console.log('ERROR', err));
